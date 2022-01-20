/**
 *	@author zwubs
 */

import { Vector3, Matrix4 } from 'three'

export class BoundingSphere {

	/**
	 *	@param {Vector3} center
	 *	@param {Number} radius
	 */
	constructor( collider, center = new Vector3( 0, 0, 0 ), radius = 0) {

		this.collider = collider;

		this.position = center;
		this.center = center;
		this.radius = radius;

		this.matrix = new Matrix4(); // local position
		this.matrixWorld = new Matrix4(); // world position

	}

	/**
	 *	@param {BoundingSphere} sphere
	 */
	intersectsSphere( sphere ) {

		let radiusSum = this.radius + sphere.radius;

		return sphere.position.distanceToSquared( this.position ) <= ( radiusSum * radiusSum );

	}

	update() {

		this.matrix.setPosition( this.center );

	}

	updateWorldMatrix() {

		if( this.collider ) {
			this.matrixWorld.multiplyMatrices( this.collider.entity.matrix, this.matrix );
			this.position = this.center.clone().applyMatrix4( this.collider.entity.matrix );
		}
		else this.matrixWorld.copy( this.matrix );

	}

}
