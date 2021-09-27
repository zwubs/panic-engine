/**
 *	Tracks Entity Templates
 *	@object
 */

import * as Debug from '../debug/debug.js';

class EntityRegistry {

	constructor() {

		this.data = [];

	}

	getEntityByName( name ) { return this.data.find( o => o.name == name ); }
	getEntityByID( id ) { return this.data.find( o => o.id == id ); }

    /**
     *  @param {PANIC.EntityTemplate} template - The template of the tempalte to register
     */
    registerEntity( template ) {

        if( this.getEntityByID( template.id ) == undefined ) this.data.push( template );

        else Debug.warn("Entity \"" + entity.id + "\" is already registered");

    }

	/**
	 *	@param {String} id
	 */
	unregisterEntity( id ) {

		if( this.getEntityByID( template.id ) != undefined ) delete this.getEntityByID( template.id );

	}

	/**
	 *	@param {String} id
	 */
	spawnEntity( id ) {

		if( this.getEntityByID( id ) != undefined ) return this.getEntityByID( id ).spawnEntity();

	}

};

let instance = new EntityRegistry()
export { instance as EntityRegistry };
