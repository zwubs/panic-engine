/**
 *	@author zwubs
 *	@namespace PANIC.Loaders.Entity
 */

import { EntityTemplate } from '../entities/entity-template';
import { EntityRegistry } from '../entities/entity-registry';
import { Loaders } from './loaders';
import { Parsers } from '../parsers/parsers';

export namespace EntityLoader {

	export const load = async function (url: string) {

		const baseURL = url.substring(0, url.lastIndexOf("/") + 1);
		const file = await Loaders.File.load(url);
		const json = await Parsers.JSON.parse(file);

		const texture = await Loaders.Texture.load(baseURL + json.texture);
		const tileset = await Parsers.Tileset.parse(json.tileset, json.id);
		const geometry = await Parsers.EntityModel.parse(json.armature, texture, tileset);

		const template = new EntityTemplate(texture, tileset, geometry);
		template.id = json.id;
		template.name = json.name;

		EntityRegistry.registerEntity(template);

		return template;

	}

}
