<?php
/**
 * Theme Setup for Clara Theme.
 *
 * @package Clara
 */

namespace CLARA\Setup;

/**
 * Set up theme support and register navigation menus.
 *
 * @return void
 */
function clara_setup() {
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'responsive-embeds' );

	register_nav_menus( array(
		'primary' => __( 'Main Navigation', 'clara' ),
	) );
}

add_action( 'after_setup_theme', __NAMESPACE__ . '\clara_setup' );

