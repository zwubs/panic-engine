/**
 *  @author zwubs
 */

import { Event } from './event.js'
import { NativeEvent } from './native-event.js'

import { NativeEventList } from './native-event-list.js'

import { Element } from '../dom/element.js'

import * as Debug from '../../debug/debug-console.js';

export class EventManager {

    constructor( element ) {

        this.events = {};

        this.element = Element;

    }

    /**
     *  @description Register a custom event
     */
	registerEvent( eventID, once ) {

        if( NativeEventList.includes( eventID ) ) {

            Debug.warn(`EventManager.registerEvent(): '${eventID}' is a NativeEvent and cannot be registered`);

            return;

        }
        // If already registered, warn & skip
        else if( eventID in this.events ) {

            Debug.warn(`EventManager.registerEvent(): '${eventID}' already registered in EventManager`);

            return;

        }
		this.events[ eventID ] = new Event( eventID, this, once );

	}

    /**
     *  @description Remove an event from this EventManager
     */
    unregisterEvent( eventID ) {

        if( !( eventID in this.events ) ) {

            Debug.warn(`EventManager.unregisterEvent(): '${eventID}' isn't registered in EventManager`);

            return;

        }

        this.events[ eventID ].clear();

        delete this.events[ eventID ];

    }

    /**
     *  @description Register a native event, such as 'keydown'
     */
    registerNativeEvent( eventID, once ) {

        if( !( NativeEventList.includes( eventID ) ) ) {

            Debug.warn(`EventManager.registerNativeEvent(): '${eventID}' is not a NativeEvent`);

            return;

        }

        if( eventID in this.events ) {

            Debug.warn(`EventManager.registerNativeEvent(): ${eventID} already registered in EventManager`);

            return;

        }

		this.events[ eventID ] = new NativeEvent( eventID, this, once );

    }

    /**
     *  @description unregisters the event using the normal function
     */
    unregisterNativeEvent( eventID ) {

        this.unregisterEvent( eventID );

    }


    /**
     *  @param {String} eventID - A string acting as identification for the event.
     *  @param {Object} data - Data to be passed to all listeners
     */
    emit( eventID, data ) {

        if( !( eventID in this.events ) ) {

            Debug.warn(`EventManager.emit(): '${eventID}' isn't registered in EventManager`);

            return;

        }

        if( this.events[ eventID ].native ) {

            Debug.warn(`EventManager.emit(): NativeEvent '${eventID}' cannot be emitted by user.`);

            return;

        }

        this.events[ eventID ].emit( data );

    }

    /**
     *  @param {String} eventID - A string acting as identification for the event.
     *  @param {Function} func - Data to be passed to all listeners
     */
    on( eventID, func ) {

        if( !( eventID in this.events ) ) {

            Debug.warn(`EventManager.on(): '${eventID}' isn't registered in EventManager`);

            return;

        }

        if( typeof func !== "function" ) {

            Debug.warn(`EventManager.on( '${eventID}', ${func} ): 2nd paramater must be Function`);

            return;

        }

        this.events[ eventID ].add( func );

    }

};

export { ResizeRenderer } from './resize-renderer.js';
