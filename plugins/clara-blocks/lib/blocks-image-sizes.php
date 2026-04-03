<?php
/**
 * Register plugin image sizes
 *
 * @package Clara Blocks
 * @author  Valentin Zmaranda
 * @license GPL-2.0+
 * @link    https://example.com
 */

namespace CLARA_BLOCKS;


add_action( 'after_setup_theme', __NAMESPACE__ . '\theme_setup' );
function theme_setup() {
	add_image_size( 'hero', 1920, 490, true );
}

add_filter( 'image_size_names_choose', __NAMESPACE__ . '\custom_sizes' );
function custom_sizes( $sizes ) {
	return array_merge( $sizes, array(
		'hero' => __( 'Hero', 'clara-blocks' ),
	) );
}

