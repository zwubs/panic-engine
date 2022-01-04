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

document.body.appendChild( Element );

export { Element };
