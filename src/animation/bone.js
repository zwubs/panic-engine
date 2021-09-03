/**
 *  @author zwubs
 *	@class
 *  @param {String} name - Acts as a unique id for the bone
 *  @param {THREE.Vector3} position
 *  @param {THREE.Euler} rotation
 *  @param {THREE.Vector3} scale
 */
PANIC.Bone = function( name, position, rotation, scale ) {

	// Bone Identifier
	this.name = name;

	// Transformation Matrix
	this.matrix = new THREE.Matrix4();

	// Bone Relations
	this.parent = null;
	this.children = [];

	this.pose( position, rotation, scale );

}

/**
 *	@param {String} name
 */
PANIC.Bone.prototype.getChildByName = function( name ) return this.children.find( o => o.name == name );

PANIC.Bone.prototype.addChild = function( bone ) this.children.push( bone );

PANIC.Bone.prototype.setParent = function( bone ) this.parent = bone;

/**
 *  !WARNING! THIS CHANGES THE BASE TRANSFORMATION CALCULATIONS
 *  @param {THREE.Vector3} position
 *  @param {THREE.Euler} rotation
 *  @param {THREE.Vector3} scale
 */
PANIC.Bone.prototype.pose = function( position, rotation, scale ) {

	if( !position instanceof THREE.Vector3 ) position = new THREE.Vector3( 0, 0, 0 );
	if( !rotation instanceof THREE.Euler ) rotation = new THREE.Euler( 0, 0, 0 );
	if( !scale instanceof THREE.Vector3 ) scale = new THREE.Vector3( 1, 1, 1 );

	this.matrix.compose(
		position,
		new THREE.Quaternion().setFromEuler( rotation, false ),
		scale
	);

}
