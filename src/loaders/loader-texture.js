/**
 *	@author zwubs
 */

import { Texture } from '../core/texture.js';

import * as Loaders from './loaders.js';

export let TextureLoader = new function() {

	this.load = async function( url ) {

		let image = await Loaders.Image.load( url );

		let texture = new Texture( image );

		return texture;

	}

}
