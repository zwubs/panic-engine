/**
 *	@author zwubs
 */

import { PerspectiveCamera } from 'three';

class Camera extends PerspectiveCamera {

	constructor() {

		super( 45, 1920/1080, 0.1, 1000 );

		this.position.set( 0, 1, -4 );
		this.aspect = window.innerWidth / window.innerHeight;
		this.updateProjectionMatrix();

	}

}

const instance = new Camera();
export { instance as Camera };
