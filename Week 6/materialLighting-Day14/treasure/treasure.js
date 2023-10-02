// create a scene
var scene = new THREE.Scene();

// ====================================================================

// *** MODIFY CODE TO USE PHONG MATERIALS AND LIGHT SOURCES, TO MAKE
// OBJECTS LOOK MORE LIKE REAL GOLD TREASURE ***

// basic materials for the gold objects and rug

var colorMaterials = [new THREE.MeshPhongMaterial( {color: new THREE.Color("goldenrod")}),
                      new THREE.MeshPhongMaterial( {color: new THREE.Color("green")}) ];

// addTreasure() function adds gold cylinder, sphere, brick, and ring to the scene

function addTreasure () {

    // golden cylinder
    var cylinderMesh = new THREE.Mesh(new THREE.CylinderGeometry(15,15,50,100),
                                      colorMaterials[0]);
    cylinderMesh.position.set(-25,25,-25);
    scene.add(cylinderMesh);

    // golden sphere
    var sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(20,100,100), 
                                    colorMaterials[0]);
    sphereMesh.position.set(25,20,-25);
    scene.add(sphereMesh);

    // golden brick
    var brickMesh = new THREE.Mesh(new THREE.BoxGeometry(40,10,20), 
                                   colorMaterials[0]);
    brickMesh.position.set(-25,5,25);
    scene.add(brickMesh);

    // golden ring
    var ringMesh = new THREE.Mesh(new THREE.TorusGeometry(10,4,100,100),
                                  colorMaterials[0]);
    ringMesh.position.set(25,5,25);
    ringMesh.rotation.set(-Math.PI/2,0,0);
    scene.add(ringMesh);
}


//create a spotlight
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(30,80,30);
scene.add(spotLight);

//create a pointlight
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 50, 0);
scene.add(pointLight);

//create an ambient light
var ambLight = new THREE.AmbientLight( 0x333333 ); // soft white light
scene.add(ambLight);


// add a rug to the scene
var rug = new THREE.Mesh(new THREE.PlaneGeometry(120,120), colorMaterials[1]);
rug.rotation.set(-Math.PI/2,0,0);
scene.add(rug);

addTreasure();

// ====================================================================

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: -50, maxx: 50,
                miny: 0, maxy: 50,
                minz: -50, maxz: 50});