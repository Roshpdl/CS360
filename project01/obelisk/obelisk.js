/**
 * @fileOverview obelisk.js
 * @description Project 1 - CS360, Fall 2023. This script creates and renders a 3D monument using Three.js.
 * @version 1.0.0
 * @author Roshan Poudel
 * @date Sep 11, 2023
 */


// We always need a scene.
var scene = new THREE.Scene();

/**
 * Creates a monument geometry. Default height of the steeple is 55
 * @param {number} bottomWidth - The width of the bottom of the pillar.
 * @param {number} topWidth - The width of the top of the pillar.
 * @param {number} height - The height of the pillar.
 * @returns {THREE.Geometry} - The monument geometry.
 */
function createMonumentGeom(bottomWidth, topWidth, height) {
    var monumentGeom = new THREE.Geometry();

    // Defining the vertices

    // Bottom of the pillar
    monumentGeom.vertices.push(new THREE.Vector3(0, 0, 0));
    monumentGeom.vertices.push(new THREE.Vector3(bottomWidth, 0, 0));
    monumentGeom.vertices.push(new THREE.Vector3(bottomWidth, 0, -bottomWidth));
    monumentGeom.vertices.push(new THREE.Vector3(0, 0, -bottomWidth));

    // Top of the pillar
    monumentGeom.vertices.push(new THREE.Vector3((bottomWidth - topWidth) / 2, height, (-bottomWidth + topWidth) / 2));
    monumentGeom.vertices.push(new THREE.Vector3((bottomWidth - topWidth) / 2 + topWidth, height, (-bottomWidth + topWidth) / 2));
    monumentGeom.vertices.push(new THREE.Vector3((bottomWidth - topWidth) / 2 + topWidth, height, (-bottomWidth + topWidth) / 2 - topWidth));
    monumentGeom.vertices.push(new THREE.Vector3((bottomWidth - topWidth) / 2, height, (-bottomWidth + topWidth) / 2 - topWidth));

    // Peak Vertex
    monumentGeom.vertices.push(new THREE.Vector3(bottomWidth / 2, height + 55, -bottomWidth / 2)); //55 - default height of the steeple

    // Defining the faces for the pillar of the monument
    monumentGeom.faces.push(new THREE.Face3(0, 1, 5));
    monumentGeom.faces.push(new THREE.Face3(0, 5, 4));

    monumentGeom.faces.push(new THREE.Face3(1, 2, 6));
    monumentGeom.faces.push(new THREE.Face3(1, 6, 5));

    monumentGeom.faces.push(new THREE.Face3(2, 3, 7));
    monumentGeom.faces.push(new THREE.Face3(2, 7, 6));

    monumentGeom.faces.push(new THREE.Face3(3, 0, 4));
    monumentGeom.faces.push(new THREE.Face3(3, 4, 7));

    // Defining the tetrahedron that stays on the top
    monumentGeom.faces.push(new THREE.Face3(4, 5, 8));
    monumentGeom.faces.push(new THREE.Face3(5, 6, 8));
    monumentGeom.faces.push(new THREE.Face3(6, 7, 8));
    monumentGeom.faces.push(new THREE.Face3(7, 4, 8));

    // Defining the normals
    monumentGeom.computeFaceNormals();

    return monumentGeom;
}

var monumentParams = {
    bottomWidth: 55,
    topWidth: 30,
    height: 500
};

var monument;

/**
 * Adds a monument to the scene.
 * @param {number} bottomWidth - The width of the bottom of the pillar.
 * @param {number} topWidth - The width of the top of the pillar.
 * @param {number} height - The height of the pillar.
 * @returns {THREE.Mesh} - The monument mesh.
 */
function addMonument(bottomWidth, topWidth, height) {
    var monumentMaterial = [
        new THREE.MeshBasicMaterial({ color: new THREE.Color("red") }),
        new THREE.MeshBasicMaterial({ color: new THREE.Color("magenta") }),
        new THREE.MeshBasicMaterial({ color: new THREE.Color("blue") }),
        new THREE.MeshBasicMaterial({ color: new THREE.Color("white") }),
        new THREE.MeshBasicMaterial({ color: new THREE.Color("yellow") }),
    ];

    var newMonumentGeom = createMonumentGeom(bottomWidth, topWidth, height);

    TW.setMaterialForFaces(newMonumentGeom, 0, 0, 1);
    TW.setMaterialForFaces(newMonumentGeom, 1, 2, 3);
    TW.setMaterialForFaces(newMonumentGeom, 2, 4, 5);
    TW.setMaterialForFaces(newMonumentGeom, 3, 6, 7);
    TW.setMaterialForFaces(newMonumentGeom, 4, 8, 9, 10, 11);

    var newMonumentMesh = new THREE.Mesh(newMonumentGeom, monumentMaterial);

    newMonumentMesh.position.set(-bottomWidth / 2, 0, bottomWidth / 2);

    scene.add(newMonumentMesh);
    return newMonumentMesh;
}

monument = addMonument(monumentParams.bottomWidth, monumentParams.topWidth, monumentParams.height);

// We always need a renderer
var renderer = new THREE.WebGLRenderer({antialias:true});

TW.mainInit(renderer, scene);

/* We always need a camera; here we'll use a default orbiting camera. The
third argument are the ranges for the coordinates, to help with setting up
the placement of the camera. They need not be perfectly accurate, but if
they are way off, your camera might not see anything, and you'll get a
blank canvas. */

TW.cameraSetup(renderer,
    scene,
    {
        minx: -60, maxx: 60,
        miny: 0, maxy: 600,
        minz: -60, maxz: 60
    });

/**
 * Redraws the scene with updated monument parameters.
 */
function redraw() {
    // Remove the existing monument from the scene
    scene.remove(monument);

    // Update the global monument variable with the new one
    monument = addMonument(monumentParams.bottomWidth, monumentParams.topWidth, monumentParams.height);

    // Render the scene
    TW.render();
}

// Setting up the GUI
var gui = new dat.GUI();
gui.add(monumentParams, 'bottomWidth', 55, 110).onChange(redraw);
gui.add(monumentParams, 'topWidth', 30, 60).onChange(redraw);
gui.add(monumentParams, 'height', 500, 1000).onChange(redraw);
