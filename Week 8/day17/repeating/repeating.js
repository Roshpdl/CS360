// create a scene
var scene = new THREE.Scene();

// displayPanels() displays three planes with different methods for repeating
// an image texture - the input is an array of THREE.Texture objects
function displayPanels (textures) {

    // set up a pattern of repetition for the three input textures, using a 
    // different wrapping method for each one and varying the number of repeats
    var wrapStyle = [THREE.RepeatWrapping, THREE.MirroredRepeatWrapping, THREE.ClampToEdgeWrapping];
    for (var i = 0; i < 3; i++) {
       textures[i].wrapS = wrapStyle[i];
       textures[i].wrapT = wrapStyle[i];
       if (i == 2) {
           textures[i].repeat.set(2,2);
       } else {
           textures[i].repeat.set(4,4);
       }
       textures[i].needsUpdate = true;
    }

    // central plane with 3x3 repeat mapping
    var planeGeom = new THREE.PlaneGeometry(10,10);
    var planeMat = new THREE.MeshBasicMaterial( {color: 0xffffff,
                                                 map: textures[0]} );
    var planeMesh = new THREE.Mesh(planeGeom, planeMat);
    scene.add(planeMesh);

    // right panel with 3x3 mirrored repeat mapping
    var planeGeomR = new THREE.PlaneGeometry(10,10);
    var planeMatR = new THREE.MeshBasicMaterial( {color: 0xffffff,
                                                  map: textures[1]} );
    var planeMeshR = new THREE.Mesh(planeGeomR, planeMatR);
    planeMeshR.position.set(11, 0, 0);
    scene.add(planeMeshR);

    // left plane with 2x2 clamped repeat mapping
    var planeGeomL = new THREE.PlaneGeometry(10,10);
    var planeMatL = new THREE.MeshBasicMaterial( {color: 0xffffff,
                                                  map: textures[2]} );
    var planeMeshL = new THREE.Mesh(planeGeomR, planeMatL);
    planeMeshL.position.set(-11, 0, 0);
    scene.add(planeMeshL);

    TW.render();    // render the scene
}

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: -5, maxx: 5,
                miny: -5, maxy: 5,
                minz: 0, maxz: 1});

// TW.loadTextures() is used to load berries image three times, to create an
// array of three Texture objects containing the same image
TW.loadTextures(["berries.jpg", "berries.jpg", "berries.jpg"],
            function (textures) {
                displayPanels(textures);
            } );