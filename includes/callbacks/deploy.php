<?php

function BP_deploy() {
    // get data from options
    $user = get_option('bp_username');
    $workspaceName = get_option('bp_workspaceName');
    $repositoryName = get_option('bp_repositoryName');
    $branchName = get_option('bp_branchName');

    $headers = array(
        'Authorization' => 'Basic ' . base64_encode($user . ':' . BP_APP_PASSWORD),
        'Content-Type' => 'application/json'
    );
    $body = array (
        'target' => 
        array (
            'ref_type' => 'branch',
            'type' => 'pipeline_ref_target',
            'ref_name' => $branchName,
        ),
    );
    $response = wp_remote_post( 'https://api.bitbucket.org/2.0/repositories/' . $workspaceName . '/' . $repositoryName . '/pipelines/', array(
        'headers' => $headers,
        'body' => json_encode( $body )
    ) );
    $response_body = json_decode( $response['body'] );

    // if the response code is 200
    if ( $response['response']['code'] != 201 ) {
        return new WP_REST_Response( array(
            'status' => 'error',
            'message' => 'Deployment failed',
            'bitbucketres' =>  $response['response']
        ), $response['response']['code'] );
    }

    // create a new entry in the database in the bp_deploy_history table
    global $wpdb;
    $table_name = $wpdb->prefix . 'bp_deploy_history';
    $wpdb->insert( 
        $table_name, 
        array( 
            'time' => current_time( 'mysql' ), 
            'state' =>  $response_body->state->name,
            'pipeline_id' => $response_body->uuid,
            'author_name' => wp_get_current_user()->display_name,
            'branch' => $branchName,
            'repository' => $repositoryName,
            'workspace' => $workspaceName,
            'commit_id' => $response_body->target->commit->hash,
            'commit_url' => $response_body->target->commit->links->html->href,
        ) 
    );

    // create_deployment_status( $response_body->uuid, $response_body->state->name );
    return new WP_REST_Response( array(
        'status' => $response_body->state->name,
        'message' => 'Deployment started successfully',
    ), 200 );
}