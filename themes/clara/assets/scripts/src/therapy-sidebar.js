/**
 * Therapy Meta Sidebar
 *
 * A plugin sidebar for managing therapy post meta (price and duration)
 * in the block editor for the 'therapies' post type.
 *
 * @see https://developer.wordpress.org/plugins/gutenberg/slotfills/plugin-sidebar/
 */

import { registerPlugin } from '@wordpress/plugins';
import { __ } from '@wordpress/i18n';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	TextControl,
	SelectControl,
	__experimentalVStack as VStack,
	__experimentalHeading as Heading,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

const DURATION_OPTIONS = [
	{ label: __( 'Select duration', 'clara' ), value: '' },
	{ label: __( '30 minutes', 'clara' ), value: '30' },
	{ label: __( '60 minutes', 'clara' ), value: '60' },
	{ label: __( '90 minutes', 'clara' ), value: '90' },
	{ label: __( '30 or 60 min', 'clara' ), value: '30 or 60' },
];

const TherapyMetaSidebar = () => {
	// Get current post type
	const postType = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);

	// Get meta object from the post
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	const {
		_clara_price,
		_clara_duration
	} = meta;


	// Only show this panel on the 'therapies' post type
	if ( postType !== 'therapies' ) {
		return null;
	}


	return (
		<PluginDocumentSettingPanel
			name="therapy-meta-panel"
			title={ __( 'Therapy Details', 'clara' ) }
			icon={ 'heart' }
		>
			<VStack spacing={ 4 }>
				<div>
					<Heading level={ 3 }>
						{ __( 'Pricing & Duration', 'clara' ) }
					</Heading>
				</div>

				<TextControl
					label={ __( 'Price (RON)', 'clara' ) }
					value={ _clara_price }
					onChange={ ( value ) =>
						setMeta( { ...meta, _clara_price: value } )
					}
					placeholder={ __( 'e.g., 150', 'clara' ) }
					help={ __(
						'Enter the price in Romanian Leu (RON)',
						'clara'
					) }
				/>

			<SelectControl
				label={ __( 'Duration', 'clara' ) }
				value={ _clara_duration || '' }
				onChange={ ( value ) =>
					setMeta( { ...meta, _clara_duration: value } )
				}
				options={ DURATION_OPTIONS }
				help={ __( 'Select session duration', 'clara' ) }
			/>
			</VStack>
		</PluginDocumentSettingPanel>
	);
};

registerPlugin( 'clara-therapy-meta-sidebar', {
	render: TherapyMetaSidebar,
} );
