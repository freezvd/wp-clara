const nav = document.getElementById( 'main-nav' );
if ( nav ) {
	window.addEventListener( 'scroll', () => {
		nav.classList.toggle( 'scrolled', window.scrollY > 60 );
	}, { passive: true } );
}

