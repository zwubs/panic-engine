/**
 *	@author zwubs
 */

import { Scene as THREE_Scene, Color, FogExp2, HemisphereLight } from '../../lib/three.mjs';

class Scene extends THREE_Scene {

	constructor() {

		super();

		this.background = new Color( 0x222222 );
		this.fog = new FogExp2( new Color( 0x222222 ), 0.025 );

	}

}

const instance = new Scene();
export { instance as Scene };
