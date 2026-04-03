import SVGSpriter from 'svg-sprite';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { resolve, basename, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const ICONS_DIR  = resolve( __dirname, '../src/icons' );
const OUTPUT_DIR = resolve( __dirname, '../assets/icons' );
const OUTPUT_FILE = resolve( OUTPUT_DIR, 'sprite.svg' );

// Ensure output directory exists
mkdirSync( OUTPUT_DIR, { recursive: true } );

const spriter = new SVGSpriter( {
	dest: OUTPUT_DIR,
	mode: {
		symbol: {
			dest:   '.',
			sprite: 'sprite.svg',
			inline: true,
		},
	},
	shape: {
		id: {
			// e.g. chevron-up.svg → sprite-chevron-up
			generator: ( name ) => 'sprite-' + basename( name, '.svg' ),
		},
	},
	svg: {
		xmlDeclaration:    false,
		doctypeDeclaration: false,
	},
} );

// Add all SVG files from src/icons/
const files = readdirSync( ICONS_DIR ).filter( ( f ) => extname( f ) === '.svg' );

if ( files.length === 0 ) {
	console.error( '⚠  No SVG files found in src/icons/ — skipping sprite build.' );
	process.exit( 0 );
}

for ( const file of files ) {
	const filePath = resolve( ICONS_DIR, file );
	spriter.add( filePath, file, readFileSync( filePath, 'utf-8' ) );
}

// Compile and write
const { result } = await spriter.compileAsync();

const svgContent = result.symbol.sprite.contents.toString( 'utf-8' );
writeFileSync( OUTPUT_FILE, svgContent, 'utf-8' );

console.log( `✓ Sprite built: assets/icons/sprite.svg (${ files.length } symbols)` );
