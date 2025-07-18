<?php

namespace WPNEXTApp\Api;

use WP_REST_Request;

interface RestInterface
{
    public function register_routes():void;
    public function get_data(WP_REST_Request $request): \WP_Error|\WP_REST_Response|\WP_HTTP_Response;
}