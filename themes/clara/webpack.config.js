const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,

	entry: {
		// SCSS → CSS (from assets/styles/screen/)
		'css/theme': path.resolve( __dirname, 'assets/styles/screen/main.scss' ),

		// JS bundles (from assets/scripts/src/)
		'js/nav-scroll':  path.resolve( __dirname, 'assets/scripts/src/nav-scroll.js' ),
		'js/nav-height':  path.resolve( __dirname, 'assets/scripts/src/nav-height.js' ),
		'js/back-to-top': path.resolve( __dirname, 'assets/scripts/src/back-to-top.js' ),
		'js/reveal':      path.resolve( __dirname, 'assets/scripts/src/reveal.js' ),
		'js/blog':        path.resolve( __dirname, 'assets/scripts/src/blog.js' ),
		'js/therapy-sidebar': path.resolve( __dirname, 'assets/scripts/src/therapy-sidebar.js' ),
	},

	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'assets/build' ),
		filename: '[name].js',
	},

	plugins: [
		...defaultConfig.plugins,
		// Remove empty JS stubs generated for CSS-only entries
		new RemoveEmptyScriptsPlugin(),
	],
};


