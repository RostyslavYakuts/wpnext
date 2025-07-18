<?php

namespace WPNEXTApp\Api;

use WP_REST_Request;

class Product implements RestInterface
{
    public function __construct(){
        add_action('rest_api_init', [$this, 'register_routes']);
    }
    public function register_routes(): void
    {
        register_rest_route('nextapp/v1', '/products/(?P<id>\d+)', [
            'methods'  => 'GET',
            'callback' => [$this,'get_data'],
            'permission_callback' => '__return_true',
            'args'     => [
                'id' => ['required' => true],
            ],
        ]);
    }

    public function get_data(WP_REST_Request $request): \WP_Error|\WP_REST_Response|\WP_HTTP_Response
    {
        $id = (int) $request['id'];
        $post = get_post($id);

        if (!$post || $post->post_type !== 'product') {
            return new \WP_Error('not_found', 'Product not found', ['status' => 404]);
        }
        return rest_ensure_response([
            'id'        => $post->ID,
            'title'     => get_the_title($post),
            'content'   => apply_filters('the_content', $post->post_content),
            'date'      => get_the_date('', $post),
            'modified'  => get_the_modified_date('', $post),
            'thumbnail' => get_the_post_thumbnail_url($post, 'full'),
            'link'      => get_permalink($post),
            'author'    => get_the_author_meta('display_name', $post->post_author),
        ]);
    }
}