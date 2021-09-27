/**
 *	@author zwubs
 */

import { PerspectiveCamera } from '../../lib/three.mjs';

class Camera extends PerspectiveCamera {

	constructor() {

		super( 45, 1920/1080, 0.1, 1000 );

		this.position.set( 0, 1, -4 );

	}

}

const instance = new Camera();
export { instance as Camera };
