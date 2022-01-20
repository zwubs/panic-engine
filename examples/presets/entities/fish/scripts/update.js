return function() {

	this.position.x += this.store.velocity[0];
	this.position.y += this.store.velocity[1];
	this.position.z += this.store.velocity[2];

	// this.store.velocity[0] = this.store.velocity[0] - 0.01;
	// this.store.velocity[2] = this.store.velocity[2] - 0.01;

	this.store.velocity[0] /= 1.1;
	this.store.velocity[2] /= 1.1;

	this.rotation.x += this.store.rotationVelocity[0];
	this.rotation.y += this.store.rotationVelocity[1];
	this.rotation.z += this.store.rotationVelocity[2];

	this.store.rotationVelocity[0] /= 1.25;
	this.store.rotationVelocity[1] /= 1.25;
	this.store.rotationVelocity[2] /= 1.25;

	if( this.store.velocity[0] + this.store.velocity[2] <= 0.0625 ) this.store.speed = false;

	this.store.speedAmount[0] = ( this.store.speedAmount[0] - 1 ) / 1.025 + 1;
	this.store.speedAmount[2] = ( this.store.speedAmount[2] - 1 ) / 1.025 + 1;

	if( this.store.speedTimer > 0 ) this.store.speedTimer--;

}
