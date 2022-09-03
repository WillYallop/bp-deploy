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
// Create a new database table called bp_deploy_history on plugin activation
// ----------------------
function BP_create_db_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'bp_deploy_history';
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE $table_name (
        id int(10) NOT NULL AUTO_INCREMENT,
        time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
        result text,
        state text NOT NULL,
        pipeline_id text NOT NULL,
        author_name text NOT NULL,
        branch text NOT NULL,
        repository text NOT NULL,
        workspace text NOT NULL,
        commit_id text NOT NULL,
        commit_url text NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );
}
register_activation_hook( __FILE__, 'BP_create_db_table' );

// drop the database table on plugin deactivation
function BP_delete_db_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'bp_deploy_history';
    $sql = "DROP TABLE IF EXISTS $table_name;";
    $wpdb->query($sql);
}
register_deactivation_hook( __FILE__, 'BP_delete_db_table' );

// ----------------------
// add a settings link to the plugins page
// ----------------------
function BP_add_settings_link( $links ) {
    $settings_link = '<a href="options-general.php?page=bp-deploy&tab=settings">Settings</a>';
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
require_once plugin_dir_path( __FILE__ ) . 'includes/callbacks/deploy.php';
require_once plugin_dir_path(__FILE__) . 'includes/callbacks/get-history.php';
require_once plugin_dir_path(__FILE__) . 'includes/callbacks/check-deploy-status.php';