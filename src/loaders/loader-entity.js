/**
 *	@author zwubs
 */

PANIC.Loaders.Entity = new function() {

	this.load = async function( url ) {

		let baseURL = url.substring(0, url.lastIndexOf("/") + 1 );

		let file = await PANIC.Loaders.File.load( url );

		let json = await PANIC.Parsers.JSON.parse( file );

		let template = new PANIC.EntityTemplate();

		// Grab ID & Name
		template.id = json.id;
		template.name = json.name;

		// Load Image & Create Texture
		template.texture = await PANIC.Loaders.Texture.load( baseURL + json.texture );

		// Create Tileset
		template.tileset = await PANIC.Parsers.Tileset.parse( json.tileset, json.id );

		// Parse Geometry Data
		template.geometry = await PANIC.Parsers.EntityModel.parse( json.armature, template );

		// Everything is loaded, finish template setup
		template.setup();

		// Register Entity Template
		PANIC.EntityRegistry.registerEntity( template );

	}

}
