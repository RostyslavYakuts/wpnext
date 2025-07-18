<?php

namespace WPNEXTApp\Setup;

class ProjectPostType
{
    public function __construct(){
        add_action('init', [$this,'registerPostType']);
    }
    public function registerPostType(): void
    {
        register_post_type('project', [
            'label' => 'Projects',
            'public' => true,
            'menu_position' => 20,
            'menu_icon' => 'dashicons-controls-volumeon',
            'show_in_rest' => true,
            'supports' => ['title', 'excerpt', 'editor', 'thumbnail', 'custom-fields'],
        ]);
    }
}