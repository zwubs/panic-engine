/**
 *	@author zwubs
 *	@typedef {Object} PANIC.Tileset
 */

class Tileset() {

	this.groups = {};

	/**
	 *	@param name {String}
	 *	@param group {PANIC.Tileset.TileGroup}
	 */
	addTileGroup( name, group ) {

		this.groups[ name ] = group;

	}

}
