/**
 *	@author zwubs
 */

import { Texture } from '../core/texture.js';

import { ImageLoader } from './loader-image.js';

export let TextureLoader = new function() {

	this.load = async function( url ) {

<<<<<<< HEAD
		let image = await ImageLoader.load( url );
=======
		let image = await ImageLoaders.load( url );
>>>>>>> 2aa3de4fed2d029302f93210194de39a8496f090

		let texture = new Texture( image );

		return texture;

	}

}
