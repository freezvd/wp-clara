import { useBlockProps, RichText, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { eyebrow, heading, headingStrong, tagline, scrollLabel } = attributes;

	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( { className: 'hero-actions' } );

	return (
		<section { ...blockProps }>
			<div className="hero-inner">
				{ eyebrow && (
					<RichText.Content tagName="span" className="hero-eyebrow" value={ eyebrow } />
				) }
				<h1 className="hero-title">
					{ heading && (
						<RichText.Content tagName="span" value={ heading } />
					) }
					{ headingStrong && (
						<RichText.Content tagName="strong" value={ headingStrong } />
					) }
				</h1>
				{ tagline && (
					<RichText.Content tagName="p" className="hero-tagline" value={ tagline } />
				) }
				<div { ...innerBlocksProps } />
			</div>
			{ scrollLabel && (
				<div className="hero-scroll" aria-hidden="true">
					<span>{ scrollLabel }</span>
					<span className="scroll-line" />
				</div>
			) }
		</section>
	);
}
