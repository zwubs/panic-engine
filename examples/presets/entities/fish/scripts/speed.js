return function() {

	if( this.store.speedTimer <= 0 ) {

		this.store.speedAmount[0] = 3;
		this.store.speedAmount[2] = 3;
		this.store.speedTimer = 120;

	}

}
