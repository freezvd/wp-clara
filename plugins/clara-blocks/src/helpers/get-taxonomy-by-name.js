const getTaxonomyByName = ( data, catName ) => {
	const category = data?.filter( ( item ) => {
		// console.log( { catName, item } );
		// debugger;
		if ( catName === item.name ) {
			return item.id;
		}
	} );
	// console.log( { category } );
	if ( category ) {
		// debugger;
		return category[ 0 ].id;
	}
};

export default getTaxonomyByName;
