/**
 *	@typedef {Object} PANIC.Entity
 *	@param {PANIC.EntityTemplate} template
 */

import { Scene } from '../core/rendering/scene.js';
import { Tools } from '../tools/tools.js'

import { Vector3, Skeleton, Mesh, MeshDepthMaterial, RGBADepthPacking } from '../lib/three132.js';

class Entity {

	constructor( template ) {

		// Unique Entity Identifier
		this.uuid = Tools.generateUUID();

		// Assign template for future access
		this.template = template;

		// Transformation Variables
		this.position = new Vector3( 0, 0, 0 );
		this.rotation = new Vector3( 0, 0, 0 );
		this.scale = new Vector3( 0, 0, 0 );

		// Skeleton
		this.skeleton = new Skeleton();

		// Mesh definition
		this.mesh = new Mesh( this.template.geometry, this.template.material );

		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;

		this.mesh.frustumCulled = false;

		this.mesh.customDepthMaterial = new MeshDepthMaterial( {
			depthPacking: RGBADepthPacking,
			map: this.template.texture,
			alphaTest: 0.5
		} );

		// Bind skeleton to mesh
		// this.mesh.bind( this.skeleton );

		Scene.add( this.mesh );

	}

}

export { Entity };
