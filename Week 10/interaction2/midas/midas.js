var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

// createTree() creates and returns a THREE.Object3D that is an instance of a tree, 
// with its origin at the center of the base of the trunk, and adds it to the scene
function createTree (trunkRadius, trunkHeight, coneRadius, coneHeight) {
    var tree = new THREE.Object3D();
    var cone = new THREE.Mesh(new THREE.ConeGeometry(coneRadius,coneHeight),
                              new THREE.MeshBasicMaterial({color: THREE.ColorKeywords.darkgreen}));
    cone.position.y = coneHeight/2+trunkHeight;
    tree.add(cone);
    var trunk = new THREE.Mesh(new THREE.CylinderGeometry(trunkRadius,trunkRadius,trunkHeight),
                               new THREE.MeshBasicMaterial({color: THREE.ColorKeywords.brown}));
    trunk.position.y = trunkHeight/2;
    tree.add(trunk);
    return tree;
}

// createSnowperson() creates and returns a THREE.Object3D that is an instance of a snowperson, 
// with its origin at the center of its base, and adds it to the scene
function createSnowperson (radiusBot) {
   var snowPerson = new THREE.Object3D();
   var radiusMid = 0.8*radiusBot;
   var radiusTop = 0.6*radiusMid;
   var snow = new THREE.MeshBasicMaterial({color: 0xffffff});
   var snowBot = new THREE.Mesh(new THREE.SphereGeometry(radiusBot), snow);
   var snowMid = new THREE.Mesh(new THREE.SphereGeometry(radiusMid), snow);
   var snowTop = new THREE.Mesh(new THREE.SphereGeometry(radiusTop), snow);
   snowBot.position.y = radiusBot;
   snowMid.position.y = 2*radiusBot + radiusMid;
   snowTop.position.y = 2*radiusBot + 2*radiusMid + radiusTop;
   snowPerson.add(snowBot);
   snowPerson.add(snowMid);
   snowPerson.add(snowTop);
   return snowPerson;
}

// add three houses (solid color barns) to the scene
var house1 = TW.createBarnSolidColor(2,3,3,0xff0000);
house1.position.set(-6,0,3);
scene.add(house1);

var house2 = TW.createBarnSolidColor(2,3,3,0x00ff00);
house2.position.set(-2,0,0);
scene.add(house2);

var house3 = TW.createBarnSolidColor(2,3,3,0x0000ff);
house3.position.set(5,0,3);
scene.add(house3);

// add three trees to the scene
var tree1 = createTree(0.1,0.5,1,4);
tree1.position.set(-6,0,8);
scene.add(tree1);

var tree2 = createTree(0.15,0.8,1.5,5);
tree2.position.set(8,0,8);
scene.add(tree2);

var tree3 = createTree(0.2,1,1,4);
tree3.position.set(2,0,10);
scene.add(tree3);

// add three snowpeople to the scene
var snow1 = createSnowperson(0.5);
snow1.position.set(-3,0,9);
scene.add(snow1);

var snow2 = createSnowperson(0.4);
snow2.position.set(1,0,10);
scene.add(snow2);

var snow3 = createSnowperson(0.3);
snow3.position.set(4,0,10);
scene.add(snow3);

// setup camera for the scene, looking down the -Z axis
var camera = new THREE.PerspectiveCamera(70, 800/500, 1, 1000);
camera.position.set(0,2,20);
camera.up.set(0,1,0);
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera);


// ADD CODE TO ENABLE THE USER TO CLICK ON OBJECTS IN THE SCENE AND TURN THEM TO GOLD
var GOLD = THREE.ColorKeywords.gold;

// raycasting is used to determine which objects in the 3D space map to the mouse click location
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// global variable assigned to canvas element
var c1 = renderer.domElement;

var gold = new THREE.Color(GOLD);
// add event listener to handle mouse clicks
document.addEventListener('click', onMouseClick, false);

function onMouseClick(event){
    if (!event.shiftKey) return;      // need to press the shift key with mouse click
    if (event.target == c1) {   //target is the element in the webpage
        // use canvas offset to determine mouse coordinates in canvas coordinate frame
        var rect = event.target.getBoundingClientRect();
        var canvasx = event.clientX - rect.left;
        var canvasy = event.clientY - rect.top;
    }
    else {
        return;
    }
    // get mouse coordinates in the range from -1 to +1 (canvas is 600 x 600 pixels)
    mouse.x = (canvasx / 800) * 2 - 1;
    mouse.y = -(canvasy / 500) * 2 + 1;
    // setup raycaster using mouse position and camera
    raycaster.setFromCamera(mouse, camera);
    // get array of objects projecting to this mouse position
    var intersects = raycaster.intersectObjects(scene.children, true);
    // remove first object in the array, which is closest in depth to the camera
    if (intersects.length > 0) {
        intersects[0].object.material.color.set(gold);
        renderer.render(scene, camera);
    }


}

renderer.render(scene, camera);