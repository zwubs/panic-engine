/**
 *	Tracks Entity Templates
 *	@object
 */

import { Debug } from '../debug';
import { Entity } from './entity';
import { EntityTemplate } from './entity-template';

class EntityRegistry {

	data: EntityTemplate[] = []
	entities = new Map<string, Entity>();

	getEntityByName(name: string) { return this.data.find(o => o.name == name); }
	getEntityByID(id: string) { return this.data.find(o => o.id == id); }
	getEntityIndex(entity: EntityTemplate) { return this.data.indexOf(entity) }

	/**
	 *  @param {PANIC.EntityTemplate} template - The template of the tempalte to register
	 */
	registerEntity(template: EntityTemplate) {

		if (this.getEntityByID(template.id) == undefined) this.data.push(template);

		else Debug.warn(`Entity "${template.id}" is already registered`);

	}

	/**
	 *	@param {String} id
	 */
	unregisterEntity(id: string) {

		const entity = this.getEntityByID(id);
		if (entity == undefined) { Debug.warn(`Entity "${id}" hasn't been registered`); return; }

		const index = this.getEntityIndex(entity);
		if (index != undefined) delete this.data[index];

	}

	/**
	 *	@param {String} id
	 */
	spawnEntity(id: string) {

		const template = this.getEntityByID(id);

		if (template != undefined) {

			let entity = template.spawnEntity();
			return this.entities.set(entity.uuid, entity);

		}

	}

};

let instance = new EntityRegistry();
export { instance as EntityRegistry };
