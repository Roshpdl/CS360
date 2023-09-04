// We always need a scene

var scene = new THREE.Scene();

// ====================================================================

// create a Geometry for a simple 3D object with four triangular faces
// (like a tetrahedron, but faces are not uniform)
var size = 50;

function createTriGeometry (size) {
  var triGeom = new THREE.Geometry();

  // four vertices
  triGeom.vertices.push(new THREE.Vector3(0,0,0));
  triGeom.vertices.push(new THREE.Vector3(size,0,0));
  triGeom.vertices.push(new THREE.Vector3(0,0,-size));
  triGeom.vertices.push(new THREE.Vector3(0,size,0));

  // create four faces
  triGeom.faces.push(new THREE.Face3(0,1,3));
  triGeom.faces.push(new THREE.Face3(2,0,3));
  triGeom.faces.push(new THREE.Face3(1,2,3));
  triGeom.faces.push(new THREE.Face3(0,2,1));

  return triGeom;
}

// object with all faces having the same color
var triGeom1 = createTriGeometry(size);

// five ways of specifying the same color blue
//var blue = new THREE.Color( 0, 0, 1 );  // 0-1 for each of 3 dimensions
//var blue = new THREE.Color( 0x0000ff );  // hexadecimal number, one byte per primary 
//var blue = new THREE.Color( "rgb(0,0,255)" );  // CSS string, 0-255 for each of 3 dimensions
//var blue = new THREE.Color( "blue" );  // CSS color name
var blue = new THREE.Color( THREE.ColorKeywords.blue ) // Three.js keyword

var triMaterial = new THREE.MeshBasicMaterial( {color: blue} );
// Example of setting the side attribute for each material so that both sides of each face are rendered
//var triMaterial = new THREE.MeshBasicMaterial( {color: blue, side: THREE.DoubleSide} );
var triMesh1 = new THREE.Mesh(triGeom1, triMaterial);

scene.add(triMesh1);

// object with each face having a different color
var triGeom2 = createTriGeometry(size);

var triMaterials = 
      [ new THREE.MeshBasicMaterial( {color: new THREE.Color("red")} ),
        new THREE.MeshBasicMaterial( {color: new THREE.Color("green")} ),
        new THREE.MeshBasicMaterial( {color: new THREE.Color("cyan")} ),
        new THREE.MeshBasicMaterial( {color: new THREE.Color("magenta")} ),
      ];

triGeom2.faces[0].materialIndex = 0;
triGeom2.faces[1].materialIndex = 1;
triGeom2.faces[2].materialIndex = 2;
triGeom2.faces[3].materialIndex = 3;
//TW.setMaterialForFaces11(triGeom2);  // shortcut for above coloring of triGeom2
//TW.setMaterialForFaces(triGeom2, 2, 1, 3);  // faces 1 and 3 are cyan (color index 2)
//TW.setMaterialForFaces(triGeom2, 3, 0, 2);  // faces 0 and 2 are magenta( color index 3)

var triMesh2 = new THREE.Mesh(triGeom2, triMaterials);
triMesh2.position.set(-size,0,0);

scene.add(triMesh2);

// ================================================================

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: -size, maxx: size,
                miny: 0, maxy: size,
                minz: -size, maxz: 0});