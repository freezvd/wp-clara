import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		eyebrow, heading, subtitle, deck,
		badgePill, badgeLabel, isSmall, showBadge,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `page-hero${ isSmall ? ' page-hero-small' : '' }`,
	} );

	return (
		<section { ...blockProps }>
			<div className="page-hero-inner">
				{ eyebrow && (
					<RichText.Content tagName="span" className="eyebrow" value={ eyebrow } />
				) }
				<RichText.Content tagName="h1" value={ heading } />
				{ subtitle && (
					<RichText.Content tagName="p" value={ subtitle } />
				) }
				{ deck && (
					<RichText.Content tagName="p" className="post-deck" value={ deck } />
				) }
				{ showBadge && (
					<div className="hero-badge">
						<RichText.Content tagName="span" className="hero-badge-pill" value={ badgePill } />
						<span className="hero-badge-sep" aria-hidden="true" />
						{ badgeLabel && (
							<RichText.Content tagName="span" className="hero-badge-label" value={ badgeLabel } />
						) }
					</div>
				) }
			</div>
		</section>
	);
}
