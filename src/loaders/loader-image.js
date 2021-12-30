/**
 *	@author zwubs
 */

import { UnknownImage } from '../core/constants.js';

export let ImageLoader = new function() {

	this.load = async function( url ) {

		return await new Promise(resolve => {

             let image = new Image();

	         image.addEventListener( 'load', () => { resolve( image ); } );

			 image.addEventListener( 'error', () => { resolve( UnknownImage ); } );

	         image.src = url;

	    });

	}

}
