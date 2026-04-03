const getIdByValue = ( data, postName ) => {
	const post = data?.filter( ( item ) => {
		// console.log( { item } );
		if ( postName === item.title.rendered ) {
			return item.id;
		}
	} );

	if ( post ) {
		// debugger;
		return post[ 0 ].id;
	}
};

export default getIdByValue;
