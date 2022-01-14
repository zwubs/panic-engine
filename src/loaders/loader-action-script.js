/**
 *	@author zwubs
 */

import { FileLoader } from './loader-file.js';

export let ActionScriptLoader = new function() {

	this.load = async function( url ) {

		let file = await FileLoader.load( url );

		return file;

	}

}
