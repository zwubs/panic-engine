/**
 *	@author zwubs
 */

export class Component {

	constructor() {

		this.parent = null;

		this.components = [];

	}

	/**
	 *	@description Add a component as a child
	 *	@param {Component} component
	 */
	addComponent( component ) {

		if( component === this ) return;
		if( !( component instanceof this.constructor ) ) return;

		this.components.push( component );

		component.parent = this;

	}

	/**
	 *	@description Remove a component from the children
	 *	@param {Component} component
	 */
	removeComponent( component ) {

		const index = this.components.indexOf( component );

		if ( index !== -1 ) {

			component.parent = null;
			this.components.splice( index, 1 );

		}

	}

	/**
	 *	@description Update child components
	 */
	update() {

		for( component of this.components ) {

			component.update();

		}

	}

}
