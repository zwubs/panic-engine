/**
 *	@author zwubs
 *	@namespace PANIC.Loaders.Entity
 */

import { EntityTemplate } from '../entities/entity-template';
import { EntityRegistry } from '../entities/entity-registry';
import { FileLoader } from './file.loader';
import { TextureLoader } from './texture.loader';
import { Parsers } from '../parsers';

export namespace EntityLoader {

	export const load = async function (url: string) {

		const baseURL = url.substring(0, url.lastIndexOf("/") + 1);
		const file = await FileLoader.load(url);
		const json = await Parsers.JSON.parse(file);

		const texture = await TextureLoader.load(baseURL + json.texture);
		const tileset = await Parsers.Tileset.parse(json.tileset, json.id);
		const geometry = await Parsers.EntityModel.parse(json.armature, texture, tileset);

		const template = new EntityTemplate(texture, tileset, geometry);
		template.id = json.id;
		template.name = json.name;

		EntityRegistry.registerTemplate(template);

		return template;

	}

}
