/*
Author: Roshan Poudel
Purpose: This file contains the code for the clown project - Project 2
Description: It creates a clown with a body, head, hat, and a dot at the origin.
Course: CS 360 - Principles of Interactive Computer Graphics, Fall 23
Last Modified: 09/21/2023
*/



// Creating the scene
var scene = new THREE.Scene();

var clownParams = {
    head: {
        radius: 3.2,
        nose: {
            radius: 0.32,
            rotation: TW.degrees2radians(10)
        },
        ear: {
            radius: 1.1,
            scale: 1.05,
            angle: Math.PI + 0.1
        },
        eye: {
            radius: 0.32,
            angleX: -Math.PI/22,
            angleY: Math.PI/9
        },
        smile: {
            radius: 2.1,
            rotationZ: -1.7,
            rotationX: 0.17,
            scale: TW.degrees2radians(30)
        }
    },
    body: {
        radius: 4.1,
        scaleY: 1.3,
        shoulder: {
            radius: 1.05
        },
        arm: {
            length: 6.2
        },
        hand: {
            radius: 0.82
        },
        leg: {
            length: 8.2
        },
        shoe: {
            radius: 1.55
        },
        overlap: 1.05
    },
    hat: {
        circumRadius: 4.1,
        topRadius: 3.6,
        bottomRadius: 3.1,
        length: 3.6,
        rotation: TW.degrees2radians(10)
    },
    originDot: {
        radius: 0.42
    }
}


var clownMaterials = {
    body: new THREE.MeshBasicMaterial({color: 'blue'}),
    head: new THREE.MeshBasicMaterial({color: 'lightblue'}),
    face: new THREE.MeshBasicMaterial({color: 'midnightblue'}),
    smile: new THREE.MeshBasicMaterial({color: 'navy'}),
    hand: new THREE.MeshBasicMaterial({color: 'royalblue'}),
    originDot: new THREE.MeshBasicMaterial({color: 'yellow'})  // Keeping it as is for the dot
};


// Head Components

/**
 * Creates the ear of the clown.
 */
function createEar() {
    const radius = clownParams.head.ear.radius;
    const earGeometry = new THREE.SphereGeometry(radius, 10, 10);
    const ear = new THREE.Mesh(earGeometry, clownMaterials.face);
    ear.scale.z = clownParams.head.ear.scale;
    return ear;
}

/**
 * Adds the ear to the clown's head.
 */
function addEar(head, side) {
    const earFrame = new THREE.Object3D();
    const ear = createEar();
    ear.position.x = side * clownParams.head.radius;
    earFrame.rotation.z = side * clownParams.head.ear.angle;
    earFrame.add(ear);
    head.add(earFrame);
}

/**
 * Creates the nose of the clown.
 */
function createNose() {
    const radius = clownParams.head.nose.radius;
    const noseGeometry = new THREE.SphereGeometry(radius, 10, 10);
    const noseMesh = new THREE.Mesh(noseGeometry, clownMaterials.face);
    return noseMesh;
}

/**
 * Adds the nose to the clown's head.
 */
function addNose(head) {
    const noseFrame = new THREE.Object3D();
    const nose = createNose();
    nose.position.z = clownParams.head.radius;
    noseFrame.rotation.x = clownParams.head.nose.rotation;
    noseFrame.add(nose);
    head.add(noseFrame);
}

/**
 * Creates the eye of the clown.
 */
function createEye() {
    const radius = clownParams.head.eye.radius;
    const eyeGeometry = new THREE.SphereGeometry(radius, 10, 10);
    const eyeMesh = new THREE.Mesh(eyeGeometry, clownMaterials.face);
    return eyeMesh;
}

/**
 * Adds the eye to the clown's head.
 */
function addEye(head, side) {
    const eyeFrame = new THREE.Object3D();
    const eye = createEye();
    eye.position.z = clownParams.head.radius;
    eyeFrame.rotation.x = clownParams.head.eye.angleX;
    eyeFrame.rotation.y = side * clownParams.head.eye.angleY;
    eyeFrame.add(eye);
    head.add(eyeFrame);
}

/**
 * Creates the smile of the clown.
 */
