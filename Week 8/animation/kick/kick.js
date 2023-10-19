// total number of steps in animation
var steps = 100;

// leg parameters for animation
var params = {
    ankleRotation: -Math.PI/3,         // angle of foot relative to lower leg
    kneeRotation: -2*Math.PI/3,        // angle of lower leg relative to thigh
    hipRotation: -Math.PI/4,           // angle of hip in scene coordinate frame
    ankleChange: (Math.PI/3)/steps,    // change of ankleRotation per frame
    kneeChange: (2*Math.PI/3)/steps,   // change of kneeRotation per frame
    hipChange: (3*Math.PI/4)/steps,    // change of hipRotation per frame
    footLength: 10,                    // dimensions of parts of leg
    calfLength: 20,
    thighLength: 25,
    step: 0                            // frame number in animation
};

var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: 0, maxx: 5,
                maxy: 0, miny: -(params.thighLength + params.calfLength),
                minz: -3, maxz: 3});

var leg;

function makeLeg(scene, params) {
   // makes a leg going down from the scene origin, with joints rotating around 
   // the z axis. Meshes are shoe, calf, and thigh. Composite objects are foot, 
   // lowerleg, and leg

   foot = new THREE.Object3D();
   var shoe = TW.createMesh(new THREE.CylinderGeometry(2, 1, params.footLength));
   shoe.position.x = params.footLength/2;
   shoe.rotation.z = Math.PI/2;
   foot.add(shoe);

   lowerleg = new THREE.Object3D();
   var calf = TW.createMesh(new THREE.CylinderGeometry(3, 2, params.calfLength));
   calf.position.y = -params.calfLength/2;
   lowerleg.add(calf);
   foot.position.y = -params.calfLength;
   foot.rotation.z = params.ankleRotation;
   lowerleg.add(foot);

   leg = new THREE.Object3D();
   var thigh = TW.createMesh(new THREE.CylinderGeometry(5, 4, params.thighLength));
   thigh.position.y = -params.thighLength/2;
   leg.add(thigh);
   lowerleg.position.y = -params.thighLength;
   lowerleg.rotation.z = params.kneeRotation;
   leg.add(lowerleg);

   leg.rotation.z = params.hipRotation;
   scene.add(leg); 
}

// firstState() resets the leg to the initial state and renders the scene
function firstState() {
   params.ankleRotation = -Math.PI/3;
   params.kneeRotation = -2*Math.PI/3;
   params.hipRotation = -Math.PI/4;
   params.step = 0;
   if ( leg != null ) {
       scene.remove(leg);
   }
   makeLeg(scene, params);
   TW.render();
}

firstState();

function updateState() {

// ADD CODE TO UPDATE THE ANKLE, KNEE, AND HIP ROTATIONS, AND INCREMENT
// THE STEP NUMBER, FOR THE NEXT FRAME OF THE ANIMATION (ALL RELEVANT
// INFORMATION IS STORED IN THE GLOBAL params OBJECT)

}

function oneStep() {

// ADD CODE TO PERFORM ONE STEP OF THE ANIMATION: REMOVE THE CURRENT LEG
// OBJECT, UPDATE THE STATE (USE updateState() FOR THIS), REMAKE THE LEG,
// AND RENDER THE SCENE

}

// stored so that we can cancel the animation if we want
var animationID = null;

function animate (timestamp) {
   oneStep();

   // MODIFY THE LAST STATEMENT IN THIS FUNCTION SO THAT THE
   // ANIMATION STOPS WHEN params.step REACHES steps

   animationID = requestAnimationFrame(animate);
}

// stopAnimation() halts the animation
function stopAnimation() {
   if ( animationID != null) {
      cancelAnimationFrame(animationID);
      console.log("Cancelled animation using " + animationID);
   }
}

// keyboard controls for the animation control
TW.setKeyboardCallback("0", firstState, "reset animation");
TW.setKeyboardCallback("1", oneStep, "advance by one step");
TW.setKeyboardCallback("g", animate, "go:  start animation");
TW.setKeyboardCallback(" ", stopAnimation, "stop animation");