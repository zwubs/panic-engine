/**
 *	@author zwubs
 */

import { Actions } from '../core/input/actions.js'

import { ActionScriptLoader } from '../loaders/loader-action-script.js'

class ActionsParser {

	consturctor() {}

	/**
	 *  @param {Object} json
	 */
	async parse( actionsJSON, bindingsJSON, baseURL ) {

		let actions = new Actions;

		for( const [ action, url ] of Object.entries( actionsJSON ) ) {

			if( action != "bindings" ) {

				actions.registerAction( action );

				let scriptString = await ActionScriptLoader.load( baseURL + url );

				actions.on( action, new Function( scriptString )() );

			}

		}

		for( const [ action, bindings ] of Object.entries( bindingsJSON ) ) {

			for( let binding of bindings ) {

				actions.addInputBinding( action, binding );

			}

		}

		return actions;

	}

}

let instance = new ActionsParser();
export { instance as ActionsParser };
