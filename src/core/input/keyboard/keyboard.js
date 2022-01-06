/**
 *	@author zwubs
 */

import { KeyCodes } from './keycodes.js';
import { KeyMap } from './keymap.js';

import { EventManager } from '../../events/event-manager.js'

import * as Console from '../../../debug/debug-console.js';

class Keyboard {

	constructor() {

		this.eventManager = new EventManager();

		this.eventManager.registerNativeEvent( "keydown" );

		this.eventManager.on( "keydown", this.handleKeyDown.bind(this) );

		this.eventManager.registerNativeEvent( "keyup" );

		this.eventManager.on( "keyup", this.handleKeyUp.bind(this) );

		this.registerKeyEvents();

		this.keys = {};

	}

	registerKeyEvents() {

		for ( let key in KeyCodes ) {

			this.eventManager.registerEvent( key );

		}

	}

	handleKeyUp( e ) {

		this.eventManager.breakLoop( KeyMap[ e.keyCode ] );

	}

	handleKeyDown( e ) {

		if( e.repeat ) return;

		this.eventManager.emit( KeyMap[ e.keyCode ], null, true );

	}

	on( key, func ) {

		this.eventManager.on( key, func );

	}

}

const instance = new Keyboard();
export { instance as Keyboard };
