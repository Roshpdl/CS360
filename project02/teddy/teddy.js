// parameters that specify the geometrical structure of the teddy bear
var params = {
    noseRadius: 0.5,
    noseRotation: TW.degrees2radians(10),
    earRadius: 0.6,
    earScale: 0.5,
    earAngle: Math.PI/4,
    eyeRadius: 0.3,
    eyeAngleX: -Math.PI/6,
    eyeAngleY: +Math.PI/6,
    armLength: 7,
    armRadiusTop: 1.5,
    armRadiusBottom: 1.2,
    legRadiusTop: 1.8,
    legRadiusBottom: 1.4,
    legLength: 9,
    legRotationX: -TW.degrees2radians(60),
    legRotationZ: TW.degrees2radians(20),
    hipWidth: 2.5,
    hipHeight: -7,
    headRadius: 2,
    bodyRadius: 5,
    bodyScaleY: 2
};

// colors and materials for the teddy bear
var bodyMaterial = new THREE.MeshBasicMaterial({color: 0xD08050});
var headMaterial = new THREE.MeshBasicMaterial({color: 0xB07040});
var blackMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

function createNose(params) {
    // create and return a Mesh for the nose
    var radius = params.noseRadius;
    var noseGeometry = new THREE.SphereGeometry(radius,10,10);
    var noseMesh = new THREE.Mesh(noseGeometry, blackMaterial);
    return noseMesh;
}

function addNose(head,params) {
    /* adds a nose to the head. It's placed by creating a composite object
     * centered in the middle of the head, positioning the nose at the
     * head radius on +Z, then rotating around the X axis by a little */
    var noseframe = new THREE.Object3D();
    var nose = createNose(params);
    var radius = params.headRadius;
    nose.position.z = radius;   // within the noseframe
    noseframe.add(nose);
    var angle = params.noseRotation;
    noseframe.rotation.x = angle;
    head.add(noseframe);
    return head;
}

function createEar(params) {
    // create and return a Mesh for an ear
    var radius = params.earRadius;
    var earGeometry = new THREE.SphereGeometry(radius,10,10);
    var ear = new THREE.Mesh(earGeometry, bodyMaterial);
    // flattens the sphere to make it look more like a flat disk
    ear.scale.z = params.earScale;
    return ear;
}

function addEar(head,params,side) {
    /* adds an ear to the head on the right (side=1) or left (side=-1).
     * The center of the ear is flush with the surface of the head by
     * moving it out by the radius, and rotating it around the Z axis
     * to get it to the desired height */
    var earframe = new THREE.Object3D();
    var ear = createEar(params);
    var radius = params.headRadius;
    var angle = params.earAngle;
    ear.position.x = side * radius; // within the earframe
    earframe.rotation.z = side * angle;
    earframe.add(ear);
    head.add(earframe);
    return head;
}

function createEye(params) {
    // create and return a Mesh for an eye
    var radius = params.eyeRadius;
    var eyeGeometry = new THREE.SphereGeometry(radius,10,10);
    var eyeMesh = new THREE.Mesh(eyeGeometry, blackMaterial);
    return eyeMesh;
}

function addEye(head,params,side) {
    /* adds an eye to the head on the right (side=1) or left (side=-1).
     * The center of the eye is flush with the surface of the head by
     * moving it out along the Z axis by the radius, and rotating it
     * around the X and then Y axes to get it to the desired height */
    var eyeframe = new THREE.Object3D();
    var eye = createEye(params);
    var radius = params.headRadius;
    eye.position.z = radius;     // within the eyeframe
    var angleX = params.eyeAngleX;
    var angleY = params.eyeAngleY;
    eyeframe.rotation.x = angleX;
    eyeframe.rotation.y = side * angleY;
    eyeframe.add(eye);
    head.add(eyeframe);
    return head;
}

