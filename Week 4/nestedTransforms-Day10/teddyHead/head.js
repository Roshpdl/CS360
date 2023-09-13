var scene = new THREE.Scene();

// parameters related to the bear's head
var params = {
        wireframe: false,
        sphereDetail: 10,
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
        headRadius: 2,
        headMaterial: new THREE.MeshBasicMaterial({color: "#B07040",
                                                   wireframe: true}),
        bodyMaterial: new THREE.MeshBasicMaterial({color: "#D08050"}),
        blackMaterial: new THREE.MeshBasicMaterial({color: 0x000000})
    };

function createTeddyBearHead (params) {
    // creates and returns the teddy bear's head (a THREE.Object3D)
    var head = createHead(params);
    return head;

    function createNose (params) {
        // creates and returns a mesh for the nose
        var sd = params.sphereDetail;
        var radius = params.noseRadius;
        var noseGeometry = new THREE.SphereGeometry(radius, sd, sd);
        var noseMesh = new THREE.Mesh(noseGeometry, params.blackMaterial);
        return noseMesh;
    }

    function addNose (head, params) {
        /* adds a nose to the head. It's placed by creating a composite object
           centered in the middle of the head, and positioning the nose at the
           head radius on +Z, then rotating around X by a little. */
        var noseframe = new THREE.Object3D();
        var nose = createNose(params);
        nose.position.z = params.headRadius; // within the noseframe
        noseframe.add(nose);
        noseframe.rotation.x = params.noseRotation;
        head.add(noseframe);
    }

    function createEar (params) {
        // creates and returns a mesh for an ear
        var sd = params.sphereDetail;
        var radius = params.earRadius;
        var earGeometry = new THREE.SphereGeometry(radius, sd, sd);
        var earMesh = new THREE.Mesh(earGeometry, params.bodyMaterial);
        // flatten the sphere to make it look more like a flat disk
        earMesh.scale.z = params.earScale;
        return earMesh;
    }

    function addEar (head, params, side) {
        /* adds an ear to the head on the right (side=1) or left (side=-1). 
           The center of the ear is flush with the surface of the head by 
           moving it out by the radius, and rotating it around the z axis 
           to get it to the desired height. */
        var earframe = new THREE.Object3D();
        var ear = createEar(params);
        ear.position.x = side * params.headRadius;   // within the earframe
        earframe.rotation.z = side * params.earAngle;
        earframe.add(ear);
        head.add(earframe);
    }

    function createEye (params) {
        // creates and returns a mesh for an eye
        var sd = params.sphereDetail;
        var radius = params.eyeRadius;
        var eyeGeometry = new THREE.SphereGeometry(radius, sd, sd);
        var eyeMesh = new THREE.Mesh(eyeGeometry, params.blackMaterial);
        return eyeMesh;
    }

    function addEye (head, params, side) {
        /* adds an eye to the head on the right (side=1) or left (side=-1). 
           The center of the eye is flush with the surface of the head by 
           moving it out along the z axis by the radius, and rotating it 
           around the x and then y axes to get it to the desired height. */
        var eyeframe = new THREE.Object3D();
        var eye = createEye(params);
        eye.position.z = params.headRadius;   // within the eyeframe
        eyeframe.rotation.x = params.eyeAngleX;
        eyeframe.rotation.y = side * params.eyeAngleY;
        eyeframe.add(eye);
        head.add(eyeframe);
    }

    function createHead (params) {
        /* returns a teddy bear head object, with origin at the center, and
           eyes on the +Z side of the head, and ears on the left (-X) and
           right (+X) sides. */
        var head = new THREE.Object3D();
        var sd = params.sphereDetail;
        var radius = params.headRadius;
        var headGeometry = new THREE.SphereGeometry(radius, sd, sd);
        var headMesh = new THREE.Mesh(headGeometry, params.headMaterial);
        head.add(headMesh);
        addNose(head, params);
        addEar(head, params, 1);
        addEar(head, params, -1);
        addEye(head, params, 1);
        addEye(head, params, -1);
        return head;
    }
};

var bearHead = createTeddyBearHead(params);

scene.add(bearHead);

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: -3, maxx: 3,
                miny: -3, maxy: 3,
                minz: -3, maxz: 3});
TW.toggleAxes("show");
TW.viewFromAboveFrontSide();

// ================================================================

function rebuild() {
    scene.remove(bearHead);
    bearHead = createTeddyBearHead(params);
    scene.add(bearHead);
    TW.render();
}

var gui = new dat.GUI();

gui.add(params, 'sphereDetail',2,30).step(1).onChange(rebuild);
gui.add(params, 'headRadius',1,3).onChange(rebuild);
gui.add(params, 'noseRadius',0.1,0.9).onChange(rebuild);
gui.add(params, 'noseRotation',0.1,Math.PI/2).onChange(rebuild);
gui.add(params, 'earRadius',0.1,0.9).onChange(rebuild);
gui.add(params, 'earScale',0.1,0.9).onChange(rebuild);
gui.add(params, 'earAngle',0.1,Math.PI/2).onChange(rebuild);
gui.add(params, 'eyeAngleX',-Math.PI/2,0).onChange(rebuild);
gui.add(params, 'eyeAngleY',0,Math.PI/2).onChange(rebuild);