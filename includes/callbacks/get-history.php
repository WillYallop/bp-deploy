<?php

function BP_get_history() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'bp_deploy_history';
    $results = $wpdb->get_results( "SELECT * FROM $table_name ORDER BY id DESC" );

    // return data
    return new WP_REST_Response( array(
        'history' => $results,
        'limit' => 20,
        'skip' => 0,
    ), 200 );
}