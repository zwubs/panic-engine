/**
 *  @author zwubs
 */

import { Camera } from '../rendering/camera.js';

import { Renderer } from '../rendering/renderer.js';

import { Element } from '../dom/element.js';

export let ResizeRenderer = function() {

    Camera.aspect = Element.clientWidth / Element.clientHeight;
    Camera.updateProjectionMatrix();

    Renderer.setPixelRatio( window.devicePixelRatio );
    Renderer.setSize( Element.clientWidth, Element.clientHeight );

}

window.addEventListener("resize", ResizeRenderer, false);
