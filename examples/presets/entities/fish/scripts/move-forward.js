return function() {

	this.store.velocity[0] = -0.0625 * Math.sin( this.rotation.y ) * this.store.speedAmount[0];
	this.store.velocity[2] = -0.0625 * Math.cos( this.rotation.y ) * this.store.speedAmount[2];

}
