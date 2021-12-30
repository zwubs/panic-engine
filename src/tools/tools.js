/**
 *   @namespace PANIC.Tools
 */

import { Vector3 } from 'three';

class Tools {

	constructor() {

		this.XAxis = Object.freeze( new Vector3(1,0,0) );
		this.YAxis = Object.freeze( new Vector3(0,1,0) );
		this.ZAxis = Object.freeze( new Vector3(0,0,1) );
		this.NAxis = Object.freeze( new Vector3(0,0,0) );

		this.North = Object.freeze( new Vector3( 0, 0, -1 ) );
		this.South = Object.freeze( new Vector3( 0, 0, 1 ) );
		this.East = Object.freeze( new Vector3( 1, 0, 0 ) );
		this.West = Object.freeze( new Vector3( -1, 0, 0 ) );
		this.Up = Object.freeze( new Vector3( 0, 1, 0 ) );
		this.Down = Object.freeze( new Vector3( 0, -1, 0 ) );

	}

	generateUUID() {

		var lut = [];

		for ( var i = 0; i < 256; i ++ ) { lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 ); }

		var d0 = Math.random() * 0xffffffff | 0;
		var d1 = Math.random() * 0xffffffff | 0;
		var d2 = Math.random() * 0xffffffff | 0;
		var d3 = Math.random() * 0xffffffff | 0;
		var uuid = lut[ d0 & 0xff ] + lut[ d0 >> 8 & 0xff ] + lut[ d0 >> 16 & 0xff ] + lut[ d0 >> 24 & 0xff ] + '-' +
			lut[ d1 & 0xff ] + lut[ d1 >> 8 & 0xff ] + '-' + lut[ d1 >> 16 & 0x0f | 0x40 ] + lut[ d1 >> 24 & 0xff ] + '-' +
			lut[ d2 & 0x3f | 0x80 ] + lut[ d2 >> 8 & 0xff ] + '-' + lut[ d2 >> 16 & 0xff ] + lut[ d2 >> 24 & 0xff ] +
			lut[ d3 & 0xff ] + lut[ d3 >> 8 & 0xff ] + lut[ d3 >> 16 & 0xff ] + lut[ d3 >> 24 & 0xff ];

		return uuid.toUpperCase();

	}

};

let instance = new Tools();
export { instance as Tools };
