/**
 *	@author zwubs
 */

import { UnknownModel } from '../core/constants.js';

import * as Loaders from './loaders.js';

import * as Parsers from '../parsers/parsers.js';

import { EntityTemplate } from '../entities/entity-template.js';
import { EntityRegistry } from '../entities/entity-registry.js';

export let EntityLoader = new function() {

 	this.load = async function( url ) {

		let baseURL = url.substring(0, url.lastIndexOf("/") + 1 );

		let file = await Loaders.File.load( url );

		return this.loadFromText( file, baseURL );

	}

	this.loadFromText = async function( string, baseURL ) {

		let json;

		try { json = await Parsers.JSON.parse( string ); }
		catch( e ) { console.log(`JSON Parsing Error: ${e}`); }

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
		// template.geometry = UnknownModel;


		// Everything is loaded, finish template setup
		template.setup();

		// Register Entity Template
		EntityRegistry.registerEntity( template );

		return template;

	}

}
