/**
 *	@author zwubs
 */

import { Element } from './element.js';
import { Camera } from '../rendering/camera.js';

let Canvas = document.createElement('canvas');

Canvas.id = "PANIC-Canvas";

Element.appendChild( Canvas );

export { Canvas };
