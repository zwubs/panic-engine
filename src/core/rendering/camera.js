/**
 *	@author zwubs
 */

import { Element } from '../dom/element.js';

import { PerspectiveCamera } from '../../lib/three132.js';

class Camera extends PerspectiveCamera {

	constructor() {

		super( 45, 1920/1080, 0.1, 1000 );

		this.position.set( 0, 1, -4 );

		this.aspect = Element.clientWidth / Element.clientHeight;
	    this.updateProjectionMatrix();

	}

}

const instance = new Camera();
export { instance as Camera };
