<?php
/**
 * Breadcrumb Helper for Clara Theme.
 *
 * @package Clara
 */

namespace CLARA\Helpers;

/**
 * Outputs a breadcrumb <nav> using Yoast SEO if available, with a plain
 * fallback for Home → Current Page when Yoast is not active.
 *
 * @return void
 */
function clara_breadcrumb() {
	if ( function_exists( 'yoast_breadcrumb' ) ) {
		yoast_breadcrumb( '<nav class="breadcrumb" aria-label="breadcrumb">', '</nav>' );
		return;
	}

	// Plain fallback
	$crumbs   = array();
	$crumbs[] = '<a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Acasă', 'clara' ) . '</a>';

	if ( is_singular() ) {
		$crumbs[] = '<span>' . esc_html( get_the_title() ) . '</span>';
	} elseif ( is_archive() ) {
		$crumbs[] = '<span>' . esc_html( get_the_archive_title() ) . '</span>';
	} elseif ( is_search() ) {
		$crumbs[] = '<span>' . esc_html__( 'Rezultate căutare', 'clara' ) . '</span>';
	}

	echo '<nav class="breadcrumb" aria-label="breadcrumb">';
	echo implode( '<span class="breadcrumb-sep" aria-hidden="true">/</span>', $crumbs );
	echo '</nav>';
}

