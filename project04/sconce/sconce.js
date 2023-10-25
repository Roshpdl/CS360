/*
Author: Roshan Poudel
Course: CS360 Principles of Interactive Computer Graphics
Project: 04
Date: 10/20/2023
*/

/**
 * Creates a room.
 */
function createRoom() {
    const roomGeometry = new THREE.BoxGeometry(500, 500, 500);
    const materialArray = [];
    const faceColors = [
        new THREE.Color("blue"),
        new THREE.Color("dodgerblue"),
        new THREE.Color("lightgreen"),
        new THREE.Color("wheat"),
        new THREE.Color("purple"),
        new THREE.Color("dodgerblue")
    ];
    faceColors.forEach(color => materialArray.push(new THREE.MeshPhongMaterial({
        color: color,
        side: THREE.BackSide
    })));
    const roomMaterial = new THREE.MeshFaceMaterial(materialArray);
    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    scene.add(room);
}

/**
 * Creates a ball with the given parameters.
 * @param {number} color - The color of the ball.
 * @param {THREE.Vector3} floor - The position of the ball on the floor.
 * @param {number} radius - The radius of the ball.
 * @returns {THREE.Mesh} - The ball object.
 */
function makeBall(color, floor, radius) {
    const sphereGeometry = new THREE.SphereGeometry(radius, 50, 50);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: color, specular: new THREE.Color("white"), shininess: 10});
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.copy(floor);
    sphere.position.y += radius;
    return sphere;
}

/**
 * Creates a ball.
 */
function createBall() {
    const ball = makeBall(new THREE.Color("blue"), new THREE.Vector3(-175, -250, -200), 60);
    scene.add(ball);
}


/**
 * Creates a cone with the given parameters.
 * @param {number} angle - The angle at the base of the cone.
 * @param {number} color - The color of the cone.
 * @param {number} height - The height of the cone.
 * @returns {THREE.Object3D} - The cone object.
 */
function createCone(angle, color, height) {
    const cone = new THREE.Object3D();
    const radiusBottom = Math.tan(TW.degrees2radians(angle)) * height; // tan(angle) = perpendicular (aka radius) / base (aka height)
    const coneGeom = new THREE.CylinderGeometry(0, radiusBottom, height, 32, 1, true); // radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded
    const coneMat = new THREE.MeshPhongMaterial({ color: color, side: THREE.DoubleSide }); // side: THREE.DoubleSide is needed to see the inside of the cone
    const coneMesh = new THREE.Mesh(coneGeom, coneMat);
    coneMesh.position.y = -height / 2; // moving the cone down so that the bottom of the cone is at the origin
    cone.add(coneMesh);
    return cone;
}

/**
 * Creates a spotlight with the given angle, positions it, and aims it.
 * @param {number} angle - The angle of the spotlight.
 * @param {THREE.Vector3} position - The position for the spotlight.
 * @param {THREE.Vector3} direction - The direction to aim the spotlight.
 * @returns {THREE.SpotLight} - The spotlight object.
 */
function createSpotlight(angle, position, direction) {
    const angleInRadians = TW.degrees2radians(angle);
    const spot = new THREE.SpotLight(0xFFFFFF, 1, 0, angleInRadians); // color, intensity, distance (infinity), angle
    spot.intensity = 0.7;
    spot.position.copy(position);
    spot.target.position.set(position.x + direction.x, position.y + direction.y, position.z + direction.z);
    return spot;
}


/**
 * Creates a sconce with two cones and two spotlights.
 */
function createSconce() {
    // The sconce is made up of two cones and two spotlights.
    const lightAngle = 40; // The angle of the spotlight.
    const lampHeight = 40; // The height of the lamp.
    const lampColor = new THREE.Color("pink"); // The color of the lamp.
    const position = new THREE.Vector3(-170, 50, -200); // The position of the sconce.

    // Create the first cone and spotlight.
    const cone1 = createCone(lampHeight, lampColor, lightAngle); // Create the first cone.
    cone1.position.copy(position); // Set the position of the first cone.
    scene.add(cone1); // Add the first cone to the scene.

    const spot1 = createSpotlight(lightAngle, position, new THREE.Vector3(0, -1, 0)); // Create the first spotlight.
    spot1.name = "lamp up";
    scene.add(spot1); // Add the first spotlight to the scene.
    scene.add(spot1.target); // Add the target of the first spotlight to the scene.

    // Create the second cone and spotlight.
    const cone2 = createCone(lampHeight, lampColor, lightAngle); // Create the second cone.
    cone2.position.copy(position); // Set the position of the second cone.
    cone2.rotation.z = Math.PI; // Rotate the second cone 180 degrees around the z-axis.
    scene.add(cone2); // Add the second cone to the scene.

    const spot2 = createSpotlight(lightAngle, position, new THREE.Vector3(0, 1, 0)); // Create the second spotlight.
    spot2.name = "lamp down";
    scene.add(spot2); // Add the second spotlight to the scene.
    scene.add(spot2.target); // Add the target of the second spotlight to the scene.
}


/**
 * Creates an ambient light.
 */
function createAmbientLight() {
    ambient = new THREE.AmbientLight(0x808080);
    if (guiParams.ambientOn) {
        scene.add(ambient);
    }
}

/**
 * Creates a directional light.
 */
function createDirectionalLight() {
    directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(1, 1.2, 2);
    if (guiParams.directionalOn) {
        scene.add(directional);
    }
}


/**
 * Sets up the camera.
 */
function setupCamera() {
    state = TW.cameraSetup(renderer, scene, {
        minx: -230,
        maxx: 230,
        miny: -230,
        maxy: 230,
        minz: -230,
        maxz: 230
    });
}

/**
 * Sets up the GUI.
 */
function setupGUI() {
    const gui = new dat.GUI();
    gui.add(guiParams, "ambientOn").onChange(() => {
        ambient.visible = guiParams.ambientOn;
        TW.render();
    });
    gui.add(guiParams, "directionalOn").onChange(() => {
        directional.visible = guiParams.directionalOn;
        TW.render();
    });
    gui.add(guiParams, "spotlightOn").onChange(() => {
        scene.getObjectByName("lamp up").visible = guiParams.spotlightOn;
        scene.getObjectByName("lamp down").visible = guiParams.spotlightOn;
        TW.render();
    });
    const spot1Folder = gui.addFolder("Spotlight 1");
    spot1Folder.add(guiParams.spot1, "angle", 0, 90).onChange(() => {
        scene.getObjectByName("lamp up").angle = TW.degrees2radians(guiParams.spot1.angle);
        TW.render();
    });
    const spot2Folder = gui.addFolder("Spotlight 2");
    spot2Folder.add(guiParams.spot2, "angle", 0, 90).onChange(() => {
        scene.getObjectByName("lamp down").angle = TW.degrees2radians(guiParams.spot2.angle);
        TW.render();
    });
}

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias: true});
const guiParams = {
    ambientOn: true,
    directionalOn: true,
    spotlightOn: true,
    spot1: {
        angle: 40
    },
    spot2: {
        angle: 40
    }
};

// Initialize the scene.
TW.mainInit(renderer, scene);

// Create the sconce, ball, lights, and room.
createRoom();
createSconce();
createBall();
createDirectionalLight();
createAmbientLight();
setupCamera();
setupGUI();
