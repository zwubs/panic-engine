/**
 *	@author zwubs
 *	@todo Cleanup this file
 */

import { Scene } from '../../core/rendering/scene.js'
import { Camera } from '../../core/rendering/camera.js'

import { Cube } from '../../core/cube.js';

import { Box3, Box3Helper, Mesh, Object3D, Vector3, LineSegments, LineBasicMaterial, BufferGeometry, BufferAttribute, CircleGeometry EdgesGeometry } from 'three';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

export class DebugEntityCollision {

	constructor( entity ) {

		this.status = false;

		this.object = new Object3D();
		this.entity = entity;
		this.collider = entity.collider;

		this.meshes = {
			sphere: null,
			box: null,
			collision: null
		}

		Scene.add( this.object );

		// Mesh
		// BoundingBox
		this.boundingBox = new Box3();
		this.boundingBox.name = "BoundingBox";

		this.collisionBoxList = []

		for( let i = 0; i < this.collider.boxes.length; i++) {

			let box = this.collider.boxes[ i ];

			this.boundingBox.union( box );

			this.collisionBoxList.push( this.generateBoxGeometry( box ) );

		}

		// Collision boxes
		this.meshes.collision = new LineSegments( BufferGeometryUtils.mergeBufferGeometries( this.collisionBoxList ), new LineBasicMaterial( { color: 0x00FF00, toneMapped: false } ) )
		this.object.add( this.meshes.collision )

		//	Bounding box
		this.meshes.box = new Box3Helper( this.boundingBox, 0x0FFFF00 );

		this.object.add( this.meshes.box );

		//	Bounding Sphere - still not sold on this implmentation yet
		if( this.collider.boundingSphere ) {

			const geometry = new CircleGeometry( this.collider.boundingSphere.radius, 64 );
			const edges = new EdgesGeometry( geometry );
			this.meshes.sphere = new LineSegments( edges, new LineBasicMaterial( { color: 0xffffff } ) );
			this.object.add( this.meshes.sphere );

		}

	}

	enable() {}
	disable() {}
	toggle() {}

	update() {

		this.meshes.sphere.position.copy( this.collider.boundingSphere.center );
		this.meshes.sphere.quaternion.copy( Camera.quaternion );

	}

	generateBoxGeometry( box ) {

		const indices = new Uint16Array( [ 0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7 ] );
		const positions = new Float32Array( 8 * 3 );

		const geometry = new BufferGeometry();
		geometry.setIndex( new BufferAttribute( indices, 1 ) );
		geometry.setAttribute( 'position', new BufferAttribute( positions, 3 ) );

		const position = geometry.attributes.position;
		const array = position.array;

		array[ 0 ] = box.max.x; array[ 1 ] = box.max.y; array[ 2 ] = box.max.z;
		array[ 3 ] = box.min.x; array[ 4 ] = box.max.y; array[ 5 ] = box.max.z;
		array[ 6 ] = box.min.x; array[ 7 ] = box.min.y; array[ 8 ] = box.max.z;
		array[ 9 ] = box.max.x; array[ 10 ] = box.min.y; array[ 11 ] = box.max.z;
		array[ 12 ] = box.max.x; array[ 13 ] = box.max.y; array[ 14 ] = box.min.z;
		array[ 15 ] = box.min.x; array[ 16 ] = box.max.y; array[ 17 ] = box.min.z;
		array[ 18 ] = box.min.x; array[ 19 ] = box.min.y; array[ 20 ] = box.min.z;
		array[ 21 ] = box.max.x; array[ 22 ] = box.min.y; array[ 23 ] = box.min.z;

		position.needsUpdate = true;

		geometry.computeBoundingSphere();

		return geometry;

	}

}
