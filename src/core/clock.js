/**
 *  @author zwubs
 *  @namespace PANIC.Clock
 *  @description Keeps track of the current time, as well as delta and lag
 */


PANIC.Clock = new function() {

    this.time = 0.0; // Current Time
    this.past = 0.0; // Last Time
    this.delta = 0.0; // Time Difference

    this.framecap = 60;

    /**
     *  @param time {Number} - time variable passed from requestAnimationFrame
     */
    this.update = function( time ) {

        this.past = this.time;
        this.time = time;

        // delta = time difference / perfect framerate
        this.delta = ( this.time - this.past ) / ( 1000 / this.framecap );

    }

    this.tick = function() {

        return Math.floor( this.time / ( 1000 / this.framecap ) );

    }

    /**
     *  @param round {Boolean} - should the number be rounded
     */
    this.seconds = function( round = false ) {

        return ( round ? Math.floor( this.time / ( 1000 ) ) : this.time / ( 1000 ));

    }

    this.minutes = function( round = false ) {

        return ( round ? Math.floor( this.time / ( 1000 * 60 ) ) : this.time / ( 1000 * 60 ) );

    }

    this.hours = function( round = false ) {

        return ( round ? Math.floor( this.time / ( 1000 * 60 * 60 ) ) : this.time / ( 1000 * 60 * 60 ) );

    }

}

/**
 *  Getters & Setters
 */
