"use strict";

var renderer = new THREE.WebGLRenderer();

var scene = new THREE.Scene();

TW.mainInit(renderer,scene);
                        
var params = new TW.TeddyBearParams();

// New materials
params.bodyMaterial = new THREE.MeshLambertMaterial(
    {color: params.bodyColor} );
params.headMaterial = new THREE.MeshLambertMaterial( {color: params.headColor});
params.blackMaterial = new THREE.MeshPhongMaterial(
    {color: TW.BLACK,
     specular: TW.WHITE} );

params.ambientLightOn = true;
params.upperLeftLightOn = true;
params.overheadLightOn = true;

var light0, light1, light2;

function makeLights() {
    // we're using globals for the lights, for the GUI
    light0 = new THREE.AmbientLight( 0x202020 ); // 10%
    scene.add(light0);

    light1 = new THREE.PointLight( TW.WHITE, 0.5 ); // 50%
    light1.position.set( -12, 15, 10 );
    scene.add(light1);

    light2 = new THREE.DirectionalLight( TW.WHITE, 0.3 );
    light2.position.set( 0, 100, 10 );
    scene.add(light2);
}
makeLights();
    
var light1helper, light2helper;

function addLightHelpers() {
    light1helper = new THREE.PointLightHelper(light1, 0.2);
    scene.add(light1helper);
    light2helper = new THREE.DirectionalLightHelper(light2, 1);
    scene.add(light2helper);
}
addLightHelpers();

function updateLightsFromParams() {
    // in case we are re-making the lights, remove the old ones
    scene.remove(light0);
    scene.remove(light1);
    scene.remove(light2);
    scene.remove(light1helper);
    scene.remove(light2helper);

    // add back in the lights that we want
    if( params.ambientLightOn ) {
        scene.add(light0);
    }
    if( params.upperLeftLightOn ) {
        scene.add(light1);
        scene.add(light1helper);
    }
    if( params.overheadLightOn ) {
        scene.add(light2);
        scene.add(light2helper);
    }
}

updateLightsFromParams();

var bear = TW.createTeddyBear(params);

scene.add(bear);

var state = TW.cameraSetup(renderer,
               scene,
               {minx: -5, maxx: 5,
                miny: -10, maxy: 15,
                minz: -5, maxz: 5});
TW.toggleAxes("show");
TW.viewFromAboveFrontSide();

TW.setKeyboardCallback("w",
                       function () {
                           params.wireframe = !params.wireframe;
                           params.bodyMaterial.wireframe = params.wireframe;
                           params.headMaterial.wireframe = params.wireframe;
                           state.render();
                       },
                       "toggle wireframe");

// ================================================================

// when true, objects are drawn in wireframe
var wireframe = false;

// More bear params
params.bodyColor = 0xD08050;
params.headColor = 0xB07040;   // like body but slightly darker
params.blackColor = 0x000000;
params.lambert = false;
params.phong = false;

function redoMaterials() {
    if( params.phong ) {
        params.bodyMaterial = new THREE.MeshPhongMaterial({color: params.bodyColor}),
        params.headMaterial = new THREE.MeshPhongMaterial({color: params.headColor});
        params.blackMaterial = new THREE.MeshPhongMaterial({color: params.blackColor});
    } else if( lambert ) {
        params.bodyMaterial = new THREE.MeshLambertMaterial({color: params.bodyColor}),
        params.headMaterial = new THREE.MeshLambertMaterial({color: params.headColor});
        params.blackMaterial = new THREE.MeshLambertMaterial({color: params.blackColor});
    } else {        
        params.bodyMaterial = new THREE.MeshBasicMaterial({color: params.bodyColor}),
        params.headMaterial = new THREE.MeshBasicMaterial({color: params.headColor});
        params.blackMaterial = new THREE.MeshBasicMaterial({color: params.blackColor});
    }
    params.bodyMaterial.wireframe = params.wireframe;
    params.headMaterial.wireframe = params.wireframe;
}

function rebuild() {
    redoMaterials();
    scene.remove(bear);
    bear = TW.createTeddyBear(params);
    scene.add(bear);
    state.render();
}

function redo() {
    updateLightsFromParams();
    TW.render();
}

// ================================================================
var gui = new dat.GUI();
gui.add(params, 'ambientLightOn' ).onChange(redo);
gui.add(params, 'upperLeftLightOn' ).onChange(redo);
gui.add(params, 'overheadLightOn' ).onChange(redo);