/**
 *	@author zwubs
 */

PANIC.Debug.Grid = new function() {

	this.id = "PANIC-Debug-Grid";

	this.active = false;

	this.geometry = new THREE.PlaneBufferGeometry( 2, 2, 1, 1 );

	this.uniforms = {

		uColor: { value: new THREE.Color( 0x888888 ) },

		uScale: { value: 16.0 },
		uSubdivisions: { value: 16.0 },

		uDistance: { value: 100.0 },

	}

	this.material = new THREE.ShaderMaterial({

		side: THREE.DoubleSide,

		uniforms: this.uniforms,

		vertexShader: PANIC.Shaders.DebugGrid.vertex,
		fragmentShader: PANIC.Shaders.DebugGrid.fragment,

		transparent: true,
		depthWrite: false,

		extensions: {
        	derivatives: true
        }

	});

	this.mesh = new THREE.Mesh( this.geometry, this.material );
	this.mesh.frustumCulled = false;

	this.mesh.name = this.id;

}

/**
 *	@param override {Boolean} - Optional Toggle Override
 */
PANIC.Debug.Grid.toggle = function( override=null ) {

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

	this.active = !this.active

}

/**
 *	Getters & Setters
 */

// Grid Scale
Object.defineProperty( PANIC.Debug.Grid, "scale", {

  get: function() { return this.uniforms.uScale.value; },

  set: function( value ) { this.uniforms.uScale.value = value; }

});

// Grid Subdivisions
Object.defineProperty( PANIC.Debug.Grid, "subdivisions", {

  get: function() { return this.uniforms.uSubdivisions.value; },

  set: function( value ) { this.uniforms.uSubdivisions.value = value; }

});

// Grid Color
Object.defineProperty( PANIC.Debug.Grid, "color", {

  get: function() { return this.uniforms.uColor.value; },

  set: function( value ) { this.uniforms.uColor.value = new THREE.Color( value ); }

});

// View Distance
Object.defineProperty( PANIC.Debug.Grid, "distance", {

  get: function() { return this.uniforms.uDistance.value; },

  set: function( value ) { this.uniforms.uDistance.value = value; }

});
