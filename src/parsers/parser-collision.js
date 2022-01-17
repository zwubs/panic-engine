/**
 *	@author zwubs
 */

import { EntityColliderTemplate } from '../collision/entity/collider-template.js'

import { Box3, Vector3 } from 'three'

export let CollisionParser = new function() {

	this.parse = function( json ) {

		let collider = new EntityColliderTemplate();

		let size = new Vector3( 1, 1, 1 );
		let position = new Vector3( 0, 0, 0 );

		// Load Collision Boxes
		for( const [ id, box ] of Object.entries( json.boxes ) ) {

			if( box.size ) { size.set( box.size[0] / 16, box.size[1] / 16, box.size[2] / 16 ) }

			if( box.offset ) { position.set( box.offset[0] / 16, box.offset[1] / 16, box.offset[2] / 16 ) }

			collider.addBox( new Box3().setFromCenterAndSize( position, size ) );

		}

		// Create Bounding Box
		// collider.calculateBoundingBox();

		// Create Bounding Sphere
		// collider.calculateBoundingSphere();

		// Return to EntityTemplate
		return collider;

	}

}
