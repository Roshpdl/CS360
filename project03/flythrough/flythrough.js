/* Author: Roshan Poudel
Class: CS 360 Fall 2023
Instructor: Dr. Ross Sowell
Description: Project 3: Flythrough
*/

// create a scene with a barn, 3 fences, and ground

function makeBarnScene () {
    // create three fences and add them to the scene
    fence1 = makeFence(40);
    fence1.translateX(5);
    fence2 = fence1.clone();
    fence2.translateZ(-10);
    fence3 = makeFence(100);
    fence3.translateX(9.2);
    fence3.rotation.y = Math.PI/2;
    scene.add(fence1);
    scene.add(fence2);
    scene.add(fence3);
    // create a barn and add it to the scene
    var barn = new TW.createMesh(TW.createBarn(5,5,10));
    scene.add(barn);
    // create the ground plane and add it to the scene
    var gc = THREE.ColorKeywords.darkgreen;
    var ground = new THREE.Mesh(new THREE.PlaneGeometry(20,20),
                                new THREE.MeshBasicMaterial( {color: gc}));
    ground.rotation.x = -Math.PI/2;
    scene.add(ground);
 }
 
 function makeFence(numPickets) {
     // makes a fence with the left end at the origin and proceeding
     // down the x axis. The pickets are made from barn objects, scaled
     // to be unit height (at the shoulder) and very thin 
     var fence = new THREE.Object3D();
     var picketG = TW.createBarn(.09, 1, 0.1);
     var picket = new THREE.Mesh(picketG, new THREE.MeshNormalMaterial());
     for ( var i = 0; i < numPickets; ++i ) {
         picket = picket.clone();
         picket.translateX(0.1);
         fence.add(picket);
     }
     return fence;
 }

var cameraParams = {
    near: 1,
    far: 100,
    fov: 90,                 // degrees
    aspectRatio: 800/500,   // from dimensions of the canvas, see CSS
    atX: 0,
    atY: 0,
    atZ: 0,
    eyeX: 0,
    eyeY: 60,
    eyeZ: 60,
    upX: 0,
    upY: 1,
    upZ: 0
};
 
 // create a scene object
 var scene = new THREE.Scene();
 
 // add the barn scene                         
 makeBarnScene();
 
 //function to create a camera
 function setupCamera (cameraParameters) {
    var cp = cameraParameters;
    // create an initial camera with the desired shape
    var camera = new THREE.PerspectiveCamera(cp.fov, cp.aspectRatio, cp.near, cp.far);
    // set the camera location and orientation
    camera.position.set(cp.eyeX, cp.eyeY, cp.eyeZ);
    camera.up.set(cp.upX, cp.upY, cp.upZ);
    camera.lookAt(new THREE.Vector3(cp.atX, cp.atY, cp.atZ));
    return camera;
}

 
 // create a renderer 
 var renderer = new THREE.WebGLRenderer({antialias: true});
 
 TW.mainInit(renderer,scene);

 // create camera, add to scene, and render scene with new camera
 var camera = setupCamera(cameraParams);
 scene.add(camera);


function render() {
    // a render function; assume global variables scene, renderer, and camera
    renderer.render(scene,camera);
}
render();


var frameNum = 0;
// newFrame() is a callback function that changes the camera view
function newFrame() {
    if (frameNum == 10){
        cameraParams.eyeZ = 60;
        cameraParams.eyeY = 60;
        cameraParams.atY = 0;
        redoCamera();
        frameNum = 0;
        document.getElementById('frameNum').innerHTML = "Frame " + frameNum;
        return;
    }
    cameraParams.eyeZ -= 4;
    cameraParams.eyeY -= 5.5;
    cameraParams.atY += 0.5;
    redoCamera();
    frameNum++;
    document.getElementById('frameNum').innerHTML = "Frame " + frameNum;
}

// create a keyboard control to explore camera parameters
function redoCamera() {
    scene.remove(camera);
    camera = setupCamera(cameraParams);
    scene.add(camera)
    render();
}

TW.setKeyboardCallback('n', newFrame, "change view");

