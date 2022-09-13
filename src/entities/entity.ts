/**
 *	@typedef {Object} PANIC.Entity
 *	@param {PANIC.EntityTemplate} template
 */

import { Vector3, Euler, Quaternion, Matrix4, Mesh, MeshDepthMaterial, RGBADepthPacking } from 'three';
import { Scene } from '../core/rendering/scene';
import { Updater } from '../core/updater';
import { Tools } from '../tools';
import { EntityTemplate } from './entity-template';

class Entity {

	uuid: string;
	template: EntityTemplate;
	mesh: Mesh
	position = new Vector3(0, 0, 0);
	rotation = new Euler(0, 0, 0);
	scale = new Vector3(1, 1, 1);
	quaternion = new Quaternion();
	matrix = new Matrix4();

	constructor(template: EntityTemplate) {

		this.uuid = Tools.generateUUID();
		this.template = template;

		this.mesh = new Mesh(this.template.geometry, this.template.material);
		this.mesh.matrixAutoUpdate = false;
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		this.mesh.frustumCulled = false;
		this.mesh.customDepthMaterial = new MeshDepthMaterial({
			depthPacking: RGBADepthPacking,
			map: this.template.texture,
			alphaTest: 0.5
		});

		Scene.add(this.mesh);
		Updater.add(this);

	}

	update() {

		this.quaternion.setFromEuler(this.rotation, false);
		this.matrix.compose(this.position, this.quaternion, this.scale);
		this.mesh.matrix.copy(this.matrix);

	}

}

export { Entity };
