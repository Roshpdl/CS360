var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene, 
               {minx: -2, maxx: 2,
                miny: -2, maxy: 2,
                minz: -2, maxz: 2});

// parameters of the animation that are controlled by the GUI
var guiParams = {
    vx: 0.01,       // x rotation velocity
    vy: 0.02,       // y rotation velocity 
    vz: 0.04        // z rotation velocity 
};

// global variables whose properties are updated during the animation
var animationState, cube;

// firstState() resets the cube and rotations to the initial state and renders the scene
function firstState() {
    animationState = {
        time: 0,       // total time of the animation
        rx: 0,         // total x rotation
        ry: 0,         // total y rotation
        rz: 0          // total z rotation
    };
    if ( cube != null ) {
        scene.remove(cube);
    }
    cube = new THREE.Mesh(new THREE.CubeGeometry(2,2,2),
                          new THREE.MeshNormalMaterial());
    scene.add(cube);
    TW.render();
}

firstState();

// updateState() updates cube rotations and content of animationState
function updateState() {
    animationState.time += 1;
    // increase the total rotations by the user-specified velocity
    animationState.rx += guiParams.vx;
    animationState.ry += guiParams.vy;
    animationState.rz += guiParams.vz;
    // rotate the cube around the x,y,z axes
    cube.rotateX(guiParams.vx);
    cube.rotateY(guiParams.vy);
    cube.rotateZ(guiParams.vz);
}

// oneStep() performs one step of the animation
function oneStep() {
    updateState();
    TW.render();
}
    
// stored so that we can cancel the animation if we want
var animationId = null;                

// animate() starts the continuous animation loop
function animate(timestamp) {
    oneStep();
    animationId = requestAnimationFrame(animate);
}

// stopAnimation() halts the animation
function stopAnimation() {
    if( animationId != null ) {
        cancelAnimationFrame(animationId);
        console.log("Cancelled animation using " + animationId);
    }
}

// keyboard controls for the animation control
TW.setKeyboardCallback("0", firstState, "reset animation");
TW.setKeyboardCallback("1", oneStep, "advance by one step");
TW.setKeyboardCallback("g", animate, "go:  start animation");
TW.setKeyboardCallback(" ", stopAnimation, "stop animation");

// GUI controls enable user to change x,y,z rotation velocities
var gui = new dat.GUI();

gui.add(guiParams, "vx", 0, 0.1);
gui.add(guiParams, "vy", 0, 0.1);
gui.add(guiParams, "vz", 0, 0.1);