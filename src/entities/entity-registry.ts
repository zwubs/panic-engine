/**
 *	Tracks Entity Templates
 *	@object
 */

import { Debug } from '../debug';
import { Entity } from './entity';
import { EntityTemplate } from './entity-template';

class EntityRegistry {

	private templates = new Map<string, EntityTemplate>();
	private entities = new Map<string, Entity>();

	public getTemplateByID = (id: string) => this.templates.get(id);
	public getEntityByID = (id: string) => this.entities.get(id);

	/**
	 *	@param template - The template to register
	 */
	public registerTemplate = (template: EntityTemplate) => {

		if (this.templates.has(template.id)) Debug.warn(`Entity "${template.id}" is already registered and is being replaced.`);

		this.templates.set( template.id, template );

	}

	/**
	 *	@param id - The ID of the template to unregister
	 */
	public unregisterTemplate = (id: string) => {

		if (!this.templates.delete(id)) Debug.warn(`Entity "${id}" hasn't been registered`);

	}

	/**
	 *	@param id - The template ID of the entity you'd like to spawn
	 */
	public spawnEntity(id: string) {

		const template = this.getTemplateByID(id);
		if (template === undefined) return;

		let entity = template.spawnEntity();
		this.entities.set(entity.uuid, entity);
		return entity;

	}

}

const instance = new EntityRegistry();
export { instance as EntityRegistry };