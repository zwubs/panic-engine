/**
 *	@author zwubs
 */

import { Camera } from './camera.js';

import { Canvas } from '../dom/canvas.js';

import { WebGLRenderer, sRGBEncoding } from 'three';

class Renderer extends WebGLRenderer {

	constructor() {

		super( { canvas: Canvas } );

		this.shadowMap.enabled = true;
		this.outputEncoding = sRGBEncoding;

	}

	kill() { this.getContext().getExtension('WEBGL_lose_context').loseContext(); }

	get canvas() { return this.domElement; }

}

const instance = new Renderer();
export { instance as Renderer };
