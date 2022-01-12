/**
 *	@author zwubs
 */

import { MouseButtonCodes, MouseButtonMap } from './mouse-consts.js';

import { EventManager } from '../../events/event-manager.js'

import * as Console from '../../../debug/debug-console.js';

class Mouse {

	constructor() {

		this.eventManager = new EventManager();

		this.eventManager.registerNativeEvent( "mousedown" );

		this.eventManager.on( "mousedown", this.handleButtonDown.bind(this) );

		this.eventManager.registerNativeEvent( "mouseup" );

		this.eventManager.on( "mouseup", this.handleButtonUp.bind(this) );

		this.eventManager.registerNativeEvent( "click" );

		this.eventManager.on( "click", this.handleClick.bind(this) );

		this.eventManager.registerNativeEvent( "mousemove" );

		this.eventManager.on( "mousemove", this.handleMove.bind(this) );

		this.eventManager.registerNativeEvent( "wheel" );

		this.eventManager.on( "wheel", this.handleScroll.bind(this) );

		this.registerMouseEvents();

		this.eventManager.registerNativeEvent( "blur" );

		this.eventManager.on( "blur", this.handleBlur.bind(this) );

	}

	/**
	 * 	@description Registers all events for the
	 * 	@todo Optimize to only use necessary events
	 */
	registerMouseEvents() {

		for ( let btn in MouseButtonCodes ) {

			this.eventManager.registerEvent( `MOUSE_DOWN_${btn}` );
			this.eventManager.registerEvent( `MOUSE_UP_${btn}` );
			this.eventManager.registerEvent( `MOUSE_CLICK_${btn}` );
			this.eventManager.registerEvent( `MOUSE_HELD_${btn}` );

		}

		this.eventManager.registerEvent( `MOUSE_SCROLL`, false, true );

		this.eventManager.registerEvent( `MOUSE_MOVE`, false, true );

	}

	/**
	 *	@HEADER {} BUTTONS
	 */

	/**
	 * 	@param {Event} e - Event from "mouseup" event listener
	 */
	handleButtonUp( e ) {

		this.eventManager.emit( `MOUSE_UP_${MouseButtonMap[ e.button ]}`, {} );

		this.eventManager.breakLoop( `MOUSE_HELD_${MouseButtonMap[ e.button ]}` );

	}

	/**
	 * 	@param {Event} e - Event from "mousedown" event listener
	 */
	handleButtonDown( e ) {

		this.eventManager.emit( `MOUSE_DOWN_${MouseButtonMap[ e.button ]}`, {} );

		this.eventManager.emit( `MOUSE_HELD_${MouseButtonMap[ e.button ]}`, {}, true );

	}

	/**
	 * 	@param {Event} e - Event from "mousedown" event listener
	 */
	handleClick( e ) {

		this.eventManager.emit( `MOUSE_CLICK_${MouseButtonMap[ e.button ]}`, {} );

	}


	/**
	 * @description Event is fired as long as the button is held down
	 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
	 * @param {Function} func Function to be executed when event is recieved
	 */
	onButton( btn, func ) {

		if( !this.checkValidButton( btn, "onButton" ) ) { return; }

		this.eventManager.on( `MOUSE_HELD_${ btn }`, func );

	}

	/**
	 * @description Event is fired only on the first instance of the button being pressed
	 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
	 * @param {Function} func Function to be executed when event is recieved
	 */
	onButtonDown( btn, func ) {

		if( !this.checkValidButton( btn, "onButtonDown" ) ) { return; }

		this.eventManager.on( `MOUSE_DOWN_${ btn }`, func );

	}

	/**
	 * @description Event is fired only on the first instance of the button being unpressed
	 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
	 * @param {Function} func Function to be executed when event is recieved
	 */
	onButtonUp( btn, func ) {

		if( !this.checkValidButton( btn, "onButtonUp" ) ) { return; }

		this.eventManager.on( `MOUSE_UP_${ btn }`, func );

	}

	/**
	 * @description Event is fired when the button is pressed and released successfully
	 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
	 * @param {Function} func Function to be executed when event is recieved
	 */
	onClick( btn, func ) {

		if( !this.checkValidButton( btn, "onClick" ) ) { return; }

		this.eventManager.on( `MOUSE_CLICK_${ btn }`, func );

	}

	/**
	 * @description Returns a Boolean based on wether the button is being held down
	 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
	 * @return {Boolean}
	 */
	getButton( btn ) {

		if( !this.checkValidButton( btn, "getButton" ) ) { return; }

		return this.eventManager.eventActive( `MOUSE_HELD_${ btn }` );

	}

	/**
	 * @description Returns a Boolean based on the first instance of a button being pressed
	 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
	 * @return {Boolean}
	 */
	getButtonDown( btn ) {

		if( !this.checkValidButton( btn, "getButtonDown" ) ) { return; }

		return this.eventManager.eventActive( `MOUSE_DOWN_${ btn }` );

	}

	/**
	 * @description Returns a Boolean based on the first instance of a button being unpressed
	 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
	 * @return {Boolean}
	 */
	getButtonUp( btn ) {

		if( !this.checkValidButton( btn, "getButtonUp" ) ) { return; }

		return this.eventManager.eventActive( `MOUSE_UP_${ btn }` );

	}

	/**
	 * @description Returns a Boolean based on wether a successful down and up event occured
	 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
	 * @return {Boolean}
	 */
	getClick( btn ) {

		if( !this.checkValidButton( btn, "getClick" ) ) { return; }

		return this.eventManager.eventActive( `MOUSE_CLICK_${ btn }` );

	}

	/**
	 * @description Checks that a given buttonID is valid
	 * @param  {String} btn ID used is signify the button, values available in MouseButtonCodes
	 * @param  {String} functionName Function name to be logged is something goes wrong
	 * @return {Boolean}
	 */
	checkValidButton( btn, functionName ) {

		if( btn in MouseButtonCodes ) return true;

		Console.warn(`Mouse.${functionName}(): '${ btn }' is not a valid button`);

		return false;

	}

	/**
	 *	@HEADER {} WHEEL / SCROLL
	 */

	/**
	 * 	@param {Event} e - Event from "wheel" event listener
	 */
	handleScroll( e ) {

		 this.eventManager.emit( `MOUSE_SCROLL`, { direction: Math.sign( e.deltaY ) } );

	}

	getScroll() {

		return this.eventManager.eventActive( `MOUSE_SCROLL` );

	}

	getScrollAmount() {

		return this.eventManager.getStore( `MOUSE_SCROLL` );

	}

	 /**
	  * @param {Function} func Function to be executed when event is recieved
	  */
	 onScroll( func ) {

		 this.eventManager.on( `MOUSE_SCROLL`, func );

	 }


	/**
	 *	@HEADER {} MOVEMENT
	 */

	/**
	 * 	@param {Event} e - Event from "mousemove" event listener
	 */
	handleMove( e ) {

		this.eventManager.emit( 'MOUSE_MOVE', { x: e.x, y: e.y } );

	}

	/**
	 * @param {Function} func Function to be executed when event is recieved
	 */
	onMove( func ) {

		this.eventManager.on( 'MOUSE_MOVE', func );

	}

	getMove() {

		return this.eventManager.eventActive( 'MOUSE_MOVE' );

	}

	/**
	 *
	 */
	getPosition() {

		return this.eventManager.getStore( 'move' );

	}


	/**
	 *	@HEADER {} BLUR
	 */
	handleBlur( e ) {

		this.eventManager.clearQueue();

	}

}

const instance = new Mouse();
export { instance as Mouse };
