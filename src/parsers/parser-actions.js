/**
 *	@author zwubs
 */

import { Actions } from '../core/input/actions.js'

class ActionsParser {

    consturctor() {}

    /**
     *  @param {Object} json
     */
	parse( json ) {

        let actions = new Actions;

        for( const [ action, bindings ] of Object.entries( json ) ) {

            actions.registerAction( action );

            for( let binding of bindings ) {

                actions.addInputBinding( action, binding );

            }

        }

        return actions;

	}

}

let instance = new ActionsParser();
export { instance as ActionsParser };
