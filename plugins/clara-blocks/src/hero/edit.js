import { useBlockProps, RichText, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'core/buttons', 'core/button' ];

export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, heading, headingStrong, tagline, scrollLabel } = attributes;

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'hero-actions' },
		{ allowedBlocks: ALLOWED_BLOCKS }
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Scroll indicator">
					<TextControl
						label="Scroll label"
						value={ scrollLabel }
						onChange={ ( v ) => setAttributes( { scrollLabel: v } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>
				<div className="hero-inner">
					<RichText
						tagName="span"
						className="hero-eyebrow"
						placeholder="Eyebrow…"
						value={ eyebrow }
						onChange={ ( v ) => setAttributes( { eyebrow: v } ) }
						allowedFormats={ [] }
					/>
					<h1 className="hero-title">
						<RichText
							tagName="span"
							placeholder="Heading (italic)…"
							value={ heading }
							onChange={ ( v ) => setAttributes( { heading: v } ) }
							allowedFormats={ [] }
						/>
						<RichText
							tagName="strong"
							placeholder="Heading (bold line)…"
							value={ headingStrong }
							onChange={ ( v ) => setAttributes( { headingStrong: v } ) }
							allowedFormats={ [] }
						/>
					</h1>
					<RichText
						tagName="p"
						className="hero-tagline"
						placeholder="Tagline…"
						value={ tagline }
						onChange={ ( v ) => setAttributes( { tagline: v } ) }
						allowedFormats={ [ 'core/italic' ] }
					/>
					<div { ...innerBlocksProps } />
				</div>
				<div className="hero-scroll" aria-hidden="true">
					<span>{ scrollLabel }</span>
					<span className="scroll-line" />
				</div>
			</section>
		</>
	);
}
