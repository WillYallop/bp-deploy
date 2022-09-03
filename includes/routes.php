<?php

function BP_api_routes() {
    // V1 Routes
    // Settings
    register_rest_route( 'bp-deploy/v1', '/settings', array(
        'methods' => 'GET',
        'callback' => 'BP_get_settings',
        'permission_callback' => 'BP_authorised_users',
    ));
    register_rest_route( 'bp-deploy/v1', '/settings', array(
        'methods' => 'POST',
        'callback' => 'BP_save_settings',
        'permission_callback' => 'BP_authorised_users',
    ));
    // Deploy
    register_rest_route( 'bp-deploy/v1', '/deploy', array(
        'methods' => 'POST',
        'callback' => 'BP_deploy',
        'permission_callback' => 'BP_authorised_users',
    ));
    // History
    register_rest_route( 'bp-deploy/v1', '/history', array(
        'methods' => 'GET',
        'callback' => 'BP_get_history',
        'permission_callback' => 'BP_authorised_users',
    ));
    // Check deploy status
    register_rest_route( 'bp-deploy/v1', '/check-deploy-status', array(
        'methods' => 'POST',
        'callback' => 'BP_check_deploy_status',
        'permission_callback' => 'BP_authorised_users',
    ));
}
add_action('rest_api_init', 'BP_api_routes');

// create a custom permission check
function BP_authorised_users($request) {
    return is_user_logged_in();
}
