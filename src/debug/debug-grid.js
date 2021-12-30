/**
 *	@author zwubs
 */

import { Scene } from '../core/rendering/scene.js'
import * as Shaders from '../shaders/shaders.js'

import { PlaneBufferGeometry, Color, ShaderMaterial, DoubleSide, Mesh } from 'three';

class Grid {

	constructor() {

		this.id = "PANIC-Debug-Grid";

		this.active = false;

		this.geometry = new PlaneBufferGeometry( 2, 2, 1, 1 );

		this.uniforms = {

			uColor: { value: new Color( 0x888888 ) },

			uScale: { value: 16.0 },
			uSubdivisions: { value: 16.0 },

			uDistance: { value: 100.0 },

		}

		this.material = new ShaderMaterial({

			side: DoubleSide,

			uniforms: this.uniforms,

			vertexShader: Shaders.DebugGrid.vertex,
			fragmentShader: Shaders.DebugGrid.fragment,

			transparent: true,
			depthWrite: false,

			extensions: { derivatives: true }

		});

		this.mesh = new Mesh( this.geometry, this.material );
		this.mesh.frustumCulled = false;

		this.mesh.name = this.id;

	}

	toggle( override=null ) {

		if( typeof override == "boolean" ) { this.active = !override; }

		if( !this.active ) {

			if( Scene.getObjectByName( this.id ) == null ) {

				Scene.add( this.mesh );

			}

		}

		else {

			if( Scene.getObjectByName( this.id ) ) {

				Scene.remove( this.mesh );

			}

		}

		this.active = !this.active

	}

	get scale() { return this.uniforms.uScale.value; }
	set scale( value ) { this.uniforms.uScale.value = value;}

	get subdivisions() { return this.uniforms.uSubdivisions.value; }
	set subdivisions( value ) { this.uniforms.uSubdivisions.value = value;}

	get distance() { return this.uniforms.uDistance.value; }
	set distance( value ) { this.uniforms.uDistance.value = value;}

	get color() { return this.uniforms.uColor.value; }
	set color( value ) { this.uniforms.uColor.value = new Color( value );}

}

const instance = new Grid();
export { instance as Grid };
