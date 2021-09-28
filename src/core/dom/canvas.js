/**
 *	@author zwubs
 */

import { Element } from './element.js';
import { Camera } from '../rendering/camera.js';
import { Renderer } from '../rendering/renderer.js';

let Canvas = document.createElement('canvas');

Canvas.id = "PANIC-Canvas";

window.addEventListener("resize", function() {

	Camera.aspect = window.innerWidth / window.innerHeight;
    Camera.updateProjectionMatrix();

	Renderer.setPixelRatio( window.devicePixelRatio );
    Renderer.setSize( window.innerWidth, window.innerHeight );

}, false);

Element.appendChild( Canvas );

export { Canvas };
