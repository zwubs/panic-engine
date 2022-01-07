/**
 *	@author zwubs
 *	@todo Replace using custom input system
 */

import { Camera } from '../rendering/camera.js';
import { Canvas } from '../dom/canvas.js';

import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let Controls = new OrbitControls( Camera, Canvas );

Controls.traget = new Vector3( 0, 0, 0);
Controls.update();

export { Controls };
