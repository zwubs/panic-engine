/**
 *	@author zwubs
 *	@namespace PANIC.Loaders
 */

import { FileLoader } from './file.loader';
import { ImageLoader } from './image.loader';
import { TextureLoader } from './texture.loader';
import { EntityLoader } from './entity.loader'

export namespace Loaders {

    export const File = FileLoader;
    export const Image = ImageLoader;
    export const Texture = TextureLoader;
    export const Entity = EntityLoader;

}