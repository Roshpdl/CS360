// We always need a scene
var scene = new THREE.Scene();

// ====================================================================

colorMaterials = [new THREE.MeshBasicMaterial({color: new THREE.Color("black"),
                                               side: THREE.DoubleSide}), 
                  new THREE.MeshBasicMaterial({color: new THREE.Color("white")}),
                  new THREE.MeshBasicMaterial({color: new THREE.Color("brown")})];


// add code to create a luxo lamp from the built-in Three.js geometries


// ====================================================================

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: -50, maxx: 80,
                miny: 0, maxy: 180,
                minz: -30, maxz: 30});