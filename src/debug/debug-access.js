/**
 *	@author zwubs
 *	@description Make the PANIC namespace global
 */

import * as Status from './debug-status.js'

import { THREEAccess } from './debug-access-three.js'

class Access {

	constuctor() {

		this.isGlobal = false;

	}

	async enable() {

		if( Status.enabled ) {

			if( !this.isGlobal ) {

				window.PANIC = await import('../panic.js');

				this.isGlobal = true;

				PANIC.Debug.warn( `[PANIC] Namespace 'PANIC' has been made global`);

			}

			else { PANIC.Debug.warn( `[PANIC] Namespace 'PANIC' is already global`); }

		}

	}

	disable() {

		if( Status.enabled ) {

			if( this.isGlobal ) {

				window.PANIC = undefined;

				this.isGlobal = false;

				PANIC.Debug.warn( `[PANIC] Namespace 'PANIC' has been made private`);

			}

			else { PANIC.Debug.warn( `[PANIC] Namespace 'PANIC' is already private`); }

		}

	}

	toggle() {

		if( window.PANIC != PANIC ) { this.enable(); }
		else { this.disable(); }

	}

	get THREE() { return THREEAccess; }

}

let instance = new Access();
export { instance as Access };
