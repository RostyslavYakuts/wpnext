<?php

namespace WPNEXTApp\Api;

use WP_REST_Request;

class Products implements RestInterface
{
    public function __construct(){
        add_action('rest_api_init', [$this, 'register_routes']);
    }
    public function register_routes(): void
    {
        register_rest_route('nextapp/v1', '/products', [
            'methods'  => 'GET',
            'callback' => [$this, 'get_data'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function get_data(WP_REST_Request $request): \WP_Error|\WP_REST_Response|\WP_HTTP_Response
    {
        $page = $request->get_param('page') ?: 1;
        $per_page = $request->get_param('per_page') ?: 3;
        $orderby    = $request->get_param('orderby') ?: 'date';
        $order      = $request->get_param('order') ?: 'DESC';
        $on_sale    = $request->get_param('on_sale') === 'true';
        $price_sort = $request->get_param('price_order');

        $args = [
            'post_type'      => 'product',
            'post_status'    => 'publish',
            'post_parent'    => 0,
            'posts_per_page' => $per_page,
            'paged'          => $page,
            'orderby'        => $orderby,
            'order'          => $order,
            'meta_query'     => [],
            'cache_results'  => false,
            'no_found_rows'  => false,
        ];
        // Only products with sale prices
        if ($on_sale) {
            $args['meta_query'][] = [
                'key'     => '_sale_price',
                'value'   => 0,
                'compare' => '>',
                'type'    => 'NUMERIC',
            ];
        }

        // Sort by price
        if ($orderby === 'price') {
            $args['meta_query'][] = [
                'key'     => '_price',
                'compare' => 'EXISTS',
            ];
            $args['meta_key'] = '_price';
            $args['orderby'] = [
                'meta_value_num' => strtoupper($price_sort) === 'ASC' ? 'ASC' : 'DESC',
                'ID' => 'ASC'
            ];
            $args['order'] = ''; // ignored when using array orderby
        }

        $query = new \WP_Query($args);

        // Format posts for REST
        $data = array_map(function($post) {
            $product = wc_get_product($post->ID);
            return [
                'id'          => $post->ID,
                'title'       => html_entity_decode(get_the_title($post)),
                'price'       => $product->get_price(),
                'price_html'  => $product->get_price_html(),
                'thumbnail'   => get_the_post_thumbnail_url($post, 'medium'),
                'link'        => get_permalink($post),
                'excerpt'     => $product->get_short_description(),
                'description' => $product->get_description(),
            ];
        }, $query->posts);
        error_log('Page ' . $page . ' IDs: ' . implode(',', wp_list_pluck($query->posts, 'ID')));
        return rest_ensure_response([
            'posts' => $data,
            'total_pages' => $query->max_num_pages,
        ]);
    }
}