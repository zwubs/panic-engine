/**
 *	@author zwubs
 *	@namespace PANIC
 */

var PANIC = {};

// Major.Minor.Patch
PANIC.Version = "1.0.0";
PANIC.Type = "raster";

PANIC.Element = document.createElement("div");
PANIC.Element.id = "PANIC";
PANIC.Element.style.width = PANIC.Element.style.height = "100%";
document.body.appendChild( PANIC.Element );

// Canvas Setup
PANIC.Canvas = document.createElement("canvas");
PANIC.Canvas.id = "PANIC-Canvas";
PANIC.Element.appendChild( PANIC.Canvas );

PANIC.Aspect = PANIC.Canvas.clientWidth / PANIC.Canvas.clientHeight;

// Renderer Setup
PANIC.Renderer = new THREE.WebGLRenderer({ canvas: PANIC.Canvas });
PANIC.Renderer.setPixelRatio( window.devicePixelRatio );
PANIC.Renderer.setSize( window.innerWidth, window.innerHeight );

PANIC.Renderer.shadowMap.enabled = true;

PANIC.Renderer.outputEncoding = THREE.sRGBEncoding;
/*
PANIC.Renderer.toneMapping = THREE.Uncharted2ToneMapping;
PANIC.Renderer.toneMappingWhitePoint = 2.5;
PANIC.Renderer.toneMappingExposure = 1.5;
*/

// Scene Setup
PANIC.Scene = new THREE.Scene();
PANIC.Scene.background = new THREE.Color( 0x222222 );
PANIC.Scene.fog = new THREE.FogExp2( new THREE.Color( 0x222222 ), 0.025 );

PANIC.Scene.add( new THREE.HemisphereLight( 0xC9F8FF, 0xC9F8FF, 1.25 ) );

var dirLight = new THREE.DirectionalLight( 0xFFFFFF, 1.25 );
dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

dirLight.shadow.camera.near = 0.01;
dirLight.shadow.camera.far = 25;

dirLight.shadow.bias = -0.001;

dirLight.position.set( 0.5, 1, -0.75 );
dirLight.position.multiplyScalar( 3 );

PANIC.Scene.add( dirLight );

// Camera Setup
PANIC.Camera = new THREE.PerspectiveCamera( 45, PANIC.Aspect, 0.1, 1000 );
PANIC.Camera.position.set( 0, 1, -4 );

// Controls Setup
PANIC.Controls = new THREE.OrbitControls( PANIC.Camera, PANIC.Canvas );
PANIC.Controls.target = new THREE.Vector3( 0, 0, 0 );
PANIC.Controls.update();

// Renderer Kill Function
PANIC.Kill = function() {

	PANIC.Renderer.getContext().getExtension('WEBGL_lose_context').loseContext();

}


function onWindowResize(){

    PANIC.Aspect = PANIC.Element.offsetWidth / PANIC.Element.offsetHeight;
	PANIC.Camera.aspect = PANIC.Aspect;
    PANIC.Camera.updateProjectionMatrix();

	PANIC.Renderer.setPixelRatio( window.devicePixelRatio );
    PANIC.Renderer.setSize( PANIC.Element.offsetWidth, PANIC.Element.offsetHeight );

}

window.onresize = onWindowResize;

onWindowResize();




/**
 *	@namespace PANIC.Tools
 */
PANIC.Tools = {};
PANIC.Tools.XAxis = new THREE.Vector3(1,0,0);
PANIC.Tools.YAxis = new THREE.Vector3(0,1,0);
PANIC.Tools.ZAxis = new THREE.Vector3(0,0,1);
PANIC.Tools.NAxis = new THREE.Vector3(0,0,0); // Null Axis

/**
 *	@function PANIC.Tools.generateUUID - Generates a random UUID for use mainly with Entities
 * 	@return {string}  generated UUID
 */
PANIC.Tools.generateUUID = function() {

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
