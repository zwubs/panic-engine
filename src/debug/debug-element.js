/**
 *
 */

import { Element } from '../core/dom/element.js';

let DebugElement = document.createElement("div");

DebugElement.style = `
	position: absolute;
	top: 0;
	color: #FFF;
`

DebugElement.id = "PANIC-Debug";

Element.appendChild( DebugElement );

export { DebugElement };
