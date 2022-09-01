<?php


// ----------------------
// Register the bp deploy settings page
// ----------------------
function BP_settings_page() {
    add_options_page( 'BP Deploy', 'BP Deploy', 'manage_options', 'bp-deploy', 'BP_settings_page_template' );
}
add_action( 'admin_menu', 'BP_settings_page' );



// ----------------------
// Enqueue scripts and styles
// ----------------------
function BP_settings_page_scripts() {
    wp_enqueue_script( 'bp-deploy-settings-page', plugin_dir_url( __FILE__ ) . '../admin/app.js', array(), '1.0.0', true );
}
add_action( 'admin_enqueue_scripts', 'BP_settings_page_scripts' );

function BP_settings_page_styles() {
    wp_enqueue_style( 'bp-deploy-settings-page', plugin_dir_url( __FILE__ ) . '../admin/main.css', array(), '1.0.0' );
}
add_action( 'admin_enqueue_scripts', 'BP_settings_page_styles' );