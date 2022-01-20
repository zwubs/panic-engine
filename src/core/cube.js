/**
 *	@author zwubs
 *	@extends {THREE.BoxBufferGeometry}
 */

import { BufferGeometry, BufferAttribute, BoxBufferGeometry } from 'three';

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

	static identity() {

		const indices = new Uint16Array( [ 0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7 ] );
		const positions = new Float32Array( [ 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5 ] );

		const geometry = new BufferGeometry();
		geometry.setIndex( new BufferAttribute( indices, 1 ) );
		geometry.setAttribute( 'position', new BufferAttribute( positions, 3 ) );

		geometry.computeBoundingSphere();

		return geometry;
		
	}
}



export { Cube };
