/**
 *	@author zwubs
 */

import { FileLoader } from './loader-file.js';
import { TextureLoader } from './loader-texture.js';

import * as Parsers from '../parsers/parsers.js';
import { Actions } from '../core/input/actions.js';

import { EntityTemplate } from '../entities/entity-template.js';
import { EntityRegistry } from '../entities/entity-registry.js';

export let EntityLoader = new function() {

	this.load = async function( url ) {

		let baseURL = url.substring(0, url.lastIndexOf("/") + 1 );

		let file = await FileLoader.load( url );

		let json = await Parsers.JSON.parse( file );

		let template = new EntityTemplate();

		// Grab ID & Name
		template.id = json.id;
		template.name = json.name;

		if( json.actions ) template.actions = await Parsers.Actions.parse( json.actions, json.bindings, baseURL );
		else template.actions = new Actions();

		if( json.collision ) template.collider = await Parsers.Collision.parse( json.collision );

		// Load Image & Create Texture
		template.texture = await TextureLoader.load( baseURL + json.texture );

		// Create Tileset
		template.tileset = await Parsers.Tileset.parse( json.tileset, json.id );

		// Parse Geometry Data
		template.geometry = await Parsers.EntityModel.parse( json.armature, template );

		// Everything is loaded, finish template setup
		template.setup();

		// Register Entity Template
		EntityRegistry.registerEntity( template );

		return template;

	}

}
