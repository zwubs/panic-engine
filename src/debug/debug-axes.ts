/**
 *	@author zwubs
 *	@todo Implement using PANIC.Entity class
 */

import { BufferGeometry, Float32BufferAttribute, ShaderMaterial, LineSegments } from 'three';
import { Scene } from '../core/rendering/scene'
import { Shaders } from '../shaders'


class DebugAxes {

	id = "PANIC-Debug-Axes";
	active = false;
	geometry: BufferGeometry;
	material: ShaderMaterial
	mesh: LineSegments

	constructor() {

		this.geometry = new BufferGeometry();
		this.geometry.setAttribute('position', new Float32BufferAttribute([
			-1, 0, 0, 1, 0, 0,
			0, 0, -1, 0, 0, 1,
			0, -1, 0, 0, 1, 0,
		], 3));
		this.geometry.setAttribute('colors', new Float32BufferAttribute([
			0xFF, 0x33, 0x52, 0xFF, 0x33, 0x52,
			0x8B, 0xDC, 0x00, 0x8B, 0xDC, 0x00,
			0x28, 0x90, 0xFF, 0x28, 0x90, 0xFF,
		], 3));

		this.material = new ShaderMaterial({
			uniforms: Shaders.DebugAxes.uniforms,
			vertexShader: Shaders.DebugAxes.vertex,
			fragmentShader: Shaders.DebugAxes.fragment,
			vertexColors: true,
			transparent: true,
			depthWrite: false,
			extensions: {
				derivatives: true
			}
		});

		this.mesh = new LineSegments(this.geometry, this.material);
		this.mesh.frustumCulled = false;
		this.mesh.name = this.id;

	}

	toggle() {

		if (Scene.getObjectByName(this.id)) {
			Scene.remove(this.mesh);
			this.active = false;
		}
		else {
			Scene.add(this.mesh);
			this.active = true;
		}

	}


}

const instance = new DebugAxes();
export { instance as DebugAxes };
