/**
 *	@author zwubs
 */

import { KeyCodes } from './keycodes.js';
import { KeyMap } from './keymap.js';

import { EventManager } from '../../events/event-manager.js'

class Keyboard {

	constructor() {

		this.eventManager = new EventManager();

		this.eventManager.registerNativeEvent( "keydown" );

		this.eventManager.on( "keydown", this.handleKeyDown.bind(this) );

		this.registerKeyEvents();

	}

	registerKeyEvents() {

		for ( let key in KeyCodes ) {

			this.eventManager.registerEvent( `keydown_${ key }`);

		}

	}

	on( key, func ) {

		this.eventManager.on( key, func );

	}

	handleKeyDown( e ) {

		let event = `keydown_${KeyMap[e.keyCode]}`;

		this.eventManager.emit( event );

	}

}

const instance = new Keyboard();
export { instance as Keyboard };
