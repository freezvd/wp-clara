<?php
/**
 * Register plugins scripts & styles
 *
 * @package Clara Blocks
 * @author  Valentin Zmaranda
 * @license GPL-2.0+
 * @link    https://example.com
 */

namespace CLARA_BLOCKS;

//Register new block variations
use function wp_enqueue_script;

/**
 * Enqueue block frontend JS & CSS
 */
function frontend_assets() {
	$block_has_slider = [
//		'partners',
//		'successes',
//		'news'
	];

	$slick_path = plugin_dir_path( CLARA_BLOCKS_BLOCKS_PLUGIN_FILE ) . 'assets/js/vendors/slick/slick.min.js';
	if ( file_exists( $slick_path ) ) {
		wp_register_script( 'slick', CLARA_BLOCKS_BLOCKS_PLUGIN_URL . 'assets/js/vendors/slick/slick.min.js', array( 'jquery' ), filemtime( $slick_path ), true );
	}
//	wp_register_style( 'slick', CLARA_BLOCKS_BLOCKS_PLUGIN_URL . 'assets/js/vendors/slick/slick.css' );

	foreach ( $block_has_slider as $block_name ) {
		if ( has_block( 'clara-blocks/' . $block_name ) ) {
			if ( ! wp_script_is( 'slick' ) ) {
				wp_enqueue_script( 'slick' );
			}
		}
	}
}

add_action( "wp_enqueue_scripts", __NAMESPACE__ . '\frontend_assets' );
