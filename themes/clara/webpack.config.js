const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,

	entry: {
		// SCSS → CSS
		'css/theme': path.resolve( __dirname, 'src/scss/main.scss' ),
		// JS bundles
		'js/nav-scroll':  path.resolve( __dirname, 'src/js/nav-scroll.js' ),
		'js/nav-height':  path.resolve( __dirname, 'src/js/nav-height.js' ),
		'js/back-to-top': path.resolve( __dirname, 'src/js/back-to-top.js' ),
		'js/reveal':      path.resolve( __dirname, 'src/js/reveal.js' ),
		'js/blog':        path.resolve( __dirname, 'src/js/blog.js' ),
	},

	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'assets' ),
		filename: '[name].js',
	},

	plugins: [
		...defaultConfig.plugins,
		// Remove empty JS stubs generated for CSS-only entries
		new RemoveEmptyScriptsPlugin(),
	],
};
