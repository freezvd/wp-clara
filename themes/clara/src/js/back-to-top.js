const btt = document.getElementById( 'back-to-top' );
if ( btt ) {
	window.addEventListener( 'scroll', () => {
		btt.classList.toggle( 'visible', window.scrollY > 500 );
	}, { passive: true } );

	btt.addEventListener( 'click', () => {
		window.scrollTo( { top: 0, behavior: 'smooth' } );
	} );
}
