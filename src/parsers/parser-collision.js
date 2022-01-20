/**
 *	@author zwubs
 */

import { EntityColliderTemplate } from '../collision/entity/collider-template.js'
import { OBB } from '../collision/obb.js'

import { Box3, Vector3, Euler, Matrix4 } from 'three'

export let CollisionParser = new function() {

	this.parse = function( json ) {

		let collider = new EntityColliderTemplate();

		// Load Collision Boxes
		for( const [ id, box ] of Object.entries( json.boxes ) ) {

			let obb = new OBB();

			if( box.size ) { obb.scale.set( box.size[0] / 16, box.size[1] / 16, box.size[2] / 16 ) }

			if( box.offset ) { obb.position.set( box.offset[0] / 16, box.offset[1] / 16, box.offset[2] / 16 ) }

			if( box.rotation ) { obb.rotation.setFromVector3( new Vector3( box.rotation[0], box.rotation[1], box.rotation[2] ).multiplyScalar( Math.PI/180 ) ); }

			obb.update();

			collider.addBox( obb );

		}

		collider.generate();

		// Create Bounding Box
		// collider.calculateBoundingBox();

		// Create Bounding Sphere
		// collider.calculateBoundingSphere();

		// Return to EntityTemplate
		return collider;

	}

}
