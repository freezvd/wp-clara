import {
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	store as blockEditorStore,
	MediaUploadCheck,
	InspectorControls,
} from '@wordpress/block-editor';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
	ToolbarGroup,
	ToolbarButton,
	PanelBody,
	SelectControl,
	TextareaControl,
	Spinner,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useState, forwardRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	removeImage,
	handleSelectImage,
	onChangeAlt,
	getImageSizeOptions,
	onChangeImageSize,
} from '../helpers/custom-image-handlers.js';
import { usePrevious } from '@wordpress/compose';

const CustomImage = (
	{ attributes, setAttributes, noticeOperations, noticeUI, isSelected },
	imageRef
) => {
	const { mediaId, mediaUrl, mediaAlt, mediaWidth, mediaHeight } = attributes;

	const prevURL = usePrevious( mediaUrl );
	const [ blobURL, setBlobURL ] = useState();
	const [ imageSelected, setImageSelected ] = useState( false );

	useEffect( () => {
		if ( ! mediaId ) {
			setAttributes( { mediaUrl: undefined } );
		}
	}, [ mediaId ] );

	useEffect( () => {
		if ( prevURL && ! mediaUrl && isBlobURL( prevURL ) ) {
			revokeBlobURL( prevURL );
		}
	}, [ mediaUrl, prevURL ] );

	useEffect( () => {
		if ( ! mediaId ) {
			setBlobURL( undefined );
		}
	}, [ mediaId ] );

	useEffect( () => {
		if ( ! mediaId && mediaUrl ) {
			setAttributes( { mediaUrl: undefined } );
		}
	}, [ mediaId, mediaUrl ] );

	// const onSelectMedia = ( media ) => {
	// 	setAttributes( {
	// 		mediaId: media.id,
	// 		mediaUrl: media.url,
	// 	} );
	// };

	const onUploadError = ( message ) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	const imageObject = useSelect(
		( select ) => {
			const { getMedia } = select( 'core' );
			return mediaId ? getMedia( mediaId ) : null;
		},
		[ mediaId ]
	);

	const imageSizes = useSelect( ( select ) => {
		return select( blockEditorStore ).getSettings().imageSizes;
	}, [] );

	const getImageSizes = getImageSizeOptions( imageObject, imageSizes );

	const thumbnailUrl = useSelect(
		( select ) => {
			const image = mediaId && select( 'core' ).getMedia( mediaId );
			return (
				( image && image?.media_details?.sizes?.medium?.source_url ) ||
				mediaUrl
			);
		},
		[ mediaId ]
	);

	const mediaPreview = !! thumbnailUrl && (
		<>
			<img
				alt={ __( 'Edit image' ) }
				title={ __( 'Edit image' ) }
				className="edit-image-preview"
				src={ thumbnailUrl }
			/>
		</>
	);

	const [ temporaryURL, setTemporaryURL ] = useState( attributes.blob );

	return (
		<>
			{ mediaId && (
				<>
					<InspectorControls>
						<PanelBody
							title={ __( 'Image Settings', 'moser-blocks' ) }
						>
							{ imageObject && imageSizes && mediaId && (
								<SelectControl
									label={ __(
										'Select image size',
										'moser-blocks'
									) }
									options={ getImageSizes }
									value={ mediaUrl }
									onChange={ ( newUrl ) => {
										onChangeImageSize(
											setAttributes,
											newUrl
										);
									} }
								/>
							) }
							{ mediaUrl && ! isBlobURL( mediaUrl ) && (
								<TextareaControl
									label={ __( 'Alt Text', 'moser-blocks' ) }
									value={ mediaAlt }
									onChange={ ( mediaAlt ) => {
										onChangeAlt( setAttributes, mediaAlt );
									} }
									help={ __(
										"Alternative text describes your image to people can't see it. Add a short description with its key details.",
										'moser-blocks'
									) }
								/>
							) }
						</PanelBody>
					</InspectorControls>
					{ isSelected && mediaId && (
						<BlockControls group="inline">
							<MediaReplaceFlow
								name={ __( 'Replace Image', 'moser-blocks' ) }
								onSelect={ ( media ) => {
									handleSelectImage(
										media,
										setAttributes,
										null
									);
								} }
								onError={ ( message ) => {
									onUploadError( message, noticeOperations );
								} }
								accept="image/*"
								allowedTypes={ [ 'image' ] }
								mediaId={ mediaId }
								mediaURL={ mediaUrl }
							/>
							<ToolbarGroup>
								<ToolbarButton
									onClick={ () => {
										removeImage( setAttributes );
									} }
								>
									{ __( 'Remove Image', 'moser-blocks' ) }
								</ToolbarButton>
							</ToolbarGroup>
						</BlockControls>
					) }
				</>
			) }
			<div className={ 'wp-block-image-component' } ref={ imageRef }>
				<MediaUploadCheck>
					<MediaPlaceholder
						icon="format-image"
						value={ {
							id: mediaId,
						} }
						onSelect={ ( media ) => {
							if ( ! media || ! media.url ) {
								setAttributes( {
									mediaUrl: undefined,
									mediaAlt: undefined,
									mediaId: undefined,
									mediaWidth: undefined,
									mediaHeight: undefined,
									blob: undefined,
								} );
								setTemporaryURL( '' );

								return;
							}
							if ( media.url && isBlobURL( media.url ) ) {
								setTemporaryURL( media.url );
								return;
							}

							handleSelectImage( media, setAttributes, null );
						} }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						disableMediaButtons={ mediaId }
						notices={ noticeUI }
						mediaPreview={ mediaPreview }
					/>
				</MediaUploadCheck>
				{ mediaId && ! isBlobURL( mediaUrl ) && (
					<img
						className={ `wp-image-${ mediaId }` }
						src={ mediaUrl }
						alt={ mediaAlt }
						width={ mediaWidth }
						height={ mediaHeight }
						onClick={ ( state ) => {
							setImageSelected( ! state );
						} }
					/>
				) }
				{ isBlobURL( mediaUrl ) && <Spinner /> }
			</div>
		</>
	);
};

export default forwardRef( CustomImage );
