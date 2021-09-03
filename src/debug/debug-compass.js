/**
 *
 */

PANIC.Debug.Compass = new function() {

	this.id = "PANIC-Debug-Compass";

    this.element = document.createElement("div");
	this.element.id = this.id;

	this.active = false;

	/**
	 *	0 = Cardinal & Ordinal Directions
	 *	1 = Cartesian Directions
	 *	2 = Cartesian Coordinates
	 */
	this.state = 0;

	this.toggle = function( override=null ) {

		if( typeof override == "boolean" ) { this.active = !override; }
		else { this.active = !this.active; }

		if( this.active ) {

			PANIC.Debug.Element.appendChild( this.element );

			PANIC.Updater.add( this.id, this, 'update', 15 );

		}

		else {

			PANIC.Debug.Element.removeChild( this.element );

			PANIC.Updater.remove( this.id );

		}

	}

	let spherical = new THREE.Spherical();

	this.update = function() {

		var string = "";
		var direction = new THREE.Vector3( 0, 0, 0 );
		PANIC.Camera.getWorldDirection( direction );

		if( this.state == 0 ) {

			var radians = Math.atan2( direction.x, direction.z );
			var degrees = Math.round( radians / Math.PI * 180 );

			if( degrees >= 112.5 || degrees <= -112.5 ) string += "N";
			else if( degrees >= -67.5 && degrees <= 67.5  ) string += "S";
			if( degrees >= 22.5 && degrees <= 157.5 ) string += "E";
			else if( degrees >= -157.5 && degrees <= -22.5 ) string += "W";

		}

		else if( this.state == 1 ) {

			spherical.setFromVector3( direction );
			spherical.makeSafe();

			let phi = Math.round( spherical.phi / Math.PI * 180 );
			let theta = Math.round( spherical.theta / Math.PI * 180 );

			if( theta > 0 ) string += "+X";
			else if( theta < 0 ) string += "-X";
			else string += "±X";

			if( phi > 90 ) string += " +Y";
			else if( phi < 90 ) string += " -Y";
			else string += " ±Y";

			if( Math.abs( theta ) > 90 ) string += " +Z";
			else if( Math.abs( theta ) < 90 ) string += " -Z";
			else string += " ±Z"

		}

		else if( this.state == 2 ) {

			spherical.setFromVector3( direction );
			spherical.makeSafe();

			let phi = Math.round( spherical.phi / Math.PI * 180 );
			let theta = Math.round( spherical.theta / Math.PI * 180 );

			string = `${phi} ${theta}`;

		}

		this.element.innerHTML = `Facing: ${ string }`;

	}

}
