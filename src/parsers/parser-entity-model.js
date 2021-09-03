/**
 *	@todo Convert to using a custom BufferGeometry for easier merging
 */
PANIC.Parsers.EntityModel = new function() {

	this.parse = function( json, entity ) {

		let geometry = new THREE.BufferGeometry();
		let boxes = [];

		let bones = Object.entries( json );

		for (let [name, bone] of bones) {

			if( !bone.cubes ) continue;

			for( let cube of bone.cubes ) {

				let box = new PANIC.Cube( 1, 1, 1 );

				let matrix = new THREE.Matrix4();

				let scale = new THREE.Vector3(1,1,1);
				let position = new THREE.Vector3(0,0,0);
				let rotation = new THREE.Euler(0,0,0);

				if( cube.size ) scale.set( cube.size[0], cube.size[1], cube.size[2] ).divideScalar( 16 );

				if( cube.offset ) position.set( cube.offset[0], cube.offset[1], cube.offset[2] ).divideScalar( 16 );

				if( cube.rotation ) rotation.setFromVector3( new THREE.Vector3( cube.rotation[0], cube.rotation[1], cube.rotation[2] ).multiplyScalar( Math.PI/180 ) );

				let quaternion = new THREE.Quaternion().setFromEuler( rotation, false );
				matrix.compose( position, quaternion, scale );
				box.applyMatrix4( matrix );

				if( cube.faces ) PANIC.Parsers.CubeUV.parse( cube.faces, box, entity.texture, entity.tileset );

				// this.setupSkinning( box, boneIndex );

				boxes.push( box );

			}

		}

		return THREE.BufferGeometryUtils.mergeBufferGeometries( boxes );

	}

	/**
     *  @param {THREE.Geometry} box
     *  @param {Integer} index
     */
    this.setupSkinning = function( box, index ) {

        var skinIndices = new Float32Array( box.attributes.position.count );

        for( var i = 0; i < skinIndices.length; i++ ) skinIndices.set( [index], i );

        box.setAttribute( "skinIndices", new THREE.BufferAttribute( skinIndices, 1 ) );

    }

}
