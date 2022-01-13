/**
 *	@author zwubs
 */

import { Vector3 } from 'three'

export class BoundingSphere {

	/**
	 *	@param {Vector3} center
	 *	@param {Number} radius
	 */
	constructor( center = new Vector3( 0, 0, 0 ), radius = 0) {

		this.center = center;
		this.radius = radius;

	}

	/**
	 *	@param {BoundingSphere} sphere
	 */
	intersectsSphere( sphere ) {

		let radiusSum = this.radius + sphere.radius;

		return sphere.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );

	}

	/**
	 *	@param {Vector3} center
	 */
	setCenter( center ) {

		this.center.copy( center );

	}

}
