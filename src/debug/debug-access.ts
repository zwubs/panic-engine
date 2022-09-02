/**
 *	@author zwubs
 *	@description Make the PANIC namespace global
 */

import * as PANIC from '../panic'
import { THREEAccess } from './debug-access-three.js'
import { Debug } from './debug.js';

declare global {
	interface Window { PANIC: any; }
}

class Access {

	isGlobal = false;

	async enable() {

		if (Debug.enabled) {

			if (!this.isGlobal) {

				window.PANIC = await import('../panic.js');

				this.isGlobal = true;

				Debug.warn(`[PANIC] Namespace 'PANIC' has been made global`);

			}

			else { Debug.warn(`[PANIC] Namespace 'PANIC' is already global`); }

		}

	}

	disable() {

		if (Debug.enabled) {

			if (this.isGlobal) {

				window.PANIC = undefined;

				this.isGlobal = false;

				Debug.warn(`[PANIC] Namespace 'PANIC' has been made private`);

			}

			else { Debug.warn(`[PANIC] Namespace 'PANIC' is already private`); }

		}

	}

	toggle() {

		if (window.PANIC != PANIC) { this.enable(); }
		else { this.disable(); }

	}

	get THREE() { return THREEAccess; }

}

let instance = new Access();
export { instance as Access };
