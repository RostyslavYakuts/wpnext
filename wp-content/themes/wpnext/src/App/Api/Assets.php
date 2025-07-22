<?php

namespace WPNEXTApp\Api;

use WP_REST_Request;

class Assets implements RestInterface
{
    public function __construct(){
        add_action('rest_api_init', [$this, 'register_routes']);
    }
    public function register_routes(): void
    {
        register_rest_route('nextapp/v1', '/assets/(?P<id>\d+)', [
            'methods'  => 'GET',
            'callback' => [$this, 'get_data'],
            'args'     => [
                'id' => [
                    'required' => true,
                    'validate_callback' => function( $value, $request, $param ) {
                        return is_numeric( $value );}
                ],
            ],
            'permission_callback' => '__return_true',
        ]);
    }

    public function get_data(WP_REST_Request $request): \WP_Error|\WP_REST_Response|\WP_HTTP_Response
    {
        $post_id = (int) $request['id'];

        // Create fake WP environment to load assets
        $post = get_post($post_id);
        if (!$post) return new \WP_Error('not_found', 'Post not found', ['status' => 404]);

        setup_postdata($post);

        // Start buffering enqueues
        ob_start();

        // Trigger the block rendering
        echo apply_filters('the_content', $post->post_content);

        // Get enqueued scripts/styles
        global $wp_scripts, $wp_styles;

        wp_enqueue_scripts(); // Trigger scripts enqueue

        $scripts = [];
        foreach ($wp_scripts->queue as $handle) {
            $src = $wp_scripts->registered[$handle]->src ?? '';
            $src = wp_make_link_relative($src);
            $scripts[] = [
                'handle' => $handle,
                'src'    => home_url($src),
            ];
        }

        $styles = [];
        foreach ($wp_styles->queue as $handle) {
            $src = $wp_styles->registered[$handle]->src ?? '';
            $src = wp_make_link_relative($src);
            $styles[] = [
                'handle' => $handle,
                'src'    => home_url($src),
            ];
        }

        ob_end_clean();
        wp_reset_postdata();

        return rest_ensure_response([
            'post_id' => $post_id,
            'scripts' => $scripts,
            'styles'  => $styles,
        ]);
    }
}