<?php
/**
 * Conditionally add body class.
 *
 * @package Clara Blocks
 * @author  Valentin Zmaranda
 * @license GPL-2.0+
 * @link    https://example.com
 */

namespace CLARA_BLOCKS;

//add_filter( 'script_loader_src', __NAMESPACE__ . '\remove_script_version', 10, 2 );
//add_filter( 'style_loader_src', __NAMESPACE__ . '\remove_script_version', 9999999999, 2 );

//function remove_script_version( $src, $handle ) {
//	wp_die();
//	if ( preg_match( "(\?ver=)", $src ) ) {
//		$parts = explode( '?', $src );
//		ddd( $parts );
//
//		return $parts[0];
//	} else {
//	return remove_query_arg( 'ver', $src );
//	}
//}

//add_filter( 'body_class', __NAMESPACE__ . '\body_class' );
function body_class( $classes ) {

	return $classes;
}
