const getPostTitle = ( id, data ) => {
	return data?.filter( ( { id: postID } ) => {
		return id === postID;
	} )[ 0 ]?.title?.rendered;
};

export default getPostTitle;
