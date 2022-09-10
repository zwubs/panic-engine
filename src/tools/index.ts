/**
 *   @namespace PANIC.Tools
 */

import { Vector3 } from 'three';
import { v4 } from 'uuid';

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

	export const generateUUID = () => v4()

}
