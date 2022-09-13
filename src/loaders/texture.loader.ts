/**
 *	@author zwubs
 */

import { Texture } from '../core/texture';
import { ImageLoader } from './image.loader';

export namespace TextureLoader {

	export const load = async function (url: string) {
		const image = await ImageLoader.load(url);
		return new Texture(image);
	}

}
