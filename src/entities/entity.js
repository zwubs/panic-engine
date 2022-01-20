/**
 *	@typedef {Object} PANIC.Entity
 *	@param {PANIC.EntityTemplate} template
 */

import { Scene } from '../core/rendering/scene.js';
import { Updater } from '../core/updater.js';
import { Tools } from '../tools/tools.js';

import { EntityCollider } from '../collision/entity/collider.js';

import { Vector3, Euler, Quaternion, Matrix4, Skeleton, Mesh, MeshDepthMaterial, RGBADepthPacking } from 'three';

import { Text } from '../debug/debug-text.js'

class Entity {

	constructor( template ) {

		// Unique Entity Identifier
		this.uuid = Tools.generateUUID();

		// Assign template for future access
		this.template = template;

		// Transformation Variables
		this.position = new Vector3( 0, 0, 0 );
		this.rotation = new Euler( 0, 0, 0 );
		this.scale = new Vector3( 1, 1, 1 );

		this.quaternion = new Quaternion();
		this.matrix = new Matrix4();

		// Skeleton
		this.skeleton = new Skeleton();

		// Mesh definition
		this.mesh = new Mesh( this.template.geometry, this.template.material );
		this.mesh.matrixAutoUpdate = false;

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

		// Entity collision
		this.collider = new EntityCollider( this );
		this.collider.fromTemplate( this.template.collider );

		// Entity event actions
		this.actions = this.template.actions;
		this.actions.eventManager.binding = this;
		if( this.actions.eventManager.hasEvent("INIT") ) this.actions.eventManager.emit( "INIT" );

		// Storage for entity actions
		this.store = {};

		// Debug variables
		this.debug = null;

		Updater.add( this );

	}

	update() {

		if( this.actions.eventManager.hasEvent("UPDATE") ) this.actions.eventManager.emit( "UPDATE" );

		if( this.debug ) this.debug.update();

		this.quaternion.setFromEuler( this.rotation, false );
		this.matrix.compose( this.position, this.quaternion, this.scale );

		this.collider.update();
		this.checkCollision();

		this.mesh.matrix.copy( this.matrix );

	}

	checkCollision() {

		let distance = 0;
		let direction = new Vector3()
		let zero = new Vector3();

		for( const [id,entity] of Object.entries( PANIC.EntityRegistry.entities ) ) {

			if( this.uuid != id && this.actions.eventManager.hasEvent("COLLIDE") ) {

				let collision = this.collider.isColliding( entity.collider )

				if( collision ) {

					// distance = ( this.collider.boundingSphere.radius + entity.collider.boundingSphere.radius ) - this.collider.boundingSphere.position.distanceTo( entity.collider.boundingSphere.position ) + 0.001
					// direction.subVectors( this.collider.boundingSphere.position, entity.collider.boundingSphere.position ).normalize();
					// if( direction.equals ( zero ) ) direction = new Vector3( 1, 0, 0 );

					this.position.add( collision.multiplyScalar( 0.5 ) );
					entity.position.add( collision.multiplyScalar( -0.5 ) );

					this.actions.eventManager.emit("COLLIDE");
					entity.actions.eventManager.emit("COLLIDE");

				}

			}

		}

	}

}

export { Entity };
