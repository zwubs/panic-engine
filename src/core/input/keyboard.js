/**
 *	@author zwubs
 */

PANIC.Input.Keyboard = new function() {

	this.enabled = true;

	this.keys = {};

	/**
	 *  @param {KeyboardEvent} event
	 */
	this.onKeyDown = function( event ) { PANIC.Input.Keyboard.keys[ event.code ] = true; }

	window.addEventListener( 'keydown', this.onKeyDown );

	/**
	 *  @param {KeyboardEvent} event
	 */
	this.onKeyUp = function( event ) { PANIC.Input.Keyboard.keys[ event.code ] = false; }

	window.addEventListener( 'keyup', this.onKeyUp );


	this.isDown = function( code ) { return (this.keys[ code ] ? true : false); }

	this.isUp = function( code ) { return (this.keys[ code ] ? false : true); }

}
