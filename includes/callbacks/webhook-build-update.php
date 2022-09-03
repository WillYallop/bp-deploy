<?php

function BP_webhook_build_update() {

    $data = json_decode( file_get_contents( 'php://input' ), true );
    // if we have data
    if ( !$data ) {
        return new WP_REST_Response( array(
            'status' => 'failure',
            'message' => 'No ',
        ), 500 );
    }

    // return data
    return new WP_REST_Response( array(
        'data' => $data,
    ), 200 );
}