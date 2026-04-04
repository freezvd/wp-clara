import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { duration, title, description, colorVariant } = attributes;

	const blockProps = useBlockProps.save( {
		className: `service-card${ colorVariant !== 'default' ? ` ${ colorVariant }` : '' }`,
	} );

	return (
		<article { ...blockProps }>
			<RichText.Content tagName="h4" value={ title } />
			{ duration && (
				<RichText.Content tagName="span" className="duration" value={ duration } />
			) }
			{ description && (
				<RichText.Content tagName="p" value={ description } />
			) }
		</article>
	);
}
