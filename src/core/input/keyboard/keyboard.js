/**
 *	@author zwubs
 */

import { KeyCodes, KeyMap } from './keyboard-consts.js';

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

	}

	/**
	 * 	@description Registers all events for the
	 * 	@todo Optimize to only use necessary events
	 */
	registerKeyEvents() {

		for ( let key in KeyCodes ) {

			this.eventManager.registerEvent( `down_${key}` );
			this.eventManager.registerEvent( `up_${key}` );
			this.eventManager.registerEvent( `held_${key}` );

		}

	}

	/**
	 * 	@param {Event} e - Event from "keyup" event listener
	 */
	handleKeyUp( e ) {

		this.eventManager.emit( `up_${KeyMap[ e.keyCode ]}`, {} );

		this.eventManager.breakLoop( `held_${KeyMap[ e.keyCode ]}` );

	}

	/**
	 * 	@param {Event} e - Event from "keydown" event listener
	 */
	handleKeyDown( e ) {

		if( e.repeat ) return;

		this.eventManager.emit( `down_${KeyMap[ e.keyCode ]}`, {} );

		this.eventManager.emit( `held_${KeyMap[ e.keyCode ]}`, {}, true );

	}


	/**
	 * @description Event is fired as long as the key is held down
	 * @param {String} key ID used is signify the key, values available in KeyCodes
	 * @param {Function} func Function to be executed when event is recieved
	 */
	onKey( key, func ) {

		if( !this.checkValidKey( key, "onKey" ) ) { return; }

		this.eventManager.on( `held_${ key }`, func );

	}

	/**
	 * @description Event is fired only on the first instance of the key being pressed
	 * @param {String} key ID used is signify the key, values available in KeyCodes
	 * @param {Function} func Function to be executed when event is recieved
	 */
	onKeyDown( key, func ) {

		if( !this.checkValidKey( key, "onKeyDown" ) ) { return; }

		this.eventManager.on( `down_${ key }`, func );

	}

	/**
	 * @description Event is fired only on the first instance of the key being unpressed
	 * @param {String} key ID used is signify the key, values available in KeyCodes
	 * @param {Function} func Function to be executed when event is recieved
	 */
	onKeyUp( key, func ) {

		if( !this.checkValidKey( key, "onKeyUp" ) ) { return; }

		this.eventManager.on( `up_${ key }`, func );

	}

	/**
	 * @description Returns a Boolean based on wether the key is being held down
	 * @param {String} key ID used is signify the key, values available in KeyCodes
	 * @return {Boolean}
	 */
	getKey( key ) {

		if( !this.checkValidKey( key, "getKey" ) ) { return; }

		return this.eventManager.eventActive( `held_${ key }` );

	}

	/**
	 * @description Returns a Boolean based on the first instance of a key being pressed
	 * @param {String} key ID used is signify the key, values available in KeyCodes
	 * @return {Boolean}
	 */
	getKeyDown( key ) {

		if( !this.checkValidKey( key, "getKeyDown" ) ) { return; }

		return this.eventManager.eventActive( `down_${ key }` );

	}

	/**
	 * @description Returns a Boolean based on the first instance of a key being unpressed
	 * @param {String} key ID used is signify the key, values available in KeyCodes
	 * @return {Boolean}
	 */
	getKeyUp( key ) {

		if( !this.checkValidKey( key, "getKeyUp" ) ) { return; }

		return this.eventManager.eventActive( `up_${ key }` );

	}


	/**
	 * @description Checks that a given keyID is actually valid
	 * @param  {String} key ID used is signify the key, values available in KeyCodes
	 * @param  {String} functionName Function name to be logged is something goes wrong
	 * @return {Boolean}
	 */
	checkValidKey( key, functionName ) {

		if( key in KeyCodes ) return true;

		Console.warn(`Keyboard.${functionName}(): '${ key }' is not a valid key`);

		return false;

	}

}

const instance = new Keyboard();
export { instance as Keyboard };
