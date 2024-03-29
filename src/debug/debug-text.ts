/**
 *	@author zwubss
 */

import { DebugElement } from './debug-element';

class DebugText {

	id = "PANIC-Debug-Text";
	element = document.createElement("div");
	active = false;

	constructor() { this.element.id = this.id; }

	toggle() {

		if (DebugElement.querySelector(`#${this.id}`)) {
			DebugElement.removeChild(this.element);
		}
		else {
			DebugElement.appendChild(this.element);
		}

	}

	set(text: string) {

		this.element.innerHTML = text;

	}

}

let instance = new DebugText();
export { instance as DebugText };
