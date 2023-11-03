// create a scene
var scene = new THREE.Scene();

// displayPanels() displays three panels with texture-mapped image of floral scene

function displayPanels (texture) {
    // plane geometry with texture-mapped floral image
    var planeGeom = new THREE.PlaneGeometry(10,10);
    var planeMat = new THREE.MeshBasicMaterial( {color: 0xffffff,
                                                 map: texture} );
    var planeMesh = new THREE.Mesh(planeGeom, planeMat);
    scene.add(planeMesh);

    // repeat texture mapping on right panel
    var planeMeshR = planeMesh.clone();
    var dist = 5 //*Math.cos(Math.PI/4);
    planeMeshR.position.set(5+dist, 0, dist);
    planeMeshR.rotation.y = -Math.PI/4;
    scene.add(planeMeshR);

    // repeat texture mapping on left panel
    var planeMeshL = planeMesh.clone();
    planeMeshL.position.set(-5-dist, 0, dist);
    planeMeshL.rotation.y = Math.PI/4;
    scene.add(planeMeshL);

    TW.render();    // render the scene
}

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

var state = TW.cameraSetup(renderer,
                           scene,
                           {minx: -20, maxx: 20,
                            miny: -5, maxy: 5,
                            minz: 0, maxz: 8});

// create a TextureLoader for loading the image file
var loader = new THREE.TextureLoader();

// load the relaxation.jpg image (stored in the same folder as this script),
// and when the image load is complete, invoke the anonymous function callback

loader.load("relaxation.jpg",
            function (texture) {
               displayPanels(texture);
            } );