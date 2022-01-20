/**
 *	@author zwubs
 */

import { Vector3, Euler, Quaternion, Matrix4, Box3 } from 'three'

import { OBB as THREE_OBB } from './three-obb.js';

class OrientedBoundingBox {

	/**
	 *	@param {Collider} collider
	 */
	constructor( collider ) {

		this.collider = collider;

		this.epsilon = 1e-3;

		// User friendly inputs
		this.position = new Vector3();
		this.rotation = new Euler();
		this.scale = new Vector3();

		this.obb = new THREE_OBB();

		// SAT friendly inputs
		this.center = new Vector3();
		this.basis = new Matrix4();
		this.halfWidth = new Vector3();

		// For children calculations
		this.quaternion = new Quaternion();
		this.matrix = new Matrix4(); // local position
		this.matrixWorld = new Matrix4(); // world position

	}

	getBoundingBox() { return new Box3().setFromCenterAndSize( this.position, this.scale ).applyMatrix4( new Matrix4().makeRotationFromEuler( this.rotation ) ); }

	fromBoundingBox( box3 ) {

		box3.getCenter( this.position );
		box3.getSize( this.scale );

		this.update();

	}

	/**
	 *
	 */
	set( position, rotation, scale ) {

		if( position ) this.position = position;
		if( scale ) this.scale = scale;
		if( rotation instanceof Vector3 ) this.rotation.setFromVector3( rotation );
		else if( rotation instanceof Euler ) this.rotation.copy( rotation );

	}

	update() {

		// Update matrix
		this.quaternion.setFromEuler( this.rotation, false );

		this.matrix.compose( this.position, this.quaternion, this.scale );

		this.updateWorldMatrix();

		// Update SAT variables
		this.center.setFromMatrixPosition( this.matrixWorld );

		if( this.collider ) this.basis.makeRotationFromEuler( this.collider.entity.rotation );

		this.halfWidth.copy( this.scale ).multiplyScalar( 0.5 );

		this.obb.set( this.center, this.halfWidth, this.basis )

	}

	updateWorldMatrix() {

		if( this.collider ) this.matrixWorld.multiplyMatrices( this.collider.entity.matrix, this.matrix )
		else this.matrixWorld.copy( this.matrix );

	}

	intersectsOBB( obb ) {

		let vars = this.obb.intersectsOBB( obb.obb );

		if( vars ) return vars[0].multiplyScalar( vars[ 1 ] );
		else return false

	}

}

export { OrientedBoundingBox as OBB }
