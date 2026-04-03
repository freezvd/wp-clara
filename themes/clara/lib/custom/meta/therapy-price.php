<?php
/**
 * Register Price Meta for Therapies CPT.
 *
 * @package Clara
 */

namespace CLARA\PostMeta;

/**
 * Register price meta for therapies CPT.
 *
 * @return void
 */
function register_therapy_price_meta() {
	register_meta( 'post', '_clara_price', array(
		'object_subtype'    => 'therapies',
		'type'              => 'string',
		'single'            => true,
		'sanitize_callback' => 'sanitize_text_field',
		'auth_callback'     => function() {
			return current_user_can( 'edit_posts' );
		},
		'show_in_rest'      => true,
	) );
}

add_action( 'init', __NAMESPACE__ . '\register_therapy_price_meta', 10 );

