/**
 *  @author zwubs
 */

import { Event } from './event.js'

export class NativeEvent extends Event {

	/**
	 *  @param {String} id - A string acting as identification for this event.
	 *  @param { EventManager } mananger - EventManager of this event
	 *  @param { Boolean } once - Optional boolean signifying the event should only ever run once.
	 */
	constructor( id, manager, loop, store ) {

		super( id, manager, loop, store );

		this.manager.element.addEventListener( this.id, this, { capture: true } );

	}

	/**
	 *  @description Called by eventhandlers, but gives access to 'this'
	 *  @param {Event} e - Event passed
	 */
	handleEvent( e ) {

		e.preventDefault();

		this.emit( e );

	}

	remove() {

		this.manager.element.removeEventListener( this.id, this, true );

		this.manager.unregisterEvent( this.id );

	}

}
