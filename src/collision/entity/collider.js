/**
 *	@author zwubs
 */

import { BoundingSphere } from '../bounding-sphere.js'
import { OBB } from '../obb.js'

import { Box3 } from 'three'

export class EntityCollider {

	constructor( entity ) {

		this.entity = entity;

		this.boundingSphere = new BoundingSphere( this );
		this.boundingBox = new OBB( this );
		this.collision = [];

		this.debugger = null;

		this.update();

	}

	/**
	 *	@description Create a new collider
	 *	@param {EntityColliderTemplate} template
	 */
	fromTemplate( template ) {

		this.collision = template.collision;
		for( let box of this.collision ) { box.collider = this; }

		this.boundingBox = template.boundingBox;
		this.boundingBox.collider = this;

		this.boundingSphere = template.boundingSphere;
		this.boundingSphere.collider = this;

	}

	isColliding( collider ) {

		if( this.boundingSphere.intersectsSphere( collider.boundingSphere ) ) {

			return this.boundingBox.intersectsOBB( collider.boundingBox );

		}

		return false;

	}

	addBox( box ) {

		this.collision.push( box );

	}

	/**
	 *	@note update() updates collision info, updateWorldMatrix() just updates from the parent position.
	 */
	update() {

		// Update small collision (OBBs)
		for( let obb of this.collision ) { obb.updateWorldMatrix() }

		// Update BoundingBox (OBB)
		this.boundingBox.update();

		// Upodate BoundingSphere
		this.boundingSphere.updateWorldMatrix();

	}

}
