/**
 *  @namespace PANIC.Updater
 */

/*
    Pass in either a function you want updated, or an object with an "update" function already defined
*/

PANIC.Updater = new function() {

    this.data = [];

    // The number of passes that the updater has gone through
    this.pass = 0;

    this.update = function() {

        this.pass++;

        for( let i = 0; i < this.data.length; i++ ) {

            if( this.pass % this.data[ i ].interval == 0 ) {

                this.data[ i ].object[ this.data[ i ].name ]();

            }

        }

    }

    /**
     *  @param id {String} - Unique ID of the PANIC.UpdaterFunction
     *  @param object {Object} - The object holding the function
     *  @param name {String} - The name of the function to be updated
     *  @param interval {Number} - The
     */
    this.add = function( id, object, name, interval ) { this.data.push( new PANIC.UpdaterFunction( id, object, name, interval ) ); }

    /**
     *  @param id {String}
     */
    this.remove = function( id ) {

        var object = this.getById( id )

        this.data = this.data.filter( id => object.id == id );

    }

    /**
     *  @param id {String}
     */
    this.getById = function( id ) { return this.data.find( o => o.id == id ); }

}

/**
 *  @class
 */
PANIC.UpdaterFunction = function( id, object, name, interval=1 ) {

    this.id = id;
    this.object = object;
    this.name = name;
    this.interval = ( interval <= 0 ) ? 1 : interval;

}
