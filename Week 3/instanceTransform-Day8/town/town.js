// We always need a scene.
var scene = new THREE.Scene();

// ====================================================================
// GROUND

function planeGeom(width) {
    //generates a square plane with the given width
    var planeGeom = new THREE.Geometry();
    planeGeom.vertices = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(width, 0, 0),
        new THREE.Vector3(width, 0, width),
        new THREE.Vector3(0,0, width),
    ]
    planeGeom.faces = [
        new THREE.Face3(0, 3, 2),
        new THREE.Face3(0, 2, 1)
    ]
    return planeGeom;
}

var groundWidth = 120;
var groundGeom = planeGeom(groundWidth);
var groundMesh = new THREE.Mesh(groundGeom, new THREE.MeshBasicMaterial({color: 'white'}));
scene.add( groundMesh );

// ====================================================================
// BARNS

var barn1, barn2, barn3;
var barns = [];

barnDimensions = { barnWidth: 20,
                   barnHeight: 30,
                   barnDepth: 30 };

for (var i = 0; i < 3; i++) {
    barns.push(TW.createMesh(TW.createBarn( barnDimensions.barnWidth, barnDimensions.barnHeight, barnDimensions.barnDepth )));
}

barn1 = barns[0];
barn2 = barns[1];
barn3 = barns[2];

//barn1 position
barn1.position.set(50, 0, barnDimensions.barnDepth);

//barn2 position
barn2.rotation.y = -Math.PI/4;
barn2.position.set(100 - barnDimensions.barnDepth/2, 0, 50);

//barn3 position
barn3.rotation.y = -Math.PI/2;
barn3.position.set(0,0,50);

//adding barns to the scene
scene.add(barn1);
scene.add(barn2);
scene.add(barn3);

// ================================================================
// TREE

cylinderDim = { 
    radius: 5,
    height: 10,
};
var cylinderGeom = new THREE.CylinderGeometry(cylinderDim.radius, cylinderDim.radius, cylinderDim.height, 32); //radial segment = 32
var cylinderMesh = new THREE.Mesh(cylinderGeom, new THREE.MeshBasicMaterial({color: new THREE.Color("brown")}) );
cylinderMesh.position.set(90, cylinderDim.height/2, 100); //setting the position of the tree on the ground

coneDim = {
    radius: 12,
    height: 40,
};
var coneGeom = new THREE.ConeGeometry(coneDim.radius, coneDim.height, 32);
var coneMesh = new THREE.Mesh(coneGeom, new THREE.MeshBasicMaterial({color: new THREE.Color("lightgreen")}));
coneMesh.position.set(90, cylinderDim.height + coneDim.height/2, 100);

scene.add(cylinderMesh);
scene.add(coneMesh);


// RENDERER
var renderer = new THREE.WebGLRenderer({antialias: true});

TW.mainInit(renderer,scene);

var state = TW.cameraSetup(renderer,
                           scene,
                           {minx: -2, maxx: groundWidth + 2,
                            miny: -3, maxy: 60,
                            minz: -4, maxz: groundWidth + 2});