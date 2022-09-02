/**
 *  @namespace PANIC.Updater
 */

/*
	Pass in either a function you want updated, or an object with an "update" function already defined
*/

class Updater {

	data: UpdaterFunction[] = [];
	pass = 0;

	update() {

		this.pass++;

		for (let i = 0; i < this.data.length; i++) {

			if (this.pass % this.data[i].interval == 0) {

				if (typeof this.data[i].object["update"] === "function") {

					this.data[i].object.update();

				}

			}

		}

	}

	/**
	 *  @param object {Object} - The object holding the function
	 */
	add(object: any, interval = 1) { this.data.push(new UpdaterFunction(object, interval)); }

}

const instance = new Updater();
export { instance as Updater };

/**
 *  @class
 */
class UpdaterFunction {

	object: any
	interval: number

	constructor(object: any, interval = 1) {

		this.object = object;
		this.interval = (interval <= 0) ? 1 : interval;

	}

}
