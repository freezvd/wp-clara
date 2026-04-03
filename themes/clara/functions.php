<?php
/**
 * Clara theme functions
 *
 * @package clara
 */

// ─── THEME SETUP ─────────────────────────────────────────────────────────────

if ( ! function_exists( 'clara_setup' ) ) {
	function clara_setup() {
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'editor-styles' );
		add_theme_support( 'responsive-embeds' );

		register_nav_menus( array(
			'primary' => __( 'Main Navigation', 'clara' ),
		) );
	}
}
add_action( 'after_setup_theme', 'clara_setup' );

// ─── ENQUEUE STYLES ──────────────────────────────────────────────────────────

function clara_enqueue_styles() {
	$path = get_template_directory() . '/assets/css/theme.css';

	if ( file_exists( $path ) ) {
		wp_enqueue_style(
			'clara-theme',
			get_template_directory_uri() . '/assets/css/theme.css',
			array(),
			filemtime( $path )
		);
	}
}
add_action( 'wp_enqueue_scripts', 'clara_enqueue_styles' );

// ─── ENQUEUE SCRIPTS ─────────────────────────────────────────────────────────

function clara_enqueue_scripts() {
	$dir = get_template_directory();
	$uri = get_template_directory_uri();

	$scripts = array(
		'clara-nav-scroll'  => '/assets/js/nav-scroll.js',
		'clara-nav-height'  => '/assets/js/nav-height.js',
		'clara-back-to-top' => '/assets/js/back-to-top.js',
		'clara-reveal'      => '/assets/js/reveal.js',
	);

	foreach ( $scripts as $handle => $path ) {
		if ( file_exists( $dir . $path ) ) {
			wp_enqueue_script(
				$handle,
				$uri . $path,
				array(),
				filemtime( $dir . $path ),
				array( 'strategy' => 'defer', 'in_footer' => true )
			);
		}
	}

	if ( is_home() || is_archive() || is_search() ) {
		$blog_path = '/assets/js/blog.js';
		if ( file_exists( $dir . $blog_path ) ) {
			wp_enqueue_script(
				'clara-blog',
				$uri . $blog_path,
				array(),
				filemtime( $dir . $blog_path ),
				array( 'strategy' => 'defer', 'in_footer' => true )
			);
		}
	}
}
add_action( 'wp_enqueue_scripts', 'clara_enqueue_scripts' );

// ─── BREADCRUMB HELPER ────────────────────────────────────────────────────────

/**
 * Outputs a breadcrumb <nav> using Yoast SEO if available, with a plain
 * fallback for Home → Current Page when Yoast is not active.
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
