/**
 *	@author zwubs
 */

import { EntityCollider } from './collider.js';

import { BoundingSphere } from '../bounding-sphere.js'
import { OBB } from '../obb.js'

import { Vector3, BufferGeometry, BufferAttribute } from 'three'

export class EntityColliderTemplate {

	constructor() {

		this.boundingSphere = new BoundingSphere();
		this.boundingBox = new OBB();
		this.collision = [];

	}

	addBox( box ) {

		this.collision.push( box );

	}

	generate() {

		// Bounding Box
		let min = new Vector3( +Infinity, +Infinity, +Infinity );
		let max = new Vector3( -Infinity, -Infinity, -Infinity );

		let vec = new Vector3();

		for( let box of this.collision ) {

			let positions = new Float32Array( [ 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5 ] );
			let verticies = new BufferAttribute( positions, 3 )
			verticies.applyMatrix4( box.matrix );

			for( let i = 0; i < 8; i++ ) {

				vec.fromBufferAttribute( verticies, i );

				min.min( vec );
				max.max( vec );

			}

		}

		this.boundingBox.position.addVectors( min, max ).multiplyScalar( 0.5 );
		this.boundingBox.scale.subVectors( max, min );
		this.boundingBox.update();

		// Bounding Sphere
		this.boundingSphere.center.copy( this.boundingBox.position );
		this.boundingSphere.radius = this.boundingSphere.center.distanceTo( min ) > this.boundingSphere.center.distanceTo( max ) ? this.boundingSphere.center.distanceTo( min ) : this.boundingSphere.center.distanceTo( max )
		this.boundingSphere.update();
	}

	generateCollider( entity ) {

		return new EntityCollider.fromTemplate( this, entity );

	}

}
