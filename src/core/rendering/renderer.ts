/**
 *	@author zwubs
 */

import { Canvas } from '../dom/canvas';
import { Element } from '../dom/element';

import { Camera } from './camera';

import { WebGLRenderer, sRGBEncoding, LinearToneMapping, BasicShadowMap } from 'three';

class Renderer extends WebGLRenderer {

	constructor() {

		super({ canvas: Canvas });

		this.shadowMap.enabled = true;
		this.shadowMap.type = BasicShadowMap;

		this.outputEncoding = sRGBEncoding;

		this.toneMapping = LinearToneMapping;
		this.toneMappingExposure = 0.75;
	}

	kill() { this.getContext().getExtension('WEBGL_lose_context')?.loseContext(); }

	onResize() {

		Camera.aspect = Element.clientWidth / Element.clientHeight;
		Camera.updateProjectionMatrix();

		this.setPixelRatio(window.devicePixelRatio);
		this.setSize(Element.clientWidth, Element.clientHeight);

	}

	get canvas() { return this.domElement; }

}

const instance = new Renderer();
export { instance as Renderer };
