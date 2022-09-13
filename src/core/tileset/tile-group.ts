/**
 *	@typedef {Object} TileGroup
 */

import { Tools } from '../../tools';
import { Tile } from './tile'
import { Types } from '../../types'

class TileGroup {

	tiles: Record<Types.Tools.Directions, Tile> = {
		north: new Tile("north"),
		south: new Tile("south"),
		east: new Tile("east"),
		west: new Tile("west"),
		up: new Tile("up"),
		down: new Tile("down")
	}

	setAll(x = 0, y = 0, w = 0, h = 0) {

		for (const direction of Tools.Directions) {
			this.tiles[direction].set(x, y, w, h);
		}

	}

	clone(group: TileGroup) {

		for (const direction of Tools.Directions) {
			this.tiles[direction].x = group.tiles[direction].x;
			this.tiles[direction].y = group.tiles[direction].y;
			this.tiles[direction].w = group.tiles[direction].w;
			this.tiles[direction].h = group.tiles[direction].h;
		}

	}

}

export { TileGroup };
