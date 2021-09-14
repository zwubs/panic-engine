/**
 *	@author zwubs
 *	@extends {THREE.Texture}
 */

class Texture extends THREE.Texture {

	constructor( image ) {

		if( !( image instanceof Image ) ) image = PANIC.Unknown;

		super( image );

		this.generateMipmaps = false;

		this.magFilter = THREE.NearestFilter;
		this.minFilter = THREE.LinearFilter;

		this.premultiplyAlpha = true;

		this.encoding = THREE.sRGBEncoding;

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
