/**
 *	@author zwubss
 */

import { DebugElement } from './debug-element.js';

class Text {

	constructor() {

		this.id = "PANIC-Debug-Text";

		this.element = document.createElement("div");
		this.element.id = this.id;

		this.active = false;

		/**
		 *	0 = Cardinal & Ordinal Directions
		 *	1 = Cartesian Directions
		 *	2 = Cartesian Coordinates
		 */
		this.state = 0;

	}

	toggle( override=null ) {

		if( typeof override == "boolean" ) { this.active = !override; }
		else { this.active = !this.active; }

		if( this.active ) { DebugElement.appendChild( this.element ); }
		else { DebugElement.removeChild( this.element ); }

	}

	set( text ) {

		this.element.innerHTML = `${ text }`;

	}

}

let instance = new Text();
export { instance as Text };
