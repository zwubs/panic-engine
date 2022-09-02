/**
 *
 */

import { Element } from '../core/dom/element.js';

let DebugElement = document.createElement("div");

DebugElement.id = "PANIC-Debug";

Element.appendChild(DebugElement);

export { DebugElement };
