/**
 *	@author zwubs
 *	@namespace PANIC.Parsers
 */

import { CubeUVParser } from './cube-uv.parser';
import { EntityModelParser } from './entity-model.parser';
import { JSONParser } from './json.parser';
import { TilesetParser } from './tileset.parser';

export namespace Parsers {

    export const JSON = JSONParser;
    export const Tileset = TilesetParser;
    export const CubeUV = CubeUVParser;
    export const EntityModel = EntityModelParser;

}