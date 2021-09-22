/**
 *	@author zwubs
 */

import * as Status from './debug-status.js'

/**
 * 	@description Log a debug message to the console
 *	@param {String} txt Message to log
 */
export function log( txt ) { if( Status.enabled ) { console.log( txt ); } }

/**
 * 	@description Send a warning message to the console
 *	@param {String} txt warning to log
 */
export function warn( txt ) { if( Status.enabled ) { console.warn( txt ); } }

/**
 * 	@description Send an error message to the console
 *	@param {String} txt error to log
 */
export function error( txt ) { if( Status.enabled ) { console.error( txt ); } }

/**
 * 	@description Clear the console
 */
export function clear() { if( Status.enabled ) { console.clear(); } }

/**
 * 	@description Log a debug message to the
 *	@param {String} Text - Message to log
 *	@param {String} CSS - Styling to add to log message ( Chrome )
 */
export function style( txt, css ) {

	if( typeof css !== 'string' || !( css instanceof String ) ) { css = ""; }

	if(  Status.enabled  ) { console.log( txt, css ); }

}
