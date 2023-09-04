/* Returns a geometry object for a steeple. The origin is
   at the center of the base, so the base vertices are at
   y=0, and x and z at plus or minus half the width */
function createSteeple(width, height) {
    var geom = new THREE.Geometry();
    var w2 = 0.5*width;

    // create the vertices for the base and top
    geom.vertices.push(new THREE.Vector3(+w2, 0, +w2)); //vertex 0

    // insert code for the remaining four vertices
    geom.vertices.push(new THREE.Vector3(+w2, 0, -w2)); //vertex 1
    geom.vertices.push(new THREE.Vector3(-w2, 0, -w2)); //vertex 2
    geom.vertices.push(new THREE.Vector3(-w2, 0, +w2)); //vertex 3
    geom.vertices.push(new THREE.Vector3(0, height, 0)); //vertex 4

    // use the vertices to define the triangle faces

    // base - the front side faces the ground - that's why clockwise
    geom.faces.push(new THREE.Face3(0, 2, 1));
    geom.faces.push(new THREE.Face3(0, 3, 2));

    // insert code to create the four side faces
    geom.faces.push(new THREE.Face3(0, 1, 4));
    geom.faces.push(new THREE.Face3(1, 2, 4));
    geom.faces.push(new THREE.Face3(2, 3, 4));
    geom.faces.push(new THREE.Face3(3, 0, 4));

    // calculate the normals for surface colors
    geom.computeFaceNormals();

    return geom;
}

// Create a Scene object
var scene = new THREE.Scene();

// ====================================================================

var barnWidth = 50;
var barnHeight = 30;
var barnDepth = 40;

var barn1geom = TW.createBarn( barnWidth, barnHeight, barnDepth );
var barn1mesh = TW.createMesh(barn1geom);
scene.add(barn1mesh);

// ================================================================
 
// insert code to create the new steeple and add it to the scene

steepleParams = {
    Width: 6,
    Height: 36
}

function addSteeple(width, height) {
    steepleGeom = createSteeple(width, height);
    steepleMesh = TW.createMesh(steepleGeom);
    steepleMesh.position.set(barnWidth/2, barnHeight + barnHeight/2, -width/2);
    scene.add(steepleMesh);
}

addSteeple(steepleParams.Width, steepleParams.Height);

// ================================================================

// Create a renderer and camera
var renderer = new THREE.WebGLRenderer();
TW.mainInit(renderer,scene);

// adjust maxy to view the entire church
TW.cameraSetup(renderer,
               scene,
               {minx: 0, maxx: barnWidth,
                miny: 0, maxy: barnHeight + barnWidth*0.5 + barnWidth/2,
                minz: -barnDepth, maxz: 0});

function redrawSteeple() {
    scene.remove(steepleMesh);
    addSteeple(steepleParams.Width, steepleParams.Height);
    TW.render();
}
                          
// set up sliders to control the dimensions of the box
var gui = new dat.GUI();
gui.add(steepleParams, 'Width', 6, 15).onChange(redrawSteeple);
gui.add(steepleParams, 'Height', 36, 60).onChange(redrawSteeple);