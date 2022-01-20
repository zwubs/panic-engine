/**
 *	@author zwubs
 *	@reference simondevyoutube
 */

import { Maths } from '../maths.js'

class Client {

	constructor( position, dimensions ) {

		this.position = position;
		this.dimensions = dimensions;
		this.cells = new Cell();
		this.queryId = -1;

	}

}

class Cell {

	consturctor() {

		this.min = null;
		this.max = null;
		this.nodes = null;

	}

}

export class SpatialHashGrid {

	/**
	 *	@description
	 *	@param { Number[2][3] } bounds
	 *	@param { Number[3] } dimensions
	 */
	constructor( bounds, dimensions ) {

		const [ x, y, z ] = dimensions;

		this.cells = [ ...Array( x ) ].map( _ => [ ...Array( y ) ].map( _ => [ ...Array( z ) ].map( _ => ( null ) ) ) );
		this.dimensions = dimensions;
		this.bounds = bounds;
		this.queryIds = 0;

	}

	/**
	 *	@description
	 *	@param { Array } position
	 */
	getCellIndex( position ) {

		const x = MathFunctions.sat( ( position[0] - this.bounds[0][0] ) / ( this.bounds[1][0] - this.bounds[0][0] ) );
		const y = MathFunctions.sat( ( position[1] - this.bounds[0][1] ) / ( this.bounds[1][1] - this.bounds[0][1] ) );
		const z = MathFunctions.sat( ( position[2] - this.bounds[0][2] ) / ( this.bounds[1][2] - this.bounds[0][2] ) );

		const xIndex = Math.floor( x * ( this.dimensions[ 0 ] - 1 ) );
		const yIndex = Math.floor( y * ( this.dimensions[ 1 ] - 1 ) );
		const zIndex = Math.floor( z * ( this.dimensions[ 2 ] - 1 ) );

		return [ xIndex, yIndex, zIndex ];

	}

	/**
	 *	@description
	 *	@param {} position
	 *	@param {} dimensions
	 */
	newClient( position, dimensions ) {

		const client = new Client( position, dimensions );

		this.insertClient( client );

		return client;

	}

	/**
	 *	@description
	 *	@param { Client } client
	 */
	updateClient( client ) {

		const [ x, y, z ] = client.position;
		const [ w, h, d ] = client.dimensions;

		const i1 = this.getCellIndex( [ x - w / 2, y - h / 2 ] );
		const i2 = this.getCellIndex( [ x + w / 2, y + h / 2 ] );

		if( client.cells.min[0] == i1[0] &&
			client.cells.min[1] == i1[1] &&
			client.cells.max[0] == i2[0] &&
			client.cells.max[1] == i2[1] ) { return; }

		this.removeClient( client );
		this.insertClient( client );

	}

	/**
	 *	@description
	 *	@param {} position
	 *	@param {} bounds
	 */
	findNear( position, bounds ) {

		const [ x, y, z ] = position;
		const [ w, h, d ] = bounds;

		const i1 = this.getCellIndex( [ x - w / 2, y - h / 2 ] );
		const i2 = this.getCellIndex( [ x + w / 2, y + h / 2 ] );

		const clients = [];
		const queryId = this.queryIds++;

		for( let x = i1[ 0 ], xn = i2[ 0 ]; x <= xn; ++x ) {
			for( let y = i1[ 1 ], yn = i2[ 1 ]; y <= yn; ++y ) {
				for( let z = i1[ 2 ], zn = i2[ 2 ]; z <= zn; ++z ) {

					let head = this.cells[ x ][ y ][ z ];

					while( head ) {

						const v = head.client;
						head = head.next;

						if( v.queryId != queryId ) {

							v.queryId = queryId;

							clients.push( v );

						}
					}
				}
			}
		}

		return clients;

	}

	/**
	 *	@description
	 *	@param { Client } client
	 */
	insertClient( client ) {

		const [ x, y, z ] = client.position;
		const [ w, h, d ] = client.dimensions;

		const i1 = this.getCellIndex( [ x - w / 2, y - h / 2 ] );
		const i2 = this.getCellIndex( [ x + w / 2, y + h / 2 ] );

		const nodes = [];

		for( let x = i1[ 0 ], xn = i2[ 0 ]; x <= xn; ++x ) {

			nodes.push( [] );

			for( let y = i1[ 1 ], yn = i2[ 1 ]; y <= yn; ++y ) {

				const xi = x - i1[ 0 ];

				nodes[ xi ].push( [] );

				for( let z = i1[ 2 ], zn = i2[ 2 ]; z <= zn; ++z ) {

					const yi = y - i1[ 1 ];

					const head = {
						next: null,
						prev: null,
						client: client
					}

					nodes[ xi ][ yi ].push( head );

					head.next = this.cells[ x ][ y ];
					if( this.cells[ x ][ y ][ z ] ) this.cells[ x ][ y ].prev = head;

					this.cells[ x ][ y ][ z ] = head;

				}
			}
		}

		client.cells.min = i1;
		client.cells.max = i2;
		client.cells.ndoes = nodes;

	}

	/**
	 *	@description
	 *	@param { Client } client
	 */
	removeClient( client ) {

		const i1 = client.cells.min;
		const i2 = client.cells.max;

		for( let x = i1[ 0 ], xn = i2[ 0 ]; x <= xn; ++x ) {

			const xi = x - i1[ 0 ];

			for( let y = i1[ 1 ], yn = i2[ 1 ]; y <= yn; ++y ) {

				const yi = y - i1[ 1 ];

				for( let z = i1[ 2 ], zn = i2[ 2 ]; z <= zn; ++z ) {

					const zi = z - i1[ 2 ];

					const node = client.cells.nodes[ xi ][ yi ][ zi ];

					if( node.next ) node.next.prev = node.prev;
					if( node.prev ) node.prev.next = node.next;
					if( !node.prev ) this.cells[ x ][ y ][ z ] = node.next;

				}
			}
		}

		client.cells.min = null;
		client.cells.max = null;
		client.cells.nodes = null;

	}

}
