// create a scene
var scene = new THREE.Scene();

// ====================================================================

// basic materials created for the lamp parts and rug

// *** MODIFY TO USE PHONG MATERIALS INSTEAD ***

var colorMaterials = [new THREE.MeshPhongMaterial( {color: new THREE.Color("black"),
                                                    side: THREE.DoubleSide} ), 
                      new THREE.MeshPhongMaterial( {color: new THREE.Color("brown")} ),
                      new THREE.MeshPhongMaterial( {color: new THREE.Color("green")} ) ];

// the luxo() function creates a container object, adds the base, arms, cone,
// and bulb to this container, and returns the object

function luxo () {
    // create container object
    var lamp = new THREE.Object3D();

    // brown base
    var baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(40,40,8,16),
                                  colorMaterials[1]);
    baseMesh.position.set(0,4,0);
    lamp.add(baseMesh);

    // lower arm
    var armMesh1 = new THREE.Mesh(new THREE.CylinderGeometry(4,4,100), 
                                  colorMaterials[0]);
    armMesh1.position.set(-35,40,0);
    armMesh1.rotation.set(0,0,Math.PI/4);
    lamp.add(armMesh1);

    // upper arm
    var armMesh2 = new THREE.Mesh(new THREE.CylinderGeometry(4,4,100), 
                                  colorMaterials[0]);
    armMesh2.position.set(-30,110,0);
    armMesh2.rotation.set(0,0,-Math.PI/3.5);
    lamp.add(armMesh2);

    // black cone
    var coneObj = new THREE.Object3D();
    var coneMesh = new THREE.Mesh(new THREE.ConeGeometry(40,80,16,1,true), 
                                  colorMaterials[0]);
    coneMesh.position.set(0,-40,0);
    coneObj.add(coneMesh);
    coneObj.position.set(0,165,0);
    coneObj.rotation.set(0,0,Math.PI/4);
    lamp.add(coneObj);

    // lightbulb
    var bulbMesh = new THREE.Mesh(new THREE.SphereGeometry(10), 
                                  new THREE.MeshBasicMaterial({color: new THREE.Color("white")} ));
    bulbMesh.position.set(20,140,0);
    lamp.add(bulbMesh);

    return lamp;
}

// the addLuxoBulb() adds a spotlight to the scene to simulate the light radiating 
// from the bulb of a luxo lamp - it's special-purpose, assuming that the lamp is
// positioned on the rug at (X,Z) coordinates (posX,posZ), is upright and rotated 
// by angleY around the Y axis, and has uniform scale

// *** COMPLETE INPUTS TO THE THREE.SpotLight() CONSTRUCTOR AND MODIFY POSITION
// OF bulbTarget ***

function addLuxoBulb (angleY, scale, posX, posZ) {
    var bulb = new THREE.SpotLight( 0 );
    // height of spotlight and distance from origin of lamp to target on ground
    var dist = 165*scale;
    bulb.position.set(posX, dist, posZ);     // spotlight positioned at tip of cone
    var bulbTarget = new THREE.Object3D();
    // target positioned on ground, at distance of "dist" from origin of lamp
    bulbTarget.position.set(0, 0, 0);
    bulb.target = bulbTarget;
    scene.add(bulb);
    scene.add(bulb.target);
}

// add a rug to the scene
var rug = new THREE.Mesh(new THREE.PlaneGeometry(200,140), colorMaterials[2]);
rug.position.set(100,0,70);
rug.rotation.set(-Math.PI/2,0,0);
scene.add(rug);

// create two luxo lamps with the desired position, rotation, and scale,
// and with a spotlight for the bulb added to the scene

// *** ADD CALLS TO THE addLuxoBulb() FUNCTION TO ADD A SPOTLIGHT FOR EACH LAMP ***

var lamp1 = luxo();
lamp1.position.set(60,0,60);
scene.add(lamp1);

var lamp2 = luxo();
lamp2.position.set(160,0,60);
lamp2.rotation.set(0,Math.PI,0);
lamp2.scale.set(0.5,0.5,0.5);
scene.add(lamp2);

// add ambient light source

var ambLight = new THREE.AmbientLight(new THREE.Color("white"), 0.8);
scene.add(ambLight);

// ====================================================================

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: 0, maxx: 200,
                miny: 0, maxy: 180,
                minz: 0, maxz: 140});