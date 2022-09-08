<?php

function BP_check_deploy_status() {
    $data = json_decode( file_get_contents( 'php://input' ), true );
    // if we have data
    if ( !$data['pipelineId'] ) {
        return new WP_REST_Response( array(
            'status' => 'failure',
            'message' => 'Make sure to pass the pipeline id',
        ), 500 );
    }

    $user = get_option('bp_username');
    $workspaceName = get_option('bp_workspaceName');
    $repositoryName = get_option('bp_repositoryName');

    $headers = array(
        'Authorization' => 'Basic ' . base64_encode( $user . ':' . BP_APP_PASSWORD ),
        'Content-Type' => 'application/json'
    );
    $response = wp_remote_get( ('https://api.bitbucket.org/2.0/repositories/' . $workspaceName . '/' . $repositoryName . '/pipelines/' . $data['pipelineId']), array(
        'headers' => $headers
    ));
    $response_body = json_decode( $response['body'] );

    // if the response code is 200
    if ( $response['response']['code'] != 200 ) {
        return new WP_REST_Response( array(
            'status' => 'error',
            'message' => 'Deployment failed',
            'bitbucketres' =>  $response['response']
        ), $response['response']['code'] );
    }

    $result = $response_body->state->result->name || null;

    global $wpdb;
    $table_name = $wpdb->prefix . 'bp_deploy_history';
    $wpdb->update( 
        $table_name, 
        array( 
            'result' => $result,
            'state' => $response_body->state->name,
        ), 
        array( 'pipeline_id' => $response_body->uuid )
    );

    return new WP_REST_Response( array(
        'result' => $result,
        'status' => $response_body->state->name,
        'pipelineId' => $response_body->uuid,
        'message' => 'Successfully updated the deployment status',
    ), 200 );
}