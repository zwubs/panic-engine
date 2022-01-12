/**
 *	@author zwubs
 */

import { GamepadEvents, GamepadButtons, GamepadAxes } from './gamepad-consts.js';

import { EventManager } from '../../events/event-manager.js'

import { Joypad } from './joypad.js';

class Gamepad {

	constructor() {

		this.eventManager = new EventManager();

		Joypad.set({ axisMovementThreshold: 0.3 });

		Joypad.on('connect', this.handleConnect.bind( this ) );

		Joypad.on('disconnect', this.handleDisconnect.bind( this ) );

		Joypad.on('axis_move', this.handleAxisMove.bind( this ) );

		Joypad.on('button_press', this.handleButtonPress.bind( this ) );

		this.registerEvents();

	}

	registerEvents() {

		for ( let event of GamepadEvents ) {

			this.eventManager.registerEvent( event );

		}

	}

	handleConnect( e ) {  }

	handleDisconnect( e ) {  }

	handleAxisMove( e ) {

		let direction = ( e.detail.directionOfMovement == "left" || e.detail.directionOfMovement == "bottom" ) ? 0 : 1;

		this.eventManager.emit( GamepadAxes[ e.detail.axis ][ direction ] );

	}

	handleButtonPress( e ) { this.eventManager.emit( GamepadButtons[ e.detail.index ] ); }

}

const instance = new Gamepad();
export { instance as Gamepad };
