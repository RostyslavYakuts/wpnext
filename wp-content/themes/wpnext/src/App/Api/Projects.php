<?php

namespace WPNEXTApp\Api;

use WP_REST_Request;

class Projects implements RestInterface
{
    public function __construct(){
        add_action('rest_api_init', [$this, 'register_routes']);
    }
    public function register_routes(): void
    {
        register_rest_route('nextapp/v1', '/projects', [
            'methods'  => 'GET',
            'callback' => [$this, 'get_data'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function get_data(WP_REST_Request $request): \WP_Error|\WP_REST_Response|\WP_HTTP_Response
    {
        $page = $request->get_param('page') ?: 1;
        $per_page = $request->get_param('per_page') ?: 2;
        $args = [
            'post_type'      => 'project',
            'post_status'    => 'publish',
            'posts_per_page' => $per_page,
            'paged'          => $page,
            'orderby'        => 'date',
            'order'          => 'DESC',
            'meta_query'     => [
                ['key' => '_thumbnail_id', 'compare' => 'EXISTS'],
            ],
        ];

        $query = new \WP_Query($args);

        // Format posts for REST
        $data = array_map(function($post) {
            return [
                'id'        => $post->ID,
                'title'     => get_the_title($post),
                'excerpt'   => get_the_excerpt($post),
                'date'      => get_the_date('', $post),
                'thumbnail' => get_the_post_thumbnail_url($post, 'full'),
                'link'      => get_permalink($post),
            ];
        }, $query->posts);

        $response = rest_ensure_response([
            'posts' => $data,
            'total_pages' => $query->max_num_pages,
        ]);

        $response->header('X-WP-Total', (int) $query->found_posts);
        $response->header('X-WP-TotalPages', (int) $query->max_num_pages);

        return $response;
    }
}