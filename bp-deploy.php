<?php
/**
 * @package BP Deploy
 */
/*
Plugin Name: BP Deploy
Description: A simple plugin to trigger bitbucket pipelines.
Version: 1.0.0
Author: William Yallop
Author URI: https://williamyallop.com
Text Domain: williamyallop
*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

// ----------------------
// add a settings link to the plugins page
// ----------------------
function BP_add_settings_link( $links ) {
    $settings_link = '<a href="options-general.php?page=bp-deploy">Settings</a>';
    array_push( $links, $settings_link );
    return $links;
}
add_filter( "plugin_action_links_" . plugin_basename( __FILE__ ), 'BP_add_settings_link' );

// ----------------------
// Includes
// ----------------------
require_once plugin_dir_path( __FILE__ ) . 'includes/setup.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/routes.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/templates/settings-page.php';
// callbacks
require_once plugin_dir_path( __FILE__ ) . 'includes/callbacks/get-settings.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/callbacks/save-settings.php';