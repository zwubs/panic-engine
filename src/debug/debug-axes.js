/**
 *	@author zwubs
 */

PANIC.Debug.Axes = new function() {

	this.id = "PANIC-Debug-Axes";

	this.active = false;

	// Colors
	this.colors = {
		x: new THREE.Color( 0xFF3352 ),
		y: new THREE.Color( 0x8BDC00 ),
		z: new THREE.Color( 0x2890FF )
	}

	// Geometry
	this.geometry = new THREE.BufferGeometry();

	// Vertices
	this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [
		-1, 0, 0, 1, 0, 0,
		 0, 0,-1, 0, 0, 1,
		 0,-1, 0, 0, 1, 0,
	], 3 ) );

	// Colors
	this.geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( [].concat(
		this.colors.x.toArray(), this.colors.x.toArray(),
		this.colors.y.toArray(), this.colors.y.toArray(),
		this.colors.z.toArray(), this.colors.z.toArray(),
	), 3 ) );

	// Opacity
	this.geometry.setAttribute( 'opacity', new THREE.Float32BufferAttribute( [
		1.0, 1.0,
		1.0, 1.0,
		1.0, 1.0,
	], 1 ) );

	// Material
	this.material = new THREE.ShaderMaterial({

		uniforms: PANIC.Shaders.DebugAxes.uniforms,

		vertexShader: PANIC.Shaders.DebugAxes.vertex,
		fragmentShader: PANIC.Shaders.DebugAxes.fragment,

		vertexColors: true,
		transparent: true,
		depthWrite: false,

		extensions: {
        	derivatives: true
        }

	});

	// Mesh
	this.mesh = new THREE.LineSegments( this.geometry, this.material );
	this.mesh.frustumCulled = false;

	this.mesh.name = this.id;

}

/**
 *	@param override {Boolean} - Optional Toggle Override
 */
PANIC.Debug.Axes.toggle = function( override=null ) {

	if( typeof override == "boolean" ) { this.active = !override; }

	if( !this.active ) {

		if( PANIC.Scene.getObjectByName( this.id ) == null ) {

			PANIC.Scene.add( this.mesh );

		}

	}

	else {

		if( PANIC.Scene.getObjectByName( this.id ) ) {

			PANIC.Scene.remove( this.mesh );

		}

	}

	this.active = !this.active;

}

/**
 *	@param axis {String} - String containing axes to affect Ex. ("XyZ")
 *	@param override {Boolean} - Optional Toggle Override
 */
PANIC.Debug.Axes.toggleAxis = function( axes, override=null ) {

	var indices = [];

	if( axes.toLowerCase().includes("x") ) { indices.push( 0, 1 ); }
	if( axes.toLowerCase().includes("y") ) { indices.push( 2, 3 ); }
	if( axes.toLowerCase().includes("z") ) { indices.push( 4, 5 ); }

	if( !indices ) { PANIC.Debug.warn(`PANIC Debug: Invalid axes name "${axis}", use either 'x', 'y', or 'z'`); return; }

	this.geometry.attributes.opacity.array.forEach( ( element, index, array ) => {

		if( indices.includes( index ) ) {

			if( typeof override == "boolean" ) array[ index ] = override;

			else array[index] = 1 - element;

		}

	});

	this.geometry.attributes.opacity.needsUpdate = true;

}

/**
 *	@description Updates the 'color' attribute with new values
 */
PANIC.Debug.Axes.updateColors = function() {

	this.geometry.attributes.colors.set( [].concat(
		this.colors.x.toArray(), this.colors.x.toArray(),
		this.colors.y.toArray(), this.colors.y.toArray(),
		this.colors.z.toArray(), this.colors.z.toArray(),
	), 0 );

	this.geometry.attributes.colors.needsUpdate = true;

}

PANIC.Debug.Axes.setColors = function( axes, color ) {



}
