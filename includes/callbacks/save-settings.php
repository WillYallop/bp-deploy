<?php

function BP_save_settings() {
    $data = json_decode( file_get_contents( 'php://input' ), true );
    // if we have data
    if ( !$data ) {
        return new WP_REST_Response( array(
            'status' => 'failure',
            'message' => 'No settings found',
        ), 500 );
    }

    update_option( 'bp_username', $data['user'] );
    update_option( 'bp_workspaceName', $data['workspaceName'] );
    update_option( 'bp_repositoryName', $data['repositoryName'] );
    update_option( 'bp_branchName', $data['branchName'] );

    // return a success message
    return new WP_REST_Response( array(
        'status' => 'success',
        'message' => 'Settings saved',
    ), 200 );
}