/**
 * 	@author zwubs
 * 	@typedef {Object} EntityTemplate
 */

PANIC.EntityTemplate = function() {

	this.id = "unknown";
	this.name = "Unknown";

	this.texture = null;

	this.tileset = null;

	this.bones = [];
	this.geometry = null;

	this.shader = PANIC.Shaders.Entity;

	this.uniforms = null;
	this.material = null;

}

/**
 *	@description Once having a texture, tileset, & geometry
 *	this'll do all the other fancy work needed to finish
 */
PANIC.EntityTemplate.prototype.setup = function() {

	// Create Uniforms
	this.uniforms = THREE.UniformsUtils.clone( this.shader.uniforms );

	// Create Material
	this.material = new THREE.ShaderMaterial({

		defines: {
			"USE_MAP": "",
			"DOUBLE_SIDED": ""
		},

		uniforms: this.uniforms,

		vertexShader: this.shader.vertex,

		fragmentShader: this.shader.fragment,

		lights: true,
		fog: true,

		transparent: true,
		alphaTest: 0.5,

	});

	// Assign Texture
	this.uniforms[ "map" ] = new THREE.Uniform( this.texture );
	this.material.map = this.texture;

	// Shading
	this.material.side = THREE.DoubleSide;
	this.material.shadowSide = THREE.DoubleSide;

}

PANIC.EntityTemplate.prototype.spawnEntity = function () {

	return new PANIC.Entity( this );

};
