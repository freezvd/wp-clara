<?php
/**
 * Register "Service Category" Taxonomy for Clara Theme.
 *
 * @package Clara
 */

namespace CLARA\Taxonomies;

/**
 * Register the service_category taxonomy for therapies CPT.
 *
 * @return void
 */
function register_service_category_taxonomy() {
	register_taxonomy( 'service_category', array( 'therapies' ), array(
		'labels'            => array(
			'name'          => __( 'Service Categories', 'clara' ),
			'singular_name' => __( 'Service Category', 'clara' ),
		),
		'hierarchical'      => true,
		'public'            => true,
		'show_in_rest'      => true,
		'show_admin_column' => true,
		'rewrite'           => array( 'slug' => 'service-category' ),
	) );
}

add_action( 'init', __NAMESPACE__ . '\register_service_category_taxonomy', 10 );

