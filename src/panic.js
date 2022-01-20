/**
 *	@author zwubs
 *	@namespace PANIC
 *	@todo Decide what actually needs to be visible to the user.
 */

export let Version = "0.0.4";

/**
 *	@filespace {CORE}
 */
export { Scene } from './core/rendering/scene.js';
export { Camera } from './core/rendering/camera.js';
export { Renderer } from './core/rendering/renderer.js';
export { Clock } from './core/clock.js';
export { Updater } from './core/updater.js';
export { Cube } from './core/cube.js';
export { Texture } from './core/texture.js';
export { Controls as OrbitControls } from './core/input/orbit-controls.js';
export { Element } from './core/dom/element.js';

	/**
	 * 	@filespace {CORE/TILESET}
	 */
	export { Tile } from './core/tileset/tile.js';
	export { TileGroup } from './core/tileset/tilegroup.js';
	export { Tileset } from './core/tileset/tileset.js';

	/**
	 *	@filespace {EVENTS}
	 */
	export { EventManager } from './core/events/event-manager.js';

	/**
	 *	@filespace {INPUT}
	 */
	export * as Input from './core/input/input.js';


/**
 *	@filespace {ENTITIES}
 */
export { Entity } from './entities/entity.js';
export { EntityTemplate } from './entities/entity-template.js';
export { EntityRegistry } from './entities/entity-registry.js';


/**
 *	@filespace {COLLISION}
 */
export * as Collision from './collision/collision.js';

/**
 *	@filespace {SHADERS}
 */
export * as Shaders from './shaders/shaders.js';

/**
 *	@filespace {LOADERS}
 */
export * as Loaders from './loaders/loaders.js';

/**
 *	@filespace {PARSERS}
 */
export * as Parsers from './parsers/parsers.js';


/**
 *	@filespace {TOOLS}
 */
export { Tools } from './tools/tools.js';

/**
 *	@filespace {DEBUG}
 */
export * as Debug from './debug/debug.js';
