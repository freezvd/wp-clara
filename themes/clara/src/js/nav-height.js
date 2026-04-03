const nav = document.getElementById( 'main-nav' );
if ( nav ) {
	function setNavHeight() {
		document.documentElement.style.setProperty( '--nav-height', nav.offsetHeight + 'px' );
	}
	setNavHeight();
	window.addEventListener( 'resize', setNavHeight, { passive: true } );
	if ( window.ResizeObserver ) {
		new ResizeObserver( setNavHeight ).observe( nav );
	}
}
