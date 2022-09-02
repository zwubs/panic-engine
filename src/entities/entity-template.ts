/**
 * 	@author zwubs
 * 	@typedef {Object} EntityTemplate
 */

import { UniformsUtils, ShaderMaterial, Uniform, DoubleSide, BufferGeometry, Material, Shader, IUniform } from 'three';
import { Texture } from '../core/texture';
import { Tileset } from '../core/tileset/tileset';
import { Entity } from './entity';
import { EntityShader } from '../shaders/entity.shader';

class EntityTemplate {

	id = "unknown";
	name = "Unknown";
	texture: Texture;
	tileset: Tileset;
	geometry: BufferGeometry;
	material: ShaderMaterial;
	shader = EntityShader;
	uniforms: { [uniform: string]: IUniform<any> };

	constructor(texture: Texture, tileset: Tileset, geometry: BufferGeometry) {

		this.texture = texture;
		this.tileset = tileset;
		this.geometry = geometry;
		this.uniforms = UniformsUtils.clone(this.shader.uniforms);
		this.material = new ShaderMaterial({
			defines: {
				"USE_MAP": "",
				"DOUBLE_SIDED": ""
			},
			uniforms: this.uniforms,
			vertexShader: this.shader.vertex,
			fragmentShader: this.shader.fragment,
			lights: true,
			transparent: true,

		});

		this.material.fog = true; // NOTE: Fix once @types/three is updated
		this.uniforms["map"] = new Uniform(this.texture);
		this.uniforms["alphaTest"] = new Uniform(0.5);
		this.material.side = DoubleSide;
		this.material.shadowSide = DoubleSide;
	}

	spawnEntity() {

		return new Entity(this);

	}

}

export { EntityTemplate };