function createHead(params) {
    /* creates and returns a teddy bear head object, with origin in the 
     * center and eyes on the +Z side of the head, and ears on the left 
     * (-X) and right (+X) sides */
    var head = new THREE.Object3D();

    var radius = params.headRadius;
    var headGeometry = new THREE.SphereGeometry(radius, 10, 10);
    var headMesh = new THREE.Mesh(headGeometry, headMaterial);
    head.add(headMesh);
    addNose(head,params);
    addEar(head,params,1);
    addEar(head,params,-1);
    addEye(head,params,1);
    addEye(head,params,-1);
    return head;
}

function createArm(params) {
    /* creates and returns an Object with the center at the shoulder 
     * and the negative Y axis running down the center */
    var arm = new THREE.Object3D();
    var top = params.armRadiusTop;
    var bot = params.armRadiusBottom;
    var len = params.armLength;
    var armGeom = new THREE.CylinderGeometry(top,bot,len,10);
    var armMesh = new THREE.Mesh( armGeom, headMaterial);
    armMesh.position.y = -len/2;
    arm.add(armMesh);
    return arm;
}

function addArm(bear,params,side) {
    /* adds an arm to the bear on the right (side=1) or left (side=-1) */
    var arm = createArm(params);
    var radius = params.bodyRadius;
    var scale = params.bodyScaleY; 
    var sx = radius * 0.5;
    var sy = scale * radius * 0.7;
    arm.position.set(side * sx, sy, 0);
    arm.rotation.z = side * Math.PI/2;
    bear.add(arm);
}
    
function createLimb(radiusTop, radiusBottom, length, params) {
    /* creates and returns an Object with the center at the top and the 
     * negative Y axis running down the center */
    var limb = new THREE.Object3D();
    var limbGeom = new THREE.CylinderGeometry(radiusTop,radiusBottom,length,10);
    var limbMesh = new THREE.Mesh(limbGeom, headMaterial);
    limbMesh.position.y = -length/2;
    limb.add(limbMesh);
    return limb;
}

function addLeg(bear,params,side) {
    /* adds a leg to the bear on the right (side=1) or left (side=-1) */
    var top = params.legRadiusTop;
    var bot = params.legRadiusBottom;
    var len = params.legLength;
    var leg = createLimb(top,bot,len,params);
    var radius = params.bodyRadius;
    var scale = params.bodyScaleY; 
    var hx = side * params.hipWidth;
    var hy = params.hipHeight;
    leg.position.set(hx, hy, 0);
    leg.rotation.x = params.legRotationX;
    leg.rotation.z = side * params.legRotationZ;
    bear.add(leg);
}

function createBody(params) {
    // creates and returns a body Object for the bear
    var body = new THREE.Object3D();
    var radius = params.bodyRadius;
    var bodyGeom = new THREE.SphereGeometry(radius,20,20);
    var bodyMesh = new THREE.Mesh(bodyGeom, bodyMaterial);
    var scale = params.bodyScaleY;
    bodyMesh.scale.y = scale;
    body.add(bodyMesh);
    addArm(body,params,1);
    addArm(body,params,-1);
    addLeg(body,params,1);
    addLeg(body,params,-1);
    return body;
}

function createTeddyBear(params) {
    // creates and returns a bear object
    var bear = new THREE.Object3D();
    var body = createBody(params);
    bear.add(body);
    var head = createHead(params);
    var bs = params.bodyScaleY;
    var br = params.bodyRadius;
    var hr = params.headRadius;
    // calculate position for the center of the head
    head.position.y = bs*br+hr;
    bear.add(head);
    return bear;
}

// construct a renderer for the scene
var renderer = new THREE.WebGLRenderer();

// create the Scene object
var scene = new THREE.Scene();
                        
// create a teddy bear and add it to the scene
var bear = createTeddyBear(params);
scene.add(bear);

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: -5, maxx: 5,
                miny: -10, maxy: 15,
                minz: -5, maxz: 5});

TW.viewFromAboveFrontSide();