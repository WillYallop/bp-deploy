<?php

function BP_settings_page_template() {
    ?>
        <div id="bp-settings-page" data-nonce="<?php echo wp_create_nonce( 'wp_rest' ) ?>"></div>
    <?php
}