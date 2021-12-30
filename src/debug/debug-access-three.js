/**
 *	@author zwubs
 *	@description Make the PANIC namespace global
 */

import * as Status from './debug-status.js'

class THREEAccess {

	constuctor() {

		this.THREE = undefined;

	}

	async enable() {

		if( Status.enabled ) {

			if( this.THREE == undefined ) this.THREE = await import('three');

			if( window.THREE != this.THREE ) {

				window.THREE = this.THREE;

				PANIC.Debug.warn( `[PANIC] Namespace 'THREE' has been made global`);

			}

			else { PANIC.Debug.error( `[PANIC] Namespace 'THREE' is already global`); }

		}

	}

	disable() {

		if( Status.enabled ) {

			if( this.THREE != undefined && window.THREE == this.THREE ) {

				window.THREE = undefined;

				PANIC.Debug.warn( `[PANIC] Namespace 'THREE' has been made private`);

			}

			else { PANIC.Debug.error( `[PANIC] Namespace 'THREE' is already private`); }

		}

	}

	toggle() {

		if( window.THREE != this.THREE ) { this.enable(); }
		else { this.disable(); }

	}

}

let instance = new THREEAccess();
export { instance as THREEAccess };
