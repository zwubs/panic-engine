/**
 *	@typedef {Object} PANIC.Tileset.TileGroup
 */
PANIC.Tileset.TileGroup = function( north, south, east, west, up, down ) {

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
PANIC.Tileset.TileGroup.prototype.setAll = function( x=0, y=0, w=0, h=0 ) {

	this.north.set( x, y, w, h );
	this.south.set( x, y, w, h );
	this.east.set( x, y, w, h );
	this.west.set( x, y, w, h );
	this.up.set( x, y, w, h );
	this.down.set( x, y, w, h );

}

/**
 *	@param tileGroup {PANIC.Tileset.TileGroup}
 */
PANIC.Tileset.TileGroup.prototype.clone = function( tileGroup ) {

	let directions = [ "north", "south", "east", "west", "up", "down" ];

	for( let dir of directions ) {
		this[ dir ].x = tileGroup[ dir ].x;
		this[ dir ].y = tileGroup[ dir ].y;
		this[ dir ].w = tileGroup[ dir ].w;
		this[ dir ].h = tileGroup[ dir ].h;
	}

}
