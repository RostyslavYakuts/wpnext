<?php
add_theme_support('post-thumbnails', ['project']);
// Register CPT: 'project'
add_action('init', function() {
    register_post_type('project', [
        'label' => 'Projects',
        'public' => true,
        'menu_position' => 20,
        'menu_icon' => 'dashicons-controls-volumeon',
        'show_in_rest' => true,
        'supports' => ['title', 'excerpt', 'editor', 'thumbnail', 'custom-fields'],
    ]);
});

// Disable frontend rendering — redirect all front-facing requests to Next.js
// that is supposed to run on http://localhost:3000
add_action('template_redirect', function() {
    if (!is_admin() && !str_starts_with($_SERVER['REQUEST_URI'], '/wp-json')) {
        wp_redirect('http://localhost:3000', 301);
        exit;
    }
});

// Register custom REST route
add_action('rest_api_init', function () {
    register_rest_route('nextapp/v1', '/projects', [
        'methods' => 'GET',
        'callback' => 'get_projects',
    ]);
    register_rest_route('nextapp/v1', '/projects/(?P<id>\d+)', [
        'methods'  => 'GET',
        'callback' => 'get_project_by_id',
        'args'     => [
            'id' => ['required' => true],
        ],
    ]);
});

function get_projects(WP_REST_Request $request): WP_Error|WP_REST_Response|WP_HTTP_Response
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

    $query = new WP_Query($args);

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

function get_project_by_id(WP_REST_Request $request): WP_Error|WP_REST_Response|WP_HTTP_Response
{
    $id = (int) $request['id'];
    $post = get_post($id);

    if (!$post || $post->post_type !== 'project') {
        return new WP_Error('not_found', 'Project not found', ['status' => 404]);
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