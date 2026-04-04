import { useBlockProps, RichText, BlockControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';
import { brush } from '@wordpress/icons';

const COLOR_CONTROLS = [
	{ title: 'Default (burgundy)', value: 'default' },
	{ title: 'Emerald',            value: 'emerald' },
	{ title: 'Gold',               value: 'gold' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { duration, title, description, colorVariant } = attributes;

	const blockProps = useBlockProps( {
		className: `service-card${ colorVariant !== 'default' ? ` ${ colorVariant }` : '' }`,
	} );

	return (
		<>
			<BlockControls>
				<ToolbarDropdownMenu
					icon={ brush }
					label="Color variant"
					controls={ COLOR_CONTROLS.map( ( { title: label, value } ) => ( {
						title: label,
						isActive: colorVariant === value,
						onClick: () => setAttributes( { colorVariant: value } ),
					} ) ) }
				/>
			</BlockControls>

			<article { ...blockProps }>
				<RichText
					tagName="h4"
					placeholder="Service name…"
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
					allowedFormats={ [ 'core/italic' ] }
				/>
				<RichText
					tagName="span"
					className="duration"
					placeholder="Duration…"
					value={ duration }
					onChange={ ( v ) => setAttributes( { duration: v } ) }
					allowedFormats={ [] }
				/>
				<RichText
					tagName="p"
					placeholder="Description…"
					value={ description }
					onChange={ ( v ) => setAttributes( { description: v } ) }
					allowedFormats={ [ 'core/italic', 'core/bold' ] }
				/>
			</article>
		</>
	);
}
