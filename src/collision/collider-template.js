/**
 *	@author zwubs
 */

import { Collider } from './collider.js';

export class ColliderTemplate {

	constructor() {

		this.boxes = []

	}

	addBox( box ) {

		this.boxes.push( box );

	}

	generateCollider() {

		return new Collider.fromTemplate( this );

	}

}
