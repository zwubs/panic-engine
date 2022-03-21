return function() {

	this.position.x += this.store.velocity[0];
	this.position.y += this.store.velocity[1];
	this.position.z += this.store.velocity[2];

	this.store.velocity[0] /= 2;
	if( this.store.collide == false ) this.store.velocity[1] -= 0.01;
	this.store.velocity[2] /= 2;

	if( this.position.y <= 0 ) {
		this.store.air = false;
		this.position.y = 0;
		this.store.velocity[1] = 0;
	}

	this.store.collide = false;

}
