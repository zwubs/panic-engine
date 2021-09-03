/**
 *	@typedef {Object} PANIC.Entity
 *	@param {PANIC.EntityTemplate} template
 */

PANIC.Entity = function( template ) {

	// Unique Entity Identifier
	this.uuid = PANIC.Tools.generateUUID();

	// Assign template for future access
	this.template = template;

	// Transformation Variables
	this.position = new THREE.Vector3( 0, 0, 0 );
	this.rotation = new THREE.Vector3( 0, 0, 0 );
	this.scale = new THREE.Vector3( 0, 0, 0 );

	// Skeleton
	this.skeleton = new THREE.Skeleton();

	// Mesh definition
	this.mesh = new THREE.Mesh( this.template.geometry, this.template.material );

	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;

	this.mesh.frustumCulled = false;

	this.mesh.customDepthMaterial = new THREE.MeshDepthMaterial( {
		depthPacking: THREE.RGBADepthPacking,
		map: this.template.texture,
		alphaTest: 0.5
	} );

	// Bind skeleton to mesh
	// this.mesh.bind( this.skeleton );

	PANIC.Scene.add( this.mesh );

}
