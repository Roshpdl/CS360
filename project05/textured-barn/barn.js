/*
Author: Roshan Poudel
Description: Project 05, Creating a Textured Barn
Course: CS360, Principles of Interactive Graphics
Date Created: Nov 03, 2023
Contributors: Dr. Ross Sowell
*/

// global parameters for barn 
var params = {
    barnWidth: 20,
    barnHeight: 10,
    barnDepth: 50,
};

// create the scene, renderer, and camera
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({ antialias: true });

TW.mainInit(renderer, scene);

TW.cameraSetup(renderer, scene,
    {
        minx: 0, maxx: params.barnWidth,
        miny: 0, maxy: params.barnHeight,
        minz: -params.barnDepth, maxz: 0
    });

var barnMesh;
var barnMeshTextured;

// adds texture coordinates to all the barn vertices
function addTextureCoords(barnGeom) {
    if (!barnGeom instanceof THREE.Geometry) {
        throw "not a THREE.Geometry: " + barnGeom;
    }
    // array of face descriptors
    var UVs = [];
    function faceCoords(as, at, bs, bt, cs, ct) {
        UVs.push([new THREE.Vector2(as, at),
        new THREE.Vector2(bs, bt),
        new THREE.Vector2(cs, ct)]);
    }
    // front (faces 0-2)
    faceCoords(0, 0, 1, 0, 1, 1);
    faceCoords(0, 0, 1, 1, 0, 1);
    faceCoords(0, 1, 1, 1, 1, 1);  // upper triangle
    // back (faces 3-5)
    faceCoords(1, 0, 0, 1, 0, 0);
    faceCoords(1, 0, 1, 1, 0, 1);
    faceCoords(0, 1, 1, 1, 1, 1);  // upper triangle
    // roof (faces 6-9)
    faceCoords(1, 0, 1, 1, 0, 0);
    faceCoords(1, 1, 0, 1, 0, 0);
    faceCoords(0, 0, 1, 0, 1, 1);
    faceCoords(0, 1, 0, 0, 1, 1);
    // sides (faces 10-13)
    faceCoords(1, 0, 0, 1, 0, 0);
    faceCoords(1, 1, 0, 1, 1, 0);
    faceCoords(1, 0, 1, 1, 0, 0);
    faceCoords(1, 1, 0, 1, 0, 0);
    // floor (faces 14-15)
    faceCoords(0, 0, 1, 0, 0, 1);
    faceCoords(1, 0, 1, 1, 0, 1);

    // attach this to the geometry
    barnGeom.faceVertexUvs = [UVs];
}

// Function to make a minimal grayscale barn and add it to the scene
function makeBasicBarn() {
    var barnGeom = TW.createBarn(params.barnWidth, params.barnHeight, params.barnDepth);
    var barnMat = new THREE.MeshPhongMaterial({ color: 0x808080 });
    barnMesh = new THREE.Mesh(barnGeom, barnMat);
    scene.add(barnMesh);
}

// Function to create and add a textured barn to the scene
function createTexturedBarn(textures) {
    var barnGeom = TW.createBarn(params.barnWidth, params.barnHeight, params.barnDepth);
    addTextureCoords(barnGeom);

    var wrapStyle = THREE.MirroredRepeatWrapping;
    textures.forEach(texture => {
        texture.wrapS = texture.wrapT = wrapStyle;
        texture.repeat.set(2, 2);
        texture.needsUpdate = true;
    });

    var barnMaterials = textures.map(texture => new THREE.MeshPhongMaterial({ map: texture }));

    // Assign materials to faces (assuming and roof faces are 6-9 and side faces are 10-13)

    barnGeom.faces[6].materialIndex = 1;
    barnGeom.faces[7].materialIndex = 1;
    barnGeom.faces[8].materialIndex = 1;
    barnGeom.faces[9].materialIndex = 1;

    barnGeom.faces[10].materialIndex = 0;
    barnGeom.faces[11].materialIndex = 0;
    barnGeom.faces[12].materialIndex = 0;
    barnGeom.faces[13].materialIndex = 0;

    barnMeshTextured = new THREE.Mesh(barnGeom, barnMaterials);
    scene.add(barnMeshTextured);
    TW.render();
}

// Ambient light setup
var ambLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambLight);

// Directional light setup
var directionalLight = new THREE.DirectionalLight(0x808080, 2);
directionalLight.position.set(15, 10, 5);
scene.add(directionalLight);

// GUI
var guiParams = { mode: "basic" };
function reload() {
    if (guiParams.mode === "basic") {
        scene.remove(barnMeshTextured);
        makeBasicBarn();
    } else if (guiParams.mode === "textured") {
        scene.remove(barnMesh);
        TW.loadTextures(["sides_texture.jpg", "roof_texture.jpg"], createTexturedBarn);
    }
    TW.render();
}

var gui = new dat.GUI();
gui.add(guiParams, 'mode', ["basic", "textured"]).onChange(reload);

// Initial render
makeBasicBarn();
TW.render();