/**
 *	@typedef {Object} TileGroup
 */

import { Tile } from './tile.js'

class TileGroup {

	/**
	 *	@param north { PANIC.Tile }
	 *	@param south { PANIC.Tile }
	 *	@param east { PANIC.Tile }
	 *	@param west { PANIC.Tile }
	 *	@param up { PANIC.Tile}
	 *	@param down { PANIC.Tile}
	 */
	constructor( north, south, east, west, up, down ) {

		this.north = north || new Tile( "north" );
		this.south = south || new Tile( "south" );
		this.east = east || new Tile( "east" );
		this.west = west || new Tile( "west" );
		this.up = up || new Tile( "up" );
		this.down = down || new Tile( "down" );

	}

	/**
	 *	@param x {Number}
	 *	@param y {Number}
	 *	@param w {Number}
	 *	@param h {Number}
	 */
	setAll( x=0, y=0, w=0, h=0 ) {

		this.north.set( x, y, w, h );
		this.south.set( x, y, w, h );
		this.east.set( x, y, w, h );
		this.west.set( x, y, w, h );
		this.up.set( x, y, w, h );
		this.down.set( x, y, w, h );

	}

	/**
	 *	@param group {TileGroup}
	 */
	clone( group ) {

		let directions = [ "north", "south", "east", "west", "up", "down" ];

		for( let dir of directions ) {
			this[ dir ].x = group[ dir ].x;
			this[ dir ].y = group[ dir ].y;
			this[ dir ].w = group[ dir ].w;
			this[ dir ].h = group[ dir ].h;
		}

	}

}

export { TileGroup };
