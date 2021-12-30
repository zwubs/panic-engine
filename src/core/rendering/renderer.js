/**
 *	@author zwubs
 */

import { Camera } from './camera.js';

import { Canvas } from '../dom/canvas.js';

import { WebGLRenderer, sRGBEncoding } from '../../lib/three132.js';

class Renderer extends WebGLRenderer {

	constructor() {

		super( { canvas: Canvas } );

		this.shadowMap.enabled = true;
		this.outputEncoding = sRGBEncoding;

		this.parentElement = window;

		window.addEventListener("resize", this.resize, false);

		this.resize();

	}

	kill() { this.getContext().getExtension('WEBGL_lose_context').loseContext(); }

	resize() {

		Camera.aspect = this.parentElement.innerWidth / this.parentElement.innerHeight;
	    Camera.updateProjectionMatrix();

		this.setPixelRatio( window.devicePixelRatio );
	    this.setSize( this.parentElement.innerWidth, this.parentElement.innerHeight );

	}

	get canvas() { return this.domElement; }

}

const instance = new Renderer();
export { instance as Renderer };
