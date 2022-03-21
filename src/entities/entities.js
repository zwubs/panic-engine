/**
 *	@author zwubs
 */

import { EntityTemplateRegistry } from './entity-template-registry'
import { EntityTemplate } from './entity-template'
import { EntityLoader } from '../loaders/loader-entity'

import { SpatialHashGrid } from '../core/data-structures/spatial-hash-grid'

import { Updater } from '../core/updater'

import { Vector3 } from 'three'

class Entities {

	constructor() {

		this.maxEntityCount = 256;

		this.entities = {};

		this.hash = new SpatialHashGrid( [ 256, 256, 256 ], [ 256, 256, 256 ] );
		this.hashClients = {};

		Updater.add( this );

	}

	async load( url ) {

		return await EntityLoader.load( url );

	}

	/**
	 *	@description
	 */
	update() {

		for( const [ idA, entityA ] of Object.entries( this.entities ) ) {

			this.hash.updateClient( this.hashClients[ entityA.uuid ] );

			entityA.update();

			for( const [ idB, entityB ] of Object.entries( this.entities ) ) {

				if( idA != idB ) this.collision( entityA, idA, entityB, idB );

			}

		}

	}

	collision( entityA, idA, entityB, idB ) {

		let distance = 0;
		let direction = new Vector3()
		let zero = new Vector3();

		if( entityA.actions.eventManager.hasEvent("COLLIDE") ) {

			let collision = entityA.collider.isColliding( entityB.collider )

			if( collision ) {

				entityA.position.add( collision.multiplyScalar( 0.5 ) );
				entityB.position.add( collision.multiplyScalar(-0.5 ) );

				entityA.actions.eventManager.emit("COLLIDE");
				if( entityB.actions.eventManager.hasEvent("COLLIDE") ) entityB.actions.eventManager.emit("COLLIDE");

			}

		}

	}

	/**
	 *	@description
	 *	@param { String } id
	 */
	spawn( id ) {

		if( EntityTemplateRegistry.doesEntityExist( id ) ) {

			let entity = EntityTemplateRegistry.getEntityTemplateByID( id ).spawnEntity();

			this.entities[ entity.uuid ] = entity;
			this.hashClients[ entity.uuid ] = this.hash.newClient(
				[ entity.position.x, entity.position.y, entity.position.z ],
				[ entity.collider.boundingSphere.radius, entity.collider.boundingSphere.radius, entity.collider.boundingSphere.radius ]
			);

			return entity;

		}

	}

}

const instance = new Entities();
export { instance as Entities }
