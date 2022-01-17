/**
 *	@author zwubs
 */

import { EntityCollider } from './collider.js';

export class EntityColliderTemplate {

	constructor() {

		this.boxes = []

	}

	addBox( box ) {

		this.boxes.push( box );

	}

	generateCollider() {

		return new EntityCollider.fromTemplate( this );

	}

}
