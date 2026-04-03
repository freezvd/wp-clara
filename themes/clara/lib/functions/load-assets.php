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
	$path = get_template_directory() . '/assets/build/css/theme.asset.php';

	if ( file_exists( $path ) ) {
		$assets = include $path;
		wp_enqueue_style(
			'clara-theme',
			get_template_directory_uri() . '/assets/build/css/theme.css',
			isset( $assets['dependencies'] ) ? $assets['dependencies'] : array(),
			isset( $assets['version'] ) ? $assets['version'] : null
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
	$scripts = array(
		'clara-nav-scroll'  => 'js/nav-scroll',
		'clara-nav-height'  => 'js/nav-height',
		'clara-back-to-top' => 'js/back-to-top',
		'clara-reveal'      => 'js/reveal',
	);

	foreach ( $scripts as $handle => $file ) {
		$asset_file = get_template_directory() . '/assets/build/' . $file . '.asset.php';

		if ( file_exists( $asset_file ) ) {
			$assets = include $asset_file;
			wp_enqueue_script(
				$handle,
				get_template_directory_uri() . '/assets/build/' . $file . '.js',
				isset( $assets['dependencies'] ) ? $assets['dependencies'] : array(),
				isset( $assets['version'] ) ? $assets['version'] : null,
				array( 'strategy' => 'defer', 'in_footer' => true )
			);
		}
	}

	if ( is_home() || is_archive() || is_search() ) {
		$blog_asset_file = get_template_directory() . '/assets/build/js/blog.asset.php';

		if ( file_exists( $blog_asset_file ) ) {
			$assets = include $blog_asset_file;
			wp_enqueue_script(
				'clara-blog',
				get_template_directory_uri() . '/assets/build/js/blog.js',
				isset( $assets['dependencies'] ) ? $assets['dependencies'] : array(),
				isset( $assets['version'] ) ? $assets['version'] : null,
				array( 'strategy' => 'defer', 'in_footer' => true )
			);
		}
	}
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts' );

/**
 * Enqueue therapy sidebar script for block editor.
 *
 * Only loads on the 'therapies' post type editor.
 *
 * @return void
 */
function enqueue_therapy_sidebar_script() {
	// Only load on therapies post type in the editor
	if ( ! is_admin() ) {
		return;
	}

	$screen = get_current_screen();
	if ( ! $screen || $screen->post_type !== 'therapies' ) {
		return;
	}

	$asset_file = get_template_directory() . '/assets/build/js/therapy-sidebar.asset.php';

	if ( file_exists( $asset_file ) ) {
		$assets = include $asset_file;
		$dependencies = isset( $assets['dependencies'] ) ? $assets['dependencies'] : array();


		wp_enqueue_script(
			'clara-therapy-sidebar',
			get_template_directory_uri() . '/assets/build/js/therapy-sidebar.js',
			$dependencies,
			isset( $assets['version'] ) ? $assets['version'] : null,
			true
		);

		wp_set_script_translations( 'clara-therapy-sidebar', 'clara' );
	}
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_therapy_sidebar_script' );

