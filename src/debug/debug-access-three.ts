/**
 *	@author zwubs
 *	@description Make the PANIC namespace global
 */

import { Debug } from '.'

declare global {
    interface Window { THREE: any; }
}

class THREEAccess {

    THREE: any

    async enable() {
        if (Debug.enabled) {
            if (this.THREE == undefined) this.THREE = await import("three")
            if (window.THREE != this.THREE) {
                window.THREE = this.THREE
                Debug.warn(`[PANIC] Namespace 'THREE' has been made global`)
            } else {
                Debug.error(`[PANIC] Namespace 'THREE' is already global`)
            }
        }
    }

    disable() {
        if (Debug.enabled) {
            if (this.THREE != undefined && window.THREE == this.THREE) {
                window.THREE = undefined
                Debug.warn(`[PANIC] Namespace 'THREE' has been made private`)
            } else {
                Debug.error(`[PANIC] Namespace 'THREE' is already private`)
            }
        }
    }

    toggle() {
        if (window.THREE != this.THREE) {
            this.enable()
        } else {
            this.disable()
        }
    }
}

let instance = new THREEAccess()
export { instance as THREEAccess }
