var scene, renderer, state;

scene = new THREE.Scene();

//Geometry
var cylinderGeom = new THREE.CylinderGeometry(1.5, 1, 6); //radius-top, radius-bottom, height
var sphereGeom = new THREE.SphereGeometry(1); //radius
var box1Geom = new THREE.BoxGeometry(1, 5, 1);//width, height, depth
var box2Geom = new THREE.BoxGeometry(1, 5, 1);
var box3Geom = new THREE.BoxGeometry(1, 5, 1);
var box4Geom = new THREE.BoxGeometry(1, 5, 1);

//Mesh
var cylinderMesh = TW.createMesh(cylinderGeom);
var sphereMesh = TW.createMesh(sphereGeom);
var box1Mesh = TW.createMesh(box1Geom);
var box2Mesh = TW.createMesh(box2Geom);
var box3Mesh = TW.createMesh(box3Geom);
var box4Mesh = TW.createMesh(box4Geom);


//Position
sphereMesh.position.set(0, 4, 0);
box1Mesh.position.set(3, 0, 0);
box2Mesh.position.set(0, 0, 3);
box3Mesh.position.set(-3, 0, 0);
box4Mesh.position.set(0, 0, -3);

//Adding the meshes to the scene
var meshes = [cylinderMesh, sphereMesh, box1Mesh, box2Mesh, box3Mesh, box4Mesh]

for (let i = 0; i < meshes.length; i++) {
    scene.add(meshes[i])
}


// Create a renderer to render the scene
renderer = new THREE.WebGLRenderer();

// Set up a camera for the scene
state = TW.cameraSetup(renderer,
    scene,
    {
        minx: -2.5, maxx: 2.5,
        miny: -3.5, maxy: 3.5,
        minz: -4.5, maxz: 4.5
    });