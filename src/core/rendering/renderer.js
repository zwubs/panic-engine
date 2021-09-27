/**
 *	@author zwubs
 */

import { Canvas } from '../dom/canvas.js';

import { WebGLRenderer, sRGBEncoding } from '../../lib/three.mjs';

class Renderer extends WebGLRenderer {

	constructor() {

		super( { canvas: Canvas } );

		this.setPixelRatio( window.devicePixelRatio );
		this.setSize( window.innerWidth, window.innerHeight );

		this.shadowMap.enabled = true;
		this.outputEncoding = sRGBEncoding;

	}

	get canvas() { return this.domElement; }

}

const instance = new Renderer();
export { instance as Renderer };
