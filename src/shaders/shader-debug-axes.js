/**
 *	@namespace PANIC.Shaders.DebugAxes
 *	@author zwubs
 */
export let DebugAxes = {

	uniforms: {

		uDistance: { value: 100.0 },

	},

	vertex: `

		uniform float uDistance;

		attribute float opacity;

		varying vec3 vColor;
		varying float vOpacity;
		varying vec3 worldPosition;

		void main() {

			vColor.xyz = color.xyz;
			vOpacity = opacity;

			vec3 transformed = position.xzy * ( uDistance + distance( cameraPosition.xyz, worldPosition.xyz ) );

			worldPosition = transformed;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );

		}

	`,

	fragment: `

		uniform float uDistance;

		varying vec3 vColor;
		varying float vOpacity;
		varying vec3 worldPosition;

		void main() {

			float d = 1.0 - min( distance( cameraPosition.xyz, worldPosition.xyz ) / uDistance, 1.0 );

			gl_FragColor = vec4( vColor, vOpacity * pow( d, 3.0 ) );

			if ( gl_FragColor.a <= 0.0 ) discard;

		}

	`

}
