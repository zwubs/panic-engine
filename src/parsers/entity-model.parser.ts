/**
 *	@author zwubs
 */

import { Cube } from '../core/cube.js';

import { CubeUVParser } from './cube-uv.parser.js'

import { BufferGeometry, Matrix4, Vector3, Euler, Quaternion } from 'three';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import { JSON } from '../types/json.js';
import { Texture, Tileset } from '../panic.js';

export namespace EntityModelParser {

	export const parse = function (json: JSON.Armature, texture: Texture, tileset: Tileset) {

		let geometry = new BufferGeometry();
		let boxes = [];

		let bones = Object.entries(json);

		for (let [name, bone] of bones) {

			if (!bone.cubes) continue;

			for (let cube of bone.cubes) {

				let box = new Cube(1, 1, 1);

				let matrix = new Matrix4();

				let scale = new Vector3(1, 1, 1);
				let position = new Vector3(0, 0, 0);
				let rotation = new Euler(0, 0, 0);

				if (cube.size) scale.set(cube.size[0], cube.size[1], cube.size[2]).divideScalar(16).clampScalar(0.00000001, Math.min());

				if (cube.offset) position.set(cube.offset[0], cube.offset[1], cube.offset[2]).divideScalar(16);

				if (cube.rotation) rotation.setFromVector3(new Vector3(cube.rotation[0], cube.rotation[1], cube.rotation[2]).multiplyScalar(Math.PI / 180));

				let quaternion = new Quaternion().setFromEuler(rotation, false);
				matrix.compose(position, quaternion, scale);
				box.applyMatrix4(matrix);

				if (cube.faces) CubeUVParser.parse(cube.faces, box, texture, tileset);

				boxes.push(box);

			}

		}

		return BufferGeometryUtils.mergeBufferGeometries(boxes);

	}

}
