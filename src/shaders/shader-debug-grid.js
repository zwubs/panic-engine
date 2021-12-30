/**
 *	@namespace PANIC.Shaders.DebugGrid
 *	@author zwubs
 *	Based heavily off of https://github.com/Fyrestar/THREE.InfiniteGridHelper
 *	@todo Use fog variables instead of distance
 */

import { Color } from 'three'

export let DebugGrid = {

	uniforms: {

		uColor: { value: new Color( 0x000000 ) },

		uScale: { value: 1.0 },
		uSubdivisions: { value: 1.0 },

		uDistance: { value: 1.0 },

	},

	vertex: `

		uniform float uDistance;

		varying vec3 worldPosition;

		void main() {

			vec3 pos = position.xzy * uDistance;
			pos.xz += cameraPosition.xz;

			worldPosition = pos;

			gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

		}

	`,

	fragment: `

		uniform float uScale;
		uniform float uSubdivisions;
		uniform vec3 uColor;
		uniform float uDistance;

		varying vec3 worldPosition;

		float getGrid( float size ) {

			 vec2 r = worldPosition.xz / size;

			 vec2 grid = abs( fract( r - 0.5 ) - 0.5 ) / fwidth( r );
			 float line = min( grid.x, grid.y );

			 return 1.0 - min( line, 1.0 );

		 }

		 void main() {

			   float d = 1.0 - min( distance( cameraPosition.xyz, worldPosition.xyz ) / uDistance, 1.0 );

			   float g1 = getGrid( uScale / uSubdivisions );
			   float g2 = getGrid( uScale );

			   gl_FragColor = vec4( uColor.rgb, mix( g2, g1, g1 ) * pow( d, 3.0 ) );
			   gl_FragColor.a = mix( 0.5 * gl_FragColor.a, gl_FragColor.a, g2 );

			   if ( gl_FragColor.a <= 0.0 ) discard;

		}
	`

}
