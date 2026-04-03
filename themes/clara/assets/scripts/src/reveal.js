const reveals = document.querySelectorAll( '.reveal' );
if ( reveals.length ) {
	const observer = new IntersectionObserver( ( entries ) => {
		entries.forEach( ( entry, i ) => {
			if ( entry.isIntersecting ) {
				setTimeout( () => {
					entry.target.classList.add( 'visible' );
				}, 80 * ( i % 4 ) );
				observer.unobserve( entry.target );
			}
		} );
	}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' } );

	reveals.forEach( ( el ) => observer.observe( el ) );
}

