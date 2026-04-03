// ─── WebGL film grain (grain-section block viewScript) ──────────────────────
( function initGrainCanvases() {
	var canvases = document.querySelectorAll( '.grain-canvas' );
	if ( ! canvases.length ) return;

	var vertexShaderSource = [
		'attribute vec2 position;',
		'void main() {',
		'    gl_Position = vec4(position, 0.0, 1.0);',
		'}',
	].join( '\n' );

	var fragmentShaderSource = [
		'precision highp float;',
		'uniform vec2 u_resolution;',
		'uniform float u_time;',
		'',
		'float random(vec2 st) {',
		'    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);',
		'}',
		'',
		'void main() {',
		'    vec2 uv = gl_FragCoord.xy / u_resolution.xy;',
		"    float noise = random(uv * 2.0 + fract(u_time * 0.0001));",
		'    vec3 color = vec3(noise);',
		'    gl_FragColor = vec4(color, 0.06);',
		'}',
	].join( '\n' );

	function createShader( gl, type, source ) {
		var shader = gl.createShader( type );
		gl.shaderSource( shader, source );
		gl.compileShader( shader );
		if ( ! gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {
			gl.deleteShader( shader );
			return null;
		}
		return shader;
	}

	function setupCanvas( canvas ) {
		var gl = canvas.getContext( 'webgl', {
			alpha: true,
			antialias: false,
			depth: false,
		} );
		if ( ! gl ) {
			canvas.style.display = 'none';
			return;
		}

		var vertexShader = createShader( gl, gl.VERTEX_SHADER, vertexShaderSource );
		var fragmentShader = createShader( gl, gl.FRAGMENT_SHADER, fragmentShaderSource );
		if ( ! vertexShader || ! fragmentShader ) {
			canvas.style.display = 'none';
			return;
		}

		var program = gl.createProgram();
		gl.attachShader( program, vertexShader );
		gl.attachShader( program, fragmentShader );
		gl.linkProgram( program );

		var positionBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array( [ -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1 ] ),
			gl.STATIC_DRAW
		);

		var positionLoc = gl.getAttribLocation( program, 'position' );
		gl.enableVertexAttribArray( positionLoc );
		gl.vertexAttribPointer( positionLoc, 2, gl.FLOAT, false, 0, 0 );

		var resolutionLoc = gl.getUniformLocation( program, 'u_resolution' );
		var timeLoc = gl.getUniformLocation( program, 'u_time' );

		function resize() {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			gl.viewport( 0, 0, canvas.width, canvas.height );
		}
		resize();

		if ( window.ResizeObserver ) {
			new ResizeObserver( resize ).observe( canvas.parentElement );
		} else {
			window.addEventListener( 'resize', resize, { passive: true } );
		}

		var prefersReduced = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
		if ( prefersReduced ) return;

		function render( time ) {
			gl.useProgram( program );
			gl.uniform2f( resolutionLoc, canvas.width, canvas.height );
			gl.uniform1f( timeLoc, time );
			gl.drawArrays( gl.TRIANGLES, 0, 6 );
			requestAnimationFrame( render );
		}
		requestAnimationFrame( render );
	}

	canvases.forEach( function ( canvas ) {
		setupCanvas( canvas );
	} );
} )();
