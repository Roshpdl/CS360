// create a scene
var scene = new THREE.Scene();

// makeGlobe() creates a spherical globe from an input Texture object that contains
// a world map
function makeGlobe (texture) {
    // sphere geometry with texture-mapped world map
    var globeGeom = new THREE.SphereGeometry(50,30,30);
    var globeMat = new THREE.MeshBasicMaterial( {color: 0xffffff,
                                                 map: texture} );
    var globeMesh = new THREE.Mesh(globeGeom, globeMat);
    scene.add(globeMesh);

    TW.render();    // render the scene
}

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

var state = TW.cameraSetup(renderer,
                           scene,
                           {minx: -50, maxx: 50,
                            miny: -50, maxy: 50,
                            minz: -50, maxz: 50});

// create a TextureLoader for loading the image file
var loader = new THREE.TextureLoader();

// load the world.jpg image (stored in the same folder as this script),
// and when the image load is complete, invoke the anonymous function callback
loader.load("world.jpg",
            function (texture) {
                makeGlobe(texture);
            } );