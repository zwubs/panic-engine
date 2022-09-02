/**
 *	@author zwubs
 */

import { BufferAttribute } from "three";
import { Texture } from "../core/texture";
import { Tileset } from "../core/tileset/tileset";
import { Types } from "../types";

export namespace CubeUVParser {

	const UVFaces: Types.Tools.Directions[] = ["east", "west", "up", "down", "south", "north"];

	export const parse = (tileGroupName: string, box: THREE.BoxBufferGeometry, texture: Texture, tileset: Tileset) => {

		const group = tileset.groups.get(tileGroupName);
		if (group === undefined) return;

		UVFaces.forEach((face, i) => {

			const uv = group[face].UV(texture);

			(box.attributes.uv as BufferAttribute).set(uv, i * 8);

		});

	}

}
