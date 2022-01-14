 /**
 *	@author zwubs
 *  // TODO: Add warnings for all functions
 */

import { EventManager } from '../events/event-manager.js'

import { Keyboard } from './keyboard/keyboard.js'
import { Mouse } from './mouse/mouse.js'
import { Gamepad } from './gamepad/gamepad.js'

export class Actions {

	constructor() {

		this.eventManager = new EventManager();

		this.eventManager.active = false;

	}

	registerAction( actionID ) {

		this.eventManager.registerEvent( actionID );

	}

	addInputBinding( actionID, binding ) {

		if( binding.startsWith("KEY") ) {

			Keyboard.eventManager.on( binding, () => { this.eventManager.emit( actionID ) } );

		}
		else if( binding.startsWith("MOUSE") ) {

			Mouse.eventManager.on( binding, () => { this.eventManager.emit( actionID ) } );

		}
		else if( binding.startsWith("GAMEPAD") ) {

			Gamepad.eventManager.on( binding, () => { this.eventManager.emit( actionID ) } );

		}

	}

	on( actionID, func ) {

		this.eventManager.on( actionID, func );

	}

}
