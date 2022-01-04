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
    constructor( id, manager, once=false ) {

        super( id, manager, once );

        this.manager.element.addEventListener( this.id, this, { capture: true } );

    }

    /**
     *  @description Called by eventhandlers, but gives access to 'this'
     *  @param {Event} e - Event passed
     */
    handleEvent( e ) {

        e.preventDefault();

        this.emit( e );

        if( this.once ) this.manager.unregisterNativeEvent( this.id );

    }

    remove() {

        this.manager.element.removeEventListener( this.id, this, true );

        super.remove();

    }

}
