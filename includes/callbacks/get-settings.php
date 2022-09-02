<?php

function BP_get_settings() {
    $user = get_option('bp_username');
    $workspaceName = get_option('bp_workspaceName');
    $repositoryName = get_option('bp_repositoryName');
    $branchName = get_option('bp_branchName');

    // return data
    return new WP_REST_Response( array(
        'user' => $user,
        'workspaceName' => $workspaceName,
        'repositoryName' => $repositoryName,
        'branchName' => $branchName,
    ), 200 );
}