/**
 *
 */

import { KeyCodes } from './keycodes.js'

let KeyMap = {};

for (var key in KeyCodes) {

	KeyMap[ KeyCodes[ key ] ] = key;

}

export { KeyMap };