function createSmile() {
    const radius = clownParams.head.smile.radius;
    const smileGeometry = new THREE.TorusGeometry(radius, 0.1, 16, 100, clownParams.head.smile.scale);
    const smileMesh = new THREE.Mesh(smileGeometry, clownMaterials.smile);
    return smileMesh;
}

/**
 * Adds the smile to the clown's head.
 */
function addSmile(head) {
    const smileFrame = new THREE.Object3D();
    const smile = createSmile();
    smile.position.z = clownParams.head.radius;
    smileFrame.rotation.x = clownParams.head.smile.rotationX;
    smileFrame.rotation.z = clownParams.head.smile.rotationZ;
    smileFrame.add(smile);
    head.add(smileFrame);
}

/**
 * Constructs the entire head of the clown.
 */
function createHead() {
    const head = new THREE.Object3D();
    const headGeometry = new THREE.SphereGeometry(clownParams.head.radius, 10, 10);
    const headMesh = new THREE.Mesh(headGeometry, clownMaterials.head);
    head.add(headMesh);
    addNose(head);
    addEar(head, 1);
    addEar(head, -1);
    addEye(head, 1);
    addEye(head, -1);
    addSmile(head);
    return head;
}


// Body Components

/**
 * Creates the shoulder of the clown.
 */
function createShoulder() {
    const shoulder = new THREE.Object3D();
    const radius = clownParams.body.shoulder.radius;
    const shoulderGeom = new THREE.SphereGeometry(radius, 10, 10);
    const shoulderMesh = new THREE.Mesh(shoulderGeom, clownMaterials.smile);
    shoulder.add(shoulderMesh);
    return shoulder;
}


/**
 * Adds the shoulder to the clown's body.
 */
function addShoulder(body, side) {
    const shoulderFrame = new THREE.Object3D();
    const shoulder = createShoulder();
    const radius = clownParams.body.radius;
    const overlap = clownParams.body.overlap;
    shoulder.position.set(side * (radius - overlap), radius, 0);
    body.add(shoulder);
}


/**
 * Creates the arm of the clown.
 */
function createArm() {
    const arm = new THREE.Object3D();
    const len = clownParams.body.arm.length;
    const armGeom = new THREE.CylinderGeometry(0.5, 0.5, len, 30);
    const armMesh = new THREE.Mesh(armGeom, clownMaterials.body);
    armMesh.position.y = -len / 2;
    arm.add(armMesh);
    return arm;
}

/**
 * Adds the arm to the clown's body.
 */
function addArm(body, side) {
    const arm = createArm();
    const radius = clownParams.body.radius;
    const overlap = clownParams.body.overlap;
    arm.position.set(side * (radius - overlap), radius, 0);
    arm.rotation.z = side * Math.PI / 6;
    body.add(arm);
}

/**
 * Creates the hand of the clown.
 */
function createHand() {
    const hand = new THREE.Object3D();
    const radius = clownParams.body.hand.radius;
    const handGeom = new THREE.SphereGeometry(radius, 10, 10);
    const handMesh = new THREE.Mesh(handGeom, clownMaterials.hand);
    hand.add(handMesh);
    return hand;
}

/**
 * Adds the hand to the clown's body.
 */
function addHand(body, side) {
    const handFrame = new THREE.Object3D();
    const hand = createHand();
    const len = clownParams.body.arm.length;
    const radius = clownParams.body.radius;
    const overlap = clownParams.body.overlap;
    hand.position.set(side * (radius + 2 * overlap), -len / 4, 0);
    body.add(hand);
}


/**
 * Creates the leg of the clown.
 */
function createLeg() {
    const leg = new THREE.Object3D();
    const len = clownParams.body.leg.length;
    const legGeom = new THREE.CylinderGeometry(0.5, 0.5, len, 30);
    const legMesh = new THREE.Mesh(legGeom, clownMaterials.smile);
    legMesh.position.y = -len / 2;
    leg.add(legMesh);
    return leg;
}

/**
 * Adds the leg to the clown's body.
 */
function addLeg(body, side) {
    const legFrame = new THREE.Object3D();
    const leg = createLeg();
    const radius = clownParams.body.radius;
    const overlap = clownParams.body.overlap;
    leg.position.set(side * (radius / 2), -radius + overlap, 0);
    body.add(leg);
}

