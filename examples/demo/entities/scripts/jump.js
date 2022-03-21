return function() {

	if( !this.store.air ) {

		this.store.velocity[1] = 0.125;
		this.store.air = true;

	}

}
