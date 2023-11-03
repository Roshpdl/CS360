var scene = new THREE.Scene(); 

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

// create a box that will be turned into a room
var roomGeom = new THREE.BoxGeometry(100,100,100);

// create an array of 6 Lambert materials from an array of colors for the inner 
// faces of the box
var materialArray = [];
// colors for [right wall, left wall, ceiling, floor, front wall, back wall]
var faceColors = [0xd2b48c, 0xd2b48c, 0xffffff, 0x664229, 0xd2b48c, 0xd2b48c];
for (var i = 0; i < 6; i++) {
    materialArray.push(new THREE.MeshLambertMaterial({
                                        color: faceColors[i],
                                        side: THREE.BackSide}));
}

// create mesh from room geometry and materials, and add mesh to the scene
var roomMesh = new THREE.Mesh(roomGeom, materialArray);

scene.add(roomMesh);

// add a white point light source in the center of the room
var light = new THREE.PointLight(0xffffff, 2, 0);
light.position.set(0,0,0);

scene.add(light);

// displayRoom() maps two image textures onto different planes and places
// them at the location of the back face (wall) of the room and on the
// floor, and then renders the scene
function displayRoom (textures) {
    // place ocean scene on the back wall                   
    var planeGeom = new THREE.PlaneGeometry(80,80);
    var planeMat = new THREE.MeshLambertMaterial( {color: 0xffffff,
                                                   map: textures[0]} );
    var planeMesh = new THREE.Mesh(planeGeom, planeMat);
    planeMesh.position.set(0,0,-49);
    scene.add(planeMesh);
                   
    // place rug on the floor
    var rugGeom = new THREE.PlaneGeometry(80,80);
    var rugMat = new THREE.MeshLambertMaterial( {color: 0xffffff,
                                                 map: textures[1]} );
    var rugMesh = new THREE.Mesh(rugGeom, rugMat);
    rugMesh.rotation.set(-Math.PI/2,0,0);
    rugMesh.position.set(0,-49,0);
    scene.add(rugMesh);   

    // add the original and jumbled paintings on the right and left walls
    addArt(textures[2]);
                    
    TW.render();
}

// adds original painting on the right wall and a jumbled version
// of the painting on the left wall
function addArt (texture) {
    // create a texture-mapped material for the paintings
    var artMaterial = new THREE.MeshBasicMaterial({color: 0xffffff,
                                                   map: texture});
                   
    // place the original painting on the right wall
    var artGeom1 = new THREE.PlaneGeometry(60,60);
    var artMesh1 = new THREE.Mesh(artGeom1, artMaterial);
    artMesh1.rotation.set(0,-Math.PI/2,0);
    artMesh1.position.set(49,0,0);
    scene.add(artMesh1);

    // create a diamond-shaped geometry for the jumbled painting
    var artGeom2 = new THREE.Geometry();

    // add 5 vertices
    artGeom2.vertices.push(new THREE.Vector3(0,0,0));
    artGeom2.vertices.push(new THREE.Vector3(40,0,0));
    artGeom2.vertices.push(new THREE.Vector3(0,40,0));
    artGeom2.vertices.push(new THREE.Vector3(-40,0,0));
    artGeom2.vertices.push(new THREE.Vector3(0,-40,0));
                   
    // add 4 faces
    artGeom2.faces.push(new THREE.Face3(0,1,2));
    artGeom2.faces.push(new THREE.Face3(0,2,3));
    artGeom2.faces.push(new THREE.Face3(0,3,4));
    artGeom2.faces.push(new THREE.Face3(0,4,1));

    texture.flipY = false;  // reverses flipping by Three.js

    // add texture coordinates to the geometry
    addTextureCoords(artGeom2);

    // use same material for the jumbled painting
    var artMesh2 = new THREE.Mesh(artGeom2, artMaterial);

    // place the jumbled painting on the left wall
    artMesh2.rotation.set(0,Math.PI/2,0);
    artMesh2.position.set(-49,0,0);
                   
    scene.add(artMesh2);
}
                   
// addTextureCoords() adds texture coordinates to artGeom 
function addTextureCoords (artGeom) {
    var UVs = [];           // array of face descriptors

    function faceCoords(as,at, bs,bt, cs,ct) {
       // adds the texture coordinates for a single face to the UVs array
       UVs.push( [new THREE.Vector2(as,at),
                  new THREE.Vector2(bs,bt),
                  new THREE.Vector2(cs,ct)] );
    }

    // set up texture coordinates for the four faces, in the order
    // they were originally added to the geometry
    faceCoords(0,1, 1,1, 0,0);
    faceCoords(1,1, 1,0, 0,1);
    faceCoords(1,0, 0,0, 1,1);  
    faceCoords(0,0, 0,1, 1,0);

    // attach the UVs array to artGeom
    artGeom.faceVertexUvs = [ UVs ];
}

// load images of the ocean scene and the rug
TW.loadTextures(["seaScape.jpg", "rug.png", "tzadok.png"],
                function (textures) {
                    displayRoom(textures);
                } );

var state = TW.cameraSetup(renderer,
                           scene,
                           {minx: -50, maxx: 50,
                            miny: -50, maxy: 50,
                            minz: -50, maxz: 50});