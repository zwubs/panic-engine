/**
 *	@author zwubs
 */

let Element = document.createElement("div");

Element.id = "PANIC";

Element.style = `
	width: 100%;
	height: 100%;
	user-select: none;
`;

Element.tabIndex = 1;

document.body.appendChild( Element );

// Auto focus on PANIC
Element.focus();

export { Element };
