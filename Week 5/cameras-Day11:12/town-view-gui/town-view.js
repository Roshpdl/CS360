// We always need a scene.
var scene = new THREE.Scene();

// ====================================================================
// New tree function

function createTree(trunkRadius, trunkHeight, coneRadius, coneHeight) {
    // returns a mesh object, with origin at the center of the base of the
    // trunk.
    var tree = new THREE.Object3D();
    var cone = new THREE.Mesh( new THREE.ConeGeometry(coneRadius,coneHeight),
                               new THREE.MeshBasicMaterial({color: THREE.ColorKeywords.darkgreen}));
    cone.position.y = coneHeight/2+trunkHeight;
    tree.add(cone);
    var trunk = new THREE.Mesh( new THREE.CylinderGeometry(trunkRadius,trunkRadius,trunkHeight),
                                new THREE.MeshBasicMaterial({color: THREE.ColorKeywords.brown}));
    trunk.position.y = trunkHeight/2;
    tree.add(trunk);
    return tree;
}

// ====================================================================
// copied from SnowPerson-composite-v2.shtml

function createSnowPerson (wireframe, radiusBottom, radiusMiddle, radiusTop, carrotLength) {
    /* Returns a three-sphere snowperson. The args are the radii of the
    spheres, starting from the bottom, and the length of the carrot. The
    snowperson sits on the origin, and the spheres are stacked along the y
    axis. There's an orange cone (carrot) for a nose */

    // these could also be parameters
    var bodyColor = THREE.ColorKeywords.white;
    var bodyMaterial = new THREE.MeshBasicMaterial({color: bodyColor});
    bodyMaterial.wireframe = wireframe;
    var sphereDetail = 10;
    var carrotColor = THREE.ColorKeywords.orange;

    // here is our container
    var frosty = new THREE.Object3D();

    // function to add one snowball to frosty.  
    // height is distance of origin to sphere center along y.
    function addSphere(radius,height) {
        var sg = new THREE.SphereGeometry(radius,sphereDetail,sphereDetail);
        var s = new THREE.Mesh(sg, bodyMaterial);
        console.log("adding sphere: "+radius+" at "+height);
        s.position.y = height;   // specify where along Y to add it
        frosty.add(s);
    }

    // ================================================================
    // main code of function
    
    var y = radiusBottom;  // center of bottom sphere
    addSphere(radiusBottom,y);
    y += radiusBottom + radiusMiddle;  // center of middle sphere
    addSphere(radiusMiddle,y);
    y += radiusMiddle + radiusTop;  // center of top sphere
    addSphere(radiusTop,y);
    
    // add the carrot
    var carrotGeom = new THREE.CylinderGeometry(radiusTop/5, 0, carrotLength);
    var carrotMesh = new THREE.Mesh( carrotGeom, 
                                     new THREE.MeshBasicMaterial({color: carrotColor}));
    carrotMesh.position.set(0, y, radiusTop+carrotLength/2);
    console.log(carrotMesh.position);
    carrotMesh.rotation.x = -1 * Math.PI/2;
    frosty.add(carrotMesh);
    
    return frosty;
}

// ====================================================================

/* Next, we create objects in our scene. */

var house1 = TW.createMesh( TW.createBarn(2,3,3) );
house1.position.set(4,0,3);
scene.add(house1);

var house2 = TW.createMesh( TW.createBarn(2,3,3) );
house2.position.set(3,0,7);
house2.rotation.y = Math.PI/2;
scene.add(house2);

var house3 = TW.createMesh( TW.createBarn(2,3,3) );
house3.position.set(8,0,5);
house3.rotation.y = -Math.PI/4;
scene.add(house3);

var tree1 = createTree(0.2,1,2,6);
tree1.position.set(8,0,10);
scene.add(tree1);

var tree2 = createTree(0.3,1.5,3,8); // big tree
tree2.position.set(12,0,10);
scene.add(tree2);

var r3=0.5, r2=r3*0.8, r1=r2*0.6;
var smx = 3, smz = 9;           // snowman x and z

var snowman = createSnowPerson(false,r3,r2,r1,0.2);
snowman.position.set(smx,0,smz);
scene.add(snowman);


// ====================================================================

// object to store the desired camera parameters

var cameraParams = {
    near: 1,
    far: 100,
    fov: 75,                // degrees
    aspectRatio: 1000/600,   // from dimensions of the canvas, see CSS
    atX: 10,
    atY: 5,
    atZ: 10,
    eyeX: 10,
    eyeY: 5,
    eyeZ: 20,
    upX: 0,
    upY: 1,
    upZ: 0
};

// setupCamera() function creates and returns a camera with the desired parameters

function setupCamera (cameraParameters) {
    // set up an abbreviation 
    var cp = cameraParameters;
    // create an initial camera with the desired shape
    var camera = new THREE.PerspectiveCamera(cp.fov, cp.aspectRatio, cp.near, cp.far);
    // set the camera location and orientation
    camera.position.set(cp.eyeX, cp.eyeY, cp.eyeZ);
    camera.up.set(cp.upX, cp.upY, cp.upZ);
    camera.lookAt(new THREE.Vector3(cp.atX, cp.atY, cp.atZ));
    return camera;
}

// ====================================================================

// We always need a renderer

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

// ================================================================

// create camera, add to scene, and render scene with new camera

var camera = setupCamera(cameraParams);
scene.add(camera);

function render() {
    // a render function; assume global variables scene, renderer, and camera
    renderer.render(scene,camera);
}
render();

// create a GUI to explore camera parameters

function redoCamera() {
    scene.remove(camera);
    camera = setupCamera(cameraParams);
    scene.add(camera)
    render();
}

var gui = new dat.GUI();
gui.add(cameraParams,'eyeX',-10,12).onChange(redoCamera);
gui.add(cameraParams,'eyeY',0,20).onChange(redoCamera);
gui.add(cameraParams,'eyeZ',0,20).onChange(redoCamera);
gui.add(cameraParams,'fov',10,90).onChange(redoCamera);
gui.add(cameraParams,'atX',-10,12).onChange(redoCamera);
gui.add(cameraParams,'atY',0,20).onChange(redoCamera);
gui.add(cameraParams,'atZ',0,20).onChange(redoCamera);