<?php
/**
 * Therapy Meta Sidebar for Clara Theme.
 *
 * Registers a PluginSidebar in the block editor for managing
 * therapy post meta (price and duration) on the 'therapies' post type.
 *
 * @package Clara
 */

namespace CLARA\Sidebars;

/**
 * Enqueue the plugin sidebar script.
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

	wp_enqueue_script(
		'clara-therapy-sidebar',
		get_template_directory_uri() . '/assets/js/therapy-sidebar.js',
		array( 'wp-plugins', 'wp-edit-post', 'wp-data', 'wp-core-data', 'wp-components', 'wp-i18n' ),
		wp_hash( filemtime( get_template_directory() . '/assets/js/therapy-sidebar.js' ) ),
		true
	);

	wp_set_script_translations( 'clara-therapy-sidebar', 'clara' );
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_therapy_sidebar_script' );

