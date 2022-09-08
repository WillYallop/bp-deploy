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
    $user = sanitize_text_field( $data['user'] );
    $workspaceName = sanitize_text_field( $data['workspaceName'] );
    $repositoryName = sanitize_text_field( $data['repositoryName'] );
    $branch = sanitize_text_field( $data['branchName'] );

    update_option( 'bp_username', $user );
    update_option( 'bp_workspaceName', $workspaceName );
    update_option( 'bp_repositoryName', $repositoryName );
    update_option( 'bp_branchName', $branch );

    // return a success message
    return new WP_REST_Response( array(
        'status' => 'success',
        'message' => 'Settings saved',
    ), 200 );
}