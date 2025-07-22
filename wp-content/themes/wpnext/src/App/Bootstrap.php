<?php

namespace WPNEXTApp;

use WPNEXTApp\Api\Assets;
use WPNEXTApp\Api\Cors;
use WPNEXTApp\Api\Product;
use WPNEXTApp\Api\Products;
use WPNEXTApp\Api\Project;
use WPNEXTApp\Api\Projects;
use WPNEXTApp\Setup\FrontendRedirector;
use WPNEXTApp\Setup\ProjectPostType;
use WPNEXTApp\Setup\ThemeSetup;

class Bootstrap
{
    protected ThemeSetup $themeSetup;
    protected ProjectPostType $projectPostType;
    protected FrontendRedirector $frontendRedirector;
    protected Projects $projects;
    protected Project $project;
    protected Products $products;
    protected Product $product;
    protected Cors $cors;
    protected Assets $assets;

    public function __construct()
    {
        $this->themeSetup = new ThemeSetup();
        $this->projectPostType = new ProjectPostType();
        $this->frontendRedirector = new FrontendRedirector();
        $this->projects = new Projects();
        $this->project = new Project();
        $this->products = new Products();
        $this->product = new Product();
        $this->cors = new Cors();
        $this->assets = new Assets();
    }
}