/**
 *	@author zwubs
 */

import { Canvas } from '../dom/canvas.js';
import { Element } from '../dom/element.js';

import { Camera } from './camera.js';

import { EventManager } from '../events/event-manager.js';

import { WebGLRenderer, sRGBEncoding, LinearToneMapping, BasicShadowMap } from 'three';

class Renderer extends WebGLRenderer {

	constructor() {

		super( { canvas: Canvas } );

		this.shadowMap.enabled = true;
		this.shadowMap.type = BasicShadowMap;

		this.outputEncoding = sRGBEncoding;

		this.toneMapping = LinearToneMapping;
		this.toneMappingExposure = 0.75;

		this.eventManager = new EventManager( window );

		this.eventManager.registerNativeEvent( "resize" );
		this.eventManager.on( "resize", this.onResize.bind(this) );

		this.onResize();

	}

	kill() { this.getContext().getExtension('WEBGL_lose_context').loseContext(); }

	onResize( e ) {

		Camera.aspect = Element.clientWidth / Element.clientHeight;
		Camera.updateProjectionMatrix();

		this.setPixelRatio( window.devicePixelRatio );
		this.setSize( Element.clientWidth, Element.clientHeight );

	}

	get canvas() { return this.domElement; }

}

const instance = new Renderer();
export { instance as Renderer };
