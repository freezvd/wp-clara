<?php
/**
 * Register "Therapies" Custom Post Type for Clara Theme.
 *
 * @package Clara
 */

namespace CLARA\PostTypes;

/**
 * Register the therapies post type.
 *
 * @return void
 */
function register_therapies_cpt() {
	$labels = array(
		'name'                  => _x( 'Therapies', 'post type general name', 'clara' ),
		'singular_name'         => _x( 'Therapy', 'post type singular name', 'clara' ),
		'menu_name'             => _x( 'Therapies', 'admin menu', 'clara' ),
		'name_admin_bar'        => _x( 'Therapy', 'add new on admin bar', 'clara' ),
		'add_new'               => _x( 'Add New', 'therapy', 'clara' ),
		'add_new_item'          => __( 'Add New Therapy', 'clara' ),
		'new_item'              => __( 'New Therapy', 'clara' ),
		'edit_item'             => __( 'Edit Therapy', 'clara' ),
		'view_item'             => __( 'View Therapy', 'clara' ),
		'all_items'             => __( 'All Therapies', 'clara' ),
		'search_items'          => __( 'Search Therapies', 'clara' ),
		'parent_item_colon'     => __( 'Parent Therapies:', 'clara' ),
		'not_found'             => __( 'No therapies found.', 'clara' ),
		'not_found_in_trash'    => __( 'No therapies found in trash.', 'clara' ),
	);

	$args = array(
		'labels'             => $labels,
		'description'        => __( 'Custom post type for therapy services.', 'clara' ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'show_in_nav_menus'  => true,
		'show_in_admin_bar'  => true,
		'show_in_rest'       => true,
		'rest_base'          => 'therapies',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 5,
		'menu_icon'          => 'dashicons-heart',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'revisions', 'custom-fields' ),
		'rewrite'            => array(
			'slug'       => 'therapies',
			'with_front' => false,
		),
		'taxonomies'         => array(),
		'can_export'         => true,
	);

	register_post_type( 'therapies', $args );
}

add_action( 'init', __NAMESPACE__ . '\register_therapies_cpt', 10 );

