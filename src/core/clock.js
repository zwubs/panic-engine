/**
 *  @author zwubs
 *  @namespace PANIC.Clock
 *  @description Keeps track of the current time, as well as delta and lag
 */


class Clock {

	consturctor() {

		this.time = 0.0; // Current Time
		this.past = 0.0; // Last Time
		this.delta = 0.0; // Time Difference

		this.framecap = 60;

	}

	/**
	 *  @param time {Number} - time variable passed from requestAnimationFrame
	 */
	update( time ) {

		this.past = this.time;
		this.time = time;

		// delta = time difference / perfect framerate
		this.delta = ( this.time - this.past ) / ( 1000 / this.framecap );

	}

	/**
	 *  @param round {Boolean} - should the number be rounded
	 */
	seconds( round = false ) {

		return ( round ? Math.floor( this.time / ( 1000 ) ) : this.time / ( 1000 ));

	}

	minutes( round = false ) {

		return ( round ? Math.floor( this.time / ( 1000 * 60 ) ) : this.time / ( 1000 * 60 ) );

	}

	hours( round = false ) {

		return ( round ? Math.floor( this.time / ( 1000 * 60 * 60 ) ) : this.time / ( 1000 * 60 * 60 ) );

	}

	/**
	 *
	 */
	get seconds() { return this.seconds(); }
	get minutes() { return this.minutes(); }
	get hours() { return this.hours(); }

}

export { Clock };
