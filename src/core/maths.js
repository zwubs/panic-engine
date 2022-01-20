/**
 *	@author zwubs
 *	@description functions that are used throughout the PANIC Engine
 */

class Maths {

	constructor() {}

	/**
	 *	@description
	 *	@param { Number } x
	 *	@param { Number } a
	 *	@param { Number } b
	 */
	lerp( x, a, b ) { return x * ( b - a ) + a; }

	/**
	 *	@description
	 *	@param { Number } x
	 *	@param { Number } a
	 *	@param { Number } b
	 */
	clamp( x, a, b ) { return Math.min( Math.max( x, a ), b ); }

	/**
	 *	@description
	 *	@param { Number } x
	 */
	sat( x ) { return Math.min( Math.max( x, 0.0 ), 1.0 ); }

}

let instance = new Maths();
export { instance as Maths };
