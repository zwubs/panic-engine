/**
 *	@author zwubs
 */

import { Tileset } from '../core/tileset/tileset.js';
import { TileGroup } from '../core/tileset/tilegroup.js';

import * as Debug from '../debug/debug-console.js';

export let TilesetParser = new function() {

	/**
	 *	@param json {Object}
	 */
	this.parse = function( json, id="Undefined" ) {

		let tileset = new Tileset();

		let groups = Object.entries( json );

		console.groupCollapsed(`Tileset: '${id}'`);

		for (let [name, group] of groups) {

			if( this.isGroup( group ) ) {

				Debug.log( `'${name}' is a group` );

				let tileGroup = this.parseGroup( group, tileset );

				tileset.addTileGroup( name, tileGroup );

			}

			else {

				Debug.log( `'${name}' is unknown` );

			}

		}

		console.groupEnd();

		return tileset;

	}

	/**
	 * @param tile {}
	 */
	this.isTile = function( json ) {

		let acceptables = [ "t", "transform", "x", "y", "w", "width", "h", "height" ];

		for( let attribute in json ) {
			if( attribute == "t" || attribute == "transform" )
			if( typeof json[ attribute ] == "number" ) return true;
		}
		return true;

	}

	/**
	 *
	 */
	this.parseTile = function( tile ) {}


	/**
	 * @param group {}
	 */
	this.isGroup = function( group ) {

		let acceptables = [ "all", "default", "clone", "transform", "north", "south", "east", "west", "up", "down" ];
		let tiles = Object.entries( group );

		for( let [name, tile] of tiles ) {

			if( !acceptables.includes( name ) ) return false

			if( !this.isTile( tile ) ) return false;

		}

		return true;

	}

	/**
	 *
	 */
	this.parseGroup = function( group, tileset ) {

		let tileGroup = new TileGroup();
		let directions = [ "north", "south", "east", "west", "up", "down" ]

		if( group.clone ) tileGroup.clone( tileset.groups[ group.clone ] );
		else if( group.all ) tileGroup.setAll( group.all.x, group.all.y, group.all.w, group.all.h );

		for( let dir of directions ) {
			if( group[ dir ] ) {

				if( group.default ) tileGroup[ dir ].set( group.default.x, group.default.y, group.default.w, group.default.h )

				let tile = group[ dir ];

				if( !isNaN( tile.x ) ) tileGroup[ dir ].x = tile.x;
				if( !isNaN( tile.y ) ) tileGroup[ dir ].y = tile.y;
				if( !isNaN( tile.w ) ) tileGroup[ dir ].w = tile.w;
				if( !isNaN( tile.h ) ) tileGroup[ dir ].h = tile.h;

				// Tile Transforms
				if( tile.t ) {

					if( tile.t.flipX ) tileGroup[ dir ].editPattern( 2, 3, 0, 1, 6, 7, 4, 5 );
					if( tile.t.flipY ) tileGroup[ dir ].editPattern( 4, 5, 6, 7, 0, 1, 2, 3 );

					if( tile.t.translate ) {
						if( tile.t.translate.x ) tileGroup[ dir ].x += tile.t.translate.x;
						if( tile.t.translate.y ) tileGroup[ dir ].y += tile.t.translate.y;
					}

					if( tile.t.rotate ) {
						if( tile.t.rotate == 1 ) tileGroup[ dir ].editPattern( 4, 5, 0, 1, 6, 7, 2, 3 );
						else if( tile.t.rotate == 2 ) tileGroup[ dir ].editPattern( 6, 7, 4, 5, 2, 3, 0, 1 );
						else if( tile.t.rotate == 3 ) tileGroup[ dir ].editPattern( 2, 3, 6, 7, 0, 1, 4, 5 );
					}

				}

			}
		}

		if( group.transform ) {

			for( let dir of directions ) {

				if( tileGroup[ dir ] ) {
					if( group.transform.translate.x ) { tileGroup[ dir ].x += group.transform.translate.x; }
					if( group.transform.translate.y ) { tileGroup[ dir ].y += group.transform.translate.y; }
				}

			}

		};

		return tileGroup;

	}

}
