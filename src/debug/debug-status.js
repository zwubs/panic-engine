/**
 * 	@author zwubs
 */

export let enabled = false;

export function enable() {

	enabled = true;

	console.info("[PANIC] Debug Mode Enabled");

 }

 export function disable() {

	enabled = false;

	console.info("[PANIC] Debug Mode Disabled");

 }

 export function toggle() { enabled = !enabled; }
