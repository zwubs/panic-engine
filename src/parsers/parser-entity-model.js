/**
 *	@author zwubs
 */

import { Cube } from '../core/cube.js';

import { CubeUVParser } from './parser-cube-uv.js'

import { BufferGeometry, Matrix4, Vector3, Euler, Quaternion, BufferAttribute } from 'three';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

export let EntityModelParser = new function() {

	this.parse = function( json, entity ) {

		let geometry = new BufferGeometry();
		let boxes = [];

		let bones = Object.entries( json );

		for (let [name, bone] of bones) {

			if( !bone.cubes ) continue;

			for( let cube of bone.cubes ) {

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

				if( cube.faces ) CubeUVParser.parse( cube.faces, box, entity.texture, entity.tileset );

				// this.setupSkinning( box, boneIndex );

				boxes.push( box );

			}

		}

		return BufferGeometryUtils.mergeBufferGeometries( boxes );

	}

	/**
	 *  @param {THREE.Geometry} box
	 *  @param {Integer} index
	 */
	this.setupSkinning = function( box, index ) {

		var skinIndices = new Float32Array( box.attributes.position.count );

		for( var i = 0; i < skinIndices.length; i++ ) skinIndices.set( [index], i );

		box.setAttribute( "skinIndices", new BufferAttribute( skinIndices, 1 ) );

	}

}
