const getTaxonomyTitle = ( id, data ) => {
	return data?.filter( ( { id: taxID } ) => {
		return id === taxID;
	} )[ 0 ]?.name;
};

export default getTaxonomyTitle;
