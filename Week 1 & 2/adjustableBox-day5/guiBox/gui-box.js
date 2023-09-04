// Create an initial empty Scene
var scene = new THREE.Scene();

// global variable for dimensions of box 
var sceneParams = {
    boxWidth: 20,
    boxHeight: 40,
    boxDepth: 60
}

// addBox() creates a 3D rectangular box of a given width, height, depth
// and adds it to the scene

function addBox (width,height,depth) {
    var boxGeom = new THREE.BoxGeometry(width,height,depth)
    boxMesh = TW.createMesh(boxGeom);
    scene.add(boxMesh);
}

addBox(sceneParams.boxWidth,sceneParams.boxHeight,sceneParams.boxDepth);

// Create a renderer to render the scene
var renderer = new THREE.WebGLRenderer();

// TW.mainInit() initializes TW, adds the canvas to the document,
// enables display of 3D coordinate axes, sets up keyboard controls
TW.mainInit(renderer,scene);

// Set up a camera for the scene
TW.cameraSetup(renderer,
                scene,
                {minx: -20, maxx: 20,
                miny: -30, maxy: 30,
                minz: -40, maxz: 40});

// redrawBox() is a callback function that redraws the box with the new dimensions
function redrawBox() {
    scene.remove(boxMesh);
    addBox(sceneParams.boxWidth,sceneParams.boxHeight,sceneParams.boxDepth);
    TW.render();
}

// set up sliders to control the dimensions of the box
var gui = new dat.GUI();
gui.add(sceneParams, 'boxWidth', 10, 30).onChange(redrawBox);
gui.add(sceneParams, 'boxHeight', 20, 50).onChange(redrawBox);
gui.add(sceneParams, 'boxDepth', 30, 70).onChange(redrawBox);