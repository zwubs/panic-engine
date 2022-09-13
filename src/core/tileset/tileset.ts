/**
 *	@author zwubs
 *	@typedef {Object} PANIC.Tileset
 */

import { TileGroup } from "./tile-group";

class Tileset {

	groups: Map<string, TileGroup> = new Map();

	addTileGroup( name: string, group: TileGroup ) {

		this.groups.set( name, group )

	}

}

export { Tileset };
