/**
 *	@author zwubs
 */

import { Texture } from '../core/texture.js';

import { ImageLoader } from './loader-image.js';

export let TextureLoader = new function() {

	this.load = async function( url ) {

		let image = await ImageLoader.load( url );

		let texture = new Texture( image );

		return texture;

	}

}
