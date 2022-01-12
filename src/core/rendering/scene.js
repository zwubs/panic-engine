/**
 *	@author zwubs
 */

import { Scene as THREE_Scene, Color, FogExp2, HemisphereLight, DirectionalLight } from 'three';

class Scene extends THREE_Scene {

	constructor() {

		super();

		this.background = new Color( 0x222222 );
		this.fog = new FogExp2( new Color( 0x222222 ), 0.025 );

		this.add( new HemisphereLight( 0xFFFFFF, 0xFFFFFF, 1.00 ) );

		let dirLight = new DirectionalLight( 0xFFFFFF, 1.25 );
		dirLight.castShadow = true;

		dirLight.shadow.mapSize.width = 2048;
		dirLight.shadow.mapSize.height = 2048;

		dirLight.shadow.camera.near = 0.01;
		dirLight.shadow.camera.far = 25;

		dirLight.shadow.bias = -0.001;

		dirLight.position.set( 0.5, 1, -0.75 );
		dirLight.position.multiplyScalar( 3 );

		this.add( dirLight );

	}

}

const instance = new Scene();
export { instance as Scene };
