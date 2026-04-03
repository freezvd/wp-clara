<?php
/**
 * Register post meta and taxonomies for Clara Blocks.
 *
 * @package Clara Blocks
 */

namespace CLARA_BLOCKS;

// ─── POST META ───────────────────────────────────────────────────────────────

function register_post_meta() {
	register_meta( 'post', '_clara_price', array(
		'object_subtype'    => 'page',
		'type'              => 'string',
		'single'            => true,
		'sanitize_callback' => 'sanitize_text_field',
		'auth_callback'     => function() {
			return current_user_can( 'edit_posts' );
		},
		'show_in_rest'      => true,
	) );
}

add_action( 'init', __NAMESPACE__ . '\register_post_meta' );

// ─── TAXONOMIES ──────────────────────────────────────────────────────────────

function register_taxonomies() {
	register_taxonomy( 'service_category', array( 'page' ), array(
		'labels'            => array(
			'name'          => __( 'Service Categories', 'clara-blocks' ),
			'singular_name' => __( 'Service Category', 'clara-blocks' ),
		),
		'hierarchical'      => true,
		'public'            => true,
		'show_in_rest'      => true,
		'show_admin_column' => true,
		'rewrite'           => array( 'slug' => 'service-category' ),
	) );
}

add_action( 'init', __NAMESPACE__ . '\register_taxonomies' );
