function displayBox (textures) {
    // box geometry with three floral images texture-mapped onto sides
    var boxGeom = new THREE.BoxGeometry(10,10,10);
    // palette of possible textures to use for sides
    var materials = [new THREE.MeshBasicMaterial({color: 0xffffff,
                                                  map: textures[0]}),
                     new THREE.MeshBasicMaterial({color: 0xffffff,
                                                  map: textures[1]}),
                     new THREE.MeshBasicMaterial({color: 0xffffff,
                                                  map: textures[2]})
                    ];
    // array of 6 materials for the 6 sides of the box
    var boxMaterials = [materials[0], materials[0], materials[1],
                        materials[1], materials[2], materials[2]];
    var boxMesh = new THREE.Mesh(boxGeom, boxMaterials);
    scene.add(boxMesh);

    TW.render();    // render the scene
}

var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

var state = TW.cameraSetup(renderer,
                           scene,
                           {minx: -5, maxx: 5,
                            miny: -5, maxy: 5,
                            minz: -5, maxz: 5});

// using the TW.loadTextures() function, load three images (stored 
// in the same folder as this script), and when all of the images
// are loaded, invoke the anonymous function callback with an
// input array of THREE.Texture objects

TW.loadTextures(["flower0.jpg", "flower1.jpg", "flower2.jpg"],
            function (textures) {
                displayBox(textures);
            } );