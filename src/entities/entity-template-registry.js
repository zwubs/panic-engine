/**
 *	Tracks Entity Templates
 *	@object
 */

import { EntityTemplate } from './entity-template.js';

import * as Debug from '../debug/debug-console.js';

class EntityTemplateRegistry {

	constructor() {

		this.data = {};

	}

	/**
	 *	@description
	 *  @param { String } id
	 */
	getEntityTemplateByID( id ) {

		if( id in this.data ) return this.data[ id ];

		Debug.warn(`getEntityByID(): Entity '${id}' doesn't exist`);

		return undefined;

	}

	/**
	 *	@description
	 *  @param { String } id
	 */
	doesEntityExist( id ) {

		if( id in this.data ) return true;
		else return false;

	}

	/**
	 *	@description
	 *  @param { EntityTemplate } template - The template of the template to register
	 *	@returns { EntityTemplate }
	 */
	registerEntityTemplate( template ) {

		let id = template.id;

		if( !( template instanceof EntityTemplate ) ) {

			Debug.warn(`registerEntityTemplate(): '${ id }' isn't an EntityTemplate`);

			return undefined;

		}

		if( !( this.doesEntityExist( id ) ) ) return this.data[ id ] = template;

		Debug.warn(`registerEntityTemplate(): Entity '${ id }' already exists`);

		return undefined;

	}

	/**
	 *	@description
	 *	@param { String } id
	 */
	unregisterEntityTemplate( id ) {

		if( this.doesEntityExist( id ) ) delete this.data[ id ];

		else Debug.warn(`unregisterEntityTemplate(): Entity '${ id }' doesn't exists`);

	}

};

let instance = new EntityTemplateRegistry();
export { instance as EntityTemplateRegistry };
