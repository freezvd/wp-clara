<?php
/**
 * Clara Theme Autoloader
 *
 * Automatically loads all PHP files from the lib directory.
 *
 * @package Clara
 */

namespace CLARA\Loader;

/**
 * Load all PHP files from a directory recursively.
 *
 * @param string $directory The directory to load files from.
 * @return void
 */
function autoload_theme_files( $directory ) {
	if ( ! is_dir( $directory ) ) {
		return;
	}

	$files = glob( $directory . '/*.php' );

	if ( ! empty( $files ) ) {
		foreach ( $files as $file ) {
			if ( is_file( $file ) ) {
				require_once $file;
			}
		}
	}

	// Load subdirectories recursively
	$subdirectories = glob( $directory . '/*', GLOB_ONLYDIR );

	if ( ! empty( $subdirectories ) ) {
		foreach ( $subdirectories as $subdir ) {
			autoload_theme_files( $subdir );
		}
	}
}

/**
 * Initialize the theme autoloader.
 *
 * @return void
 */
function init_autoloader() {
	$lib_dir = get_template_directory() . '/lib';
	autoload_theme_files( $lib_dir );
}

add_action( 'after_setup_theme', __NAMESPACE__ . '\init_autoloader', 1 );

