/**
 *	@author zwubs
 *	@namespace PANIC.Parsers
 */

import { CubeUVParser } from './cube-uv.parser.js';
import { EntityModelParser } from './entity-model.parser.js';
import { JSONParser } from './json.parser.js';
import { TilesetParser } from './tileset.parser.js';

export namespace Parsers {

    export const JSON = JSONParser;
    export const Tileset = TilesetParser;
    export const CubeUV = CubeUVParser;
    export const EntityModel = EntityModelParser;

}