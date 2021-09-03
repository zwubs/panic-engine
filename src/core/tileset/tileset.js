/**
 *	@author zwubs
 *	@typedef {Object} PANIC.Tileset
 */

PANIC.Tileset = function() {

	this.groups = {};

}



/**
 *	@param name {String}
 *	@param group {PANIC.Tileset.TileGroup}
 */
PANIC.Tileset.prototype.addTileGroup = function( name, group ) {

	this.groups[ name ] = group;

}
