/**
 *	@author zwubs
 */

import { FileLoader } from './loader-file.js';
import { TextureLoader } from './loader-texture.js';

import * as Parsers from '../parsers/parsers.js';
import { Actions } from '../core/input/actions.js';

import { BlockTemplate } from '../blocks/block-template.js';

export let BlockLoader = new function() {

	this.load = async function( url ) {

		console.log( url )

		let baseURL = url.substring(0, url.lastIndexOf("/") + 1 );

		let file = await FileLoader.load( url );

		let json = await Parsers.JSON.parse( file );

		let template = new BlockTemplate();

		// Grab ID & Name
		template.id = json.id;
		template.name = json.name;

		// Parse Geometry Data
		template.geometry = await Parsers.BlockModel.parse( json.geometry, template );

		return template;

	}

}
