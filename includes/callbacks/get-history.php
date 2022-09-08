<?php

function BP_get_history() {
    $limit = $_GET['limit'] ? $_GET['limit'] : 10;
    $skip = $_GET['skip'] ? $_GET['skip'] : 0;

    global $wpdb;
    $table_name = $wpdb->prefix . 'bp_deploy_history';
    $results = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM $table_name ORDER BY time DESC LIMIT %d OFFSET %d", $limit, $skip ) );

    foreach ( $results as $result ) {
        if ( $result->result == null ) {
            $user = get_option('bp_username');
            $workspaceName = get_option('bp_workspaceName');
            $repositoryName = get_option('bp_repositoryName');

            $headers = array(
                'Authorization' => 'Basic ' . base64_encode( $user . ':' . BP_APP_PASSWORD ),
                'Content-Type' => 'application/json'
            );
            $response = wp_remote_get( ('https://api.bitbucket.org/2.0/repositories/' . $workspaceName . '/' . $repositoryName . '/pipelines/' . $result->pipeline_id), array(
                'headers' => $headers
            ));
            $response_body = json_decode( $response['body'] );

            // if the response code is 200
            if ( $response['response']['code'] == 200 ) {
                $wpdb->update( 
                    $table_name, 
                    array( 
                        'result' => $response_body->state->result->name,
                        'state' => $response_body->state->name,
                    ), 
                    array( 'pipeline_id' => $response_body->uuid )
                );
            }
            // update the result and state
            $result->result = $response_body->state->result->name;
            $result->state = $response_body->state->name;
        }
    }

    return new WP_REST_Response( array(
        'history' => $results,
    ), 200 );
}