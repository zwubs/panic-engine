/**
 *	@author zwubs
 */

import { EventManager } from '../../events/event-manager.js'

import { Joypad } from './joypad.js';

class Gamepad {

	constructor() {

		this.eventManager = new EventManager( window );

		this.eventManager.registerNativeEvent( "gamepadconnected" );

		this.eventManager.on( "gamepadconnected", this.handleConnect.bind(this) );

		this.eventManager.registerNativeEvent( "gamepaddisconnected" );

		this.eventManager.on( "gamepaddisconnected", this.handleDisconnect.bind(this) );

		console.log( Joypad );

	}

	handleConnect( e ) {

		console.log( e );

	}

	handleDisconnect( e ) {

		console.log( e );

	}

}

const instance = new Gamepad();
export { instance as Gamepad };
