/**
 *	Tracks Entity Templates
 *	@object
 */

import { Debug } from '../debug';
import { Entity } from './entity';
import { EntityTemplate } from './entity-template';

export class EntityRegistry {

	private data: EntityTemplate[] = []
	private entities = new Map<string, Entity>();

	public getEntityByName = (name: string) => this.data.find(o => o.name == name);
	public getEntityByID = (id: string) => this.data.find(o => o.id == id);
	public getEntityIndex = (entity: EntityTemplate) => this.data.indexOf(entity);

	/**
	 *	@param template - The template to register
	 */
	public registerEntity = (template: EntityTemplate) => {

		if (this.getEntityByID(template.id) == undefined) this.data.push(template);

		else Debug.warn(`Entity "${template.id}" is already registered`);

	}

	/**
	 *	@param id - The ID of the entity to unregister
	 */
	public unregisterEntity = (id: string) => {

		const entity = this.getEntityByID(id);
		if (entity == undefined) { Debug.warn(`Entity "${id}" hasn't been registered`); return; }

		const index = this.getEntityIndex(entity);
		if (index != undefined) delete this.data[index];

	}

	/**
	 *	@param {String} id
	 */
	public spawnEntity(id: string) {

		const template = this.getEntityByID(id);

		if (template != undefined) {

			let entity = template.spawnEntity();
			this.entities.set(entity.uuid, entity);
			return entity;

		}

	}

}
