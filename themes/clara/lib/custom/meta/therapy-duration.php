<?php
/**
 * Register Duration Meta for Therapies CPT.
 *
 * @package Clara
 */

namespace CLARA\PostMeta;

/**
 * Register duration meta for therapies CPT.
 *
 * Stores duration as a string (e.g., "30" or "60").
 * Frontend display: "30 sau 60 min"
 *
 * @return void
 */
function register_therapy_duration_meta() {
	register_meta( 'post', '_clara_duration', array(
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

add_action( 'init', __NAMESPACE__ . '\register_therapy_duration_meta', 10 );

