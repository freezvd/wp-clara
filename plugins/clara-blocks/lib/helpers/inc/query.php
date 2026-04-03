<?php
/**
 *
 * Generic Query
 *
 * @package Clara Blocks
 * @author  Valentin Zmaranda
 * @license GPL-2.0+
 * @link    https://example.com
 */

namespace CLARA_BLOCKS;

use WP_Query;

if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Cheatin&#8217; uh?' );
}

function get_entries( $post_type, $args = [] ) {
	$defaults = array(
		'post_type'        => $post_type,
		'post_status'      => 'publish',
		'posts_per_page'   => 500,
		'no_found_rows'    => true,
		'suppress_filters' => false,
	);

	$args = wp_parse_args( $args, $defaults );

	return new WP_Query( $args );
}
