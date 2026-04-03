<?php
/**
 *
 * Return antispam bot email link
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

function get_email( $email_raw, $alt_text = 'Email us', $show_icon = false ) {
	if ( ! $email_raw ) {
		return false;
	}
	$email_sanitize = sanitize_email( $email_raw );

	return sprintf( '<a href="mailto:%1$s" title="%2$s"  data-title="%2$s">%3$s</a>',
		antispambot( $email_sanitize, 1 ),
		esc_html( $alt_text ),
		$show_icon ? '<i aria-hidden="true" class="icon icon-email"></i>' : ''
	);
}

