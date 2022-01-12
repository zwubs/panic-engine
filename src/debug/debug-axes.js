/**
 *	@author zwubs
 *	@todo Implement using PANIC.Entity class
 */

import { Scene } from '../core/rendering/scene.js'
import * as Debug from '../debug/debug-console.js';
import * as Shaders from '../shaders/shaders.js'

import { Color, BufferGeometry, Float32BufferAttribute, ShaderMaterial, LineSegments } from 'three';

class Axes {

	constructor() {

		this.id = "PANIC-Debug-Axes";

		this.active = false;

		// Colors
		this.colors = {
			x: new Color( 0xFF3352 ),
			y: new Color( 0x8BDC00 ),
			z: new Color( 0x2890FF )
		}

		// Geometry
		this.geometry = new BufferGeometry();

		// Vertices
		this.geometry.setAttribute( 'position', new Float32BufferAttribute( [
			-1, 0, 0, 1, 0, 0,
			 0, 0,-1, 0, 0, 1,
			 0,-1, 0, 0, 1, 0,
		], 3 ) );

		// Colors
		this.geometry.setAttribute( 'color', new Float32BufferAttribute( [].concat(
			this.colors.x.toArray(), this.colors.x.toArray(),
			this.colors.y.toArray(), this.colors.y.toArray(),
			this.colors.z.toArray(), this.colors.z.toArray(),
		), 3 ) );

		// Opacity
		this.geometry.setAttribute( 'opacity', new Float32BufferAttribute( [
			1.0, 1.0,
			1.0, 1.0,
			1.0, 1.0,
		], 1 ) );

		/**
		 *	@todo Implement PANIC.Shaders in Class Structure
		 */

		// Material
		this.material = new ShaderMaterial({

			uniforms: Shaders.DebugAxes.uniforms,

			vertexShader: Shaders.DebugAxes.vertex,
			fragmentShader: Shaders.DebugAxes.fragment,

			vertexColors: true,
			transparent: true,
			depthWrite: false,

			extensions: {
				derivatives: true
			}

		});

		// Mesh
		this.mesh = new LineSegments( this.geometry, this.material );
		this.mesh.frustumCulled = false;

		this.mesh.name = this.id;

	}

	/**
	 *	@param override {Boolean} - Optional Toggle Override
	 */
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

		this.active = !this.active;

	}

	/**
	 *	@param axis {String} - String containing axes to affect Ex. ("XyZ")
	 *	@param override {Boolean} - Optional Toggle Override
	 */
	toggleAxis( axes, override=null ) {

		var indices = [];

		if( axes.toLowerCase().includes("x") ) { indices.push( 0, 1 ); }
		if( axes.toLowerCase().includes("y") ) { indices.push( 2, 3 ); }
		if( axes.toLowerCase().includes("z") ) { indices.push( 4, 5 ); }

		if( !indices ) { Debug.warn(`Invalid axes name "${axis}", use either 'x', 'y', or 'z'`); return; }

		this.geometry.attributes.opacity.array.forEach( ( element, index, array ) => {

			if( indices.includes( index ) ) {

				if( typeof override == "boolean" ) array[ index ] = override;

				else array[index] = 1 - element;

			}

		});

		this.geometry.attributes.opacity.needsUpdate = true;

	}

	/**
	 *	@description Updates the 'color' attribute with new values
	 */
	updateColors() {

		this.geometry.attributes.colors.set( [].concat(
			this.colors.x.toArray(), this.colors.x.toArray(),
			this.colors.y.toArray(), this.colors.y.toArray(),
			this.colors.z.toArray(), this.colors.z.toArray(),
		), 0 );

		this.geometry.attributes.colors.needsUpdate = true;

	}

	/**
	 *	@todo Implement
	 */
	setColors( axes, color ) {



	}

}

const instance = new Axes();
export { instance as Axes };
