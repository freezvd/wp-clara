import './style.scss';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';
import save from './save';

// v1 — duration appeared before title
const deprecated = [
	{
		attributes: metadata.attributes,
		save( { attributes } ) {
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
		},
	},
];

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	deprecated,
} );
