// Create an initial empty Scene
var scene = new THREE.Scene();

// Create a 3D rectangular box of a given width, height, depth
var barnGeom = new THREE.Geometry();

function barnVertices(width, height, depth){
    //add the front vertices
    barnGeom.vertices.push(new THREE.Vector3(0, 0, 0)); //vertex 0
    barnGeom.vertices.push(new THREE.Vector3(width, 0, 0)); //vertex 1
    barnGeom.vertices.push(new THREE.Vector3(width, height, 0)); //vertex 2
    barnGeom.vertices.push(new THREE.Vector3(0, height, 0)); //vertex 3
    barnGeom.vertices.push(new THREE.Vector3(width/2, height*1.5, 0)); //vertex 4

    //adding the back vertices
    barnGeom.vertices.push(new THREE.Vector3(0, 0, -depth)); //vertex 5
    barnGeom.vertices.push(new THREE.Vector3(width, 0, -depth)); //vertex 6
    barnGeom.vertices.push(new THREE.Vector3(width, height, -depth)); //vertex 7
    barnGeom.vertices.push(new THREE.Vector3(0, height, -depth)); //vertex 8
    barnGeom.vertices.push(new THREE.Vector3(width/2, height*1.5, -depth)); //vertex 9

}

function barnFaces(){
    //front face
    barnGeom.faces.push(new THREE.Face3(0,1,2));
    barnGeom.faces.push(new THREE.Face3(0,2,3));
    barnGeom.faces.push(new THREE.Face3(3,2,4));

    //back face
    barnGeom.faces.push(new THREE.Face3(5,6,7));
    barnGeom.faces.push(new THREE.Face3(5,7,8));
    barnGeom.faces.push(new THREE.Face3(8,7,9));

    //right face
    barnGeom.faces.push(new THREE.Face3(1,6,2));
    barnGeom.faces.push(new THREE.Face3(2,6,7));

    //right-top face
    barnGeom.faces.push(new THREE.Face3(2,7,4));
    barnGeom.faces.push(new THREE.Face3(4,7,9));

    //left face
    barnGeom.faces.push(new THREE.Face3(0,5,3));
    barnGeom.faces.push(new THREE.Face3(3,5,8));

    //left-top face
    barnGeom.faces.push(new THREE.Face3(3,4,8));
    barnGeom.faces.push(new THREE.Face3(8,4,9));

    //bottom face
    barnGeom.faces.push(new THREE.Face3(0,1,6));
    barnGeom.faces.push(new THREE.Face3(0,6,5));
}

function makeBarn(width, height, depth){
    barnVertices(width, height, depth);
    barnFaces();
    barnGeom.computeFaceNormals();
    var barnMesh = TW.createMesh(barnGeom);
    scene.add(barnMesh);
}

makeBarn(20, 30, 40);

// Create a renderer to render the scene
var renderer = new THREE.WebGLRenderer();

// TW.mainInit() initializes TW, adds the canvas to the document,
// enables display of 3D coordinate axes, sets up keyboard controls
TW.mainInit(renderer,scene);

// Set up a camera for the scene
var state = TW.cameraSetup(renderer,
                            scene,
                            {minx: -5, maxx: 25,
                            miny: -5, maxy: 45,
                            minz: -45, maxz: 5});