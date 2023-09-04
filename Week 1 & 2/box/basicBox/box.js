// Create an initial empty Scene
var scene = new THREE.Scene();

// Create a 3D rectangular box of a given width, height, depth
var boxGeom = new THREE.BoxGeometry(4,6,8);

//Create a 3D sphere of a given radius
var sphereGeom = new THREE.SphereGeometry(3);

// Create a mesh for the box
// TW.createMesh() assigns a set of demo materials to object faces
var boxMesh = TW.createMesh(boxGeom);

//Create a mesh for the sphere
var sphereMesh = TW.createMesh(sphereGeom);
sphereMesh.position.set(5, 0, 0); //x,y,z coordinates of center
// Add the box mesh to the scene
scene.add(boxMesh);

//Add the sphere mesh to the scene
scene.add(sphereMesh);

// Create a renderer to render the scene
var renderer = new THREE.WebGLRenderer();

// TW.mainInit() initializes TW, adds the canvas to the document,
// enables display of 3D coordinate axes, sets up keyboard controls
TW.mainInit(renderer,scene);

// Set up a camera for the scene
var state = TW.cameraSetup(renderer,
                            scene,
                            {minx: -2.5, maxx: 2.5,
                            miny: -3.5, maxy: 3.5,
                            minz: -4.5, maxz: 4.5});