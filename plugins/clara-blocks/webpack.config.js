// Import the original config from the @wordpress/scripts package.
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

// Import the helper to find and generate the entry points in the src directory
// const { getWebpackEntryPoints } = require( '@wordpress/scripts/utils/config' );
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

// Add any a new entry point by extending the webpack config.
module.exports = {
    ...defaultConfig,
    plugins: [
        ...defaultConfig.plugins,
        new SVGSpritemapPlugin('assets/icons/**/*.svg', {
            output: {
                filename: '../assets/images/sprite.svg',
                // filename: '../../images/sprite.svg',
                svgo: true,
                svg: {
                    // Disable `width` and `height` attributes on the root SVG element
                    // as these will skew the sprites when using the <view> via fragment identifiers
                    sizes: false,
                },
            },
            styles: {
                filename: '~sprites.scss',
                // Specify that we want to use URLs with fragment identifiers in a styles file as well
                format: 'fragment',

                // Path to the styles file, note that this method uses the `output.publicPath` webpack option
                // to generate the path/URL to the spritemap itself so you might have to look into that
                // filename: 'assets/styles/src/common/_sprites.scss',
            },
            sprite: {
                generate: {
                    title: false,
                    // Generate <use> tags within the spritemap as the <view> tag will use this
                    use: true,

                    // Generate <view> tags within the svg to use in css via fragment identifier url
                    // and add -fragment suffix for the identifier to prevent naming collisions with the symbol identifier
                    view: '-fragment',

                    // Generate <symbol> tags within the SVG to use in HTML via <use> tag
                    symbol: true,
                },
            },
        }),
    ],
    externalsType: 'global',
    externals: {
        jquery: 'jQuery',
        slick: 'slick-carousel',
        react: 'React',
        'react-dom': 'ReactDOM',
    },
};
