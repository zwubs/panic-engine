/**
 *
 */

import { Element } from '../core/dom/element';

let DebugElement = document.createElement("div");

DebugElement.id = "PANIC-Debug";

Element.appendChild(DebugElement);

export { DebugElement };
