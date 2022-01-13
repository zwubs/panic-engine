/**
 *	@author zwubs
 */

import { DebugEntityCollision as DebugCollision } from './debug-entity-collision.js'

import { Updater } from '../../core/updater.js'

class EntityDebug {

	constructor( entity ) {

		entity.debug = this;

		this.entity = entity;

		this._collision = null;

		Updater.add( this );

	}

	set collision( bool ) {

		if( bool == true && this._collision == null ) {
			this._collision = new DebugCollision( this.entity );
		}
		else if( bool == false && this._collision != null ) {}
		else {}

	}

	update() {

		if( this._collision != null ) { this._collision.update(); }

	}

}

let EntityDebugFunction = function( entity ) {

	return entity.debug = new EntityDebug( entity );

}

export { EntityDebugFunction as EntityDebug }
