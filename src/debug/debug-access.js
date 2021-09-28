/**
 *	@author zwubs
 *	@description Make the PANIC namespace global
 */

import * as PANIC from '../panic.js'

import * as Status from './debug-status.js'

import { THREEAccess } from './debug-access-three.js'

class Access {

	constuctor() {}

	enable() {

		if( Status.enabled ) {

			if( window.PANIC != PANIC ) {

				window.PANIC = PANIC;

				PANIC.Debug.warn( `[PANIC] Namespace 'PANIC' has been made global`);

			}

			else { PANIC.Debug.warn( `[PANIC] Namespace 'PANIC' is already global`); }

		}

	}

	disable() {

		if( Status.enabled ) {

			if( window.PANIC == PANIC ) {

				window.PANIC = undefined;

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
