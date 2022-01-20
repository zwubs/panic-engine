(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.PANIC = {}, global.THREE));
})(this, (function (exports, three) { 'use strict';

	/**
	 *	@author zwubs
	 */

	class Scene extends three.Scene {

		constructor() {

			super();

			this.background = new three.Color( 0x222222 );
			this.fog = new three.FogExp2( new three.Color( 0x222222 ), 0.025 );

			this.add( new three.HemisphereLight( 0xFFFFFF, 0xFFFFFF, 1.00 ) );

			let dirLight = new three.DirectionalLight( 0xFFFFFF, 1.25 );
			dirLight.castShadow = true;

			dirLight.shadow.mapSize.width = 2048;
			dirLight.shadow.mapSize.height = 2048;

			dirLight.shadow.camera.near = 0.01;
			dirLight.shadow.camera.far = 25;

			dirLight.shadow.bias = -0.001;

			dirLight.position.set( 0.5, 1, -0.75 );
			dirLight.position.multiplyScalar( 3 );

			this.add( dirLight );

		}

	}

	const instance$f = new Scene();

	/**
	 *	@author zwubs
	 */

	class Camera extends three.PerspectiveCamera {

		constructor() {

			super( 45, 1920/1080, 0.1, 1000 );

			this.position.set( 0, 1, -4 );
			this.aspect = window.innerWidth / window.innerHeight;
			this.updateProjectionMatrix();

		}

	}

	const instance$e = new Camera();

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

	/**
	 *	@author zwubs
	 */

	let Canvas = document.createElement('canvas');

	Canvas.id = "PANIC-Canvas";

	Element.appendChild( Canvas );

	/**
	 *  @author zwubs
	 */

	class Event {

		/**
		 *  @param {String} id - A string acting as identification for this event.
		 *  @param { Boolean } once - Optional boolean signifying the event should only ever run once.
		 */
		constructor( id, manager, loop=false, store=false ) {

			this.id = id;
			this.manager = manager;

			this.loop = loop;
			this.store = store;

			if( store ) this.manager.store[ this.id ] = null;

			this.aliases = {};

			/**
			 *  @description An array of functions that are listening for the emit.
			 */
			this.functions = [];

		}

		emit( data=null ) {

			if( this.store ) this.manager.store[ this.id ] = data;

			this.functions.forEach( ( func, index ) => func.bind( this.manager.binding, data ).apply( null, null ) );

		}

		/**
		 *  @description Add a function into the functions variable to be alerted on an emit
		 */
		add( func ) {

			this.functions.push( func );

		}

		addAlias( eventAlias ) { this.aliases[ eventAlias.id ] = eventAlias; }

		removeAlias( aliasID ) { delete this.aliases[ aliasID ]; this.manager.unregisterEventAlias( eventAlias.id ); }

		/**
		 *  @description Empty the array
		 */
		clear() {

			this.functions = [];

		}

	}

	/**
	 *  @author zwubs
	 */

	class EventAlias {

		constructor( alias, event ) {

			this.id = alias;
			this.event = event;

			this.event.addAlias( this );

		}

		set loop( value ) { this.event.loop = value; }
		get loop() { return this.event.loop; }
		get store() { return this.event.store; }

		emit( data ) { this.event.emit( data ); }

		add( func ) { this.event.add( func ); }

		clear( ) { this.event.clear(); }

	}

	/**
	 *  @author zwubs
	 */

	class NativeEvent extends Event {

		/**
		 *  @param {String} id - A string acting as identification for this event.
		 *  @param { EventManager } mananger - EventManager of this event
		 *  @param { Boolean } once - Optional boolean signifying the event should only ever run once.
		 */
		constructor( id, manager, loop, store ) {

			super( id, manager, loop, store );

			this.manager.element.addEventListener( this.id, this, { capture: true } );

		}

		/**
		 *  @description Called by eventhandlers, but gives access to 'this'
		 *  @param {Event} e - Event passed
		 */
		handleEvent( e ) {

			e.preventDefault();

			this.emit( e );

		}

		remove() {

			this.manager.element.removeEventListener( this.id, this, true );

			this.manager.unregisterEvent( this.id );

		}

	}

	/**
	 *  @description A list of all exclusively native events
	 */
	let NativeEventList = [
		"copy",
		"cut",
		"paste",
		"abort",
		"blur",
		"focus",
		"auxclick",
		"beforeinput",
		"canplay",
		"canplaythrough",
		"change",
		"click",
		"close",
		"contextmenu",
		"cuechange",
		"dblclick",
		"drag",
		"dragend",
		"dragenter",
		"dragexit",
		"dragleave",
		"dragover",
		"dragstart",
		"drop",
		"durationchange",
		"emptied",
		"ended",
		"formdata",
		"input",
		"invalid",
		"keydown",
		"keypress",
		"keyup",
		"load",
		"loadeddata",
		"loadedmetadata",
		"loadend",
		"loadstart",
		"mousedown",
		"mouseenter",
		"mouseleave",
		"mousemove",
		"mouseout",
		"mouseover",
		"mouseup",
		"wheel",
		"pause",
		"play",
		"playing",
		"progress",
		"ratechange",
		"reset",
		"resize",
		"scroll",
		"securitypolicyviolation",
		"seeked",
		"seeking",
		"select",
		"slotchange",
		"stalled",
		"submit",
		"suspend",
		"timeupdate",
		"volumechange",
		"waiting",
		"selectstart",
		"selectionchange",
		"toggle",
		"pointercancel",
		"pointerdown",
		"pointerup",
		"pointermove",
		"pointerout",
		"pointerover",
		"pointerenter",
		"pointerleave",
		"gotpointercapture",
		"lostpointercapture",
		"mozfullscreenchange",
		"mozfullscreenerror",
		"animationcancel",
		"animationend",
		"animationiteration",
		"animationstart",
		"transitioncancel",
		"transitionend",
		"transitionrun",
		"transitionstart",
		"webkitanimationend",
		"webkitanimationiteration",
		"webkitanimationstart",
		"webkittransitionend",
		"error",
		"fullscreenchange",
		"fullscreenerror",

		"gamepadconnected",
		"gamepaddisconnected"
	];

	/**
	 *  @namespace PANIC.Updater
	 */

	/*
		Pass in either a function you want updated, or an object with an "update" function already defined
	*/

	class Updater {

		constructor() {

			this.data = [];

			// The number of passes that the updater has gone through
			this.pass = 0;

		}

		update() {

			this.pass++;

			for( let i = 0; i < this.data.length; i++ ) {

				if( this.pass % this.data[ i ].interval == 0 ) {

					if( typeof this.data[i].object[ "update" ] === "function" ) {

						this.data[i].object.update();

					}

				}

			}

		}

		/**
		 *  @param object {Object} - The object holding the function
		 */
		add( object, interval=1 ) { this.data.push( new UpdaterFunction( object, interval ) ); }

		remove( object ) { }

	}

	const instance$d = new Updater();

	/**
	 *  @class
	 */
	class UpdaterFunction {

		constructor( object, interval=1 ) {

			this.object = object;
			this.interval = ( interval <= 0 ) ? 1 : interval;

		}

	}

	/**
	 * 	@author zwubs
	 */

	let enabled = false;

	function enable() {

		enabled = true;

		console.info("[PANIC] Debug Mode Enabled");

	 }

	 function disable() {

		enabled = false;

		console.info("[PANIC] Debug Mode Disabled");

	 }

	 function toggle() { enabled = !enabled; }

	/**
	 *	@author zwubs
	 */

	/**
	 * 	@description Log a debug message to the console
	 *	@param {String} txt Message to log
	 */
	function log( txt ) { if( enabled ) { console.log( txt ); } }

	/**
	 * 	@description Send a warning message to the console
	 *	@param {String} txt warning to log
	 */
	function warn( txt ) { if( enabled ) { console.warn( txt ); } }

	/**
	 * 	@description Send an error message to the console
	 *	@param {String} txt error to log
	 */
	function error( txt ) { if( enabled ) { console.error( txt ); } }

	/**
	 * 	@description Clear the console
	 */
	function clear() { if( enabled ) { console.clear(); } }

	/**
	 * 	@description Log a debug message to the
	 *	@param {String} Text - Message to log
	 *	@param {String} CSS - Styling to add to log message ( Chrome )
	 */
	function style( txt, css ) {

		if( typeof css !== 'string' || !( css instanceof String ) ) { css = ""; }

		if(  enabled  ) { console.log( txt, css ); }

	}

	/**
	 *  @author zwubs
	 *  @note Custom events are fired on update. NativeEvents are fired when available.
	 */

	class EventManager {

		constructor( element, binding ) {

			this.active = true;

			this.events = {};

			// Storage events waiting for the next game update/tick
			this.queue = {};

			// Storage of data for aquiring later
			this.store = {};

			this.element = element ? element : Element;
			this.binding = binding ? binding : window;

			instance$d.add( this );

		}

		/**
		 *  @description Register a custom event
		 */
		registerEvent( eventID, loop, store ) {

			if( NativeEventList.includes( eventID ) ) {

				warn(`EventManager.registerEvent(): '${eventID}' is a NativeEvent and cannot be registered`);

				return false;

			}
			// If already registered, warn & skip
			else if( eventID in this.events ) {

				warn(`EventManager.registerEvent(): '${eventID}' already registered in EventManager`);

				return false;

			}

			this.events[ eventID ] = new Event( eventID, this, loop, store );

		}

		/**
		 *  @param {String} alias
		 *  @param {String} eventID
		 */
		 registerEventAlias( alias, eventID ) {

			 if( NativeEventList.includes( alias ) ) {

				 warn(`EventManager.registerEventAlias(): '${alias}' is a NativeEvent and cannot be registered`);

				 return false;

			 }

			 else if( NativeEventList.includes( eventID ) ) {

				 warn(`EventManager.registerEventAlias(): NativeEvent '${eventID}' cannot be given an alias`);

				 return false;

			 }

			 else if( alias in this.events ) {

				 warn(`EventManager.registerEventAlias(): '${alias}' is already registered`);

				 return false;

			 }

			 else if( !(eventID in this.events ) ) {

				 warn(`EventManager.registerEventAlias(): '${eventID}' isnt' registered`);

				 return false;

			 }

			 this.events[ alias ] = new EventAlias( alias, this.events[ eventID ] );

		 }

		/**
		 *  @description Remove an event from this EventManager
		 */
		unregisterEvent( eventID ) {

			if( !( eventID in this.events ) ) {

				warn(`EventManager.unregisterEvent(): '${eventID}' isn't registered in EventManager`);

				return false;

			}

			for( let eventAlias in this.events[ eventID ].aliases ) this.unregisterEventAlias( this.events[ eventID ].aliases[ eventAlias ].id );

			this.events[ eventID ].clear();

			delete this.events[ eventID ];

		}

		unregisterEventAlias( alias ) {

			if( !( alias in this.events ) ) {

				warn(`EventManager.unregisterEventAlias(): '${alias}' is already registered`);

				return false;

			}

			delete this.events[ alias ];

		}

		/**
		 *  @description Register a native event, such as 'keydown'
		 */
		registerNativeEvent( eventID, loop, store ) {

			if( !( NativeEventList.includes( eventID ) ) ) {

				warn(`EventManager.registerNativeEvent(): '${eventID}' is not a NativeEvent`);

				return false;

			}

			if( eventID in this.events ) {

				warn(`EventManager.registerNativeEvent(): ${eventID} already registered in EventManager`);

				return false;

			}

			this.events[ eventID ] = new NativeEvent( eventID, this, loop, store );

		}

		/**
		 *  @description unregisters the event using the normal function
		 */
		unregisterNativeEvent( eventID ) {

			this.unregisterEvent( eventID );

		}

		/**
		 *  @description Clears the queue of all current events;
		 */
		clearQueue() {

			this.queue = {};

		}

		/**
		 * 	@description
		 */
		hasEvent( eventID ) {

			return this.events.hasOwnProperty( eventID );

		}

		/**
		 *  @param {String} eventID - A string acting as identification for the event.
		 *  @param {Object} data - Data to be passed to all listeners
		 */
		emit( eventID, data, loop=false ) {

			if( !( eventID in this.events ) ) {

				warn(`EventManager.emit(): '${eventID}' isn't registered in EventManager`);

				return false;

			}

			if( this.events[ eventID ] instanceof NativeEvent ) {

				warn(`EventManager.emit(): NativeEvent '${eventID}' cannot be emitted by user.`);

				return false;

			}

			if( this.active ) {

				if( this.events[ eventID ] instanceof EventAlias ) { this.queue[ this.events[ eventID ].event.id ] = { loop: loop, data: data }; }

				else this.queue[ eventID ] = { loop: loop, data: data };

			}

		}


		/**
		 * @description Check if an event is currently in the queue
		 * @param  {String} eventID A string acting as identification for the event.
		 * @return {Boolean}
		 */
		eventActive( eventID ) {

			if( !this.hasEvent( eventID ) ) {

				warn(`EventManager.hasEvent(): '${eventID}' isn't registered in EventManager`);

				return false;

			}

			return this.queue.hasOwnProperty( eventID );

		}

		/**
		 * @description Get the value currently stored in this.store for this event
		 * @param {String} eventID A string acting as identification for the event.
		 * @return {Boolean}
		 */
		getStore( eventID ) {

			if( !this.store.hasOwnProperty( eventID ) ) {

				warn(`EventManager.getStore(): '${eventID}' isn't registered in EventManager`);

				return false;

			}

			return this.store[ eventID ];

		}



		/**
		 * @param {String} eventID A string acting as identification for the event.
		 */
		breakLoop( eventID ) {

			if( this.events[ eventID ] instanceof EventAlias ) {
				if( this.events[ eventID ].event.id in this.queue ) {
					this.queue[ this.events[ eventID ].event.id ].loop = false;
				}
			}
			else if( eventID in this.queue ) this.queue[ eventID ].loop = false;

		}

		/**
		 *  @param {String} eventID A string acting as identification for the event.
		 *  @param {Function} func Data to be passed to all listeners
		 */
		on( eventID, func ) {

			if( !( eventID in this.events ) ) {

				warn(`EventManager.on(): '${eventID}' isn't registered in EventManager`);

				return false;

			}

			if( typeof func !== "function" ) {

				warn(`EventManager.on( '${eventID}', ${func} ): 2nd paramater must be Function`);

				return false;

			}

			this.events[ eventID ].add( func );

		}

		/**
		 *  @description Called every frame to emit all events.
		 */
		update() {

			if( this.active ) {

				for ( const [key, value] of Object.entries( this.queue ) ) {

					this.events[ key ].emit( value.data );

					if( value.loop == false ) { delete this.queue[ key ]; }

				}

			}

		}

	}

	/**
	 *	@author zwubs
	 */

	class Renderer extends three.WebGLRenderer {

		constructor() {

			super( { canvas: Canvas } );

			this.shadowMap.enabled = true;
			this.shadowMap.type = three.BasicShadowMap;

			this.outputEncoding = three.sRGBEncoding;

			this.toneMapping = three.LinearToneMapping;
			this.toneMappingExposure = 0.75;

			this.eventManager = new EventManager( window );

			this.eventManager.registerNativeEvent( "resize" );
			this.eventManager.on( "resize", this.onResize.bind(this) );

			this.onResize();

		}

		kill() { this.getContext().getExtension('WEBGL_lose_context').loseContext(); }

		onResize( e ) {

			instance$e.aspect = Element.clientWidth / Element.clientHeight;
			instance$e.updateProjectionMatrix();

			this.setPixelRatio( window.devicePixelRatio );
			this.setSize( Element.clientWidth, Element.clientHeight );

		}

		get canvas() { return this.domElement; }

	}

	const instance$c = new Renderer();

	/**
	 *  @author zwubs
	 *  @namespace PANIC.Clock
	 *  @description Keeps track of the current time, as well as delta and lag
	 */


	class Clock {

		consturctor() {

			this.time = 0.0; // Current Time
			this.past = 0.0; // Last Time
			this.delta = 0.0; // Time Difference

			this.framecap = 60;

		}

		/**
		 *  @param time {Number} - time variable passed from requestAnimationFrame
		 */
		update( time ) {

			this.past = this.time;
			this.time = time;

			// delta = time difference / perfect framerate
			this.delta = ( this.time - this.past ) / ( 1000 / this.framecap );

		}

		/**
		 *  @param round {Boolean} - should the number be rounded
		 */
		seconds( round = false ) {

			return ( round ? Math.floor( this.time / ( 1000 ) ) : this.time / ( 1000 ));

		}

		minutes( round = false ) {

			return ( round ? Math.floor( this.time / ( 1000 * 60 ) ) : this.time / ( 1000 * 60 ) );

		}

		hours( round = false ) {

			return ( round ? Math.floor( this.time / ( 1000 * 60 * 60 ) ) : this.time / ( 1000 * 60 * 60 ) );

		}

		/**
		 *
		 */
		get seconds() { return this.seconds(); }
		get minutes() { return this.minutes(); }
		get hours() { return this.hours(); }

	}

	/**
	 *	@author zwubs
	 *	@extends {THREE.BoxBufferGeometry}
	 */

	class Cube extends three.BoxBufferGeometry {

		constructor( width, height, depth  ) {

			super( width, height, depth );

			// Rotate Y+ (Up) Plane 180 degree
			this.attributes.position.array.set([
				0.5, 0.5, 0.5,
				-0.5, 0.5, 0.5,
				0.5, 0.5, -0.5,
				-0.5, 0.5, -0.5,
			], 24 );

			// Rotate Y- (Down) Plane 180 degree
			this.attributes.position.array.set([
				0.5, -0.5, -0.5,
				-0.5, -0.5, -0.5,
				0.5, -0.5, 0.5,
				-0.5, -0.5, 0.5
			], 36 );

			// Mark attribute for an update
			this.attributes.position.needsUpdate = true;

		}

		static identity() {

			const indices = new Uint16Array( [ 0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7 ] );
			const positions = new Float32Array( [ 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5 ] );

			const geometry = new three.BufferGeometry();
			geometry.setIndex( new three.BufferAttribute( indices, 1 ) );
			geometry.setAttribute( 'position', new three.BufferAttribute( positions, 3 ) );

			geometry.computeBoundingSphere();

			return geometry;
			
		}
	}

	/**
	 *	@author zwubs
	 *	@extends {THREE.Texture}
	 */

	class Texture extends three.Texture {

		constructor( image ) {

			if( !( image instanceof Image ) ) image = PANIC.Unknown;

			super( image );

			this.generateMipmaps = false;

			this.magFilter = three.NearestFilter;
			this.minFilter = three.LinearFilter;

			this.wrapS = three.RepeatWrapping;
			this.wrapT = three.RepeatWrapping;

			// TODO: Check if necessary
			this.premultiplyAlpha = true;

			this.encoding = three.sRGBEncoding;

			this.needsUpdate = true;

		}


		/*
			Getters & Setters
		*/

		get width() { return this.image.width; }
		get w() { return this.image.width; }

		get height() { return this.image.height; }
		get h() { return this.image.height; }

	}

	// This set of controls performs orbiting, dollying (zooming), and panning.
	// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
	//
	//    Orbit - left mouse / touch: one-finger move
	//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
	//    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move

	const _changeEvent = { type: 'change' };
	const _startEvent = { type: 'start' };
	const _endEvent = { type: 'end' };

	class OrbitControls extends three.EventDispatcher {

		constructor( object, domElement ) {

			super();

			if ( domElement === undefined ) console.warn( 'THREE.OrbitControls: The second parameter "domElement" is now mandatory.' );
			if ( domElement === document ) console.error( 'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.' );

			this.object = object;
			this.domElement = domElement;
			this.domElement.style.touchAction = 'none'; // disable touch scroll

			// Set to false to disable this control
			this.enabled = true;

			// "target" sets the location of focus, where the object orbits around
			this.target = new three.Vector3();

			// How far you can dolly in and out ( PerspectiveCamera only )
			this.minDistance = 0;
			this.maxDistance = Infinity;

			// How far you can zoom in and out ( OrthographicCamera only )
			this.minZoom = 0;
			this.maxZoom = Infinity;

			// How far you can orbit vertically, upper and lower limits.
			// Range is 0 to Math.PI radians.
			this.minPolarAngle = 0; // radians
			this.maxPolarAngle = Math.PI; // radians

			// How far you can orbit horizontally, upper and lower limits.
			// If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
			this.minAzimuthAngle = - Infinity; // radians
			this.maxAzimuthAngle = Infinity; // radians

			// Set to true to enable damping (inertia)
			// If damping is enabled, you must call controls.update() in your animation loop
			this.enableDamping = false;
			this.dampingFactor = 0.05;

			// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
			// Set to false to disable zooming
			this.enableZoom = true;
			this.zoomSpeed = 1.0;

			// Set to false to disable rotating
			this.enableRotate = true;
			this.rotateSpeed = 1.0;

			// Set to false to disable panning
			this.enablePan = true;
			this.panSpeed = 1.0;
			this.screenSpacePanning = true; // if false, pan orthogonal to world-space direction camera.up
			this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

			// Set to true to automatically rotate around the target
			// If auto-rotate is enabled, you must call controls.update() in your animation loop
			this.autoRotate = false;
			this.autoRotateSpeed = 2.0; // 30 seconds per orbit when fps is 60

			// The four arrow keys
			this.keys = { LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' };

			// Mouse buttons
			this.mouseButtons = { LEFT: three.MOUSE.ROTATE, MIDDLE: three.MOUSE.DOLLY, RIGHT: three.MOUSE.PAN };

			// Touch fingers
			this.touches = { ONE: three.TOUCH.ROTATE, TWO: three.TOUCH.DOLLY_PAN };

			// for reset
			this.target0 = this.target.clone();
			this.position0 = this.object.position.clone();
			this.zoom0 = this.object.zoom;

			// the target DOM element for key events
			this._domElementKeyEvents = null;

			//
			// public methods
			//

			this.getPolarAngle = function () {

				return spherical.phi;

			};

			this.getAzimuthalAngle = function () {

				return spherical.theta;

			};

			this.getDistance = function () {

				return this.object.position.distanceTo( this.target );

			};

			this.listenToKeyEvents = function ( domElement ) {

				domElement.addEventListener( 'keydown', onKeyDown );
				this._domElementKeyEvents = domElement;

			};

			this.saveState = function () {

				scope.target0.copy( scope.target );
				scope.position0.copy( scope.object.position );
				scope.zoom0 = scope.object.zoom;

			};

			this.reset = function () {

				scope.target.copy( scope.target0 );
				scope.object.position.copy( scope.position0 );
				scope.object.zoom = scope.zoom0;

				scope.object.updateProjectionMatrix();
				scope.dispatchEvent( _changeEvent );

				scope.update();

				state = STATE.NONE;

			};

			// this method is exposed, but perhaps it would be better if we can make it private...
			this.update = function () {

				const offset = new three.Vector3();

				// so camera.up is the orbit axis
				const quat = new three.Quaternion().setFromUnitVectors( object.up, new three.Vector3( 0, 1, 0 ) );
				const quatInverse = quat.clone().invert();

				const lastPosition = new three.Vector3();
				const lastQuaternion = new three.Quaternion();

				const twoPI = 2 * Math.PI;

				return function update() {

					const position = scope.object.position;

					offset.copy( position ).sub( scope.target );

					// rotate offset to "y-axis-is-up" space
					offset.applyQuaternion( quat );

					// angle from z-axis around y-axis
					spherical.setFromVector3( offset );

					if ( scope.autoRotate && state === STATE.NONE ) {

						rotateLeft( getAutoRotationAngle() );

					}

					if ( scope.enableDamping ) {

						spherical.theta += sphericalDelta.theta * scope.dampingFactor;
						spherical.phi += sphericalDelta.phi * scope.dampingFactor;

					} else {

						spherical.theta += sphericalDelta.theta;
						spherical.phi += sphericalDelta.phi;

					}

					// restrict theta to be between desired limits

					let min = scope.minAzimuthAngle;
					let max = scope.maxAzimuthAngle;

					if ( isFinite( min ) && isFinite( max ) ) {

						if ( min < - Math.PI ) min += twoPI; else if ( min > Math.PI ) min -= twoPI;

						if ( max < - Math.PI ) max += twoPI; else if ( max > Math.PI ) max -= twoPI;

						if ( min <= max ) {

							spherical.theta = Math.max( min, Math.min( max, spherical.theta ) );

						} else {

							spherical.theta = ( spherical.theta > ( min + max ) / 2 ) ?
								Math.max( min, spherical.theta ) :
								Math.min( max, spherical.theta );

						}

					}

					// restrict phi to be between desired limits
					spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

					spherical.makeSafe();


					spherical.radius *= scale;

					// restrict radius to be between desired limits
					spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

					// move target to panned location

					if ( scope.enableDamping === true ) {

						scope.target.addScaledVector( panOffset, scope.dampingFactor );

					} else {

						scope.target.add( panOffset );

					}

					offset.setFromSpherical( spherical );

					// rotate offset back to "camera-up-vector-is-up" space
					offset.applyQuaternion( quatInverse );

					position.copy( scope.target ).add( offset );

					scope.object.lookAt( scope.target );

					if ( scope.enableDamping === true ) {

						sphericalDelta.theta *= ( 1 - scope.dampingFactor );
						sphericalDelta.phi *= ( 1 - scope.dampingFactor );

						panOffset.multiplyScalar( 1 - scope.dampingFactor );

					} else {

						sphericalDelta.set( 0, 0, 0 );

						panOffset.set( 0, 0, 0 );

					}

					scale = 1;

					// update condition is:
					// min(camera displacement, camera rotation in radians)^2 > EPS
					// using small-angle approximation cos(x/2) = 1 - x^2 / 8

					if ( zoomChanged ||
						lastPosition.distanceToSquared( scope.object.position ) > EPS ||
						8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

						scope.dispatchEvent( _changeEvent );

						lastPosition.copy( scope.object.position );
						lastQuaternion.copy( scope.object.quaternion );
						zoomChanged = false;

						return true;

					}

					return false;

				};

			}();

			this.dispose = function () {

				scope.domElement.removeEventListener( 'contextmenu', onContextMenu );

				scope.domElement.removeEventListener( 'pointerdown', onPointerDown );
				scope.domElement.removeEventListener( 'pointercancel', onPointerCancel );
				scope.domElement.removeEventListener( 'wheel', onMouseWheel );

				scope.domElement.removeEventListener( 'pointermove', onPointerMove );
				scope.domElement.removeEventListener( 'pointerup', onPointerUp );


				if ( scope._domElementKeyEvents !== null ) {

					scope._domElementKeyEvents.removeEventListener( 'keydown', onKeyDown );

				}

				//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

			};

			//
			// internals
			//

			const scope = this;

			const STATE = {
				NONE: - 1,
				ROTATE: 0,
				DOLLY: 1,
				PAN: 2,
				TOUCH_ROTATE: 3,
				TOUCH_PAN: 4,
				TOUCH_DOLLY_PAN: 5,
				TOUCH_DOLLY_ROTATE: 6
			};

			let state = STATE.NONE;

			const EPS = 0.000001;

			// current position in spherical coordinates
			const spherical = new three.Spherical();
			const sphericalDelta = new three.Spherical();

			let scale = 1;
			const panOffset = new three.Vector3();
			let zoomChanged = false;

			const rotateStart = new three.Vector2();
			const rotateEnd = new three.Vector2();
			const rotateDelta = new three.Vector2();

			const panStart = new three.Vector2();
			const panEnd = new three.Vector2();
			const panDelta = new three.Vector2();

			const dollyStart = new three.Vector2();
			const dollyEnd = new three.Vector2();
			const dollyDelta = new three.Vector2();

			const pointers = [];
			const pointerPositions = {};

			function getAutoRotationAngle() {

				return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

			}

			function getZoomScale() {

				return Math.pow( 0.95, scope.zoomSpeed );

			}

			function rotateLeft( angle ) {

				sphericalDelta.theta -= angle;

			}

			function rotateUp( angle ) {

				sphericalDelta.phi -= angle;

			}

			const panLeft = function () {

				const v = new three.Vector3();

				return function panLeft( distance, objectMatrix ) {

					v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
					v.multiplyScalar( - distance );

					panOffset.add( v );

				};

			}();

			const panUp = function () {

				const v = new three.Vector3();

				return function panUp( distance, objectMatrix ) {

					if ( scope.screenSpacePanning === true ) {

						v.setFromMatrixColumn( objectMatrix, 1 );

					} else {

						v.setFromMatrixColumn( objectMatrix, 0 );
						v.crossVectors( scope.object.up, v );

					}

					v.multiplyScalar( distance );

					panOffset.add( v );

				};

			}();

			// deltaX and deltaY are in pixels; right and down are positive
			const pan = function () {

				const offset = new three.Vector3();

				return function pan( deltaX, deltaY ) {

					const element = scope.domElement;

					if ( scope.object.isPerspectiveCamera ) {

						// perspective
						const position = scope.object.position;
						offset.copy( position ).sub( scope.target );
						let targetDistance = offset.length();

						// half of the fov is center to top of screen
						targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

						// we use only clientHeight here so aspect ratio does not distort speed
						panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
						panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

					} else if ( scope.object.isOrthographicCamera ) {

						// orthographic
						panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
						panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

					} else {

						// camera neither orthographic nor perspective
						console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
						scope.enablePan = false;

					}

				};

			}();

			function dollyOut( dollyScale ) {

				if ( scope.object.isPerspectiveCamera ) {

					scale /= dollyScale;

				} else if ( scope.object.isOrthographicCamera ) {

					scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
					scope.object.updateProjectionMatrix();
					zoomChanged = true;

				} else {

					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
					scope.enableZoom = false;

				}

			}

			function dollyIn( dollyScale ) {

				if ( scope.object.isPerspectiveCamera ) {

					scale *= dollyScale;

				} else if ( scope.object.isOrthographicCamera ) {

					scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
					scope.object.updateProjectionMatrix();
					zoomChanged = true;

				} else {

					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
					scope.enableZoom = false;

				}

			}

			//
			// event callbacks - update the object state
			//

			function handleMouseDownRotate( event ) {

				rotateStart.set( event.clientX, event.clientY );

			}

			function handleMouseDownDolly( event ) {

				dollyStart.set( event.clientX, event.clientY );

			}

			function handleMouseDownPan( event ) {

				panStart.set( event.clientX, event.clientY );

			}

			function handleMouseMoveRotate( event ) {

				rotateEnd.set( event.clientX, event.clientY );

				rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

				const element = scope.domElement;

				rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

				rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

				rotateStart.copy( rotateEnd );

				scope.update();

			}

			function handleMouseMoveDolly( event ) {

				dollyEnd.set( event.clientX, event.clientY );

				dollyDelta.subVectors( dollyEnd, dollyStart );

				if ( dollyDelta.y > 0 ) {

					dollyOut( getZoomScale() );

				} else if ( dollyDelta.y < 0 ) {

					dollyIn( getZoomScale() );

				}

				dollyStart.copy( dollyEnd );

				scope.update();

			}

			function handleMouseMovePan( event ) {

				panEnd.set( event.clientX, event.clientY );

				panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

				pan( panDelta.x, panDelta.y );

				panStart.copy( panEnd );

				scope.update();

			}

			function handleMouseWheel( event ) {

				if ( event.deltaY < 0 ) {

					dollyIn( getZoomScale() );

				} else if ( event.deltaY > 0 ) {

					dollyOut( getZoomScale() );

				}

				scope.update();

			}

			function handleKeyDown( event ) {

				let needsUpdate = false;

				switch ( event.code ) {

					case scope.keys.UP:
						pan( 0, scope.keyPanSpeed );
						needsUpdate = true;
						break;

					case scope.keys.BOTTOM:
						pan( 0, - scope.keyPanSpeed );
						needsUpdate = true;
						break;

					case scope.keys.LEFT:
						pan( scope.keyPanSpeed, 0 );
						needsUpdate = true;
						break;

					case scope.keys.RIGHT:
						pan( - scope.keyPanSpeed, 0 );
						needsUpdate = true;
						break;

				}

				if ( needsUpdate ) {

					// prevent the browser from scrolling on cursor keys
					event.preventDefault();

					scope.update();

				}


			}

			function handleTouchStartRotate() {

				if ( pointers.length === 1 ) {

					rotateStart.set( pointers[ 0 ].pageX, pointers[ 0 ].pageY );

				} else {

					const x = 0.5 * ( pointers[ 0 ].pageX + pointers[ 1 ].pageX );
					const y = 0.5 * ( pointers[ 0 ].pageY + pointers[ 1 ].pageY );

					rotateStart.set( x, y );

				}

			}

			function handleTouchStartPan() {

				if ( pointers.length === 1 ) {

					panStart.set( pointers[ 0 ].pageX, pointers[ 0 ].pageY );

				} else {

					const x = 0.5 * ( pointers[ 0 ].pageX + pointers[ 1 ].pageX );
					const y = 0.5 * ( pointers[ 0 ].pageY + pointers[ 1 ].pageY );

					panStart.set( x, y );

				}

			}

			function handleTouchStartDolly() {

				const dx = pointers[ 0 ].pageX - pointers[ 1 ].pageX;
				const dy = pointers[ 0 ].pageY - pointers[ 1 ].pageY;

				const distance = Math.sqrt( dx * dx + dy * dy );

				dollyStart.set( 0, distance );

			}

			function handleTouchStartDollyPan() {

				if ( scope.enableZoom ) handleTouchStartDolly();

				if ( scope.enablePan ) handleTouchStartPan();

			}

			function handleTouchStartDollyRotate() {

				if ( scope.enableZoom ) handleTouchStartDolly();

				if ( scope.enableRotate ) handleTouchStartRotate();

			}

			function handleTouchMoveRotate( event ) {

				if ( pointers.length == 1 ) {

					rotateEnd.set( event.pageX, event.pageY );

				} else {

					const position = getSecondPointerPosition( event );

					const x = 0.5 * ( event.pageX + position.x );
					const y = 0.5 * ( event.pageY + position.y );

					rotateEnd.set( x, y );

				}

				rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

				const element = scope.domElement;

				rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

				rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

				rotateStart.copy( rotateEnd );

			}

			function handleTouchMovePan( event ) {

				if ( pointers.length === 1 ) {

					panEnd.set( event.pageX, event.pageY );

				} else {

					const position = getSecondPointerPosition( event );

					const x = 0.5 * ( event.pageX + position.x );
					const y = 0.5 * ( event.pageY + position.y );

					panEnd.set( x, y );

				}

				panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

				pan( panDelta.x, panDelta.y );

				panStart.copy( panEnd );

			}

			function handleTouchMoveDolly( event ) {

				const position = getSecondPointerPosition( event );

				const dx = event.pageX - position.x;
				const dy = event.pageY - position.y;

				const distance = Math.sqrt( dx * dx + dy * dy );

				dollyEnd.set( 0, distance );

				dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );

				dollyOut( dollyDelta.y );

				dollyStart.copy( dollyEnd );

			}

			function handleTouchMoveDollyPan( event ) {

				if ( scope.enableZoom ) handleTouchMoveDolly( event );

				if ( scope.enablePan ) handleTouchMovePan( event );

			}

			function handleTouchMoveDollyRotate( event ) {

				if ( scope.enableZoom ) handleTouchMoveDolly( event );

				if ( scope.enableRotate ) handleTouchMoveRotate( event );

			}

			//
			// event handlers - FSM: listen for events and reset state
			//

			function onPointerDown( event ) {

				if ( scope.enabled === false ) return;

				if ( pointers.length === 0 ) {

					scope.domElement.setPointerCapture( event.pointerId );

					scope.domElement.addEventListener( 'pointermove', onPointerMove );
					scope.domElement.addEventListener( 'pointerup', onPointerUp );

				}

				//

				addPointer( event );

				if ( event.pointerType === 'touch' ) {

					onTouchStart( event );

				} else {

					onMouseDown( event );

				}

			}

			function onPointerMove( event ) {

				if ( scope.enabled === false ) return;

				if ( event.pointerType === 'touch' ) {

					onTouchMove( event );

				} else {

					onMouseMove( event );

				}

			}

			function onPointerUp( event ) {

			    removePointer( event );

			    if ( pointers.length === 0 ) {

			        scope.domElement.releasePointerCapture( event.pointerId );

			        scope.domElement.removeEventListener( 'pointermove', onPointerMove );
			        scope.domElement.removeEventListener( 'pointerup', onPointerUp );

			    }

			    scope.dispatchEvent( _endEvent );

			    state = STATE.NONE;

			}

			function onPointerCancel( event ) {

				removePointer( event );

			}

			function onMouseDown( event ) {

				let mouseAction;

				switch ( event.button ) {

					case 0:

						mouseAction = scope.mouseButtons.LEFT;
						break;

					case 1:

						mouseAction = scope.mouseButtons.MIDDLE;
						break;

					case 2:

						mouseAction = scope.mouseButtons.RIGHT;
						break;

					default:

						mouseAction = - 1;

				}

				switch ( mouseAction ) {

					case three.MOUSE.DOLLY:

						if ( scope.enableZoom === false ) return;

						handleMouseDownDolly( event );

						state = STATE.DOLLY;

						break;

					case three.MOUSE.ROTATE:

						if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

							if ( scope.enablePan === false ) return;

							handleMouseDownPan( event );

							state = STATE.PAN;

						} else {

							if ( scope.enableRotate === false ) return;

							handleMouseDownRotate( event );

							state = STATE.ROTATE;

						}

						break;

					case three.MOUSE.PAN:

						if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

							if ( scope.enableRotate === false ) return;

							handleMouseDownRotate( event );

							state = STATE.ROTATE;

						} else {

							if ( scope.enablePan === false ) return;

							handleMouseDownPan( event );

							state = STATE.PAN;

						}

						break;

					default:

						state = STATE.NONE;

				}

				if ( state !== STATE.NONE ) {

					scope.dispatchEvent( _startEvent );

				}

			}

			function onMouseMove( event ) {

				if ( scope.enabled === false ) return;

				switch ( state ) {

					case STATE.ROTATE:

						if ( scope.enableRotate === false ) return;

						handleMouseMoveRotate( event );

						break;

					case STATE.DOLLY:

						if ( scope.enableZoom === false ) return;

						handleMouseMoveDolly( event );

						break;

					case STATE.PAN:

						if ( scope.enablePan === false ) return;

						handleMouseMovePan( event );

						break;

				}

			}

			function onMouseWheel( event ) {

				if ( scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE ) return;

				event.preventDefault();

				scope.dispatchEvent( _startEvent );

				handleMouseWheel( event );

				scope.dispatchEvent( _endEvent );

			}

			function onKeyDown( event ) {

				if ( scope.enabled === false || scope.enablePan === false ) return;

				handleKeyDown( event );

			}

			function onTouchStart( event ) {

				trackPointer( event );

				switch ( pointers.length ) {

					case 1:

						switch ( scope.touches.ONE ) {

							case three.TOUCH.ROTATE:

								if ( scope.enableRotate === false ) return;

								handleTouchStartRotate();

								state = STATE.TOUCH_ROTATE;

								break;

							case three.TOUCH.PAN:

								if ( scope.enablePan === false ) return;

								handleTouchStartPan();

								state = STATE.TOUCH_PAN;

								break;

							default:

								state = STATE.NONE;

						}

						break;

					case 2:

						switch ( scope.touches.TWO ) {

							case three.TOUCH.DOLLY_PAN:

								if ( scope.enableZoom === false && scope.enablePan === false ) return;

								handleTouchStartDollyPan();

								state = STATE.TOUCH_DOLLY_PAN;

								break;

							case three.TOUCH.DOLLY_ROTATE:

								if ( scope.enableZoom === false && scope.enableRotate === false ) return;

								handleTouchStartDollyRotate();

								state = STATE.TOUCH_DOLLY_ROTATE;

								break;

							default:

								state = STATE.NONE;

						}

						break;

					default:

						state = STATE.NONE;

				}

				if ( state !== STATE.NONE ) {

					scope.dispatchEvent( _startEvent );

				}

			}

			function onTouchMove( event ) {

				trackPointer( event );

				switch ( state ) {

					case STATE.TOUCH_ROTATE:

						if ( scope.enableRotate === false ) return;

						handleTouchMoveRotate( event );

						scope.update();

						break;

					case STATE.TOUCH_PAN:

						if ( scope.enablePan === false ) return;

						handleTouchMovePan( event );

						scope.update();

						break;

					case STATE.TOUCH_DOLLY_PAN:

						if ( scope.enableZoom === false && scope.enablePan === false ) return;

						handleTouchMoveDollyPan( event );

						scope.update();

						break;

					case STATE.TOUCH_DOLLY_ROTATE:

						if ( scope.enableZoom === false && scope.enableRotate === false ) return;

						handleTouchMoveDollyRotate( event );

						scope.update();

						break;

					default:

						state = STATE.NONE;

				}

			}

			function onContextMenu( event ) {

				if ( scope.enabled === false ) return;

				event.preventDefault();

			}

			function addPointer( event ) {

				pointers.push( event );

			}

			function removePointer( event ) {

				delete pointerPositions[ event.pointerId ];

				for ( let i = 0; i < pointers.length; i ++ ) {

					if ( pointers[ i ].pointerId == event.pointerId ) {

						pointers.splice( i, 1 );
						return;

					}

				}

			}

			function trackPointer( event ) {

				let position = pointerPositions[ event.pointerId ];

				if ( position === undefined ) {

					position = new three.Vector2();
					pointerPositions[ event.pointerId ] = position;

				}

				position.set( event.pageX, event.pageY );

			}

			function getSecondPointerPosition( event ) {

				const pointer = ( event.pointerId === pointers[ 0 ].pointerId ) ? pointers[ 1 ] : pointers[ 0 ];

				return pointerPositions[ pointer.pointerId ];

			}

			//

			scope.domElement.addEventListener( 'contextmenu', onContextMenu );

			scope.domElement.addEventListener( 'pointerdown', onPointerDown );
			scope.domElement.addEventListener( 'pointercancel', onPointerCancel );
			scope.domElement.addEventListener( 'wheel', onMouseWheel, { passive: false } );

			// force an update at start

			this.update();

		}

	}

	/**
	 *	@author zwubs
	 *	@todo Replace using custom input system
	 */

	let Controls = new OrbitControls( instance$e, Canvas );

	Controls.traget = new three.Vector3( 0, 0, 0);
	Controls.update();

	/**
	 *	@typedef {Object} PANIC.Tileset.Tile
	 *	@param name {String}
	 */
	class Tile {

		constructor( name ) {

			this.name = ( typeof x == "string" ? name : "Undefined" );

			this.x = 0;
			this.y = 0;
			this.w = 0;
			this.h = 0;

			this.pattern = [ 0, 1, 2, 1, 0, 3, 2, 3 ];

		}

		/**
		 *	@param x {Number}
		 *	@param y {Number}
		 *	@param width {Number}
		 *	@param height {Number}
		 */
		set( x, y, w, h ) {

			this.x = ( isNaN(x) ? this.x : x );
			this.y = ( isNaN(y) ? this.y : y );
			this.w = ( isNaN(w) ? this.w : w );
			this.h = ( isNaN(h) ? this.h : h );

		}

		/**
		 *	@param texture {PANIC.Texture}
		 */
		UV( texture ) {

			let corners = [
				this.x / texture.w,
				( texture.h - this.y ) / texture.h,
				( this.x + this.w ) / texture.w,
				( texture.h - this.y - this.h ) / texture.h
			];

			return [
				corners[ this.pattern[0] ],
				corners[ this.pattern[1] ],
				corners[ this.pattern[2] ],
				corners[ this.pattern[3] ],
				corners[ this.pattern[4] ],
				corners[ this.pattern[5] ],
				corners[ this.pattern[6] ],
				corners[ this.pattern[7] ]
			]

		}

		/**
		 *	@param abcdefgh {Number}
		 */
		editPattern( a, b, c, d, e, f, g, h ) {

			let newPattern = [
				this.pattern[ a ],
				this.pattern[ b ],
				this.pattern[ c ],
				this.pattern[ d ],
				this.pattern[ e ],
				this.pattern[ f ],
				this.pattern[ g ],
				this.pattern[ h ]
			];

			this.pattern = newPattern;

		}

		/**
		 *	@param params {Object}
		 */
		transform( params ) {

			if( params.translate ) {

				this.x += ( isNaN( params.translate.x ) ? 0 : params.translate.x );
				this.y += ( isNaN( params.translate.y ) ? 0 : params.translate.y );

			}

		}

		get width() { return this.w; }
		get height() { return this.h; }

	}

	/**
	 *	@typedef {Object} TileGroup
	 */

	class TileGroup {

		/**
		 *	@param north { PANIC.Tile }
		 *	@param south { PANIC.Tile }
		 *	@param east { PANIC.Tile }
		 *	@param west { PANIC.Tile }
		 *	@param up { PANIC.Tile}
		 *	@param down { PANIC.Tile}
		 */
		constructor( north, south, east, west, up, down ) {

			this.north = north || new Tile( "north" );
			this.south = south || new Tile( "south" );
			this.east = east || new Tile( "east" );
			this.west = west || new Tile( "west" );
			this.up = up || new Tile( "up" );
			this.down = down || new Tile( "down" );

		}

		/**
		 *	@param x {Number}
		 *	@param y {Number}
		 *	@param w {Number}
		 *	@param h {Number}
		 */
		setAll( x=0, y=0, w=0, h=0 ) {

			this.north.set( x, y, w, h );
			this.south.set( x, y, w, h );
			this.east.set( x, y, w, h );
			this.west.set( x, y, w, h );
			this.up.set( x, y, w, h );
			this.down.set( x, y, w, h );

		}

		/**
		 *	@param group {TileGroup}
		 */
		clone( group ) {

			let directions = [ "north", "south", "east", "west", "up", "down" ];

			for( let dir of directions ) {
				this[ dir ].x = group[ dir ].x;
				this[ dir ].y = group[ dir ].y;
				this[ dir ].w = group[ dir ].w;
				this[ dir ].h = group[ dir ].h;
			}

		}

	}

	/**
	 *	@author zwubs
	 *	@typedef {Object} PANIC.Tileset
	 */

	class Tileset {

		constructor() {

			this.groups = {};

		}

		/**
		 *	@param name {String}
		 *	@param group {PANIC.Tileset.TileGroup}
		 */
		addTileGroup( name, group ) {

			this.groups[ name ] = group;

		}

	}

	/**
	 *  @reference https://github.com/vaalentin/keycodes
	 */

	const KeyCodes = {
		BACKSPACE: 8,
		TAB: 9,
		ENTER: 13,
		SHIFT: 16,
		CTRL: 17,
		ALT: 18,
		PAUSE_BREAK: 19,
		CAPS_LOCK: 20,
		ESCAPE: 27,
		SPACE: 32,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		END: 35,
		HOME: 36,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		INSERT: 45,
		DELETE: 46,
		0: 48,
		1: 49,
		2: 50,
		3: 51,
		4: 52,
		5: 53,
		6: 54,
		7: 55,
		8: 56,
		9: 57,
		A: 65,
		B: 66,
		C: 67,
		D: 68,
		E: 69,
		F: 70,
		G: 71,
		H: 72,
		I: 73,
		J: 74,
		K: 75,
		L: 76,
		M: 77,
		N: 78,
		O: 79,
		P: 80,
		Q: 81,
		R: 82,
		S: 83,
		T: 84,
		U: 85,
		V: 86,
		W: 87,
		X: 88,
		Y: 89,
		Z: 90,
		LEFT_WINDOW_KEY: 91,
		RIGHT_WINDOW_KEY: 92,
		SELECT_KEY: 93,
		NUMPAD_0: 96,
		NUMPAD_1: 97,
		NUMPAD_2: 98,
		NUMPAD_3: 99,
		NUMPAD_4: 100,
		NUMPAD_5: 101,
		NUMPAD_6: 102,
		NUMPAD_7: 103,
		NUMPAD_8: 104,
		NUMPAD_9: 105,
		MULTIPLY: 106,
		ADD: 107,
		SUBTRACT: 109,
		DECIMAL_POINT: 110,
		DIVIDE: 111,
		F1: 112,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123,
		NUM_LOCK: 144,
		SCROLL_LOCK: 145,
		SEMI_COLON: 186,
		EQUAL_SIGN: 187,
		COMMA: 188,
		DASH: 189,
		PERIOD: 190,
		FORWARD_SLASH: 191,
		GRAVE_ACCENT: 192,
		OPEN_BRACKET: 219,
		BACK_SLASH: 220,
		CLOSE_BRAKET: 221,
		SINGLE_QUOTE: 222
	};

	let KeyMap = {};

	for (var key in KeyCodes) {

		KeyMap[ KeyCodes[ key ] ] = key;

	}

	/**
	 *	@author zwubs
	 */

	class Keyboard {

		constructor() {

			this.eventManager = new EventManager();

			this.eventManager.registerNativeEvent( "keydown" );

			this.eventManager.on( "keydown", this.handleKeyDown.bind(this) );

			this.eventManager.registerNativeEvent( "keyup" );

			this.eventManager.on( "keyup", this.handleKeyUp.bind(this) );

			this.registerKeyEvents();

			this.eventManager.registerNativeEvent( "blur" );

			this.eventManager.on( "blur", this.handleBlur.bind(this) );

		}

		/**
		 * 	@description Registers all events for the
		 * 	@todo Optimize to only use necessary events
		 */
		registerKeyEvents() {

			for ( let key in KeyCodes ) {

				this.eventManager.registerEvent( `KEY_DOWN_${key}` );
				this.eventManager.registerEvent( `KEY_UP_${key}` );
				this.eventManager.registerEvent( `KEY_HELD_${key}` );

			}

		}

		/**
		 * 	@param {Event} e - Event from "keyup" event listener
		 */
		handleKeyUp( e ) {

			this.eventManager.emit( `KEY_UP_${KeyMap[ e.keyCode ]}`, {} );

			this.eventManager.breakLoop( `KEY_HELD_${KeyMap[ e.keyCode ]}` );

		}

		/**
		 * 	@param {Event} e - Event from "keydown" event listener
		 */
		handleKeyDown( e ) {

			if( e.repeat ) return;

			this.eventManager.emit( `KEY_DOWN_${KeyMap[ e.keyCode ]}`, {} );

			this.eventManager.emit( `KEY_HELD_${KeyMap[ e.keyCode ]}`, {}, true );

		}


		/**
		 * @description Event is fired as long as the key is held down
		 * @param {String} key ID used is signify the key, values available in KeyCodes
		 * @param {Function} func Function to be executed when event is recieved
		 */
		onKey( key, func ) {

			if( !this.checkValidKey( key, "onKey" ) ) { return; }

			this.eventManager.on( `KEY_HELD_${ key }`, func );

		}

		/**
		 * @description Event is fired only on the first instance of the key being pressed
		 * @param {String} key ID used is signify the key, values available in KeyCodes
		 * @param {Function} func Function to be executed when event is recieved
		 */
		onKeyDown( key, func ) {

			if( !this.checkValidKey( key, "onKeyDown" ) ) { return; }

			this.eventManager.on( `KEY_DOWN_${ key }`, func );

		}

		/**
		 * @description Event is fired only on the first instance of the key being unpressed
		 * @param {String} key ID used is signify the key, values available in KeyCodes
		 * @param {Function} func Function to be executed when event is recieved
		 */
		onKeyUp( key, func ) {

			if( !this.checkValidKey( key, "onKeyUp" ) ) { return; }

			this.eventManager.on( `KEY_UP_${ key }`, func );

		}

		/**
		 * @description Returns a Boolean based on wether the key is being held down
		 * @param {String} key ID used is signify the key, values available in KeyCodes
		 * @return {Boolean}
		 */
		getKey( key ) {

			if( !this.checkValidKey( key, "getKey" ) ) { return; }

			return this.eventManager.eventActive( `KEY_HELD_${ key }` );

		}

		/**
		 * @description Returns a Boolean based on the first instance of a key being pressed
		 * @param {String} key ID used is signify the key, values available in KeyCodes
		 * @return {Boolean}
		 */
		getKeyDown( key ) {

			if( !this.checkValidKey( key, "getKeyDown" ) ) { return; }

			return this.eventManager.eventActive( `KEY_DOWN_${ key }` );

		}

		/**
		 * @description Returns a Boolean based on the first instance of a key being unpressed
		 * @param {String} key ID used is signify the key, values available in KeyCodes
		 * @return {Boolean}
		 */
		getKeyUp( key ) {

			if( !this.checkValidKey( key, "getKeyUp" ) ) { return; }

			return this.eventManager.eventActive( `KEY_UP_${ key }` );

		}


		/**
		 * @description Checks that a given keyID is actually valid
		 * @param  {String} key ID used is signify the key, values available in KeyCodes
		 * @param  {String} functionName Function name to be logged is something goes wrong
		 * @return {Boolean}
		 */
		checkValidKey( key, functionName ) {

			if( key in KeyCodes ) return true;

			warn(`Keyboard.${functionName}(): '${ key }' is not a valid key`);

			return false;

		}


		/**
		 *	@HEADER {} BLUR
		 */
		handleBlur( e ) {

			this.eventManager.clearQueue();

		}

	}

	const instance$b = new Keyboard();

	const MouseButtonCodes = {
		L: 0,
		M: 1,
		R: 2
	};

	const MouseButtonMap = {
		0: "L",
		1: "M",
		2: "R"
	};

	/**
	 *	@author zwubs
	 */

	class Mouse {

		constructor() {

			this.eventManager = new EventManager();

			this.eventManager.registerNativeEvent( "mousedown" );

			this.eventManager.on( "mousedown", this.handleButtonDown.bind(this) );

			this.eventManager.registerNativeEvent( "mouseup" );

			this.eventManager.on( "mouseup", this.handleButtonUp.bind(this) );

			this.eventManager.registerNativeEvent( "click" );

			this.eventManager.on( "click", this.handleClick.bind(this) );

			this.eventManager.registerNativeEvent( "mousemove" );

			this.eventManager.on( "mousemove", this.handleMove.bind(this) );

			this.eventManager.registerNativeEvent( "wheel" );

			this.eventManager.on( "wheel", this.handleScroll.bind(this) );

			this.registerMouseEvents();

			this.eventManager.registerNativeEvent( "blur" );

			this.eventManager.on( "blur", this.handleBlur.bind(this) );

		}

		/**
		 * 	@description Registers all events for the
		 * 	@todo Optimize to only use necessary events
		 */
		registerMouseEvents() {

			for ( let btn in MouseButtonCodes ) {

				this.eventManager.registerEvent( `MOUSE_DOWN_${btn}` );
				this.eventManager.registerEvent( `MOUSE_UP_${btn}` );
				this.eventManager.registerEvent( `MOUSE_CLICK_${btn}` );
				this.eventManager.registerEvent( `MOUSE_HELD_${btn}` );

			}

			this.eventManager.registerEvent( `MOUSE_SCROLL`, false, true );

			this.eventManager.registerEvent( `MOUSE_MOVE`, false, true );

		}

		/**
		 *	@HEADER {} BUTTONS
		 */

		/**
		 * 	@param {Event} e - Event from "mouseup" event listener
		 */
		handleButtonUp( e ) {

			this.eventManager.emit( `MOUSE_UP_${MouseButtonMap[ e.button ]}`, {} );

			this.eventManager.breakLoop( `MOUSE_HELD_${MouseButtonMap[ e.button ]}` );

		}

		/**
		 * 	@param {Event} e - Event from "mousedown" event listener
		 */
		handleButtonDown( e ) {

			this.eventManager.emit( `MOUSE_DOWN_${MouseButtonMap[ e.button ]}`, {} );

			this.eventManager.emit( `MOUSE_HELD_${MouseButtonMap[ e.button ]}`, {}, true );

		}

		/**
		 * 	@param {Event} e - Event from "mousedown" event listener
		 */
		handleClick( e ) {

			this.eventManager.emit( `MOUSE_CLICK_${MouseButtonMap[ e.button ]}`, {} );

		}


		/**
		 * @description Event is fired as long as the button is held down
		 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
		 * @param {Function} func Function to be executed when event is recieved
		 */
		onButton( btn, func ) {

			if( !this.checkValidButton( btn, "onButton" ) ) { return; }

			this.eventManager.on( `MOUSE_HELD_${ btn }`, func );

		}

		/**
		 * @description Event is fired only on the first instance of the button being pressed
		 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
		 * @param {Function} func Function to be executed when event is recieved
		 */
		onButtonDown( btn, func ) {

			if( !this.checkValidButton( btn, "onButtonDown" ) ) { return; }

			this.eventManager.on( `MOUSE_DOWN_${ btn }`, func );

		}

		/**
		 * @description Event is fired only on the first instance of the button being unpressed
		 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
		 * @param {Function} func Function to be executed when event is recieved
		 */
		onButtonUp( btn, func ) {

			if( !this.checkValidButton( btn, "onButtonUp" ) ) { return; }

			this.eventManager.on( `MOUSE_UP_${ btn }`, func );

		}

		/**
		 * @description Event is fired when the button is pressed and released successfully
		 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
		 * @param {Function} func Function to be executed when event is recieved
		 */
		onClick( btn, func ) {

			if( !this.checkValidButton( btn, "onClick" ) ) { return; }

			this.eventManager.on( `MOUSE_CLICK_${ btn }`, func );

		}

		/**
		 * @description Returns a Boolean based on wether the button is being held down
		 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
		 * @return {Boolean}
		 */
		getButton( btn ) {

			if( !this.checkValidButton( btn, "getButton" ) ) { return; }

			return this.eventManager.eventActive( `MOUSE_HELD_${ btn }` );

		}

		/**
		 * @description Returns a Boolean based on the first instance of a button being pressed
		 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
		 * @return {Boolean}
		 */
		getButtonDown( btn ) {

			if( !this.checkValidButton( btn, "getButtonDown" ) ) { return; }

			return this.eventManager.eventActive( `MOUSE_DOWN_${ btn }` );

		}

		/**
		 * @description Returns a Boolean based on the first instance of a button being unpressed
		 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
		 * @return {Boolean}
		 */
		getButtonUp( btn ) {

			if( !this.checkValidButton( btn, "getButtonUp" ) ) { return; }

			return this.eventManager.eventActive( `MOUSE_UP_${ btn }` );

		}

		/**
		 * @description Returns a Boolean based on wether a successful down and up event occured
		 * @param {String} btn ID used is signify the button, values available in MouseButtonCodes
		 * @return {Boolean}
		 */
		getClick( btn ) {

			if( !this.checkValidButton( btn, "getClick" ) ) { return; }

			return this.eventManager.eventActive( `MOUSE_CLICK_${ btn }` );

		}

		/**
		 * @description Checks that a given buttonID is valid
		 * @param  {String} btn ID used is signify the button, values available in MouseButtonCodes
		 * @param  {String} functionName Function name to be logged is something goes wrong
		 * @return {Boolean}
		 */
		checkValidButton( btn, functionName ) {

			if( btn in MouseButtonCodes ) return true;

			warn(`Mouse.${functionName}(): '${ btn }' is not a valid button`);

			return false;

		}

		/**
		 *	@HEADER {} WHEEL / SCROLL
		 */

		/**
		 * 	@param {Event} e - Event from "wheel" event listener
		 */
		handleScroll( e ) {

			 this.eventManager.emit( `MOUSE_SCROLL`, { direction: Math.sign( e.deltaY ) } );

		}

		getScroll() {

			return this.eventManager.eventActive( `MOUSE_SCROLL` );

		}

		getScrollAmount() {

			return this.eventManager.getStore( `MOUSE_SCROLL` );

		}

		 /**
		  * @param {Function} func Function to be executed when event is recieved
		  */
		 onScroll( func ) {

			 this.eventManager.on( `MOUSE_SCROLL`, func );

		 }


		/**
		 *	@HEADER {} MOVEMENT
		 */

		/**
		 * 	@param {Event} e - Event from "mousemove" event listener
		 */
		handleMove( e ) {

			this.eventManager.emit( 'MOUSE_MOVE', { x: e.x, y: e.y } );

		}

		/**
		 * @param {Function} func Function to be executed when event is recieved
		 */
		onMove( func ) {

			this.eventManager.on( 'MOUSE_MOVE', func );

		}

		getMove() {

			return this.eventManager.eventActive( 'MOUSE_MOVE' );

		}

		/**
		 *
		 */
		getPosition() {

			return this.eventManager.getStore( 'move' );

		}


		/**
		 *	@HEADER {} BLUR
		 */
		handleBlur( e ) {

			this.eventManager.clearQueue();

		}

	}

	const instance$a = new Mouse();

	/**
	 *  @reference https://github.com/vaalentin/keycodes
	 */

	const GamepadEvents = [
		"GAMEPAD_LSTICK_NORTH",
		"GAMEPAD_LSTICK_SOUTH",
		"GAMEPAD_LSTICK_EAST",
		"GAMEPAD_LSTICK_WEST",
		"GAMEPAD_LSTICK_PRESS",

		"GAMEPAD_RSTICK_NORTH",
		"GAMEPAD_RSTICK_SOUTH",
		"GAMEPAD_RSTICK_EAST",
		"GAMEPAD_RSTICK_WEST",
		"GAMEPAD_RSTICK_PRESS",

		"GAMEPAD_DPAD_NORTH",
		"GAMEPAD_DPAD_SOUTH",
		"GAMEPAD_DPAD_EAST",
		"GAMEPAD_DPAD_WEST",

		"GAMEPAD_RTRIGGER_TOP",
		"GAMEPAD_RTRIGGER_BOTTOM",

		"GAMEPAD_LTRIGGER_TOP",
		"GAMEPAD_LTRIGGER_BOTTOM",

		"GAMEPAD_BUTTON_NORTH",
		"GAMEPAD_BUTTON_SOUTH",
		"GAMEPAD_BUTTON_EAST",
		"GAMEPAD_BUTTON_WEST",

		"GAMEPAD_BUTTON_START",
		"GAMEPAD_BUTTON_SELECT",
	];

	const GamepadButtons = {
		0: "GAMEPAD_BUTTON_SOUTH",
		1: "GAMEPAD_BUTTON_EAST",
		2: "GAMEPAD_BUTTON_WEST",
		3: "GAMEPAD_BUTTON_NORTH",
		4: "GAMEPAD_RTRIGGER_TOP",
		5: "GAMEPAD_LTRIGGER_TOP",
		6: "GAMEPAD_RTRIGGER_BOTTOM",
		7: "GAMEPAD_LTRIGGER_BOTTOM",
		8: "GAMEPAD_BUTTON_SELECT",
		9: "GAMEPAD_BUTTON_START",
		10: "GAMEPAD_LSTICK_PRESS",
		11: "GAMEPAD_RSTICK_PRESS",
		12: "GAMEPAD_DPAD_NORTH",
		13: "GAMEPAD_DPAD_SOUTH",
		14: "GAMEPAD_DPAD_EAST",
		15: "GAMEPAD_DPAD_WEST",
	};

	const GamepadAxes = {
		0: [ "GAMEPAD_LSTICK_WEST", "GAMEPAD_LSTICK_EAST" ],
		1: [ "GAMEPAD_LSTICK_SOUTH", "GAMEPAD_LSTICK_NORTH" ],
		2: [ "GAMEPAD_RSTICK_WEST", "GAMEPAD_RSTICK_EAST" ],
		3: [ "GAMEPAD_RSTICK_SOUTH", "GAMEPAD_RSTICK_NORTH" ],
	};

	/*	
	    joypad.js v2.2.5	
	    Copyright (c) 2019 Arun Michael Dsouza (amdsouza92@gmail.com)	
	    Licence: MIT	
	*/
	!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o});},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0);}([function(t,e,n){n.r(e);var o={events:{},publish:function(t,e){this.events.hasOwnProperty(t)&&this.events[t].forEach(t=>t(e));},subscribe:function(t,e){return this.events.hasOwnProperty(t)||(this.events[t]=[]),this.events[t].push(e),{unsubscribe:function(){this.events[t].splice(this.events[t].indexOf(e),1);}.bind(this)}}};const i={NATIVE:"gamepadconnected",ALIAS:"connect"},s={NATIVE:"gamepaddisconnected",ALIAS:"disconnect"},r={NATIVE:null,ALIAS:"button_press"},a={NATIVE:null,ALIAS:"axis_move"},u={NAME:"left_stick",AXES:{X:0,Y:1}},d={NAME:"right_stick",AXES:{X:2,Y:3}},c="left",p="right",l="top",b="bottom",A={button_0:0,button_1:1,button_2:2,button_3:3,button_4:4,button_5:5,button_6:6,button_7:7,button_8:8,button_9:9,button_10:10,button_11:11,button_12:12,button_13:13,button_14:14,button_15:15,button_16:16,button_17:17},f=t=>{console.warn&&"function"==typeof console.warn?console.warn(t):console.log(t);};var h={loopStarted:!1,instances:{},buttonEvents:{joypad:[]},settings:{axisMovementThreshold:.8},remove:function(t){return delete this.instances[t]},on:function(t,e){switch(t){case i.ALIAS:return o.subscribe(i.ALIAS,e);case s.ALIAS:return o.subscribe(s.ALIAS,e);case r.ALIAS:return o.subscribe(r.ALIAS,e);case a.ALIAS:return o.subscribe(a.ALIAS,e)}},vibrate:function(t,e){const{vibrationActuator:n}=t,o=e||this.settings.vibration;if((t=>!!(t&&t.type&&t.playEffect&&"function"==typeof t.playEffect))(n)){const{type:e}=n;return t.vibrationActuator.playEffect(e,o)}f("No vibration actuator interface found - https://developer.mozilla.org/en-US/docs/Web/API/GamepadHapticActuator");},set:function(t){const{axisMovementThreshold:e,vibration:n,customButtonMapping:o}=t,i=parseFloat(e);isNaN(i)||(this.settings.axisMovementThreshold=i),this.settings.vibration=n,this.settings.customButtonMapping=o;},trigger:function(t,e){return o.publish(t,e)}};var v={id:null,start:function(){const t=window.requestAnimationFrame||window.webkitRequestAnimationFrame,{buttonEvents:e}=h;let n=window.navigator.getGamepads();(n=Array.prototype.slice.call(n)).forEach((t,n)=>{t&&(e.joypad[n]||(e.joypad[n]={}),h.instances[n]=t,m(t),y(t));}),e.joypad.forEach(t=>{t&&Object.keys(t).forEach(e=>{w(e,t);});}),this.id=t(this.start.bind(this));},stop:function(t){return (window.cancelAnimationFrame||window.webkitCancelAnimationFrame)(t)}};const m=t=>{t.buttons.forEach((e,n)=>{const{customButtonMapping:o}=h.settings,i=((t,e)=>{let n=[];return Object.keys(e).forEach(o=>{e[o]===t?n.push(o):Array.isArray(e[o])&&-1!==e[o].indexOf(t)&&n.push(o);}),n})(n,o||A),{buttonEvents:s}=h;i&&i.length&&i.forEach(o=>{e.pressed?(s.joypad[t.index][o]||(s.joypad[t.index][o]={pressed:!0,hold:!1,released:!1}),s.joypad[t.index][o].button=e,s.joypad[t.index][o].index=n,s.joypad[t.index][o].gamepad=t):!e.pressed&&s.joypad[t.index][o]&&(s.joypad[t.index][o].released=!0,s.joypad[t.index][o].hold=!1);});});},y=t=>{const{axisMovementThreshold:e}=h.settings,{axes:n}=t,o=n.length/2;n.forEach((n,i)=>{if(Math.abs(n)>e){let e=null,s=null,r=n;e=i<o?u.NAME:d.NAME,i!==u.AXES.X&&i!==d.AXES.X||(s=n<0?c:p),i!==u.AXES.Y&&i!==d.AXES.Y||(s=n<0?l:b);const A={gamepad:t,totalSticks:o,stickMoved:e,directionOfMovement:s,axisMovementValue:r,axis:i};return window.dispatchEvent((t=>new CustomEvent(a.ALIAS,{detail:t}))(A))}});},w=(t,e)=>{if(e[t].pressed){const n=t=>new CustomEvent(r.ALIAS,{detail:t}),{index:o,gamepad:i}=e[t],s={buttonName:t,button:e[t].button,index:o,gamepad:i};window.dispatchEvent(n(s)),e[t].pressed=!1,e[t].hold=!0;}else e[t].hold||e[t].released&&delete e[t];};window.addEventListener(i.NATIVE,t=>{if(o.publish(i.ALIAS,t),!h.loopStarted)return h.loopStarted=!0,v.start()}),window.addEventListener(s.NATIVE,t=>{if(o.publish(s.ALIAS,t),h.remove(t.gamepad.index),h.buttonEvents.joypad[t.gamepad.index]=null,!Object.keys(h.instances).length)return h.loopStarted=!1,v.stop(v.id)}),window.addEventListener(r.ALIAS,t=>o.publish(r.ALIAS,t)),window.addEventListener(a.ALIAS,t=>o.publish(a.ALIAS,t)),(()=>!(!window.navigator.getGamepads||"function"!=typeof window.navigator.getGamepads))()?window.joypad=h:(window.joypad={},f("Your browser does not support the Gamepad API - https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API"));}]);

	let Joypad = window.joypad;

	delete window.joypad;

	/**
	 *	@author zwubs
	 */

	class Gamepad {

		constructor() {

			this.eventManager = new EventManager();

			Joypad.set({ axisMovementThreshold: 0.3 });

			Joypad.on('connect', this.handleConnect.bind( this ) );

			Joypad.on('disconnect', this.handleDisconnect.bind( this ) );

			Joypad.on('axis_move', this.handleAxisMove.bind( this ) );

			Joypad.on('button_press', this.handleButtonPress.bind( this ) );

			this.registerEvents();

		}

		registerEvents() {

			for ( let event of GamepadEvents ) {

				this.eventManager.registerEvent( event );

			}

		}

		handleConnect( e ) {  }

		handleDisconnect( e ) {  }

		handleAxisMove( e ) {

			let direction = ( e.detail.directionOfMovement == "left" || e.detail.directionOfMovement == "bottom" ) ? 0 : 1;

			this.eventManager.emit( GamepadAxes[ e.detail.axis ][ direction ] );

		}

		handleButtonPress( e ) { this.eventManager.emit( GamepadButtons[ e.detail.index ] ); }

	}

	const instance$9 = new Gamepad();

	/**
	 *	@author zwubs
	 */

	var input = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Keyboard: instance$b,
		Mouse: instance$a,
		Gamepad: instance$9
	});

	/**
	 *   @namespace PANIC.Tools
	 */

	class Tools {

		constructor() {

			this.XAxis = Object.freeze( new three.Vector3(1,0,0) );
			this.YAxis = Object.freeze( new three.Vector3(0,1,0) );
			this.ZAxis = Object.freeze( new three.Vector3(0,0,1) );
			this.NAxis = Object.freeze( new three.Vector3(0,0,0) );

			this.North = Object.freeze( new three.Vector3( 0, 0, -1 ) );
			this.South = Object.freeze( new three.Vector3( 0, 0, 1 ) );
			this.East = Object.freeze( new three.Vector3( 1, 0, 0 ) );
			this.West = Object.freeze( new three.Vector3( -1, 0, 0 ) );
			this.Up = Object.freeze( new three.Vector3( 0, 1, 0 ) );
			this.Down = Object.freeze( new three.Vector3( 0, -1, 0 ) );

		}

		generateUUID() {

			var lut = [];

			for ( var i = 0; i < 256; i ++ ) { lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 ); }

			var d0 = Math.random() * 0xffffffff | 0;
			var d1 = Math.random() * 0xffffffff | 0;
			var d2 = Math.random() * 0xffffffff | 0;
			var d3 = Math.random() * 0xffffffff | 0;
			var uuid = lut[ d0 & 0xff ] + lut[ d0 >> 8 & 0xff ] + lut[ d0 >> 16 & 0xff ] + lut[ d0 >> 24 & 0xff ] + '-' +
				lut[ d1 & 0xff ] + lut[ d1 >> 8 & 0xff ] + '-' + lut[ d1 >> 16 & 0x0f | 0x40 ] + lut[ d1 >> 24 & 0xff ] + '-' +
				lut[ d2 & 0x3f | 0x80 ] + lut[ d2 >> 8 & 0xff ] + '-' + lut[ d2 >> 16 & 0xff ] + lut[ d2 >> 24 & 0xff ] +
				lut[ d3 & 0xff ] + lut[ d3 >> 8 & 0xff ] + lut[ d3 >> 16 & 0xff ] + lut[ d3 >> 24 & 0xff ];

			return uuid.toUpperCase();

		}

	}
	let instance$8 = new Tools();

	/**
	 *	@author zwubs
	 */

	class BoundingSphere {

		/**
		 *	@param {Vector3} center
		 *	@param {Number} radius
		 */
		constructor( collider, center = new three.Vector3( 0, 0, 0 ), radius = 0) {

			this.collider = collider;

			this.position = center;
			this.center = center;
			this.radius = radius;

			this.matrix = new three.Matrix4(); // local position
			this.matrixWorld = new three.Matrix4(); // world position

		}

		/**
		 *	@param {BoundingSphere} sphere
		 */
		intersectsSphere( sphere ) {

			let radiusSum = this.radius + sphere.radius;

			return sphere.position.distanceToSquared( this.position ) <= ( radiusSum * radiusSum );

		}

		update() {

			this.matrix.setPosition( this.center );

		}

		updateWorldMatrix() {

			if( this.collider ) {
				this.matrixWorld.multiplyMatrices( this.collider.entity.matrix, this.matrix );
				this.position = this.center.clone().applyMatrix4( this.collider.entity.matrix );
			}
			else this.matrixWorld.copy( this.matrix );

		}

	}

	// module scope helper variables

	const a = {
		c: null, // center
		u: [ new three.Vector3(), new three.Vector3(), new three.Vector3() ], // basis vectors
		e: [] // half width
	};

	const b = {
		c: null, // center
		u: [ new three.Vector3(), new three.Vector3(), new three.Vector3() ], // basis vectors
		e: [] // half width
	};

	const R = [[], [], []];
	const AbsR = [[], [], []];
	const t = [];

	let c = 0;
	let d = 0;
	let min = Infinity;
	let epsilon = 1e-3;

	const xAxis = new three.Vector3();
	const yAxis = new three.Vector3();
	const zAxis = new three.Vector3();
	const v1 = new three.Vector3();
	const size = new three.Vector3();
	const direction = new three.Vector3();
	const closestPoint = new three.Vector3();
	const rotationMatrix = new three.Matrix3();
	const aabb = new three.Box3();
	const matrix = new three.Matrix4();
	const inverse = new three.Matrix4();
	const localRay = new three.Ray();

	// OBB

	class OBB {

		constructor( center = new three.Vector3(), halfSize = new three.Vector3(), rotation = new three.Matrix3() ) {

			this.center = center;
			this.halfSize = halfSize;
			this.rotation = rotation;

		}

		set( center, halfSize, rotation ) {

			this.center = center;
			this.halfSize = halfSize;
			this.rotation = rotation;

			return this;

		}

		copy( obb ) {

			this.center.copy( obb.center );
			this.halfSize.copy( obb.halfSize );
			this.rotation.copy( obb.rotation );

			return this;

		}

		clone() {

			return new this.constructor().copy( this );

		}

		getSize( result ) {

			return result.copy( this.halfSize ).multiplyScalar( 2 );

		}

		/**
		* Reference: Closest Point on OBB to Point in Real-Time Collision Detection
		* by Christer Ericson (chapter 5.1.4)
		*/
		clampPoint( point, result ) {

			const halfSize = this.halfSize;

			v1.subVectors( point, this.center );
			this.rotation.extractBasis( xAxis, yAxis, zAxis );

			// start at the center position of the OBB

			result.copy( this.center );

			// project the target onto the OBB axes and walk towards that point

			const x = three.MathUtils.clamp( v1.dot( xAxis ), - halfSize.x, halfSize.x );
			result.add( xAxis.multiplyScalar( x ) );

			const y = three.MathUtils.clamp( v1.dot( yAxis ), - halfSize.y, halfSize.y );
			result.add( yAxis.multiplyScalar( y ) );

			const z = three.MathUtils.clamp( v1.dot( zAxis ), - halfSize.z, halfSize.z );
			result.add( zAxis.multiplyScalar( z ) );

			return result;

		}

		containsPoint( point ) {

			v1.subVectors( point, this.center );
			this.rotation.extractBasis( xAxis, yAxis, zAxis );

			// project v1 onto each axis and check if these points lie inside the OBB

			return Math.abs( v1.dot( xAxis ) ) <= this.halfSize.x &&
					Math.abs( v1.dot( yAxis ) ) <= this.halfSize.y &&
					Math.abs( v1.dot( zAxis ) ) <= this.halfSize.z;

		}

		intersectsBox3( box3 ) {

			return this.intersectsOBB( obb.fromBox3( box3 ) );

		}

		intersectsSphere( sphere ) {

			// find the point on the OBB closest to the sphere center

			this.clampPoint( sphere.center, closestPoint );

			// if that point is inside the sphere, the OBB and sphere intersect

			return closestPoint.distanceToSquared( sphere.center ) <= ( sphere.radius * sphere.radius );

		}

		/**
		* Reference: OBB-OBB Intersection in Real-Time Collision Detection
		* by Christer Ericson (chapter 4.4.1)
		*
		*/
		intersectsOBB( obb ) {

			// prepare data structures (the code uses the same nomenclature like the reference)
			min = Infinity;
			direction.set( 0, 0, 0 );

			a.c = this.center;
			a.e[ 0 ] = this.halfSize.x;
			a.e[ 1 ] = this.halfSize.y;
			a.e[ 2 ] = this.halfSize.z;
			this.rotation.extractBasis( a.u[ 0 ], a.u[ 1 ], a.u[ 2 ] );

			b.c = obb.center;
			b.e[ 0 ] = obb.halfSize.x;
			b.e[ 1 ] = obb.halfSize.y;
			b.e[ 2 ] = obb.halfSize.z;
			obb.rotation.extractBasis( b.u[ 0 ], b.u[ 1 ], b.u[ 2 ] );

			// compute rotation matrix expressing b in a's coordinate frame

			for ( let i = 0; i < 3; i ++ ) {

				for ( let j = 0; j < 3; j ++ ) {

					R[ i ][ j ] = a.u[ i ].dot( b.u[ j ] );

					AbsR[ i ][ j ] = Math.abs( R[ i ][ j ] ) + epsilon;

				}

			}

			// compute translation vector

			v1.subVectors( b.c, a.c );

			// bring translation into a's coordinate frame

			t[ 0 ] = v1.dot( a.u[ 0 ] );
			t[ 1 ] = v1.dot( a.u[ 1 ] );
			t[ 2 ] = v1.dot( a.u[ 2 ] );

			let ra, rb;

			// test axes L = A0, L = A1, L = A2

			for ( let i = 0; i < 3; i ++ ) {

				ra = a.e[ i ];
				rb = b.e[ 0 ] * AbsR[ i ][ 0 ] + b.e[ 1 ] * AbsR[ i ][ 1 ] + b.e[ 2 ] * AbsR[ i ][ 2 ];
				if ( Math.abs( t[ i ] ) > ra + rb ) return false;

				c = t[ i ];
				d = Math.abs( c ) - ( ra + rb );
				if( Math.abs( d ) < Math.abs( min ) ) {
					min = d;
					if( Math.sign( c ) != 0 ) { min *= Math.sign( c ); }
					direction.copy( a.u[ i ] );
				}

			}

			// test axes L = B0, L = B1, L = B2

			for ( let i = 0; i < 3; i ++ ) {

				ra = a.e[ 0 ] * AbsR[ 0 ][ i ] + a.e[ 1 ] * AbsR[ 1 ][ i ] + a.e[ 2 ] * AbsR[ 2 ][ i ];
				rb = b.e[ i ];
				if ( Math.abs( t[ 0 ] * R[ 0 ][ i ] + t[ 1 ] * R[ 1 ][ i ] + t[ 2 ] * R[ 2 ][ i ] ) > ra + rb ) return false;

				c = t[ 0 ] * R[ 0 ][ i ] + t[ 1 ] * R[ 1 ][ i ] + t[ 2 ] * R[ 2 ][ i ];
				d = Math.abs( c ) - ( ra + rb );
				if( Math.abs( d ) < Math.abs( min ) ) {
					min = d;
					if( Math.sign( c ) != 0 ) { min *= Math.sign( c ); }
					direction.copy( b.u[ i ] );
				}

			}

			// test axis L = A0 x B0

			ra = a.e[ 1 ] * AbsR[ 2 ][ 0 ] + a.e[ 2 ] * AbsR[ 1 ][ 0 ];
			rb = b.e[ 1 ] * AbsR[ 0 ][ 2 ] + b.e[ 2 ] * AbsR[ 0 ][ 1 ];
			if ( Math.abs( t[ 2 ] * R[ 1 ][ 0 ] - t[ 1 ] * R[ 2 ][ 0 ] ) > ra + rb ) return false;

			// test axis L = A0 x B1

			ra = a.e[ 1 ] * AbsR[ 2 ][ 1 ] + a.e[ 2 ] * AbsR[ 1 ][ 1 ];
			rb = b.e[ 0 ] * AbsR[ 0 ][ 2 ] + b.e[ 2 ] * AbsR[ 0 ][ 0 ];
			if ( Math.abs( t[ 2 ] * R[ 1 ][ 1 ] - t[ 1 ] * R[ 2 ][ 1 ] ) > ra + rb ) return false;

			// test axis L = A0 x B2

			ra = a.e[ 1 ] * AbsR[ 2 ][ 2 ] + a.e[ 2 ] * AbsR[ 1 ][ 2 ];
			rb = b.e[ 0 ] * AbsR[ 0 ][ 1 ] + b.e[ 1 ] * AbsR[ 0 ][ 0 ];
			if ( Math.abs( t[ 2 ] * R[ 1 ][ 2 ] - t[ 1 ] * R[ 2 ][ 2 ] ) > ra + rb ) return false;

			// test axis L = A1 x B0

			ra = a.e[ 0 ] * AbsR[ 2 ][ 0 ] + a.e[ 2 ] * AbsR[ 0 ][ 0 ];
			rb = b.e[ 1 ] * AbsR[ 1 ][ 2 ] + b.e[ 2 ] * AbsR[ 1 ][ 1 ];
			if ( Math.abs( t[ 0 ] * R[ 2 ][ 0 ] - t[ 2 ] * R[ 0 ][ 0 ] ) > ra + rb ) return false;

			// test axis L = A1 x B1

			ra = a.e[ 0 ] * AbsR[ 2 ][ 1 ] + a.e[ 2 ] * AbsR[ 0 ][ 1 ];
			rb = b.e[ 0 ] * AbsR[ 1 ][ 2 ] + b.e[ 2 ] * AbsR[ 1 ][ 0 ];
			if ( Math.abs( t[ 0 ] * R[ 2 ][ 1 ] - t[ 2 ] * R[ 0 ][ 1 ] ) > ra + rb ) return false;

			// test axis L = A1 x B2

			ra = a.e[ 0 ] * AbsR[ 2 ][ 2 ] + a.e[ 2 ] * AbsR[ 0 ][ 2 ];
			rb = b.e[ 0 ] * AbsR[ 1 ][ 1 ] + b.e[ 1 ] * AbsR[ 1 ][ 0 ];
			if ( Math.abs( t[ 0 ] * R[ 2 ][ 2 ] - t[ 2 ] * R[ 0 ][ 2 ] ) > ra + rb ) return false;

			// test axis L = A2 x B0

			ra = a.e[ 0 ] * AbsR[ 1 ][ 0 ] + a.e[ 1 ] * AbsR[ 0 ][ 0 ];
			rb = b.e[ 1 ] * AbsR[ 2 ][ 2 ] + b.e[ 2 ] * AbsR[ 2 ][ 1 ];
			if ( Math.abs( t[ 1 ] * R[ 0 ][ 0 ] - t[ 0 ] * R[ 1 ][ 0 ] ) > ra + rb ) return false;

			// test axis L = A2 x B1

			ra = a.e[ 0 ] * AbsR[ 1 ][ 1 ] + a.e[ 1 ] * AbsR[ 0 ][ 1 ];
			rb = b.e[ 0 ] * AbsR[ 2 ][ 2 ] + b.e[ 2 ] * AbsR[ 2 ][ 0 ];
			if ( Math.abs( t[ 1 ] * R[ 0 ][ 1 ] - t[ 0 ] * R[ 1 ][ 1 ] ) > ra + rb ) return false;

			// test axis L = A2 x B2

			ra = a.e[ 0 ] * AbsR[ 1 ][ 2 ] + a.e[ 1 ] * AbsR[ 0 ][ 2 ];
			rb = b.e[ 0 ] * AbsR[ 2 ][ 1 ] + b.e[ 1 ] * AbsR[ 2 ][ 0 ];
			if ( Math.abs( t[ 1 ] * R[ 0 ][ 2 ] - t[ 0 ] * R[ 1 ][ 2 ] ) > ra + rb ) return false;

			// since no separating axis is found, the OBBs must be intersecting
			return [ direction, min ];

		}

		/**
		* Reference: Testing Box Against Plane in Real-Time Collision Detection
		* by Christer Ericson (chapter 5.2.3)
		*/
		intersectsPlane( plane ) {

			this.rotation.extractBasis( xAxis, yAxis, zAxis );

			// compute the projection interval radius of this OBB onto L(t) = this->center + t * p.normal;

			const r = this.halfSize.x * Math.abs( plane.normal.dot( xAxis ) ) +
					this.halfSize.y * Math.abs( plane.normal.dot( yAxis ) ) +
					this.halfSize.z * Math.abs( plane.normal.dot( zAxis ) );

			// compute distance of the OBB's center from the plane

			const d = plane.normal.dot( this.center ) - plane.constant;

			// Intersection occurs when distance d falls within [-r,+r] interval

			return Math.abs( d ) <= r;

		}

		/**
		* Performs a ray/OBB intersection test and stores the intersection point
		* to the given 3D vector. If no intersection is detected, *null* is returned.
		*/
		intersectRay( ray, result ) {

			// the idea is to perform the intersection test in the local space
			// of the OBB.

			this.getSize( size );
			aabb.setFromCenterAndSize( v1.set( 0, 0, 0 ), size );

			// create a 4x4 transformation matrix

			matrix.setFromMatrix3( this.rotation );
			matrix.setPosition( this.center );

			// transform ray to the local space of the OBB

			inverse.copy( matrix ).invert();
			localRay.copy( ray ).applyMatrix4( inverse );

			// perform ray <-> AABB intersection test

			if ( localRay.intersectBox( aabb, result ) ) {

				// transform the intersection point back to world space

				return result.applyMatrix4( matrix );

			} else {

				return null;

			}

		}

		/**
		* Performs a ray/OBB intersection test. Returns either true or false if
		* there is a intersection or not.
		*/
		intersectsRay( ray ) {

			return this.intersectRay( ray, v1 ) !== null;

		}

		fromBox3( box3 ) {

			box3.getCenter( this.center );

			box3.getSize( this.halfSize ).multiplyScalar( 0.5 );

			this.rotation.identity();

			return this;

		}

		equals( obb ) {

			return obb.center.equals( this.center ) &&
				obb.halfSize.equals( this.halfSize ) &&
				obb.rotation.equals( this.rotation );

		}

		applyMatrix4( matrix ) {

			const e = matrix.elements;

			let sx = v1.set( e[ 0 ], e[ 1 ], e[ 2 ] ).length();
			const sy = v1.set( e[ 4 ], e[ 5 ], e[ 6 ] ).length();
			const sz = v1.set( e[ 8 ], e[ 9 ], e[ 10 ] ).length();

			const det = matrix.determinant();
			if ( det < 0 ) sx = - sx;

			rotationMatrix.setFromMatrix4( matrix );

			const invSX = 1 / sx;
			const invSY = 1 / sy;
			const invSZ = 1 / sz;

			rotationMatrix.elements[ 0 ] *= invSX;
			rotationMatrix.elements[ 1 ] *= invSX;
			rotationMatrix.elements[ 2 ] *= invSX;

			rotationMatrix.elements[ 3 ] *= invSY;
			rotationMatrix.elements[ 4 ] *= invSY;
			rotationMatrix.elements[ 5 ] *= invSY;

			rotationMatrix.elements[ 6 ] *= invSZ;
			rotationMatrix.elements[ 7 ] *= invSZ;
			rotationMatrix.elements[ 8 ] *= invSZ;

			this.rotation.multiply( rotationMatrix );

			this.halfSize.x *= sx;
			this.halfSize.y *= sy;
			this.halfSize.z *= sz;

			v1.setFromMatrixPosition( matrix );
			this.center.add( v1 );

			return this;

		}

	}

	const obb = new OBB();

	/**
	 *	@author zwubs
	 */

	class OrientedBoundingBox {

		/**
		 *	@param {Collider} collider
		 */
		constructor( collider ) {

			this.collider = collider;

			this.epsilon = 1e-3;

			// User friendly inputs
			this.position = new three.Vector3();
			this.rotation = new three.Euler();
			this.scale = new three.Vector3();

			this.obb = new OBB();

			// SAT friendly inputs
			this.center = new three.Vector3();
			this.basis = new three.Matrix4();
			this.halfWidth = new three.Vector3();

			// For children calculations
			this.quaternion = new three.Quaternion();
			this.matrix = new three.Matrix4(); // local position
			this.matrixWorld = new three.Matrix4(); // world position

		}

		getBoundingBox() { return new three.Box3().setFromCenterAndSize( this.position, this.scale ).applyMatrix4( new three.Matrix4().makeRotationFromEuler( this.rotation ) ); }

		fromBoundingBox( box3 ) {

			box3.getCenter( this.position );
			box3.getSize( this.scale );

			this.update();

		}

		/**
		 *
		 */
		set( position, rotation, scale ) {

			if( position ) this.position = position;
			if( scale ) this.scale = scale;
			if( rotation instanceof three.Vector3 ) this.rotation.setFromVector3( rotation );
			else if( rotation instanceof three.Euler ) this.rotation.copy( rotation );

		}

		update() {

			// Update matrix
			this.quaternion.setFromEuler( this.rotation, false );

			this.matrix.compose( this.position, this.quaternion, this.scale );

			this.updateWorldMatrix();

			// Update SAT variables
			this.center.setFromMatrixPosition( this.matrixWorld );

			if( this.collider ) this.basis.makeRotationFromEuler( this.collider.entity.rotation );

			this.halfWidth.copy( this.scale ).multiplyScalar( 0.5 );

			this.obb.set( this.center, this.halfWidth, this.basis );

		}

		updateWorldMatrix() {

			if( this.collider ) this.matrixWorld.multiplyMatrices( this.collider.entity.matrix, this.matrix );
			else this.matrixWorld.copy( this.matrix );

		}

		intersectsOBB( obb ) {

			let vars = this.obb.intersectsOBB( obb.obb );

			if( vars ) return vars[0].multiplyScalar( vars[ 1 ] );
			else return false

		}

	}

	/**
	 *	@author zwubs
	 */

	class EntityCollider {

		constructor( entity ) {

			this.entity = entity;

			this.boundingSphere = new BoundingSphere( this );
			this.boundingBox = new OrientedBoundingBox( this );
			this.collision = [];

			this.debugger = null;

			this.update();

		}

		/**
		 *	@description Create a new collider
		 *	@param {EntityColliderTemplate} template
		 */
		fromTemplate( template ) {

			this.collision = template.collision;
			for( let box of this.collision ) { box.collider = this; }

			this.boundingBox = template.boundingBox;
			this.boundingBox.collider = this;

			this.boundingSphere = template.boundingSphere;
			this.boundingSphere.collider = this;

		}

		isColliding( collider ) {

			if( this.boundingSphere.intersectsSphere( collider.boundingSphere ) ) {

				return this.boundingBox.intersectsOBB( collider.boundingBox );

			}

			return false;

		}

		addBox( box ) {

			this.collision.push( box );

		}

		/**
		 *	@note update() updates collision info, updateWorldMatrix() just updates from the parent position.
		 */
		update() {

			// Update small collision (OBBs)
			for( let obb of this.collision ) { obb.updateWorldMatrix(); }

			// Update BoundingBox (OBB)
			this.boundingBox.update();

			// Upodate BoundingSphere
			this.boundingSphere.updateWorldMatrix();

		}

	}

	/**
	 *
	 */

	let DebugElement = document.createElement("div");

	DebugElement.style = `
	position: absolute;
	top: 0;
	color: #FFF;
`;

	DebugElement.id = "PANIC-Debug";

	Element.appendChild( DebugElement );

	/**
	 *	@author zwubss
	 */

	class Text {

		constructor() {

			this.id = "PANIC-Debug-Text";

			this.element = document.createElement("div");
			this.element.id = this.id;

			this.active = false;

			/**
			 *	0 = Cardinal & Ordinal Directions
			 *	1 = Cartesian Directions
			 *	2 = Cartesian Coordinates
			 */
			this.state = 0;

		}

		toggle( override=null ) {

			if( typeof override == "boolean" ) { this.active = !override; }
			else { this.active = !this.active; }

			if( this.active ) { DebugElement.appendChild( this.element ); }
			else { DebugElement.removeChild( this.element ); }

		}

		set( text ) {

			this.element.innerHTML = `${ text }`;

		}

	}

	let instance$7 = new Text();

	/**
	 *	@typedef {Object} PANIC.Entity
	 *	@param {PANIC.EntityTemplate} template
	 */

	class Entity$1 {

		constructor( template ) {

			// Unique Entity Identifier
			this.uuid = instance$8.generateUUID();

			// Assign template for future access
			this.template = template;

			// Transformation Variables
			this.position = new three.Vector3( 0, 0, 0 );
			this.rotation = new three.Euler( 0, 0, 0 );
			this.scale = new three.Vector3( 1, 1, 1 );

			this.quaternion = new three.Quaternion();
			this.matrix = new three.Matrix4();

			// Skeleton
			this.skeleton = new three.Skeleton();

			// Mesh definition
			this.mesh = new three.Mesh( this.template.geometry, this.template.material );
			this.mesh.matrixAutoUpdate = false;

			this.mesh.castShadow = true;
			this.mesh.receiveShadow = true;

			this.mesh.frustumCulled = false;

			this.mesh.customDepthMaterial = new three.MeshDepthMaterial( {
				depthPacking: three.RGBADepthPacking,
				map: this.template.texture,
				alphaTest: 0.5
			} );

			// Bind skeleton to mesh
			// this.mesh.bind( this.skeleton );

			instance$f.add( this.mesh );

			// Entity collision
			this.collider = new EntityCollider( this );
			this.collider.fromTemplate( this.template.collider );

			// Entity event actions
			this.actions = this.template.actions;
			this.actions.eventManager.binding = this;
			if( this.actions.eventManager.hasEvent("INIT") ) this.actions.eventManager.emit( "INIT" );

			// Storage for entity actions
			this.store = {};

			// Debug variables
			this.debug = null;

			instance$d.add( this );

		}

		update() {

			if( this.actions.eventManager.hasEvent("UPDATE") ) this.actions.eventManager.emit( "UPDATE" );

			if( this.debug ) this.debug.update();

			this.quaternion.setFromEuler( this.rotation, false );
			this.matrix.compose( this.position, this.quaternion, this.scale );

			this.collider.update();
			this.checkCollision();

			this.mesh.matrix.copy( this.matrix );

		}

		checkCollision() {
			new three.Vector3();
			new three.Vector3();

			for( const [id,entity] of Object.entries( PANIC.EntityRegistry.entities ) ) {

				if( this.uuid != id && this.actions.eventManager.hasEvent("COLLIDE") ) {

					let collision = this.collider.isColliding( entity.collider );

					if( collision ) {

						// distance = ( this.collider.boundingSphere.radius + entity.collider.boundingSphere.radius ) - this.collider.boundingSphere.position.distanceTo( entity.collider.boundingSphere.position ) + 0.001
						// direction.subVectors( this.collider.boundingSphere.position, entity.collider.boundingSphere.position ).normalize();
						// if( direction.equals ( zero ) ) direction = new Vector3( 1, 0, 0 );

						this.position.add( collision.multiplyScalar( 0.5 ) );
						entity.position.add( collision.multiplyScalar( -0.5 ) );

						this.actions.eventManager.emit("COLLIDE");
						entity.actions.eventManager.emit("COLLIDE");

					}

				}

			}

		}

	}

	/**
	 *	@author zwubs
	 */

	let Entity = {

		uniforms: three.ShaderLib.lambert.uniforms,

		vertex: `

		#define LAMBERT

		varying vec3 vLightFront;
		varying vec3 vIndirectFront;

		#ifdef DOUBLE_SIDED
			varying vec3 vLightBack;
			varying vec3 vIndirectBack;
		#endif

		#include <common>
		#include <uv_pars_vertex>
		#include <uv2_pars_vertex>
		#include <envmap_pars_vertex>
		#include <bsdfs>
		#include <lights_pars_begin>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <morphtarget_pars_vertex>
		#include <skinning_pars_vertex>
		#include <shadowmap_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		void main() {

			#include <uv_vertex>
			#include <uv2_vertex>
			#include <color_vertex>

			#include <beginnormal_vertex>
			#include <morphnormal_vertex>
			#include <skinbase_vertex>
			#include <skinnormal_vertex>
			#include <defaultnormal_vertex>

			#include <begin_vertex>
			#include <morphtarget_vertex>
			#include <skinning_vertex>
			#include <project_vertex>
			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>

			#include <worldpos_vertex>
			#include <envmap_vertex>
			#include <lights_lambert_vertex>
			#include <shadowmap_vertex>
			#include <fog_vertex>
		}
	`,

		fragment: `
		uniform vec3 diffuse;
		uniform vec3 emissive;
		uniform float opacity;

		varying vec3 vLightFront;
		varying vec3 vIndirectFront;

		#ifdef DOUBLE_SIDED
			varying vec3 vLightBack;
			varying vec3 vIndirectBack;
		#endif


		#include <common>
		#include <packing>
		#include <dithering_pars_fragment>
		#include <color_pars_fragment>
		#include <uv_pars_fragment>
		#include <uv2_pars_fragment>
		#include <map_pars_fragment>
		#include <alphamap_pars_fragment>
		#include <alphatest_pars_fragment>
		#include <aomap_pars_fragment>
		#include <lightmap_pars_fragment>
		#include <emissivemap_pars_fragment>
		#include <envmap_common_pars_fragment>
		#include <envmap_pars_fragment>
		#include <cube_uv_reflection_fragment>
		#include <bsdfs>
		#include <lights_pars_begin>
		#include <fog_pars_fragment>
		#include <shadowmap_pars_fragment>
		#include <shadowmask_pars_fragment>
		#include <specularmap_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		void main() {

			#include <clipping_planes_fragment>

			vec4 diffuseColor = vec4( diffuse, opacity );
			ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
			vec3 totalEmissiveRadiance = emissive;

			#include <logdepthbuf_fragment>
			#include <map_fragment>
			#include <color_fragment>
			#include <alphamap_fragment>
			#include <alphatest_fragment>
			#include <specularmap_fragment>
			#include <emissivemap_fragment>

			// accumulation

			#ifdef DOUBLE_SIDED

				reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;

			#else

				reflectedLight.indirectDiffuse += vIndirectFront;

			#endif

			#include <lightmap_fragment>

			reflectedLight.indirectDiffuse *= BRDF_Lambert( diffuseColor.rgb );

			#ifdef DOUBLE_SIDED

				reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;

			#else

				reflectedLight.directDiffuse = vLightFront;

			#endif

			reflectedLight.directDiffuse *= BRDF_Lambert( diffuseColor.rgb ) * getShadowMask();

			// modulation

			#include <aomap_fragment>

			vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

			#include <envmap_fragment>

			#include <output_fragment>
			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>
			#include <dithering_fragment>

		}
	`

	};

	/**
	 * 	@author zwubs
	 * 	@typedef {Object} EntityTemplate
	 */

	class EntityTemplate {

		constructor() {

			this.id = "unknown";
			this.name = "Unknown";

			this.texture = null;

			this.tileset = null;

			this.bones = [];
			this.geometry = null;

			this.collider = null;

			this.actions = null;

			this.shader = Entity;

			this.uniforms = null;
			this.material = null;

		}

		/**
		 *	@description Once having a texture, tileset, & geometry
		 *	this'll do all the other fancy work needed to finish
		 */
		setup() {

			// Create Uniforms
			this.uniforms = three.UniformsUtils.clone( this.shader.uniforms );

			// Create Material
			this.material = new three.ShaderMaterial({

				defines: {
					"USE_MAP": "",
					"DOUBLE_SIDED": ""
				},

				uniforms: this.uniforms,

				vertexShader: this.shader.vertex,

				fragmentShader: this.shader.fragment,

				lights: true,
				fog: true,

				transparent: true,

			});

			//
			this.uniforms[ "alphaTest" ] = new three.Uniform( 0.5 );
			this.material.alphaTest = true;

			// Assign Texture
			this.uniforms[ "map" ] = new three.Uniform( this.texture );
			this.material.map = this.texture;

			// Shading
			this.material.side = three.DoubleSide;
			this.material.shadowSide = three.DoubleSide;

		}

		spawnEntity() {

			if( !this.actions.eventManager.active ) this.actions.eventManager.active = true;

			return new Entity$1( this );

		}

	}

	/**
	 *	Tracks Entity Templates
	 *	@object
	 */

	class EntityRegistry {

		constructor() {

			this.data = [];

			this.entities = {};

		}

		getEntityByName( name ) { return this.data.find( o => o.name == name ); }
		getEntityByID( id ) { return this.data.find( o => o.id == id ); }

		/**
		 *  @param {PANIC.EntityTemplate} template - The template of the tempalte to register
		 */
		registerEntity( template ) {

			if( this.getEntityByID( template.id ) == undefined ) this.data.push( template );

			else warn("Entity \"" + entity.id + "\" is already registered");

		}

		/**
		 *	@param {String} id
		 */
		unregisterEntity( id ) {

			if( this.getEntityByID( template.id ) != undefined ) delete this.getEntityByID( template.id );

		}

		/**
		 *	@param {String} id
		 */
		spawnEntity( id ) {

			if( this.getEntityByID( id ) != undefined ) {

				let entity = this.getEntityByID( id ).spawnEntity();

				return this.entities[ entity.uuid ] = entity;

			}

		}

	}
	let instance$6 = new EntityRegistry();

	/**
	 *	@author zwubs
	 */

	class EntityColliderTemplate {

		constructor() {

			this.boundingSphere = new BoundingSphere();
			this.boundingBox = new OrientedBoundingBox();
			this.collision = [];

		}

		addBox( box ) {

			this.collision.push( box );

		}

		generate() {

			// Bounding Box
			let min = new three.Vector3( +Infinity, +Infinity, +Infinity );
			let max = new three.Vector3( -Infinity, -Infinity, -Infinity );

			let vec = new three.Vector3();

			for( let box of this.collision ) {

				let positions = new Float32Array( [ 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5 ] );
				let verticies = new three.BufferAttribute( positions, 3 );
				verticies.applyMatrix4( box.matrix );

				for( let i = 0; i < 8; i++ ) {

					vec.fromBufferAttribute( verticies, i );

					min.min( vec );
					max.max( vec );

				}

			}

			this.boundingBox.position.addVectors( min, max ).multiplyScalar( 0.5 );
			this.boundingBox.scale.subVectors( max, min );
			this.boundingBox.update();

			// Bounding Sphere
			this.boundingSphere.center.copy( this.boundingBox.position );
			this.boundingSphere.radius = this.boundingSphere.center.distanceTo( min ) > this.boundingSphere.center.distanceTo( max ) ? this.boundingSphere.center.distanceTo( min ) : this.boundingSphere.center.distanceTo( max );
			this.boundingSphere.update();
		}

		generateCollider( entity ) {

			return new EntityCollider.fromTemplate( this, entity );

		}

	}

	/**
	 *  @author zwubs
	 */

	var collision = /*#__PURE__*/Object.freeze({
		__proto__: null,
		EntityCollider: EntityCollider,
		EntityColliderTemplate: EntityColliderTemplate,
		BoundingSphere: BoundingSphere
	});

	/**
	 *	@namespace PANIC.Shaders.DebugAxes
	 *	@author zwubs
	 */
	let DebugAxes = {

		uniforms: {

			uDistance: { value: 100.0 },

		},

		vertex: `

		uniform float uDistance;

		attribute float opacity;

		varying vec3 vColor;
		varying float vOpacity;
		varying vec3 worldPosition;

		void main() {

			vColor.xyz = color.xyz;
			vOpacity = opacity;

			vec3 transformed = position.xzy * ( uDistance + distance( cameraPosition.xyz, worldPosition.xyz ) );

			worldPosition = transformed;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );

		}

	`,

		fragment: `

		uniform float uDistance;

		varying vec3 vColor;
		varying float vOpacity;
		varying vec3 worldPosition;

		void main() {

			float d = 1.0 - min( distance( cameraPosition.xyz, worldPosition.xyz ) / uDistance, 1.0 );

			gl_FragColor = vec4( vColor, vOpacity * pow( d, 3.0 ) );

			if ( gl_FragColor.a <= 0.0 ) discard;

		}

	`

	};

	/**
	 *	@namespace PANIC.Shaders.DebugGrid
	 *	@author zwubs
	 *	Based heavily off of https://github.com/Fyrestar/THREE.InfiniteGridHelper
	 *	@todo Use fog variables instead of distance
	 */

	let DebugGrid = {

		uniforms: {

			uColor: { value: new three.Color( 0x000000 ) },

			uScale: { value: 1.0 },
			uSubdivisions: { value: 1.0 },

			uDistance: { value: 1.0 },

		},

		vertex: `

		uniform float uDistance;

		varying vec3 worldPosition;

		void main() {

			vec3 pos = position.xzy * uDistance;
			pos.xz += cameraPosition.xz;

			worldPosition = pos;

			gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

		}

	`,

		fragment: `

		uniform float uScale;
		uniform float uSubdivisions;
		uniform vec3 uColor;
		uniform float uDistance;

		varying vec3 worldPosition;

		float getGrid( float size ) {

			 vec2 r = worldPosition.xz / size;

			 vec2 grid = abs( fract( r - 0.5 ) - 0.5 ) / fwidth( r );
			 float line = min( grid.x, grid.y );

			 return 1.0 - min( line, 1.0 );

		 }

		 void main() {

			   float d = 1.0 - min( distance( cameraPosition.xyz, worldPosition.xyz ) / uDistance, 1.0 );

			   float g1 = getGrid( uScale / uSubdivisions );
			   float g2 = getGrid( uScale );

			   gl_FragColor = vec4( uColor.rgb, mix( g2, g1, g1 ) * pow( d, 3.0 ) );
			   gl_FragColor.a = mix( 0.5 * gl_FragColor.a, gl_FragColor.a, g2 );

			   if ( gl_FragColor.a <= 0.0 ) discard;

		}
	`

	};

	/**
	 *	@author zwubs
	 *	@namespace PANIC.Shaders
	 */

	var shaders = /*#__PURE__*/Object.freeze({
		__proto__: null,
		DebugAxes: DebugAxes,
		DebugGrid: DebugGrid,
		Entity: Entity
	});

	/**
	 *	@author zwubs
	 */

	let FileLoader = new function() {

		this.loader = new three.FileLoader();

		this.load = async function( url ) {

			// Get File Information
			// var baseURL = url.substring( 0, url.lastIndexOf("/") + 1 );
			// var filename = url.substring( url.lastIndexOf("/") + 1, url.lastIndexOf(".") )
			// var fileextension = url.substring( url.lastIndexOf('.') + 1 );

			return await new Promise( resolve => { this.loader.load( url, resolve ); } );

		};

	};

	/**
	 *	@author zwubs
	 */

	let ImageLoader = new function() {

		this.load = async function( url ) {

			return await new Promise(resolve => {

				 let image = new Image();

				 image.addEventListener( 'load', () => { resolve( image ); } );

				 image.src = url;

			});

		};

	};

	/**
	 *	@author zwubs
	 */

	let TextureLoader = new function() {

		this.load = async function( url ) {

			let image = await ImageLoader.load( url );

			let texture = new Texture( image );

			return texture;

		};

	};

	/**
	 *	@author zwubs
	 */
	let JSONParser = new function() {

		this.parse = function( string ) {

			return window.JSON.parse( string );

		};

	};

	/**
	 *	@author zwubs
	 */

	let TilesetParser = new function() {

		/**
		 *	@param json {Object}
		 */
		this.parse = function( json, id="Undefined" ) {

			let tileset = new Tileset();

			let groups = Object.entries( json );

			console.groupCollapsed(`Tileset: '${id}'`);

			for (let [name, group] of groups) {

				if( this.isGroup( group ) ) {

					log( `'${name}' is a group` );

					let tileGroup = this.parseGroup( group, tileset );

					tileset.addTileGroup( name, tileGroup );

				}

				else {

					log( `'${name}' is unknown` );

				}

			}

			console.groupEnd();

			return tileset;

		};

		/**
		 * @param tile {}
		 */
		this.isTile = function( json ) {

			for( let attribute in json ) {
				if( attribute == "t" || attribute == "transform" )
				if( typeof json[ attribute ] == "number" ) return true;
			}
			return true;

		};

		/**
		 *
		 */
		this.parseTile = function( tile ) {};


		/**
		 * @param group {}
		 */
		this.isGroup = function( group ) {

			let acceptables = [ "all", "default", "clone", "transform", "north", "south", "east", "west", "up", "down" ];
			let tiles = Object.entries( group );

			for( let [name, tile] of tiles ) {

				if( !acceptables.includes( name ) ) return false

				if( !this.isTile( tile ) ) return false;

			}

			return true;

		};

		/**
		 *
		 */
		this.parseGroup = function( group, tileset ) {

			let tileGroup = new TileGroup();
			let directions = [ "north", "south", "east", "west", "up", "down" ];

			if( group.clone ) tileGroup.clone( tileset.groups[ group.clone ] );
			else if( group.all ) tileGroup.setAll( group.all.x, group.all.y, group.all.w, group.all.h );

			for( let dir of directions ) {
				if( group[ dir ] ) {

					if( group.default ) tileGroup[ dir ].set( group.default.x, group.default.y, group.default.w, group.default.h );

					let tile = group[ dir ];

					if( !isNaN( tile.x ) ) tileGroup[ dir ].x = tile.x;
					if( !isNaN( tile.y ) ) tileGroup[ dir ].y = tile.y;
					if( !isNaN( tile.w ) ) tileGroup[ dir ].w = tile.w;
					if( !isNaN( tile.h ) ) tileGroup[ dir ].h = tile.h;

					// Tile Transforms
					if( tile.t ) {

						if( tile.t.flipX ) tileGroup[ dir ].editPattern( 2, 3, 0, 1, 6, 7, 4, 5 );
						if( tile.t.flipY ) tileGroup[ dir ].editPattern( 4, 5, 6, 7, 0, 1, 2, 3 );

						if( tile.t.translate ) {
							if( tile.t.translate.x ) tileGroup[ dir ].x += tile.t.translate.x;
							if( tile.t.translate.y ) tileGroup[ dir ].y += tile.t.translate.y;
						}

						if( tile.t.rotate ) {
							if( tile.t.rotate == 1 ) tileGroup[ dir ].editPattern( 4, 5, 0, 1, 6, 7, 2, 3 );
							else if( tile.t.rotate == 2 ) tileGroup[ dir ].editPattern( 6, 7, 4, 5, 2, 3, 0, 1 );
							else if( tile.t.rotate == 3 ) tileGroup[ dir ].editPattern( 2, 3, 6, 7, 0, 1, 4, 5 );
						}

					}

				}
			}

			if( group.transform ) {

				for( let dir of directions ) {

					if( tileGroup[ dir ] ) {
						if( group.transform.translate.x ) { tileGroup[ dir ].x += group.transform.translate.x; }
						if( group.transform.translate.y ) { tileGroup[ dir ].y += group.transform.translate.y; }
					}

				}

			}
			return tileGroup;

		};

	};

	/**
	 *	@author zwubs
	 */

	let CubeUVParser = new function() {

		this.parse = function( tileGroupName, box, texture, tileset ) {

			let faces = ["east","west","up","down","south","north"];
			let tileGroup = tileset.groups[ tileGroupName ];

			for( var f = 0; f < 6; f++ ) {

				if( tileGroup[ faces[ f ] ] ) {

					let uv = tileGroup[ faces[ f ] ].UV( texture );

					box.attributes.uv.array.set( [ uv[ 0 ], uv[ 1 ] ], f * 8 + 0 );
					box.attributes.uv.array.set( [ uv[ 2 ], uv[ 3 ] ], f * 8 + 2 );
					box.attributes.uv.array.set( [ uv[ 4 ], uv[ 5 ] ], f * 8 + 4 );
					box.attributes.uv.array.set( [ uv[ 6 ], uv[ 7 ] ], f * 8 + 6 );

				}
				
			}

		};

	};

	/**
		 * @param  {Array<BufferGeometry>} geometries
		 * @param  {Boolean} useGroups
		 * @return {BufferGeometry}
		 */
	function mergeBufferGeometries( geometries, useGroups = false ) {

		const isIndexed = geometries[ 0 ].index !== null;

		const attributesUsed = new Set( Object.keys( geometries[ 0 ].attributes ) );
		const morphAttributesUsed = new Set( Object.keys( geometries[ 0 ].morphAttributes ) );

		const attributes = {};
		const morphAttributes = {};

		const morphTargetsRelative = geometries[ 0 ].morphTargetsRelative;

		const mergedGeometry = new three.BufferGeometry();

		let offset = 0;

		for ( let i = 0; i < geometries.length; ++ i ) {

			const geometry = geometries[ i ];
			let attributesCount = 0;

			// ensure that all geometries are indexed, or none

			if ( isIndexed !== ( geometry.index !== null ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.' );
				return null;

			}

			// gather attributes, exit early if they're different

			for ( const name in geometry.attributes ) {

				if ( ! attributesUsed.has( name ) ) {

					console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.' );
					return null;

				}

				if ( attributes[ name ] === undefined ) attributes[ name ] = [];

				attributes[ name ].push( geometry.attributes[ name ] );

				attributesCount ++;

			}

			// ensure geometries have the same number of attributes

			if ( attributesCount !== attributesUsed.size ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. Make sure all geometries have the same number of attributes.' );
				return null;

			}

			// gather morph attributes, exit early if they're different

			if ( morphTargetsRelative !== geometry.morphTargetsRelative ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. .morphTargetsRelative must be consistent throughout all geometries.' );
				return null;

			}

			for ( const name in geometry.morphAttributes ) {

				if ( ! morphAttributesUsed.has( name ) ) {

					console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '.  .morphAttributes must be consistent throughout all geometries.' );
					return null;

				}

				if ( morphAttributes[ name ] === undefined ) morphAttributes[ name ] = [];

				morphAttributes[ name ].push( geometry.morphAttributes[ name ] );

			}

			// gather .userData

			mergedGeometry.userData.mergedUserData = mergedGeometry.userData.mergedUserData || [];
			mergedGeometry.userData.mergedUserData.push( geometry.userData );

			if ( useGroups ) {

				let count;

				if ( isIndexed ) {

					count = geometry.index.count;

				} else if ( geometry.attributes.position !== undefined ) {

					count = geometry.attributes.position.count;

				} else {

					console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. The geometry must have either an index or a position attribute' );
					return null;

				}

				mergedGeometry.addGroup( offset, count, i );

				offset += count;

			}

		}

		// merge indices

		if ( isIndexed ) {

			let indexOffset = 0;
			const mergedIndex = [];

			for ( let i = 0; i < geometries.length; ++ i ) {

				const index = geometries[ i ].index;

				for ( let j = 0; j < index.count; ++ j ) {

					mergedIndex.push( index.getX( j ) + indexOffset );

				}

				indexOffset += geometries[ i ].attributes.position.count;

			}

			mergedGeometry.setIndex( mergedIndex );

		}

		// merge attributes

		for ( const name in attributes ) {

			const mergedAttribute = mergeBufferAttributes( attributes[ name ] );

			if ( ! mergedAttribute ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' attribute.' );
				return null;

			}

			mergedGeometry.setAttribute( name, mergedAttribute );

		}

		// merge morph attributes

		for ( const name in morphAttributes ) {

			const numMorphTargets = morphAttributes[ name ][ 0 ].length;

			if ( numMorphTargets === 0 ) break;

			mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
			mergedGeometry.morphAttributes[ name ] = [];

			for ( let i = 0; i < numMorphTargets; ++ i ) {

				const morphAttributesToMerge = [];

				for ( let j = 0; j < morphAttributes[ name ].length; ++ j ) {

					morphAttributesToMerge.push( morphAttributes[ name ][ j ][ i ] );

				}

				const mergedMorphAttribute = mergeBufferAttributes( morphAttributesToMerge );

				if ( ! mergedMorphAttribute ) {

					console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' morphAttribute.' );
					return null;

				}

				mergedGeometry.morphAttributes[ name ].push( mergedMorphAttribute );

			}

		}

		return mergedGeometry;

	}

	/**
	 * @param {Array<BufferAttribute>} attributes
	 * @return {BufferAttribute}
	 */
	function mergeBufferAttributes( attributes ) {

		let TypedArray;
		let itemSize;
		let normalized;
		let arrayLength = 0;

		for ( let i = 0; i < attributes.length; ++ i ) {

			const attribute = attributes[ i ];

			if ( attribute.isInterleavedBufferAttribute ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. InterleavedBufferAttributes are not supported.' );
				return null;

			}

			if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
			if ( TypedArray !== attribute.array.constructor ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.' );
				return null;

			}

			if ( itemSize === undefined ) itemSize = attribute.itemSize;
			if ( itemSize !== attribute.itemSize ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.' );
				return null;

			}

			if ( normalized === undefined ) normalized = attribute.normalized;
			if ( normalized !== attribute.normalized ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.' );
				return null;

			}

			arrayLength += attribute.array.length;

		}

		const array = new TypedArray( arrayLength );
		let offset = 0;

		for ( let i = 0; i < attributes.length; ++ i ) {

			array.set( attributes[ i ].array, offset );

			offset += attributes[ i ].array.length;

		}

		return new three.BufferAttribute( array, itemSize, normalized );

	}

	/**
	 *	@author zwubs
	 */

	let EntityModelParser = new function() {

		this.parse = function( json, entity ) {

			new three.BufferGeometry();
			let boxes = [];

			let bones = Object.entries( json );

			for (let [name, bone] of bones) {

				if( !bone.cubes ) continue;

				for( let cube of bone.cubes ) {

					let box = new Cube( 1, 1, 1 );

					let matrix = new three.Matrix4();

					let scale = new three.Vector3(1,1,1);
					let position = new three.Vector3(0,0,0);
					let rotation = new three.Euler(0,0,0);

					if( cube.size ) scale.set( cube.size[0], cube.size[1], cube.size[2] ).divideScalar( 16 ).clampScalar( 0.00000001, Math.min() );

					if( cube.offset ) position.set( cube.offset[0], cube.offset[1], cube.offset[2] ).divideScalar( 16 );

					if( cube.rotation ) rotation.setFromVector3( new three.Vector3( cube.rotation[0], cube.rotation[1], cube.rotation[2] ).multiplyScalar( Math.PI/180 ) );

					let quaternion = new three.Quaternion().setFromEuler( rotation, false );
					matrix.compose( position, quaternion, scale );
					box.applyMatrix4( matrix );

					if( cube.faces ) CubeUVParser.parse( cube.faces, box, entity.texture, entity.tileset );

					// this.setupSkinning( box, boneIndex );

					boxes.push( box );

				}

			}

			return mergeBufferGeometries( boxes );

		};

		/**
		 *  @param {THREE.Geometry} box
		 *  @param {Integer} index
		 */
		this.setupSkinning = function( box, index ) {

			var skinIndices = new Float32Array( box.attributes.position.count );

			for( var i = 0; i < skinIndices.length; i++ ) skinIndices.set( [index], i );

			box.setAttribute( "skinIndices", new three.BufferAttribute( skinIndices, 1 ) );

		};

	};

	/**
	 *
	 */
	let EntityArmatureParser = new function() {

	};

	/**
	 *	@author zwubs
	 */

	let CollisionParser = new function() {

		this.parse = function( json ) {

			let collider = new EntityColliderTemplate();

			// Load Collision Boxes
			for( const [ id, box ] of Object.entries( json.boxes ) ) {

				let obb = new OrientedBoundingBox();

				if( box.size ) { obb.scale.set( box.size[0] / 16, box.size[1] / 16, box.size[2] / 16 ); }

				if( box.offset ) { obb.position.set( box.offset[0] / 16, box.offset[1] / 16, box.offset[2] / 16 ); }

				if( box.rotation ) { obb.rotation.setFromVector3( new three.Vector3( box.rotation[0], box.rotation[1], box.rotation[2] ).multiplyScalar( Math.PI/180 ) ); }

				obb.update();

				collider.addBox( obb );

			}

			collider.generate();

			// Create Bounding Box
			// collider.calculateBoundingBox();

			// Create Bounding Sphere
			// collider.calculateBoundingSphere();

			// Return to EntityTemplate
			return collider;

		};

	};

	/**
	 *	@author zwubs
	 *  // TODO: Add warnings for all functions
	 */

	class Actions {

		constructor() {

			this.eventManager = new EventManager();

			this.eventManager.active = false;

		}

		registerAction( actionID ) {

			this.eventManager.registerEvent( actionID );

		}

		addInputBinding( actionID, binding ) {

			if( binding.startsWith("KEY") ) {

				instance$b.eventManager.on( binding, () => { this.eventManager.emit( actionID ); } );

			}
			else if( binding.startsWith("MOUSE") ) {

				instance$a.eventManager.on( binding, () => { this.eventManager.emit( actionID ); } );

			}
			else if( binding.startsWith("GAMEPAD") ) {

				instance$9.eventManager.on( binding, () => { this.eventManager.emit( actionID ); } );

			}

		}

		on( actionID, func ) {

			this.eventManager.on( actionID, func );

		}

	}

	/**
	 *	@author zwubs
	 */

	let ActionScriptLoader = new function() {

		this.load = async function( url ) {

			let file = await FileLoader.load( url );

			return file;

		};

	};

	/**
	 *	@author zwubs
	 */

	class ActionsParser {

		consturctor() {}

		/**
		 *  @param {Object} json
		 */
		async parse( actionsJSON, bindingsJSON, baseURL ) {

			let actions = new Actions;

			for( const [ action, url ] of Object.entries( actionsJSON ) ) {

				if( action != "bindings" ) {

					actions.registerAction( action );

					let scriptString = await ActionScriptLoader.load( baseURL + url );

					actions.on( action, new Function( scriptString )() );

				}

			}

			for( const [ action, bindings ] of Object.entries( bindingsJSON ) ) {

				for( let binding of bindings ) {

					actions.addInputBinding( action, binding );

				}

			}

			return actions;

		}

	}

	let instance$5 = new ActionsParser();

	/**
	 *	@author zwubs
	 *	@namespace PANIC.Parsers
	 */

	var parsers = /*#__PURE__*/Object.freeze({
		__proto__: null,
		JSON: JSONParser,
		Tileset: TilesetParser,
		CubeUV: CubeUVParser,
		EntityModel: EntityModelParser,
		EntityArmature: EntityArmatureParser,
		Collision: CollisionParser,
		Actions: instance$5
	});

	/**
	 *	@author zwubs
	 */

	let EntityLoader = new function() {

		this.load = async function( url ) {

			let baseURL = url.substring(0, url.lastIndexOf("/") + 1 );

			let file = await FileLoader.load( url );

			let json = await JSONParser.parse( file );

			let template = new EntityTemplate();

			// Grab ID & Name
			template.id = json.id;
			template.name = json.name;

			if( json.actions ) template.actions = await instance$5.parse( json.actions, json.bindings, baseURL );
			else template.actions = new Actions();

			if( json.collision ) template.collider = await CollisionParser.parse( json.collision );

			// Load Image & Create Texture
			template.texture = await TextureLoader.load( baseURL + json.texture );

			// Create Tileset
			template.tileset = await TilesetParser.parse( json.tileset, json.id );

			// Parse Geometry Data
			template.geometry = await EntityModelParser.parse( json.armature, template );

			// Everything is loaded, finish template setup
			template.setup();

			// Register Entity Template
			instance$6.registerEntity( template );

			return template;

		};

	};

	/**
	 *	@author zwubs
	 *	@namespace PANIC.Loaders
	 */

	var loaders = /*#__PURE__*/Object.freeze({
		__proto__: null,
		File: FileLoader,
		Image: ImageLoader,
		Texture: TextureLoader,
		Entity: EntityLoader,
		ActionScript: ActionScriptLoader
	});

	/**
	 *	@author zwubs
	 *	@description Make the PANIC namespace global
	 */

	class THREEAccess {

		constuctor() {

			this.THREE = undefined;

		}

		async enable() {

			if( enabled ) {

				if( this.THREE == undefined ) this.THREE = await import('three');

				if( window.THREE != this.THREE ) {

					window.THREE = this.THREE;

					PANIC.Debug.warn( `[PANIC] Namespace 'THREE' has been made global`);

				}

				else { PANIC.Debug.error( `[PANIC] Namespace 'THREE' is already global`); }

			}

		}

		disable() {

			if( enabled ) {

				if( this.THREE != undefined && window.THREE == this.THREE ) {

					window.THREE = undefined;

					PANIC.Debug.warn( `[PANIC] Namespace 'THREE' has been made private`);

				}

				else { PANIC.Debug.error( `[PANIC] Namespace 'THREE' is already private`); }

			}

		}

		toggle() {

			if( window.THREE != this.THREE ) { this.enable(); }
			else { this.disable(); }

		}

	}

	let instance$4 = new THREEAccess();

	/**
	 *	@author zwubs
	 *	@description Make the PANIC namespace global
	 */

	class Access {

		constuctor() {

			this.isGlobal = false;

		}

		async enable() {

			if( enabled ) {

				if( !this.isGlobal ) {

					window.PANIC = await Promise.resolve().then(function () { return panic; });

					this.isGlobal = true;

					PANIC.Debug.warn( `[PANIC] Namespace 'PANIC' has been made global`);

				}

				else { PANIC.Debug.warn( `[PANIC] Namespace 'PANIC' is already global`); }

			}

		}

		disable() {

			if( enabled ) {

				if( this.isGlobal ) {

					window.PANIC = undefined;

					this.isGlobal = false;

					PANIC.Debug.warn( `[PANIC] Namespace 'PANIC' has been made private`);

				}

				else { PANIC.Debug.warn( `[PANIC] Namespace 'PANIC' is already private`); }

			}

		}

		toggle() {

			if( window.PANIC != PANIC ) { this.enable(); }
			else { this.disable(); }

		}

		get THREE() { return instance$4; }

	}

	let instance$3 = new Access();

	/**
	 *	@author zwubs
	 */

	class Grid {

		constructor() {

			this.id = "PANIC-Debug-Grid";

			this.active = false;

			this.geometry = new three.PlaneBufferGeometry( 2, 2, 1, 1 );

			this.uniforms = {

				uColor: { value: new three.Color( 0x888888 ) },

				uScale: { value: 16.0 },
				uSubdivisions: { value: 16.0 },

				uDistance: { value: 100.0 },

			};

			this.material = new three.ShaderMaterial({

				side: three.DoubleSide,

				uniforms: this.uniforms,

				vertexShader: DebugGrid.vertex,
				fragmentShader: DebugGrid.fragment,

				transparent: true,
				depthWrite: false,

				extensions: { derivatives: true }

			});

			this.mesh = new three.Mesh( this.geometry, this.material );
			this.mesh.frustumCulled = false;

			this.mesh.name = this.id;

		}

		toggle( override=null ) {

			if( typeof override == "boolean" ) { this.active = !override; }

			if( !this.active ) {

				if( instance$f.getObjectByName( this.id ) == null ) {

					instance$f.add( this.mesh );

				}

			}

			else {

				if( instance$f.getObjectByName( this.id ) ) {

					instance$f.remove( this.mesh );

				}

			}

			this.active = !this.active;

		}

		get scale() { return this.uniforms.uScale.value; }
		set scale( value ) { this.uniforms.uScale.value = value;}

		get subdivisions() { return this.uniforms.uSubdivisions.value; }
		set subdivisions( value ) { this.uniforms.uSubdivisions.value = value;}

		get distance() { return this.uniforms.uDistance.value; }
		set distance( value ) { this.uniforms.uDistance.value = value;}

		get color() { return this.uniforms.uColor.value; }
		set color( value ) { this.uniforms.uColor.value = new three.Color( value );}

	}

	const instance$2 = new Grid();

	/**
	 *	@author zwubs
	 *	@todo Implement using PANIC.Entity class
	 */

	class Axes {

		constructor() {

			this.id = "PANIC-Debug-Axes";

			this.active = false;

			// Colors
			this.colors = {
				x: new three.Color( 0xFF3352 ),
				y: new three.Color( 0x8BDC00 ),
				z: new three.Color( 0x2890FF )
			};

			// Geometry
			this.geometry = new three.BufferGeometry();

			// Vertices
			this.geometry.setAttribute( 'position', new three.Float32BufferAttribute( [
				-1, 0, 0, 1, 0, 0,
				 0, 0,-1, 0, 0, 1,
				 0,-1, 0, 0, 1, 0,
			], 3 ) );

			// Colors
			this.geometry.setAttribute( 'color', new three.Float32BufferAttribute( [].concat(
				this.colors.x.toArray(), this.colors.x.toArray(),
				this.colors.y.toArray(), this.colors.y.toArray(),
				this.colors.z.toArray(), this.colors.z.toArray(),
			), 3 ) );

			// Opacity
			this.geometry.setAttribute( 'opacity', new three.Float32BufferAttribute( [
				1.0, 1.0,
				1.0, 1.0,
				1.0, 1.0,
			], 1 ) );

			/**
			 *	@todo Implement PANIC.Shaders in Class Structure
			 */

			// Material
			this.material = new three.ShaderMaterial({

				uniforms: DebugAxes.uniforms,

				vertexShader: DebugAxes.vertex,
				fragmentShader: DebugAxes.fragment,

				vertexColors: true,
				transparent: true,
				depthWrite: false,

				extensions: {
					derivatives: true
				}

			});

			// Mesh
			this.mesh = new three.LineSegments( this.geometry, this.material );
			this.mesh.frustumCulled = false;

			this.mesh.name = this.id;

		}

		/**
		 *	@param override {Boolean} - Optional Toggle Override
		 */
		toggle( override=null ) {

			if( typeof override == "boolean" ) { this.active = !override; }

			if( !this.active ) {

				if( instance$f.getObjectByName( this.id ) == null ) {

					instance$f.add( this.mesh );

				}

			}

			else {

				if( instance$f.getObjectByName( this.id ) ) {

					instance$f.remove( this.mesh );

				}

			}

			this.active = !this.active;

		}

		/**
		 *	@param axis {String} - String containing axes to affect Ex. ("XyZ")
		 *	@param override {Boolean} - Optional Toggle Override
		 */
		toggleAxis( axes, override=null ) {

			var indices = [];

			if( axes.toLowerCase().includes("x") ) { indices.push( 0, 1 ); }
			if( axes.toLowerCase().includes("y") ) { indices.push( 2, 3 ); }
			if( axes.toLowerCase().includes("z") ) { indices.push( 4, 5 ); }

			if( !indices ) { warn(`Invalid axes name "${axis}", use either 'x', 'y', or 'z'`); return; }

			this.geometry.attributes.opacity.array.forEach( ( element, index, array ) => {

				if( indices.includes( index ) ) {

					if( typeof override == "boolean" ) array[ index ] = override;

					else array[index] = 1 - element;

				}

			});

			this.geometry.attributes.opacity.needsUpdate = true;

		}

		/**
		 *	@description Updates the 'color' attribute with new values
		 */
		updateColors() {

			this.geometry.attributes.colors.set( [].concat(
				this.colors.x.toArray(), this.colors.x.toArray(),
				this.colors.y.toArray(), this.colors.y.toArray(),
				this.colors.z.toArray(), this.colors.z.toArray(),
			), 0 );

			this.geometry.attributes.colors.needsUpdate = true;

		}

		/**
		 *	@todo Implement
		 */
		setColors( axes, color ) {



		}

	}

	const instance$1 = new Axes();

	/**
	 *	@author zwubss
	 */

	let spherical = new three.Spherical();

	class Compass {

		constructor() {

			this.id = "PANIC-Debug-Compass";

			this.element = document.createElement("div");
			this.element.id = this.id;

			this.active = false;

			/**
			 *	0 = Cardinal & Ordinal Directions
			 *	1 = Cartesian Directions
			 *	2 = Cartesian Coordinates
			 */
			this.state = 0;

		}

		toggle( override=null ) {

			if( typeof override == "boolean" ) { this.active = !override; }
			else { this.active = !this.active; }

			if( this.active ) {

				DebugElement.appendChild( this.element );

				instance$d.add( this, 15 );

			}

			else {

				DebugElement.removeChild( this.element );

				instance$d.remove( this );

			}

		}

		update() {

			var string = "";
			var direction = new three.Vector3( 0, 0, 0 );
			instance$e.getWorldDirection( direction );

			if( this.state == 0 ) {

				var radians = Math.atan2( direction.x, direction.z );
				var degrees = Math.round( radians / Math.PI * 180 );

				if( degrees >= 112.5 || degrees <= -112.5 ) string += "N";
				else if( degrees >= -67.5 && degrees <= 67.5  ) string += "S";
				if( degrees >= 22.5 && degrees <= 157.5 ) string += "E";
				else if( degrees >= -157.5 && degrees <= -22.5 ) string += "W";

			}

			else if( this.state == 1 ) {

				spherical.setFromVector3( direction );
				spherical.makeSafe();

				let phi = Math.round( spherical.phi / Math.PI * 180 );
				let theta = Math.round( spherical.theta / Math.PI * 180 );

				if( theta > 0 ) string += "+X";
				else if( theta < 0 ) string += "-X";
				else string += "±X";

				if( phi > 90 ) string += " +Y";
				else if( phi < 90 ) string += " -Y";
				else string += " ±Y";

				if( Math.abs( theta ) > 90 ) string += " +Z";
				else if( Math.abs( theta ) < 90 ) string += " -Z";
				else string += " ±Z";

			}

			else if( this.state == 2 ) {

				spherical.setFromVector3( direction );
				spherical.makeSafe();

				let phi = Math.round( spherical.phi / Math.PI * 180 );
				let theta = Math.round( spherical.theta / Math.PI * 180 );

				string = `${phi} ${theta}`;

			}

			this.element.innerHTML = `Facing: ${ string }`;

		}

	}

	let instance = new Compass();

	/**
	 *	@author zwubs
	 *	@todo Cleanup this file
	 */

	class DebugEntityCollision {

		constructor( entity ) {

			this.entity = entity;
			this.collider = entity.collider;

			// TODO: Implement Functionality
			this.status = false;

			this.object = new three.Object3D();
			instance$f.add( this.object );

			this.meshes = {
				collision: new three.Object3D(), // Collection of OBBs
				box: null, // OBB that encapsulates ^
				sphere: null // Bounding Sphere that encapsulates ^
			};

			let collisionGeometry = [];

			for( let i = 0; i < this.collider.collision.length; i++ ) {

				this.collider.collision[ i ];

				collisionGeometry.push( Cube.identity() );

				let mesh = new three.LineSegments( collisionGeometry[i], new three.LineBasicMaterial( { color: 0x00FF00 } ) );
				mesh.matrixAutoUpdate = false;
				this.meshes.collision.add( mesh );

			}

			// Collision boxes
			this.object.add( this.meshes.collision );

			// OBB
			this.meshes.box = new three.LineSegments( Cube.identity(), new three.LineBasicMaterial( { color: 0xFFFF00 } ) );
			this.meshes.box.matrixAutoUpdate = false;
			this.object.add( this.meshes.box );

			//	Bounding Sphere - still not sold on this implmentation yet
			const geometry = new three.CircleGeometry( this.collider.boundingSphere.radius, 64 );
			const edges = new three.EdgesGeometry( geometry );
			this.meshes.sphere = new three.LineSegments( edges, new three.LineBasicMaterial( { color: 0xffffff } ) );
			this.meshes.sphere.matrixAutoUpdate = false;
			this.object.add( this.meshes.sphere );

		}

		enable() {}
		disable() {}
		toggle() {}

		update() {

			// Collision Boxes
			for( let i = 0; i < this.collider.collision.length; i++ ) {

				this.meshes.collision.children[i].matrix.copy( this.collider.collision[i].matrixWorld );

			}

			// Bounding Box
			this.meshes.box.matrix.copy( this.collider.boundingBox.matrixWorld );

			// Bounding Sphere
			let position = new three.Vector3();
			let scale = new three.Vector3();
			this.collider.boundingSphere.matrixWorld.decompose( position, new three.Quaternion(), scale );
			this.meshes.sphere.lookAt( instance$e.getWorldPosition( new three.Vector3 ) );
			this.meshes.sphere.matrix.compose( position, this.meshes.sphere.quaternion, scale );

		}

	}

	/**
	 *	@author zwubs
	 */

	class EntityDebug {

		constructor( entity ) {

			entity.debug = this;

			this.entity = entity;

			this._collision = null;

			instance$d.add( this );

		}

		set collision( bool ) {

			if( bool == true && this._collision == null ) {
				this._collision = new DebugEntityCollision( this.entity );
			}
			else if( bool == false && this._collision != null ) ;
			else ;

		}

		update() {

			if( this._collision != null ) { this._collision.update(); }

		}

	}

	let EntityDebugFunction = function( entity ) {

		return entity.debug = new EntityDebug( entity );

	};

	/**
	 *  @author zwubs
	 */

	var debug = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Element: DebugElement,
		Text: instance$7,
		Access: instance$3,
		Grid: instance$2,
		Axes: instance$1,
		Compass: instance,
		Entity: EntityDebugFunction,
		get enabled () { return enabled; },
		enable: enable,
		disable: disable,
		toggle: toggle,
		log: log,
		warn: warn,
		error: error,
		clear: clear,
		style: style
	});

	/**
	 *	@author zwubs
	 *	@namespace PANIC
	 *	@todo Decide what actually needs to be visible to the user.
	 */

	let Version = "0.0.4";

	var panic = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Version: Version,
		Scene: instance$f,
		Camera: instance$e,
		Renderer: instance$c,
		Clock: Clock,
		Updater: instance$d,
		Cube: Cube,
		Texture: Texture,
		OrbitControls: Controls,
		Element: Element,
		Tile: Tile,
		TileGroup: TileGroup,
		Tileset: Tileset,
		EventManager: EventManager,
		Input: input,
		Entity: Entity$1,
		EntityTemplate: EntityTemplate,
		EntityRegistry: instance$6,
		Collision: collision,
		Shaders: shaders,
		Loaders: loaders,
		Parsers: parsers,
		Tools: instance$8,
		Debug: debug
	});

	exports.Camera = instance$e;
	exports.Clock = Clock;
	exports.Collision = collision;
	exports.Cube = Cube;
	exports.Debug = debug;
	exports.Element = Element;
	exports.Entity = Entity$1;
	exports.EntityRegistry = instance$6;
	exports.EntityTemplate = EntityTemplate;
	exports.EventManager = EventManager;
	exports.Input = input;
	exports.Loaders = loaders;
	exports.OrbitControls = Controls;
	exports.Parsers = parsers;
	exports.Renderer = instance$c;
	exports.Scene = instance$f;
	exports.Shaders = shaders;
	exports.Texture = Texture;
	exports.Tile = Tile;
	exports.TileGroup = TileGroup;
	exports.Tileset = Tileset;
	exports.Tools = instance$8;
	exports.Updater = instance$d;
	exports.Version = Version;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
