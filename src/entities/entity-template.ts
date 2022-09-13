/**
 * 	@author zwubs
 * 	@typedef {Object} EntityTemplate
 */

import { UniformsUtils, ShaderMaterial, Uniform, DoubleSide, BufferGeometry, Material, Shader, IUniform, MeshLambertMaterial } from 'three';
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
	material: MeshLambertMaterial;

	constructor(texture: Texture, tileset: Tileset, geometry: BufferGeometry) {

		this.texture = texture;
		this.tileset = tileset;
		this.geometry = geometry;
		this.material = new MeshLambertMaterial({
			transparent: true,
			map: this.texture,
			alphaTest: 0.5,
		});

		this.material.fog = true; // NOTE: Fix once @types/three is updated
		this.material.side = DoubleSide;
		this.material.shadowSide = DoubleSide;
	}

	spawnEntity() {

		return new Entity(this);

	}

}

export { EntityTemplate };
