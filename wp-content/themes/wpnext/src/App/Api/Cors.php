<?php

namespace WPNEXTApp\Api;

class Cors
{
    public function __construct()
    {
        add_filter('rest_pre_serve_request', [$this, 'add_headers'], 10, 4);
    }

    public function add_headers($served, $result, $request, $server): bool
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET'); // add POST, OPTIONS carefully
        header('Access-Control-Allow-Headers: Content-Type');

        return $served;
    }
}