<?php

namespace WPNEXTApp\Setup;

class FrontendRedirector
{
    public function __construct(){
        add_action('template_redirect', [$this, 'redirect']);
    }
    public function redirect(): void
    {
        if (!is_admin() && !str_starts_with($_SERVER['REQUEST_URI'], '/wp-json')) {
            wp_redirect('http://localhost:3000', 301);
            exit;
        }
    }

}