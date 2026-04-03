/**
 * Therapy Meta Sidebar
 *
 * A plugin sidebar for managing therapy post meta (price and duration)
 * in the block editor for the 'therapies' post type.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/slotfills/plugin-sidebar.md
 */

import { __ } = wp.i18n;
import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/edit-post';
import { useEntityProp } = wp.coreData;
import { useSelect } = wp.data;
import {
	TextControl,
	SelectControl,
	PanelBody,
} from '@wordpress/components';

const TherapyMetaSidebar = () => {
	const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType() );

	// Only show this sidebar on the 'therapies' post type
	if ( postType !== 'therapies' ) {
		return null;
	}

	const [ price, setPrice ] = useEntityProp( 'postType', 'therapies', '_clara_price' );
	const [ duration, setDuration ] = useEntityProp( 'postType', 'therapies', '_clara_duration' );

	return (
		<PluginSidebar name="therapy-meta-sidebar" title={ __( 'Therapy Details', 'clara-blocks' ) }>
			<PanelBody title={ __( 'Pricing & Duration', 'clara-blocks' ) } initialOpen={ true }>
				<TextControl
					label={ __( 'Price (RON)', 'clara-blocks' ) }
					value={ price || '' }
					onChange={ ( value ) => setPrice( value ) }
					placeholder={ __( 'e.g., 150', 'clara-blocks' ) }
					help={ __( 'Enter the price in Romanian Leu (RON)', 'clara-blocks' ) }
				/>

				<SelectControl
					label={ __( 'Duration', 'clara-blocks' ) }
					value={ duration || '' }
					onChange={ ( value ) => setDuration( value ) }
					options={ [
						{ label: __( 'Select duration', 'clara-blocks' ), value: '' },
						{ label: __( '30 minutes', 'clara-blocks' ), value: '30' },
						{ label: __( '60 minutes', 'clara-blocks' ), value: '60' },
						{ label: __( '90 minutes', 'clara-blocks' ), value: '90' },
						{ label: __( '30 sau 60 min', 'clara-blocks' ), value: '30 sau 60' },
					] }
					help={ __( 'Select the session duration', 'clara-blocks' ) }
				/>
			</PanelBody>
		</PluginSidebar>
	);
};

registerPlugin( 'clara-therapy-meta-sidebar', {
	render: TherapyMetaSidebar,
	icon: 'heart',
} );


