/**
 *  @author zwubs
 */

export class Event {

    /**
     *  @param {String} id - A string acting as identification for this event.
     *  @param { Boolean } once - Optional boolean signifying the event should only ever run once.
     */
    constructor( id, manager, once=false ) {

		this.id = id;
        this.manager = manager;

		// Either continual or once
        this.once = once ? true : false;

        /**
         *  @description An array of functions that are listening for the emit.
         */
        this.functions = [];

    }

    emit( data ) {

        this.functions.forEach( ( func, index ) => func.apply( null, [ data ] ) );

        if( this.once ) this.remove();

    }

    /**
     *  @description Add a function into the functions variable to be alerted on an emit
     */
    add( func ) {

        this.functions.push( func );

    }

    /**
     *  @description Empty the array
     */
    clear() {

        this.functions = [];

    }

    /**
     *  @description Remove even from EventManager
     */
    remove() {

        this.manager.unregisterEvent( this.id );

    }

}
