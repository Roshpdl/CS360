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

// create the barn and steeple meshes
var barnMesh = TW.createMesh(barnGeom);
var steepleMesh = TW.createMesh(steepleGeom);

// replace the above two code statements with code to do the following:

       // create white and brown materials for the sides and roof of the barn

       // set the desired material for each face of the barn

       // create the barn mesh from its geometry and materials

       // create yellow material for the steeple

       // create the steeple mesh from its geometry and material

// position the steeple mesh at the top of the barn
steepleMesh.position.set(barnWidth/2,
                         barnHeight + barnWidth/2 - steepleWidth/2,
                         -steepleWidth/2);

// add both meshes to the scene
scene.add(barnMesh);
scene.add(steepleMesh);

// ================================================================
// 
// We always need a renderer

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,scene,
               {minx: 0, maxx: barnWidth,
                miny: 0, maxy: barnHeight+barnWidth/2+steepleHeight,
                minz: -barnDepth, maxz: 0});