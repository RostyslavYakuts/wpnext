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
});
function get_projects() {
    $args = [
        'post_type'      => 'project',
        'post_status'    => 'publish',
        'posts_per_page' => 10,
        'orderby'        => 'date',
        'order'          => 'DESC',
        'meta_query'     => [
            ['key' => '_thumbnail_id', 'compare' => 'EXISTS'],
        ],
    ];

    $posts = get_posts($args);

    // Format posts for REST
    $data = [];
    foreach ($posts as $post) {
        $data[] = [
            'id'           => $post->ID,
            'title'        => get_the_title($post),
            'excerpt'      => get_the_excerpt($post),
            'date'         => get_the_date('', $post),
            'thumbnail'    => get_the_post_thumbnail_url($post, 'full'),
            'link'         => get_permalink($post),
        ];
    }

    return $data;
}