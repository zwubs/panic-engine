/**
 *	@author zwubs
 *	@todo Cleanup this file
 */

import { Scene } from '../../core/rendering/scene.js'
import { Camera } from '../../core/rendering/camera.js'

import { Cube } from '../../core/cube.js';

import { OBB } from '../../collision/obb.js';

import { Box3, Mesh, Object3D, Vector3, Quaternion, LineSegments, LineBasicMaterial, BufferGeometry, BufferAttribute, CircleGeometry, EdgesGeometry } from 'three';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

export class DebugEntityCollision {

	constructor( entity ) {

		this.entity = entity;
		this.collider = entity.collider;

		// TODO: Implement Functionality
		this.status = false;

		this.object = new Object3D();
		Scene.add( this.object );

		this.meshes = {
			collision: new Object3D(), // Collection of OBBs
			box: null, // OBB that encapsulates ^
			sphere: null // Bounding Sphere that encapsulates ^
		}

		let collisionGeometry = [];

		for( let i = 0; i < this.collider.collision.length; i++ ) {

			let box = this.collider.collision[ i ];

			collisionGeometry.push( Cube.identity() );

			let mesh = new LineSegments( collisionGeometry[i], new LineBasicMaterial( { color: 0x00FF00 } ) );
			mesh.matrixAutoUpdate = false;
			this.meshes.collision.add( mesh );

		}

		// Collision boxes
		this.object.add( this.meshes.collision );

		// OBB
		this.meshes.box = new LineSegments( Cube.identity(), new LineBasicMaterial( { color: 0xFFFF00 } ) );
		this.meshes.box.matrixAutoUpdate = false;
		this.object.add( this.meshes.box );

		//	Bounding Sphere - still not sold on this implmentation yet
		const geometry = new CircleGeometry( this.collider.boundingSphere.radius, 64 );
		const edges = new EdgesGeometry( geometry );
		this.meshes.sphere = new LineSegments( edges, new LineBasicMaterial( { color: 0xffffff } ) );
		this.meshes.sphere.matrixAutoUpdate = false;
		this.object.add( this.meshes.sphere );

	}

	enable() {}
	disable() {}
	toggle() {}

	update() {

		// Collision Boxes
		for( let i = 0; i < this.collider.collision.length; i++ ) {

			this.meshes.collision.children[i].matrix.copy( this.collider.collision[i].matrixWorld )

		}

		// Bounding Box
		this.meshes.box.matrix.copy( this.collider.boundingBox.matrixWorld )

		// Bounding Sphere
		let position = new Vector3();
		let scale = new Vector3();
		this.collider.boundingSphere.matrixWorld.decompose( position, new Quaternion(), scale )
		this.meshes.sphere.lookAt( Camera.getWorldPosition( new Vector3 ) );
		this.meshes.sphere.matrix.compose( position, this.meshes.sphere.quaternion, scale );

	}

}
