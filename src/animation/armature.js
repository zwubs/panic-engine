/**
 *	@author zwubs
 */

PANIC.Armature = function() {

	// All bones in the armature
	// All armatures have a default root bone, can be overwritten in the actual JSON file
	// 'root' may be used in the future for position, rotation, and scaling entitites
	this.bones = {
		root: new PANIC.Bone( "root" )
	};

	// Relational Setup of Bones
	// Trace bones using root's 'children' variable
	this.tree = this.bones[ "root" ];

}

/**
 *	@param {String} name
 */
PANIC.Armature.prototype.getBoneByName = function( name ) return this.bones.find( o => o.name == name );

/**
 *  @param {PANIC.Bone} bone
 *  @param {String} parent
 */
PANIC.Armature.prototype.addBone = function( bone, parent ) {

	// Check for if a bone name already exists ( Should throw an error later )
	// There's a special case for root
	if( !this.bones[ bone.name ] ) this.bones[ bone.name ] = bone;

	if( !this.bones[ parent ] ) parent = "root";
	parent = this.getBoneByName( parent );

	parent.addChild( bone );
	bone.setParent( parent );

}
