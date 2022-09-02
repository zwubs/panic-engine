/**
 *  @author zwubs
 *  @namespace PANIC.Clock
 *  @description Keeps track of the current time, as well as delta and lag
 */


class Clock {

	time = 0;
	past = 0;
	delta = 0;
	framecap = 60;

	update(time: number) {

		this.past = this.time;
		this.time = time;

		// delta = time difference / perfect framerate
		this.delta = (this.time - this.past) / (1000 / this.framecap);

	}

	get milliseconds() { return this.time; }
	get seconds() { return this.calculateSeconds(true); }
	get minutes() { return this.calculateMinutes(true); }
	get hours() { return this.calculateHours(true); }

	calculateSeconds(round = false) {

		return (round ? Math.floor(this.time / (1000)) : this.time / (1000));

	}

	calculateMinutes(round = false) {

		return (round ? Math.floor(this.time / (1000 * 60)) : this.time / (1000 * 60));

	}

	calculateHours(round = false) {

		return (round ? Math.floor(this.time / (1000 * 60 * 60)) : this.time / (1000 * 60 * 60));

	}

}

export { Clock };
