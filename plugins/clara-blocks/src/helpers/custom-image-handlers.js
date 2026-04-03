export const removeImage = ( setAttributes ) => {
	setAttributes( {
		mediaUrl: undefined,
		mediaId: undefined,
		mediaWidth: undefined,
		mediaHeight: undefined,
	} );
};

export const handleSelectImage = ( media, fnc, size ) => {
	fnc( {
		mediaId: media.id,
		mediaUrl:
			size && media.sizes[ size ] ? media.sizes[ size ].url : media.url,
		mediaAlt: media.alt,
		mediaWidth:
			size && media.sizes[ size ]
				? media.sizes[ size ].width
				: media.width,
		mediaHeight:
			size && media.sizes[ size ]
				? media.sizes[ size ].height
				: media.height,
	} );
};

export const onChangeAlt = ( fnc, newAlt ) => {
	fnc( { mediaAlt: newAlt } );
};

export const getImageSizeOptions = ( imageObject, imageSizes ) => {
	if ( ! imageObject ) {
		return [];
	}
	const options = [];
	const sizes = imageObject.media_details.sizes;
	for ( const key in sizes ) {
		const size = sizes[ key ];
		const imageSize = imageSizes.find( ( s ) => s.slug === key );
		if ( imageSize ) {
			options.push( {
				label: imageSize.name,
				value: size.source_url,
			} );
		}
	}
	return options;
};

export const onChangeImageSize = ( fnc, newURL ) => {
	fnc( { mediaUrl: newURL } );
};
