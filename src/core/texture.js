/**
 *	@author zwubs
 *	@extends {THREE.Texture}
 */

import { Texture as TEXTURE, NearestFilter, LinearFilter, sRGBEncoding, RepeatWrapping } from 'three';

class Texture extends TEXTURE {

	constructor( image ) {

		if( !( image instanceof Image ) ) image = PANIC.Unknown;

		super( image );

		this.generateMipmaps = false;

		this.magFilter = NearestFilter;
		this.minFilter = LinearFilter;

		this.wrapS = RepeatWrapping;
		this.wrapT = RepeatWrapping;

		// TODO: Check if necessary
		this.premultiplyAlpha = true;

		this.encoding = sRGBEncoding;

		this.needsUpdate = true;

	}


	/*
		Getters & Setters
	*/

	get width() { return this.image.width; }
	get w() { return this.image.width; }

	get height() { return this.image.height; }
	get h() { return this.image.height; }

}

export { Texture };
