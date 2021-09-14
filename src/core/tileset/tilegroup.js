/**
 *	@typedef {Object} TileGroup
 */
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

		this.north = north || new PANIC.Tileset.Tile( "north" );
		this.south = south || new PANIC.Tileset.Tile( "south" );
		this.east = east || new PANIC.Tileset.Tile( "east" );
		this.west = west || new PANIC.Tileset.Tile( "west" );
		this.up = up || new PANIC.Tileset.Tile( "up" );
		this.down = down || new PANIC.Tileset.Tile( "down" );

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
