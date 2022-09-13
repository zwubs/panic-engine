/**
 *	@author zwubss
 */

import { Updater } from '../core/updater';
import { Camera } from '../core/rendering/camera';
import { DebugElement } from './debug-element';

import { Spherical, Vector3 } from 'three';

let spherical = new Spherical();

enum CompassStates {
	CardinalDirections = 0,
	CartesianDirections = 1,
	CartesianCoordinates = 2
}

class DebugCompass {

	id = "PANIC-Debug-Compass";
	element = document.createElement("div");
	state: CompassStates = CompassStates.CardinalDirections;

	constructor() { this.element.id = this.id; }

	get isActive() { return !!DebugElement.querySelector(`#${this.id}`) }

	toggle() {

		if (DebugElement.querySelector(`#${this.id}`)) {
			DebugElement.removeChild(this.element);
			Updater.remove(this);
		}
		else {
			DebugElement.appendChild(this.element);
			Updater.add(this, 15);
		}

	}

	update() {

		var string = "";
		var direction = new Vector3(0, 0, 0);
		Camera.getWorldDirection(direction);

		if (this.state == CompassStates.CardinalDirections) {

			var radians = Math.atan2(direction.x, direction.z);
			var degrees = Math.round(radians / Math.PI * 180);

			if (degrees >= 112.5 || degrees <= -112.5) string += "N";
			else if (degrees >= -67.5 && degrees <= 67.5) string += "S";
			if (degrees >= 22.5 && degrees <= 157.5) string += "E";
			else if (degrees >= -157.5 && degrees <= -22.5) string += "W";

		}

		else if (this.state == CompassStates.CartesianDirections) {

			spherical.setFromVector3(direction);
			spherical.makeSafe();

			let phi = Math.round(spherical.phi / Math.PI * 180);
			let theta = Math.round(spherical.theta / Math.PI * 180);

			if (theta > 0) string += "+X";
			else if (theta < 0) string += "-X";
			else string += "±X";

			if (phi > 90) string += " +Y";
			else if (phi < 90) string += " -Y";
			else string += " ±Y";

			if (Math.abs(theta) > 90) string += " +Z";
			else if (Math.abs(theta) < 90) string += " -Z";
			else string += " ±Z"

		}

		else if (this.state == CompassStates.CartesianCoordinates) {

			spherical.setFromVector3(direction);
			spherical.makeSafe();

			let phi = Math.round(spherical.phi / Math.PI * 180);
			let theta = Math.round(spherical.theta / Math.PI * 180);

			string = `${phi} ${theta}`;

		}

		this.element.innerHTML = `Facing: ${string}`;

	}

}

const instance = new DebugCompass();
export { instance as DebugCompass };
