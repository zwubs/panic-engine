/**
 *   @namespace PANIC.Tools
 */

import { Vector3 } from 'three';

export namespace Tools {

	export const XAxis = new Vector3(1, 0, 0);
	export const YAxis = new Vector3(0, 1, 0);
	export const ZAxis = new Vector3(0, 0, 1);
	export const NAxis = new Vector3(0, 0, 0);

	export const North = new Vector3(0, 0, -1);
	export const South = new Vector3(0, 0, 1);
	export const East = new Vector3(1, 0, 0);
	export const West = new Vector3(-1, 0, 0);
	export const Up = new Vector3(0, 1, 0);
	export const Down = new Vector3(0, -1, 0);

	export const Directions = ["north", "south", "east", "west", "up", "down"] as const

	export const generateUUID = () => {

		var lut = [];

		for (var i = 0; i < 256; i++) { lut[i] = (i < 16 ? '0' : '') + (i).toString(16); }

		var d0 = Math.random() * 0xffffffff | 0;
		var d1 = Math.random() * 0xffffffff | 0;
		var d2 = Math.random() * 0xffffffff | 0;
		var d3 = Math.random() * 0xffffffff | 0;
		var uuid = lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
			lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
			lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
			lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];

		return uuid.toUpperCase();

	}

}
