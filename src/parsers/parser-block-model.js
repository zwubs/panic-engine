/**
 *	@author zwubs
 */

import { Cube } from '../core/cube.js';

import { CubeUVParser } from './parser-cube-uv.js'

import { BufferGeometry, Matrix4, Vector3, Euler, Quaternion, BufferAttribute } from 'three';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

export let BlockModelParser = new function() {

	/**
	 *	@param {Object} json
	 *	@param {BlockTemplate} template
	 */
	this.parse = function( json, template ) {

		let geometry = new BufferGeometry();
		let boxes = [];

		for( let cube of json.cubes ) {

			console.log( cube )

			let box = new Cube( 1, 1, 1 );

			let matrix = new Matrix4();

			let scale = new Vector3(1,1,1);
			let position = new Vector3(0,0,0);
			let rotation = new Euler(0,0,0);

			if( cube.size ) scale.set( cube.size[0], cube.size[1], cube.size[2] ).divideScalar( 16 ).clampScalar( 0.00000001, Math.min() );

			if( cube.offset ) position.set( cube.offset[0], cube.offset[1], cube.offset[2] ).divideScalar( 16 );

			if( cube.rotation ) rotation.setFromVector3( new Vector3( cube.rotation[0], cube.rotation[1], cube.rotation[2] ).multiplyScalar( Math.PI/180 ) );

			let quaternion = new Quaternion().setFromEuler( rotation, false );
			matrix.compose( position, quaternion, scale );
			box.applyMatrix4( matrix );

			// if( cube.faces ) CubeUVParser.parse( cube.faces, box, template.texture, template.tileset );

			boxes.push( box );

		}

		return BufferGeometryUtils.mergeBufferGeometries( boxes );

	}

}
