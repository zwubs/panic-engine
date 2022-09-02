/**
 *	@author zwubs
 */

import { Texture } from '../core/texture';
import { Loaders } from '.';

export namespace TextureLoader {

	export const load = async function (url: string) {
		const image = await Loaders.Image.load(url);
		return new Texture(image);
	}

}
