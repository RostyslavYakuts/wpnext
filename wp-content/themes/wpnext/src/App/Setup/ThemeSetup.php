<?php

namespace WPNEXTApp\Setup;

class ThemeSetup
{
    public function __construct()
    {
        add_action('after_setup_theme', [$this, 'addThemeSupports']);
    }

    public function addThemeSupports(): void
    {
        add_theme_support('post-thumbnails', ['project']);
    }

}