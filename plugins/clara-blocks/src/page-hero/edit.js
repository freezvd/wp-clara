import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		eyebrow, heading, subtitle, deck,
		badgePill, badgeLabel, isSmall, showBadge,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `page-hero${ isSmall ? ' page-hero-small' : '' }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Layout">
					<ToggleControl
						label="Compact (small) variant"
						checked={ isSmall }
						onChange={ ( v ) => setAttributes( { isSmall: v } ) }
					/>
					<ToggleControl
						label="Show badge"
						checked={ showBadge }
						onChange={ ( v ) => setAttributes( { showBadge: v } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>
				<div className="page-hero-inner">
					<RichText
						tagName="span"
						className="eyebrow"
						placeholder="Eyebrow label…"
						value={ eyebrow }
						onChange={ ( v ) => setAttributes( { eyebrow: v } ) }
						allowedFormats={ [] }
					/>
					<RichText
						tagName="h1"
						placeholder="Heading…"
						value={ heading }
						onChange={ ( v ) => setAttributes( { heading: v } ) }
						allowedFormats={ [ 'core/italic' ] }
					/>
					<RichText
						tagName="p"
						placeholder="Subtitle…"
						value={ subtitle }
						onChange={ ( v ) => setAttributes( { subtitle: v } ) }
						allowedFormats={ [ 'core/italic', 'core/bold' ] }
					/>
					<RichText
						tagName="p"
						className="post-deck"
						placeholder="Deck text…"
						value={ deck }
						onChange={ ( v ) => setAttributes( { deck: v } ) }
						allowedFormats={ [ 'core/italic' ] }
					/>
					{ showBadge && (
						<div className="hero-badge">
							<RichText
								tagName="span"
								className="hero-badge-pill"
								placeholder="Badge pill…"
								value={ badgePill }
								onChange={ ( v ) => setAttributes( { badgePill: v } ) }
								allowedFormats={ [] }
							/>
							<span className="hero-badge-sep" aria-hidden="true" />
							<RichText
								tagName="span"
								className="hero-badge-label"
								placeholder="Badge label…"
								value={ badgeLabel }
								onChange={ ( v ) => setAttributes( { badgeLabel: v } ) }
								allowedFormats={ [] }
							/>
						</div>
					) }
				</div>
			</section>
		</>
	);
}
