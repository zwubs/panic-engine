/**
 *	@author zwubs
 */

PANIC.Loaders.Texture = new function() {

	this.load = async function( url ) {

		let image = await PANIC.Loaders.Image.load( url );

		let texture = new PANIC.Texture( image );

		return texture;

	}

}
