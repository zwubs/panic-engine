/**
 * 	@author zwubs
 * 	@typedef {Object} EntityTemplate
 */

import { Entity } from './entity.js';

import { Entity as EntityShader } from '../shaders/shader-entity.js';

import { UniformsUtils, ShaderMaterial, Uniform, DoubleSide } from 'three';

class EntityTemplate {

	constructor() {

		this.id = "unknown";
		this.name = "Unknown";

		this.texture = null;

		this.tileset = null;

		this.bones = [];
		this.geometry = null;

		this.collider = null;

		this.actions = null;

		this.shader = EntityShader;

		this.uniforms = null;
		this.material = null;

	}

	/**
	 *	@description Once having a texture, tileset, & geometry
	 *	this'll do all the other fancy work needed to finish
	 */
	setup() {

		// Create Uniforms
		this.uniforms = UniformsUtils.clone( this.shader.uniforms );

		// Create Material
		this.material = new ShaderMaterial({

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

		});

		//
		this.uniforms[ "alphaTest" ] = new Uniform( 0.5 );
		this.material.alphaTest = true;

		// Assign Texture
		this.uniforms[ "map" ] = new Uniform( this.texture );
		this.material.map = this.texture;

		// Shading
		this.material.side = DoubleSide;
		this.material.shadowSide = DoubleSide;

	}

	spawnEntity() {

		if( !this.actions.eventManager.active ) this.actions.eventManager.active = true;

		return new Entity( this );

	}

}

export { EntityTemplate };
