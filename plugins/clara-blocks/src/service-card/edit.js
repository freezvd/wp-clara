import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { duration, title, description, colorVariant } = attributes;

	const blockProps = useBlockProps( {
		className: `service-card${ colorVariant !== 'default' ? ` ${ colorVariant }` : '' }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Card style">
					<SelectControl
						label="Color variant"
						value={ colorVariant }
						options={ [
							{ label: 'Default (burgundy)', value: 'default' },
							{ label: 'Emerald',            value: 'emerald' },
							{ label: 'Gold',               value: 'gold' },
						] }
						onChange={ ( v ) => setAttributes( { colorVariant: v } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<article { ...blockProps }>
				<RichText
					tagName="span"
					className="duration"
					placeholder="Duration…"
					value={ duration }
					onChange={ ( v ) => setAttributes( { duration: v } ) }
					allowedFormats={ [] }
				/>
				<RichText
					tagName="h4"
					placeholder="Service name…"
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
					allowedFormats={ [ 'core/italic' ] }
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
