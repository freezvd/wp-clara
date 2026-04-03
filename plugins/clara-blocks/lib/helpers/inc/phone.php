<?php
/**
 *
 * Return link phone number
 *
 * @package Clara Blocks
 * @author  Valentin Zmaranda
 * @license GPL-2.0+
 * @link    https://example.com
 */

namespace CLARA_BLOCKS;

if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Cheatin&#8217; uh?' );
}

function get_phone_number( $phone_raw, $icon = false, $title = 'Call us' ) {
	if ( ! $phone_raw ) {
		return false;
	}

	$with_icon = $icon ? sprintf( '<i aria-hidden="true" class="icon icon-member-phone"></i>', $icon ) : '';

	return sprintf( '<a href="tel:%s" title="%s">%s</a>',
		str_replace( ' ', '', $phone_raw ),
		$title,
		$with_icon );
}

