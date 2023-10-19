// create a scene with a blue box

var scene = new THREE.Scene();

var cubeGeom = new THREE.CubeGeometry(50,50,50);
var cubeMesh = new THREE.Mesh(cubeGeom,
                              new THREE.MeshBasicMaterial({color: 0x0000ff,
                                                           side: THREE.DoubleSide}));
scene.add(cubeMesh);

// create a clown who will appear after timer ends

// global parameters for dimensions of clown
var clownLimbR = 1.5;    // radius of clown limbs
var clownLimbH = 20;     // length of clown limbs
var clownHeadR = 10;     // radius of clown head
var clownChestR = 12;    // radius of clown chest

var clown = createClown (clownHeadR, clownChestR, clownLimbR, clownLimbH);

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer, scene, 
               {minx: -20, maxx: 30,
                miny: -30, maxy: 60,
                minz: -30, maxz: 30});

// CREATE A TIMER THAT ROTATES A CLOCK-HAND IN HALF-SECOND INTERVALS,
// AND POPS UP THE CLOWN WHEN THE TIMER ENDS
// global variables whose properties are updated during the animation

var clockHand, animationID;
var animationStarted = false;
var time = 0;

function makeClockHand() {
    //create a object 3D for the clock hand
    clockHand = new THREE.Object3D();
    var clockHandGeom = new THREE.ConeGeometry(1,15,20);
    var clockHandMesh = new THREE.Mesh(clockHandGeom,
                                       new THREE.MeshBasicMaterial({color: 0xffffff,
                                                                    side: THREE.DoubleSide}));
    clockHandMesh.position.y = 5;
    clockHandMesh.position.z = 25;
    clockHand.add(clockHandMesh);
}

makeClockHand();
scene.add(clockHand);
TW.render();

function updateState() {
    time += 1;
    clockHand.rotation.z -= Math.PI/2; // rotate the clock hand by 90 degrees
    if (time ==4) { // change time to 2 to wait for 1 second
        scene.add(clown);
        clearInterval(animationID);
    }
    TW.render();
}

// animate() is the callback function for the "go" button
function animate() {
    if (!animationStarted) {
        animationStarted = true; // set the flag to true
        animationID = setInterval(updateState, 500);
    }
}

// animate() is the callback function for the "go" button
TW.setKeyboardCallback("g", animate, "go:  start animation");

