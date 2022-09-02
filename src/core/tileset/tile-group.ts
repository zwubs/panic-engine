/**
 *	@typedef {Object} TileGroup
 */

import { Tools } from '../../tools';
import { Tile } from './tile'

class TileGroup {

	north = new Tile("north");
	south = new Tile("south");
	east = new Tile("east");
	west = new Tile("west");
	up = new Tile("up");
	down = new Tile("down");

	setAll(x = 0, y = 0, w = 0, h = 0) {

		for (const direction of Tools.Directions) {
			this[direction].set(x, y, w, h);
		}

	}

	clone(group: TileGroup) {

		for (const direction of Tools.Directions) {
			this[direction].x = group[direction].x;
			this[direction].y = group[direction].y;
			this[direction].w = group[direction].w;
			this[direction].h = group[direction].h;
		}

	}

}

export { TileGroup };
