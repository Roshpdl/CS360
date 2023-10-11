function displayTriangle (texture) {
    // create a geometry with one triangular face that has
    // the berries image mapped onto this face
    var triGeom = new THREE.Geometry();
    triGeom.vertices.push(new THREE.Vector3(0,0,0));
    triGeom.vertices.push(new THREE.Vector3(4,0,0));
    triGeom.vertices.push(new THREE.Vector3(2,3,0));
    triGeom.faces.push(new THREE.Face3(0,1,2));
    // add a 3-element array of THREE.Vector2 objects
    // representing texture coordinates for the three
    // vertices of the face
    var uvs = [];
    uvs.push([new THREE.Vector2(0,1),
              new THREE.Vector2(0.5,1),
              new THREE.Vector2(0.25,0.25)]);
    // assign the faceVertexUvs property to an array 
    // containing the uvs array inside
    triGeom.faceVertexUvs = [uvs];
    // by default, Three.js flips images upside-down, so
    // you may want to set the flipY property to false
    texture.flipY = false;
    var triMat = new THREE.MeshBasicMaterial({color: 0xffffff,
                                              map: texture});
    var triMesh = new THREE.Mesh(triGeom, triMat);
    scene.add(triMesh);
    TW.render();    // render the scene
}

var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

var state = TW.cameraSetup(renderer,
                           scene,
                           {minx: 0, maxx: 4,
                            miny: 0, maxy: 3,
                            minz: 0, maxz: 1});

// create a TextureLoader for loading the image file
var loader = new THREE.TextureLoader();

// load the berries0.jpg image (stored in the same folder as this
// script), and when the image load is done, invoke the anonymous
// function callback
loader.load("berries0.jpg",
            (texture) => {
               displayTriangle(texture);
            } );