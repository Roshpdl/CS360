// create a scene
var scene = new THREE.Scene();

// ====================================================================

var colorMaterials = [new THREE.MeshBasicMaterial({color: new THREE.Color("black"),
                                                   side: THREE.DoubleSide}), 
                      new THREE.MeshBasicMaterial({color: new THREE.Color("white")}),
                      new THREE.MeshBasicMaterial({color: new THREE.Color("brown")}),
                      new THREE.MeshBasicMaterial({color: new THREE.Color("green")})];

// modify the luxo() function to create a container object, add all the meshes
// to this container, and return the object

function luxo () {

    var luxo = new THREE.Object3D();

    // brown base
    var baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(40,40,8,16),
                                  colorMaterials[2]);
    baseMesh.position.set(0,4,0);
    luxo.add(baseMesh);

    // lower arm
    var armMesh1 = new THREE.Mesh(new THREE.CylinderGeometry(4,4,100), 
                                  colorMaterials[0]);
    armMesh1.position.set(-35,40,0);
    armMesh1.rotation.set(0,0,Math.PI/4);
    luxo.add(armMesh1);

    // upper arm
    var armMesh2 = new THREE.Mesh(new THREE.CylinderGeometry(4,4,100), 
                                  colorMaterials[0]);
    armMesh2.position.set(-35,110,0);
    armMesh2.rotation.set(0,0,-Math.PI/4);
    luxo.add(armMesh2);

    // black cone
    var coneMesh = new THREE.Mesh(new THREE.ConeGeometry(40,80,16,1,true), 
                                  colorMaterials[0]);
    coneMesh.position.set(20,140,0);
    coneMesh.rotation.set(0,0,Math.PI/4);
    luxo.add(coneMesh);

    // lightbulb
    var bulbMesh = new THREE.Mesh(new THREE.SphereGeometry(15), 
                                  colorMaterials[1]);
    bulbMesh.position.set(20,140,0);
    luxo.add(bulbMesh);

    return luxo;
}

// replace the following call to the luxo() function with code to create two 
// luxo lamps with the desired position, rotation, and scale
var luxoMom = luxo();
var luxoChild = luxoMom.clone();

luxoMom.position.set(60,0,60);
luxoChild.position.set(160,0,60);
//child face mom
luxoChild.rotation.set(0,Math.PI,0);
luxoChild.scale.set(0.5,0.5,0.5);

scene.add(luxoMom);
scene.add(luxoChild);

// add a rug to the scene
var rug = new THREE.Mesh(new THREE.PlaneGeometry(200,140),
                         colorMaterials[3]);
rug.position.set(100,0,70);
rug.rotation.set(-Math.PI/2,0,0);
scene.add(rug);

// ====================================================================

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: 0, maxx: 200,
                miny: 0, maxy: 180,
                minz: 0, maxz: 140});