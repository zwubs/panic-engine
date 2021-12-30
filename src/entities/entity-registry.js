/**
 *	Tracks Entity Templates
 *	@object
 */

import { Scene } from '../core/rendering/scene.js';

import * as Debug from '../debug/debug.js';

class EntityRegistry {

	constructor() {

		this.data = [];

		this.entities = {};

	}

	getEntityByName( name ) { return this.data.find( o => o.name == name ); }
	getEntityByID( id ) { return this.data.find( o => o.id == id ); }
	getEntityIndexByID( id ) { return this.data.findIndex( o => o.id == id ); }

    /**
     *  @param {PANIC.EntityTemplate} template - The template of the tempalte to register
     */
    registerEntity( template ) {

        if( !this.getEntityByID( template.id ) ) this.data.push( template );

        else Debug.warn(`Entity "${template.id}" already registered`);

    }

	/**
	 *	@param {String} id
	 */
	unregisterEntity( id ) {

		if( this.getEntityByID( id ) ) {

			// Clear Array
			this.data = this.data.filter( entity => entity.id !== id );

			// Remove Entities
			for( let uuid in this.entities ) {

				let mesh = this.entities[uuid].mesh;

				mesh.geometry.dispose();
				mesh.material.dispose();
				Scene.remove( mesh );

				delete this.entities[uuid];

			}

		}

		else Debug.warn(`Entity "${template.id}" isn't registered`);

	}

	/**
	 *	@param {String} id
	 */
	spawnEntity( id ) {

		if( this.getEntityByID( id ) != undefined ) {

			let entity = this.getEntityByID( id ).spawnEntity();

			return this.entities[ entity.uuid ] = entity;

		}

	}

};

let instance = new EntityRegistry()
export { instance as EntityRegistry };
