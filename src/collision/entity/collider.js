/**
 *	@author zwubs
 */

import { BoundingSphere } from '../bounding-sphere.js'

import { BoundingBox } from '../bounding-box.js'

export class EntityCollider {

	constructor( entity ) {

		this.entity = entity;

		this.boundingSphere = new BoundingSphere( entity.position, 0.2 );
		this.boundingBox = new BoundingBox();
		this.boxes = [];

		this.debugger = null;

	}

	/**
	 *	@description Create a new collider
	 *	@param {EntityColliderTemplate} template
	 */
	fromTemplate( template ) {

		this.boxes = template.boxes;

	}

	isColliding( collider ) {

		return this.boundingSphere.intersectsSphere( collider.boundingSphere );

	}

	addBox( box ) {

		this.boxes.push( box );

	}

	update() {

		this.boundingSphere.setCenter( this.entity.position );

	}

}
