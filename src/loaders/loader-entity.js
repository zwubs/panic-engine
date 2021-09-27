/**
 *	@author zwubs
 */

import * as Loaders from './loaders.js';

import * as Parsers from '../parsers/parsers.js';

import { EntityTemplate } from '../entities/entity-template.js';
import { EntityRegistry } from '../entities/entity-registry.js';

export let EntityLoader = new function() {

 	this.load = async function( url ) {

		let baseURL = url.substring(0, url.lastIndexOf("/") + 1 );

		let file = await Loaders.File.load( url );

		let json = await Parsers.JSON.parse( file );

		let template = new EntityTemplate();

		// Grab ID & Name
		template.id = json.id;
		template.name = json.name;

		// Load Image & Create Texture
		template.texture = await Loaders.Texture.load( baseURL + json.texture );

		// Create Tileset
		template.tileset = await Parsers.Tileset.parse( json.tileset, json.id );

		// Parse Geometry Data
		template.geometry = await Parsers.EntityModel.parse( json.armature, template );

		// Everything is loaded, finish template setup
		template.setup();

		// Register Entity Template
		EntityRegistry.registerEntity( template );

	}

}
