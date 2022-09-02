/**
 *	@author zwubs
 *	@namespace PANIC
 *	@todo Decide what actually needs to be visible to the user.
 */

export let Version = "0.0.4"

/**
 *	@filespace {CORE}
 */
export { Scene } from "./core/rendering/scene"
export { Camera } from "./core/rendering/camera"
export { Renderer } from "./core/rendering/renderer"
export { Clock } from "./core/clock"
export { Updater } from "./core/updater"
export { Cube } from "./core/cube"
export { Texture } from "./core/texture"
export { Element } from "./core/dom/element"

/**
 * 	@filespace {CORE/TILESET}
 */
export { Tile } from "./core/tileset/tile"
export { TileGroup } from "./core/tileset/tile-group"
export { Tileset } from "./core/tileset/tileset"


/**
 *	@filespace {ENTITIES}
 */
export { Entity } from "./entities/entity"
export { EntityTemplate } from "./entities/entity-template"
export { EntityRegistry } from "./entities/entity-registry"

/**
 *	@filespace {SHADERS}
 */
export * as Shaders from "./shaders"

/**
 *	@filespace {LOADERS}
 */
export * as Loaders from "./loaders"

/**
 *	@filespace {PARSERS}
 */
export * as Parsers from "./parsers"

/**
 *	@filespace {TOOLS}
 */
export { Tools } from "./tools"

/**
 *	@filespace {DEBUG}
 */
export * as Debug from "./debug"
