/**
 *  @author zwubs
 *  @note Custom events are fired on update. NativeEvents are fired when available.
 */

import { Event } from './event.js'
import { NativeEvent } from './native-event.js'

import { NativeEventList } from './native-event-list.js'

import { Element } from '../dom/element.js'

import { Updater } from '../updater.js'

import * as Console from '../../debug/debug-console.js';

export class EventManager {

    constructor( element ) {

        this.events = {};

        // Storage events waiting for the next game update/tick
		this.queue = {};

        // Storage of data for aquiring later
        this.store = {};

        this.element = element ? element : Element;

        Updater.add( this );

    }

    /**
     *  @description Register a custom event
     */
	registerEvent( eventID, loop, store ) {

        if( NativeEventList.includes( eventID ) ) {

            Console.warn(`EventManager.registerEvent(): '${eventID}' is a NativeEvent and cannot be registered`);

            return false;

        }
        // If already registered, warn & skip
        else if( eventID in this.events ) {

            Console.warn(`EventManager.registerEvent(): '${eventID}' already registered in EventManager`);

            return false;

        }

		this.events[ eventID ] = new Event( eventID, this, loop, store );

	}

    /**
     *  @description Remove an event from this EventManager
     */
    unregisterEvent( eventID ) {

        if( !( eventID in this.events ) ) {

            Console.warn(`EventManager.unregisterEvent(): '${eventID}' isn't registered in EventManager`);

            return false;

        }

        this.events[ eventID ].clear();

        delete this.events[ eventID ];

    }

    /**
     *  @description Register a native event, such as 'keydown'
     */
    registerNativeEvent( eventID, loop, store ) {

        if( !( NativeEventList.includes( eventID ) ) ) {

            Console.warn(`EventManager.registerNativeEvent(): '${eventID}' is not a NativeEvent`);

            return false;

        }

        if( eventID in this.events ) {

            Console.warn(`EventManager.registerNativeEvent(): ${eventID} already registered in EventManager`);

            return false;

        }

		this.events[ eventID ] = new NativeEvent( eventID, this, loop, store );

    }

    /**
     *  @description unregisters the event using the normal function
     */
    unregisterNativeEvent( eventID ) {

        this.unregisterEvent( eventID );

    }

	/**
	 * 	@description
	 */
	hasEvent( eventID ) {

		return this.events.hasOwnProperty( eventID );

	}

    /**
     *  @param {String} eventID - A string acting as identification for the event.
     *  @param {Object} data - Data to be passed to all listeners
     */
    emit( eventID, data, loop=false ) {

        if( !( eventID in this.events ) ) {

            Console.warn(`EventManager.emit(): '${eventID}' isn't registered in EventManager`);

            return false;

        }

        if( this.events[ eventID ] instanceof NativeEvent ) {

            Console.warn(`EventManager.emit(): NativeEvent '${eventID}' cannot be emitted by user.`);

            return false;

        }

        this.queue[ eventID ] = { loop: loop, data: data };

    }


	/**
	 * @description Check if an event is currently in the queue
	 * @param  {String} eventID A string acting as identification for the event.
	 * @return {Boolean}
	 */
	eventActive( eventID ) {

		if( !this.hasEvent( eventID ) ) {

            Console.warn(`EventManager.hasEvent(): '${eventID}' isn't registered in EventManager`);

            return false;

        }

        return this.queue.hasOwnProperty( eventID );

	}

    /**
	 * @description Get the value currently stored in this.store for this event
	 * @param {String} eventID A string acting as identification for the event.
	 * @return {Boolean}
	 */
    getStore( eventID ) {

        if( !this.store.hasOwnProperty( eventID ) ) {

            Console.warn(`EventManager.getStore(): '${eventID}' isn't registered in EventManager`);

            return false;

        }

        return this.store[ eventID ];

	}



    /**
     * @param {String} eventID A string acting as identification for the event.
     */
    breakLoop( eventID ) {

        if( eventID in this.queue ) this.queue[ eventID ].loop = false;

    }

    /**
     *  @param {String} eventID A string acting as identification for the event.
     *  @param {Function} func Data to be passed to all listeners
     */
    on( eventID, func ) {

        if( !( eventID in this.events ) ) {

            Console.warn(`EventManager.on(): '${eventID}' isn't registered in EventManager`);

            return false;

        }

        if( typeof func !== "function" ) {

            Console.warn(`EventManager.on( '${eventID}', ${func} ): 2nd paramater must be Function`);

            return false;

        }

        this.events[ eventID ].add( func );

    }

    /**
     *  @description Called every frame to emit all events.
     */
    update() {

        for ( const [key, value] of Object.entries( this.queue ) ) {

            this.events[ key ].emit( value.data );

            if( value.loop == false ) { delete this.queue[ key ]; }

        }

    }

};
