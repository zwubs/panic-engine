/**
 *	@author zwubs
 */

import { Canvas } from '../dom/canvas.js';

import { WebGLRenderer, sRGBEncoding } from '../../lib/three132.js';

class Renderer extends WebGLRenderer {

	constructor() {

		super( { canvas: Canvas } );

		this.shadowMap.enabled = true;
		this.outputEncoding = sRGBEncoding;

		this.setPixelRatio( window.devicePixelRatio );
		this.setSize( window.innerWidth, window.innerHeight );

	}

	kill() { this.getContext().getExtension('WEBGL_lose_context').loseContext(); }

	get canvas() { return this.domElement; }

}

const instance = new Renderer();
export { instance as Renderer };
