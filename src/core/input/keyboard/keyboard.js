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

	/**
	 * 	@description Registers all events for the
	 * 	@todo Optimize to only use necessary events
	 */
	registerKeyEvents() {

		for ( let key in KeyCodes ) {

			this.eventManager.registerEvent( `keydown_${key}` );
			this.eventManager.registerEvent( `keyup_${key}` );
			this.eventManager.registerEvent( `keyheld_${key}` );

		}

	}

	/**
	 * 	@param {Event} e - Event from "keyup" event listener
	 */
	handleKeyUp( e ) {

		this.eventManager.emit( `keyup_${KeyMap[ e.keyCode ]}`, {} );

		this.eventManager.breakLoop( `keyheld_${KeyMap[ e.keyCode ]}` );

	}

	/**
	 * 	@param {Event} e - Event from "keydown" event listener
	 */
	handleKeyDown( e ) {

		if( e.repeat ) return;

		this.eventManager.emit( `keydown_${KeyMap[ e.keyCode ]}`, {} );

		this.eventManager.emit( `keyheld_${KeyMap[ e.keyCode ]}`, {}, true );

	}

	onKey( key, func ) {

		if( !this.checkValidKey( key, "onKey" ) ) { return; }

		this.eventManager.on( `keyheld_${ key }`, func );

	}

	onKeyDown( key, func ) {

		if( !this.checkValidKey( key, "onKeyDown" ) ) { return; }

		this.eventManager.on( `keydown_${ key }`, func );

	}

	onKeyUp( key, func ) {

		if( !this.checkValidKey( key, "onKeyUp" ) ) { return; }

		this.eventManager.on( `keyup_${ key }`, func );

	}

	getKey( key ) {

		if( !this.checkValidKey( key, "getKey" ) ) { return; }

		return this.eventManager.eventActive( `keyheld_${ key }` );

	}

	getKeyDown( key ) {

		if( !this.checkValidKey( key, "getKeyDown" ) ) { return; }

		return this.eventManager.eventActive( `keydown_${ key }` );

	}
	getKeyUp( key ) {

		if( !this.checkValidKey( key, "getKeyUp" ) ) { return; }

		return this.eventManager.eventActive( `keyup_${ key }` );

	}

	checkValidKey( key, functionName ) {

		if( key in KeyCodes ) return true;

		Console.warn(`Keyboard.${functionName}(): '${ key }' is not a valid key`);

		return false;

	}

}

const instance = new Keyboard();
export { instance as Keyboard };
