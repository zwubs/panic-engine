/**
 *  @author zwubs
 *  @namespace PANIC.Debug
 */

PANIC.Debug = {};

// Create Debug Element Element
PANIC.Debug.Element = document.createElement("div");
PANIC.Debug.Element.id = "PANIC-Debug";

PANIC.Debug.Element.style.position = "absolute";
PANIC.Debug.Element.style.top = "0px";
PANIC.Debug.Element.style.left = "0px";

PANIC.Debug.Element.style.margin = "5px";

PANIC.Debug.Element.style.color = "#FFF";
PANIC.Debug.Element.style.mixBlendMode = "difference";

PANIC.Element.appendChild( PANIC.Debug.Element );

PANIC.Debug.enable = function() {

	this.enabled = true;

	console.info("[PANIC] Debug Mode Enabled");

}

PANIC.Debug.disable = function() {

	this.enabled = false;

	console.info("[PANIC] Debug Mode Disabled");

}

PANIC.Debug.log = function( txt ) { if( PANIC.Debug.enabled ) { console.log( txt ); } }

PANIC.Debug.warn = function( txt ) { if( PANIC.Debug.enabled ) { console.warn( txt ); } }

PANIC.Debug.error = function( txt ) { if( PANIC.Debug.enabled ) { console.error( txt ); } }

PANIC.Debug.clear = function() { if( PANIC.Debug.enabled ) { console.clear(); } }

/**
 * 	@description Log a debug message to the
 *	@param {String} Text - Message to log
 *	@param {String} CSS - Styling to add to log message ( Chrome )
 */
PANIC.Debug.style = function( txt, css ) {

	if( typeof css !== 'string' || !( css instanceof String ) ) { css = ""; }

	if( PANIC.Debug.enabled ) { console.log( txt, css ); }

}

/**
 *	@reference ./debug-grid.js
 */
PANIC.Debug.Grid = null;

/**
 *	@reference ./debug-axes.js
 */
PANIC.Debug.Axes = null;
