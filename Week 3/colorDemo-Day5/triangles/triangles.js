// function to create a Geometry with four penetrating triangles
function triGeometry () {
  var triGeom = new THREE.Geometry();

  // construct the vertices for each triangular face
  triGeom.vertices.push(new THREE.Vector3(0,1,0));
  triGeom.vertices.push(new THREE.Vector3(-0.866,-0.5,0));
  triGeom.vertices.push(new THREE.Vector3(0.866,-0.5,0));

  triGeom.vertices.push(new THREE.Vector3(0,0,1));
  triGeom.vertices.push(new THREE.Vector3(-0.433,-0.75,-0.5));
  triGeom.vertices.push(new THREE.Vector3(0.433,0.75,-0.5));

  triGeom.vertices.push(new THREE.Vector3(0,0.5,0.866));
  triGeom.vertices.push(new THREE.Vector3(-0.866,-0.25,-0.433));
  triGeom.vertices.push(new THREE.Vector3(0.866,-0.25,-0.433));

  triGeom.vertices.push(new THREE.Vector3(0,0,-1));
  triGeom.vertices.push(new THREE.Vector3(-0.433,0.75,0.5));
  triGeom.vertices.push(new THREE.Vector3(0.433,-0.75,0.5));

  // construct the four faces
  triGeom.faces.push(new THREE.Face3(0,1,2));
  triGeom.faces.push(new THREE.Face3(3,4,5));
  triGeom.faces.push(new THREE.Face3(6,7,8));
  triGeom.faces.push(new THREE.Face3(9,10,11));

  // compute normals for the TW.createMesh() function
  triGeom.computeFaceNormals();

  return triGeom;
}

// ====================================================================

// insert code to construct an array of materials with different colors,
// to use for the four faces of the triangles geometry

var triMaterials = [
  new THREE.MeshBasicMaterial( {color: new THREE.Color("red"), side: THREE.DoubleSide} ),
  new THREE.MeshBasicMaterial( {color: new THREE.Color("yellow"), side: THREE.DoubleSide} ),
  new THREE.MeshBasicMaterial( {color: new THREE.Color("blue"), side: THREE.DoubleSide} ),
  new THREE.MeshBasicMaterial( {color: new THREE.Color("pink"), side: THREE.DoubleSide} ),
]


// create a Scene object
var scene = new THREE.Scene();

// create the Geometry of four triangles
var triGeom = triGeometry();

// replace this statement with code to use your new materials
// to color the faces of the triangle geometry
triGeom.faces[0].materialIndex = 0;
triGeom.faces[1].materialIndex = 1;
triGeom.faces[2].materialIndex = 2;
triGeom.faces[3].materialIndex = 3;

TW.setMaterialForFaces(triGeom, 2, 0);
TW.setMaterialForFaces(triGeom, 0, 1);
TW.setMaterialForFaces(triGeom, 1, 2);
TW.setMaterialForFaces(triGeom, 3, 3);

//shortcut
//TW.setMaterialForFaces11(triGeom2); 


var triMesh = new THREE.Mesh(triGeom, triMaterials);

// add the Mesh to the scene
scene.add(triMesh);                    

// ================================================================

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
              scene,
              {minx: -1, maxx: 1,
               miny: -1, maxy: 1,
               minz: -1, maxz: 1});