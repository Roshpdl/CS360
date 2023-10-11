function makeTree (textures) {
    // create a tree with a cone and cylinder, and map image
    // textures of pine needles and tree bark onto the parts
    var topGeom = new THREE.ConeGeometry(30,100,16);
    textures[0].repeat.set(8,4);
    textures[0].wrapS = THREE.MirrorRepeatWrapping;
    textures[0].wrapT = THREE.MirrorRepeatWrapping;
    textures[0].needsUpdate = true;
    var topMat = new THREE.MeshBasicMaterial( {color: 0xffffff,
                                               map: textures[0]} );
    var topMesh = new THREE.Mesh(topGeom, topMat);
    topMesh.position.set(0,70,0);
    scene.add(topMesh);
    var trunkGeom = new THREE.CylinderGeometry(5,5,20);
    textures[1].repeat.set(2,2);
    textures[1].wrapS = THREE.MirrorRepeatWrapping;
    textures[1].wrapT = THREE.MirrorRepeatWrapping;
    textures[1].needsUpdate = true;
    var trunkMat = new THREE.MeshBasicMaterial( {color: 0xffffff,
                                                 map: textures[1]} );
    var trunkMesh = new THREE.Mesh(trunkGeom, trunkMat);
    trunkMesh.position.set(0,10,0);
    scene.add(trunkMesh);

    TW.render();    // render the scene
}

// create a scene
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

var state = TW.cameraSetup(renderer,
                           scene,
                           {minx: -30, maxx: 30,
                            miny: 0, maxy: 100,
                            minz: -30, maxz: 30});

// load the images to texture the tree top and trunk
TW.loadTextures(["pineTexture.jpg", "pineBarkTexture.jpg"],
                 function (textures) {
                    makeTree(textures);
                 } );