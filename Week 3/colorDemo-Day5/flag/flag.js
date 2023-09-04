// function to create a Geometry for the Seychelles flag

function flagGeometry () {
  var flagGeom = new THREE.Geometry();

  // add the vertices
  flagGeom.vertices.push(new THREE.Vector3(0,0,0));
  flagGeom.vertices.push(new THREE.Vector3(0,30,0));
  flagGeom.vertices.push(new THREE.Vector3(20,30,0));
  flagGeom.vertices.push(new THREE.Vector3(40,30,0));
  flagGeom.vertices.push(new THREE.Vector3(60,30,0));
  flagGeom.vertices.push(new THREE.Vector3(60,20,0));
  flagGeom.vertices.push(new THREE.Vector3(60,10,0));
  flagGeom.vertices.push(new THREE.Vector3(60,0,0));

  // add the faces
  flagGeom.faces.push(new THREE.Face3(0,2,1));
  flagGeom.faces.push(new THREE.Face3(0,3,2));
  flagGeom.faces.push(new THREE.Face3(0,4,3));
  flagGeom.faces.push(new THREE.Face3(0,5,4));
  flagGeom.faces.push(new THREE.Face3(0,6,5));
  flagGeom.faces.push(new THREE.Face3(0,7,6));

  return flagGeom;
}

// ====================================================================

// white material to use for all the faces of the flag
var flagMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color("white"),
                                               side: THREE.DoubleSide});

// create a Scene object
var scene = new THREE.Scene();

// create the flag geometry
var flagGeom = flagGeometry();

// set the color for specific triangle faces


// create a mesh for the flag
var flagMesh = new THREE.Mesh(flagGeom, flagMaterial);

// add flag mesh to the scene
scene.add(flagMesh);                    

// ================================================================

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
              scene,
              {minx: 0, maxx: 60,
               miny: 0, maxy: 30,
               minz: 0, maxz: 1});