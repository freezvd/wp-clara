<?php
/**
 * Enqueue Theme Assets (Styles and Scripts) for Clara Theme.
 *
 * @package Clara
 */

namespace CLARA\Assets;

/**
 * Enqueue theme styles.
 *
 * @return void
 */
function enqueue_styles() {
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
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_styles' );

/**
 * Enqueue theme scripts.
 *
 * @return void
 */
function enqueue_scripts() {
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
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts' );

