return function() {

	this.position.x += 0.0625 * Math.sin( this.rotation.y );
	this.position.z += 0.0625 * Math.cos( this.rotation.y );

}