/**
 * Creates the shoe of the clown.
 */
function createShoe() {
    const shoe = new THREE.Object3D();
    const radius = clownParams.body.shoe.radius;
    const shoeGeom = new THREE.SphereGeometry(radius, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2);
    const shoeMesh = new THREE.Mesh(shoeGeom, clownMaterials.hand);
    shoe.add(shoeMesh);
    return shoe;
}

/**
 * Adds the shoe to the clown's body.
 */
function addShoe(body, side) {
    const shoeFrame = new THREE.Object3D();
    const shoe = createShoe();
    const len = clownParams.body.leg.length;
    const radius = clownParams.body.radius;
    const overlap = clownParams.body.overlap;
    shoe.position.set(side * (radius - 2 * overlap), -radius - len + overlap, 0);
    body.add(shoe);
}

/**
 * Constructs the body of the clown along with its arms, hands, legs, and shoes.
 */
function createBody() {
    const body = new THREE.Object3D();
    const radius = clownParams.body.radius;
    const bodyGeom = new THREE.SphereGeometry(radius, 20, 20);
    const bodyMesh = new THREE.Mesh(bodyGeom, clownMaterials.body);
    bodyMesh.scale.y = clownParams.body.scaleY;
    bodyMesh.position.y = clownParams.body.radius / 10;
    body.add(bodyMesh);
    addShoulder(body, 1);
    addShoulder(body, -1);
    addArm(body, 1);
    addArm(body, -1);
    addHand(body, 1);
    addHand(body, -1);
    addLeg(body, 1);
    addLeg(body, -1);
    addShoe(body, 1);
    addShoe(body, -1);
    return body;
}

// Hat Components

/**
 * Creates the circumference of the clown's hat.
 */
function hatCircumference() {
    const circum = new THREE.Object3D();
    const radius = clownParams.hat.circumRadius;
    const circumGeom = new THREE.CylinderGeometry(radius, radius, 0.1, 32);
    const circumMesh = new THREE.Mesh(circumGeom, clownMaterials.body);
    circumMesh.rotation.x = Math.PI;
    circum.add(circumMesh);
    const hat = createHat();
    circum.add(hat);

    circum.rotation.x = -clownParams.hat.rotation;
    circum.position.y = clownParams.body.radius + 2 * clownParams.head.radius;
    circum.rotation.z = -clownParams.hat.rotation;
    
    return circum;
}

/**
 * Constructs the hat of the clown.
 */
function createHat() {
    const hat = new THREE.Object3D();
    const hatGeom = new THREE.CylinderGeometry(clownParams.hat.topRadius, clownParams.hat.bottomRadius, clownParams.hat.length);
    const hatMesh = new THREE.Mesh(hatGeom, clownMaterials.body);
    hatMesh.position.y = clownParams.head.radius / 2;
    hat.add(hatMesh);
    return hat;
}

// Origin Dot

/**
 * Creates a dot at the origin.
 */

function createDot() {
    const dot = new THREE.Object3D();
    const radius = clownParams.originDot.radius;
    const dotGeom = new THREE.SphereGeometry(radius, 10, 10);
    const dotMesh = new THREE.Mesh(dotGeom, clownMaterials.originDot);

    dotMesh.position.y = -clownParams.body.radius - clownParams.body.leg.length + clownParams.body.overlap;
    dot.add(dotMesh);
    return dot;
}

/**
 * Constructs the entire clown including body, head, hat, and origin dot.
 */
function createClown() {
    const clown = new THREE.Object3D();
    const body = createBody();
    clown.add(body);
    const head = createHead();
    head.position.y = clownParams.body.scaleY * clownParams.body.radius + clownParams.head.radius;
    clown.add(head);
    const hat = hatCircumference();
    clown.add(hat);
    const dot = createDot();
    clown.add(dot);
    return clown;
}

const clown = createClown();
scene.add(clown);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
TW.mainInit(renderer, scene);

TW.cameraSetup(renderer, scene, {
    minx: -8, maxx: 8,
    miny: -8, maxy: 8,
    minz: -8, maxz: 8
});
