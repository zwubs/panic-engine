/**
 *	@author zwubs
 */
export let JSONParser = new function() {

	this.parse = function( string ) {

		return window.JSON.parse( string );

	}

}
