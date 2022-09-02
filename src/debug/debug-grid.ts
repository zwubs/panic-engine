/**
 *	@author zwubs
 */

import { Scene } from '../core/rendering/scene.js'
import { Shaders } from '../shaders/shaders.js'

import { PlaneBufferGeometry, Color, ShaderMaterial, DoubleSide, Mesh, BufferGeometry } from 'three';
import { Types } from '../types/types.js';

class Grid {

	id = "PANIC-Debug-Grid";
	active = false;
	geometry: BufferGeometry;
	uniforms: Types.Tools.Uniforms;
	material: ShaderMaterial;
	mesh: Mesh;

	constructor() {

		this.geometry = new PlaneBufferGeometry(2, 2, 1, 1);

		this.uniforms = {
			uColor: { value: new Color(0x888888) },
			uScale: { value: 16.0 },
			uSubdivisions: { value: 16.0 },
			uDistance: { value: 100.0 },
		}

		this.material = new ShaderMaterial({
			side: DoubleSide,
			uniforms: this.uniforms,
			vertexShader: Shaders.DebugGrid.vertex,
			fragmentShader: Shaders.DebugGrid.fragment,
			transparent: true,
			depthWrite: false,
			extensions: { derivatives: true }
		});

		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.frustumCulled = false;
		this.mesh.name = this.id;

	}

	toggle() {

		if (Scene.getObjectByName(this.id)) {
			Scene.remove(this.mesh);
		}
		else {
			Scene.add(this.mesh);
		}

	}

	get isActive() { return !!Scene.getObjectByName(this.id) }

	get scale(): number { return this.uniforms.uScale.value; }
	set scale(value: number) { this.uniforms.uScale.value = value; }

	get subdivisions(): number { return this.uniforms.uSubdivisions.value; }
	set subdivisions(value: number) { this.uniforms.uSubdivisions.value = value; }

	get distance(): number { return this.uniforms.uDistance.value; }
	set distance(value: number) { this.uniforms.uDistance.value = value; }

	get color(): number { return this.uniforms.uColor.value; }
	set color(value: number) { this.uniforms.uColor.value = new Color(value); }

}

const instance = new Grid();
export { instance as Grid };
