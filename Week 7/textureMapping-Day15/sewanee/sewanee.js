// create a scene
var scene = new THREE.Scene();

// displayPanels() displays three panels with texture-mapped image of floral scene

function displayPanels (textures) {
    // plane geometry with texture-mapped floral image
    var planeGeom = new THREE.PlaneGeometry(10,10);
    var planeMat = [new THREE.MeshBasicMaterial({color: 0xffffff,
                                                  map: textures[0]}),
                     new THREE.MeshBasicMaterial({color: 0xffffff,
                                                  map: textures[1]}),
                     new THREE.MeshBasicMaterial({color: 0xffffff,
                                                  map: textures[2]})
                    ];
    var planeMesh = new THREE.Mesh(planeGeom, planeMat[0]);
    scene.add(planeMesh);

    // repeat texture mapping on right panel
    var planeMeshR = new THREE.Mesh(planeGeom, planeMat[1]);
    var dist = 5*Math.cos(Math.PI/4);
    planeMeshR.position.set(5+dist, 0, dist);
    planeMeshR.rotation.y = -Math.PI/4;
    scene.add(planeMeshR);

    // repeat texture mapping on left panel
    var planeMeshL = new THREE.Mesh(planeGeom, planeMat[2]);
    planeMeshL.position.set(-5-dist, 0, dist);
    planeMeshL.rotation.y = Math.PI/4;
    scene.add(planeMeshL);

    TW.render();    // render the scene
}

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

var state = TW.cameraSetup(renderer,
                           scene,
                           {minx: -8, maxx: 8,
                            miny: -5, maxy: 5,
                            minz: 0, maxz: 8});

// create a TextureLoader for loading the image file
var loader = new THREE.TextureLoader();

// load the images (stored in the same folder as this script),
// and when the image load is complete, invoke the anonymous function callback

TW.loadTextures(["greensview2.jpg", "greensview3.jpg", "greensview1.jpg"],
            function (textures) {
                displayPanels(textures);
            } );