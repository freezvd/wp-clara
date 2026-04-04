import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { duration, title, description, colorVariant } = attributes;

	const blockProps = useBlockProps.save( {
		className: `service-card${ colorVariant !== 'default' ? ` ${ colorVariant }` : '' }`,
	} );

	return (
		<article { ...blockProps }>
			{ duration && (
				<RichText.Content tagName="span" className="duration" value={ duration } />
			) }
			<RichText.Content tagName="h4" value={ title } />
			{ description && (
				<RichText.Content tagName="p" value={ description } />
			) }
		</article>
	);
}
