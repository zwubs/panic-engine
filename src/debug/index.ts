/**
 *  @author zwubs
 */

import { DebugAxes } from "./debug-axes";
import { DebugElement } from "./debug-element";
import { DebugGrid } from "./debug-grid";
import { DebugText } from "./debug-text";
import { DebugCompass } from './debug-compass';

export namespace Debug {

    export let enabled = false;

    export const enable = () => {
        enabled = true;
        console.info("[PANIC] Debug Mode Enabled");
    }

    export function disable() {
        enabled = false;
        console.info("[PANIC] Debug Mode Disabled");
    }

    export function toggle() { enabled ? disable() : enable(); }

    /**
     * 	Send a message to the console
     *	@param text - The message to log
     *  @param css - Styling to apply to the message
     */
    export function log(text: string, css?: string) { if (Debug.enabled) css ? console.log(text, css) : console.log(text); }

    /**
     * 	Send a warning message to the console
     *	@param text - The warning to log
     */
    export function warn(text: string) { if (Debug.enabled) { console.warn(text); } }

    /**
     * 	Send an error message to the console
     *	@param text - The error to log
     */
    export function error(text: string) { if (Debug.enabled) { console.error(text); } }

    /**
     * 	Clear the console
     */
    export function clear() { if (Debug.enabled) { console.clear(); } }

    export const Compass = DebugCompass;
    export const Axes = DebugAxes;
    export const Grid = DebugGrid;

    export const Element = DebugElement;
    export const Text = DebugText;

}
