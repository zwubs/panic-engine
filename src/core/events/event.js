/**
 *  @author zwubs
 */

export class Event {

	/**
	 *  @param {String} id - A string acting as identification for this event.
	 *  @param { Boolean } once - Optional boolean signifying the event should only ever run once.
	 */
	constructor( id, manager, loop=false, store=false ) {

		this.id = id;
		this.manager = manager;

		this.loop = loop;
		this.store = store;

		if( store ) this.manager.store[ this.id ] = null;

		this.aliases = {};

		/**
		 *  @description An array of functions that are listening for the emit.
		 */
		this.functions = [];

	}

	emit( data=null ) {

		if( this.store ) this.manager.store[ this.id ] = data;

		this.functions.forEach( ( func, index ) => func.bind( this.manager.binding, data ).apply( null, null ) );

	}

	/**
	 *  @description Add a function into the functions variable to be alerted on an emit
	 */
	add( func ) {

		this.functions.push( func );

	}

	addAlias( eventAlias ) { this.aliases[ eventAlias.id ] = eventAlias; }

	removeAlias( aliasID ) { delete this.aliases[ aliasID ]; this.manager.unregisterEventAlias( eventAlias.id ); }

	/**
	 *  @description Empty the array
	 */
	clear() {

		this.functions = [];

	}

}
