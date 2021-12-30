/**
 *	@author zwubs
 *	@extends {THREE.BoxBufferGeometry}
 */

import { BoxBufferGeometry } from 'three';

class Cube extends BoxBufferGeometry {

	constructor( width, height, depth  ) {

		super( width, height, depth );

		// Rotate Y+ (Up) Plane 180 degree
		this.attributes.position.array.set([
			0.5, 0.5, 0.5,
			-0.5, 0.5, 0.5,
			0.5, 0.5, -0.5,
			-0.5, 0.5, -0.5,
		], 24 );

		// Rotate Y- (Down) Plane 180 degree
		this.attributes.position.array.set([
			0.5, -0.5, -0.5,
			-0.5, -0.5, -0.5,
			0.5, -0.5, 0.5,
			-0.5, -0.5, 0.5
		], 36 );

		// Mark attribute for an update
		this.attributes.position.needsUpdate = true;

	}
}

export { Cube };
