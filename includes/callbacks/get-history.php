<?php

function BP_get_history() {
    // get the limit and skip url params
    $limit = $_GET['limit'] ? $_GET['limit'] : 10;
    $skip = $_GET['skip'] ? $_GET['skip'] : 0;

    global $wpdb;
    $table_name = $wpdb->prefix . 'bp_deploy_history';
    $results = $wpdb->get_results( "SELECT * FROM $table_name ORDER BY id DESC LIMIT $limit OFFSET $skip" );

    // return data
    return new WP_REST_Response( array(
        'history' => $results,
        'limit' => 20,
        'skip' => 0,
    ), 200 );
}