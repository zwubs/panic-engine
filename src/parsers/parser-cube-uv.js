/**
 *	@author zwubs
 */

export let CubeUVParser = new function() {

	this.parse = function( tileGroupName, box, texture, tileset ) {

		let faces = ["east","west","up","down","south","north"];
		let tileGroup = tileset.groups[ tileGroupName ];

		for( var f = 0; f < 6; f++ ) {

			if( tileGroup[ faces[ f ] ] ) {

				let uv = tileGroup[ faces[ f ] ].UV( texture );

				box.attributes.uv.array.set( [ uv[ 0 ], uv[ 1 ] ], f * 8 + 0 )
				box.attributes.uv.array.set( [ uv[ 2 ], uv[ 3 ] ], f * 8 + 2 )
				box.attributes.uv.array.set( [ uv[ 4 ], uv[ 5 ] ], f * 8 + 4 )
				box.attributes.uv.array.set( [ uv[ 6 ], uv[ 7 ] ], f * 8 + 6 )

			}
			
		}

	}

}
