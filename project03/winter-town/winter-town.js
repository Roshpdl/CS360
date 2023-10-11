/*
Author: Roshan Poudel
CS 360, Project 3
*/

var scene = new THREE.Scene();

// used for tree trunk and sign
var brownMat = new THREE.MeshBasicMaterial({ color: THREE.ColorKeywords.brown });

// createTree() creates and returns a THREE.Object3D that is an instance of a tree, 
// with its origin at the center of the base of the trunk, and adds it to the scene
function createTree(trunkRadius, trunkHeight, coneRadius, coneHeight) {
    var tree = new THREE.Object3D();
    var cone = new THREE.Mesh(new THREE.ConeGeometry(coneRadius, coneHeight),
        new THREE.MeshBasicMaterial({ color: THREE.ColorKeywords.darkgreen }));
    cone.position.y = coneHeight / 2 + trunkHeight;
    tree.add(cone);
    var trunk = new THREE.Mesh(new THREE.CylinderGeometry(trunkRadius, trunkRadius, trunkHeight),
        brownMat);
    trunk.position.y = trunkHeight / 2;
    tree.add(trunk);
    return tree;
}

// createSnowperson() creates and returns a THREE.Object3D that is an instance of a snowperson, 
// with its origin at the center of its base, and adds it to the scene
function createSnowperson(radiusBot) {
    var snowPerson = new THREE.Object3D();
    var radiusMid = 0.8 * radiusBot;
    var radiusTop = 0.6 * radiusMid;
    var snow = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
    var snowBot = new THREE.Mesh(new THREE.SphereGeometry(radiusBot), snow);
    var snowMid = new THREE.Mesh(new THREE.SphereGeometry(radiusMid), snow);
    var snowTop = new THREE.Mesh(new THREE.SphereGeometry(radiusTop), snow);
    snowBot.position.y = radiusBot;
    snowMid.position.y = 2 * radiusBot + radiusMid;
    snowTop.position.y = 2 * radiusBot + 2 * radiusMid + radiusTop;
    snowPerson.add(snowBot);
    snowPerson.add(snowMid);
    snowPerson.add(snowTop);
    return snowPerson;
}

// add three houses (solid color barns) to the scene

var house1 = TW.createBarnSolidColor(2, 3, 3, 0xff0000);
house1.position.set(-7, 0, 4);
scene.add(house1);

var house2 = TW.createBarnSolidColor(2, 3, 3, 0x00ff00);
house2.position.set(-1, 0, -4);
scene.add(house2);

var house3 = TW.createBarnSolidColor(2, 3, 3, 0x0000ff);
house3.position.set(5, 0, 3);
scene.add(house3);

// add three trees to the scene

var tree1 = createTree(0.1, 0.5, 1, 4);
tree1.position.set(-5, 0, -3);
scene.add(tree1);

var tree2 = createTree(0.15, 0.8, 1.5, 5);
tree2.position.set(6, 0, -2);
scene.add(tree2);

var tree3 = createTree(0.2, 1, 1, 4);
tree3.position.set(2, 0, 5);
scene.add(tree3);

// add three snowpeople to the scene

var snow1 = createSnowperson(0.6);
snow1.position.set(4, 0, 3);
scene.add(snow1);

var snow2 = createSnowperson(0.5);
snow2.position.set(0.5, 0, 3);
scene.add(snow2);

var snow3 = createSnowperson(0.4);
snow3.position.set(-5, 0, 6);
scene.add(snow3);

// add a brown sign to the scene
var sign = new THREE.Mesh(new THREE.BoxGeometry(4, 1, 1), brownMat);
sign.position.set(-2, 2, 0);
scene.add(sign);
var signPost = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2, 0.5), brownMat);
signPost.position.set(-2, 1, 0);
scene.add(signPost);

// add a flat ground with snow
var circle = new THREE.Mesh(new THREE.CircleGeometry(9, 32),
    new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
    }));
circle.rotation.x = -Math.PI / 2;
scene.add(circle);

var ambLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambLight);

var renderer = new THREE.WebGLRenderer({ antialias: true });

TW.mainInit(renderer, scene);

//create a cameraparameters object
var cameraParams = {
    near: 1,
    far: 100,
    fov: 90,                 // degrees
    aspectRatio: 800 / 500,   // from dimensions of the canvas, see CSS
    atX: 0,
    atY: 0,
    atZ: 0,
    eyeX: 0,
    eyeY: 5,
    eyeZ: 30,
    upX: 0,
    upY: 1,
    upZ: 0
}

function setupCamera(cameraParams) {
    var cp = cameraParams;
    var camera = new THREE.PerspectiveCamera(cp.fov, cp.aspectRatio, cp.near, cp.far);
    camera.position.set(cp.eyeX, cp.eyeY, cp.eyeZ);
    camera.up.set(cp.upX, cp.upY, cp.upZ);
    camera.lookAt(new THREE.Vector3(cp.atX, cp.atY, cp.atZ));
    return camera;
}

// create camera, add to scene, and render scene with new camera
var camera = setupCamera(cameraParams);
scene.add(camera);

toggleView = {
    View1: () => {
        cameraParams = {
            near: 1,
            far: 100,
            fov: 90,
            aspectRatio: 800 / 500,
            atX: 0,
            atY: 0,
            atZ: 0,
            eyeX: 0,
            eyeY: 3,
            eyeZ: 15,
            upX: 0,
            upY: 1,
            upZ: 0
        }
        document.getElementById("view").innerHTML = "Winter Town View 1";
        redoCamera();
    },

    View2: () => {
        cameraParams = {
            near: 1,
            far: 100,
            fov: 40,
            aspectRatio: 800 / 500,
            atX: 0,
            atY: 0,
            atZ: 25,
            eyeX: 15,
            eyeY: 15,
            eyeZ: -20,
            upX: 0,
            upY: 1,
            upZ: 0
        }
        document.getElementById("view").innerHTML = "Winter Town View 2";
        redoCamera();
    },

    View3: () => {
        cameraParams = {
            near: 1,
            far: 100,
            fov: 25,
            aspectRatio: 800 / 500,
            atX: 0,
            atY: 0,
            atZ: 0,
            eyeX: 0,
            eyeY: 50,
            eyeZ: 0,
            upX: 0,
            upY: 1,
            upZ: 0.5
        }
        document.getElementById("view").innerHTML = "Winter Town View 3";
        redoCamera();
    }
}

//reload the camera and rerender the scene
function redoCamera() {
    scene.remove(camera);
    camera = setupCamera(cameraParams);
    scene.add(camera)
    render();
}

function render() {
    // a render function; assume global variables scene, renderer, and camera
    renderer.render(scene, camera);
}
render();

//keyboard callback function
TW.setKeyboardCallback("1", toggleView.View1, "View 1");
TW.setKeyboardCallback("2", toggleView.View2, "View 2");
TW.setKeyboardCallback("3", toggleView.View3, "View 3");
