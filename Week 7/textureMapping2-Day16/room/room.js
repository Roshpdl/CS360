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

                   
    // *** ADD CODE TO PLACE THE OCEAN SCENE ON THE BACK WALL ***
    // tips: create a texture-mapped Lambert material with the seaScape
    // image, create a mesh with planeGeom and the new material, and
    // place the mesh at a z-coordinate of -49, slightly in front of
    // the back wall
    var planeGeom = new THREE.PlaneGeometry(80,80);
                   
    // *** ADD CODE TO PLACE THE RUG ON THE FLOOR ***
    // tips: create a texture-mapped Lambert material with the rug
    // image, create a mesh with rugGeom and the new material, 
    // rotate the mesh by an angle of -Math.PI/2 (90 deg) around
    // the X axis, and position the mesh at a y-coordinate of -49,
    // slightly above the floor
    var rugGeom = new THREE.PlaneGeometry(80,80);
                    
    TW.render();
}

// load images of the ocean scene and the rug
TW.loadTextures(["seaScape.jpg", "rug.png"],
                function (textures) {
                    displayRoom(textures);
                } );

var state = TW.cameraSetup(renderer,
                           scene,
                           {minx: -50, maxx: 50,
                            miny: -50, maxy: 50,
                            minz: -50, maxz: 50});