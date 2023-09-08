// We always need a scene
var scene = new THREE.Scene();

// ====================================================================

// function to create a Geometry for a square with two faces
function squareGeometry () {
   var squareGeom = new THREE.Geometry();
   // define the four vertices
   squareGeom.vertices = [new THREE.Vector3(0,0,0),
                          new THREE.Vector3(1,0,0),
                          new THREE.Vector3(1,1,0),
                          new THREE.Vector3(0,1,0)];
   // define the two triangular faces
   squareGeom.faces = [new THREE.Face3(0,1,3),
                       new THREE.Face3(1,2,3)];
   return squareGeom;
}

var squareGeom = squareGeometry();   // create the initial Geometry

// define the colors for each of the four vertices
squareGeom.vertexColors = [new THREE.Color("magenta"),
                           new THREE.Color("blue"),
                           new THREE.Color("red"),
                           new THREE.Color("green")];

// setup the vertex colors for each face
TW.computeFaceColors(squareGeom);

// create a material that uses vertex colors and interpolates color within faces
var squareMaterial = new THREE.MeshBasicMaterial( {vertexColors: THREE.VertexColors,
                                                   side: THREE.DoubleSide} );

// create mesh and add to scene
var squareMesh = new THREE.Mesh(squareGeom, squareMaterial);
scene.add(squareMesh);

// ================================================================

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: 0, maxx: 1,
                miny: 0, maxy: 1,
                minz: 0, maxz: 0.2});