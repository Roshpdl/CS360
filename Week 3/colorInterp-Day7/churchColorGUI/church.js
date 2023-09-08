/* Returns a geometry object for a steeple, which is a square
   pyramid or tetrahedron.  The origin is in the center of the
   base, so the base vertices are at y=0 and x and z at plus or
   minus half the width, and the top is at (0,height,0) */

function createSteeple(width, height) {
    var geom = new THREE.Geometry();
    var w2 = 0.5*width;
    // add the base
    geom.vertices.push(new THREE.Vector3(+w2, 0, +w2));
    geom.vertices.push(new THREE.Vector3(+w2, 0, -w2));
    geom.vertices.push(new THREE.Vector3(-w2, 0, -w2));
    geom.vertices.push(new THREE.Vector3(-w2, 0, +w2));
    geom.vertices.push(new THREE.Vector3(0, height, 0));

    // from  the vertices, we can define the faces

    // base
    geom.faces.push(new THREE.Face3(0, 2, 1));
    geom.faces.push(new THREE.Face3(0, 3, 2));

    // side faces
    geom.faces.push(new THREE.Face3(0, 1, 4));
    geom.faces.push(new THREE.Face3(1, 2, 4));
    geom.faces.push(new THREE.Face3(2, 3, 4));
    geom.faces.push(new THREE.Face3(3, 0, 4));

    // calculate the normals for shading
    geom.computeFaceNormals();
    // geom.computeVertexNormals(true);

    return geom;
}

// We always need a scene.
var scene = new THREE.Scene();

// ====================================================================

var barnWidth = 50;
var barnHeight = 30;
var barnDepth = 40;
var steepleWidth = 6;
var steepleHeight = 36;

// create the barn and steeple geometries
var barnGeom = TW.createBarn( barnWidth, barnHeight, barnDepth );
var steepleGeom = createSteeple(steepleWidth,steepleHeight);

// use HSL color to generate "less red" and "even less red" colors
var red = new THREE.Color("red");
var redHSL = { h: 0, s: 0, l: 0 };
red.getHSL(redHSL);
var less_red = new THREE.Color();
less_red.setHSL(redHSL.h, 0.60*redHSL.s, redHSL.l);
var even_less_red = new THREE.Color();
even_less_red.setHSL(redHSL.h, 0.30*redHSL.s, redHSL.l);

// create white and brown materials for the sides and roof of the barn
var barnMaterials = 
      [ new THREE.MeshBasicMaterial( {color: less_red} ),
        new THREE.MeshBasicMaterial( {color: even_less_red} )
      ];

// set the desired material for each face of the barn
TW.setMaterialForFaces(barnGeom,0,0,1,2,3,4,5,10,11,12,13,14,15);
TW.setMaterialForFaces(barnGeom,1,6,7,8,9);

// create the barn mesh
var barnMesh = new THREE.Mesh(barnGeom, barnMaterials);

// add barn mesh to the scene
scene.add(barnMesh);


// create color material for the steeple
var params = {color: "#1861b3" };
var steepleMesh;

function placeSteeple(color) {
  var colorObj = new THREE.Color( color );
  var steepleMaterial = new THREE.MeshBasicMaterial (
                                { color: colorObj } );

  // create the steeple mesh
  steepleMesh = new THREE.Mesh(steepleGeom, steepleMaterial);

  // position the steeple mesh at the top of the barn
  steepleMesh.position.set(barnWidth/2,
                          barnHeight + barnWidth/2 - steepleWidth/2,
                          -steepleWidth/2);

  // add steeple mesh to the scene
  scene.add(steepleMesh);
}

placeSteeple(params.color);

// ================================================================
// 
// We always need a renderer

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,scene,
               {minx: 0, maxx: barnWidth,
                miny: 0, maxy: barnHeight+barnWidth/2+steepleHeight,
                minz: -barnDepth, maxz: 0});

function redrawSteeple() {
    scene.remove(steepleMesh);
    placeSteeple(params.color);
    TW.render();
}

var gui = new dat.GUI();
gui.addColor(params, 'color').onChange(redrawSteeple);