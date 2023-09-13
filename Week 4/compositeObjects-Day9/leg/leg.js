function makeLeg(scene,parameters) {
    /* Makes a leg going down from the origin, with joints rotating around
     * z, so we are seeing the leg from its right side, and the foot is
     * roughly parallel to the x axis. Meshes are shoe, calf, and
     * thigh. Composite objects are foot, lowerleg, and leg. Composite
     * objects have the relevant joints: ankle, knee and hip,
     * respectively, which the GUI lets you control. The naming isn't
     * perfect, but it was the best I could think of. */

    foot = new THREE.Object3D();
    foot.name = "foot";
    var shoe = TW.createMesh(new THREE.CylinderGeometry(2, 1, parameters.footLength));
    foot.add(shoe);

    lowerleg = new THREE.Object3D();
    lowerleg.name = "lowerleg";
    var calf = TW.createMesh(new THREE.CylinderGeometry(3, 2, parameters.calfLength));
    lowerleg.add(calf);

    leg = new THREE.Object3D();
    leg.name = "leg";
    var thigh = TW.createMesh(new THREE.CylinderGeometry(5, 4, parameters.thighLength));
    leg.add(thigh);

    scene.add(foot); 
    scene.add(lowerleg); 
    scene.add(leg); 
}

var scene = new THREE.Scene();

var parameters = {
    ankleRotation: TW.degrees2radians(-10),
    kneeRotation: TW.degrees2radians(-30),
    hipRotation: TW.degrees2radians(45),
    footLength: 10,
    calfLength: 20,
    thighLength: 25
};

makeLeg(scene,parameters);

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: 0, maxx: 5,
                maxy: 0, miny: -(parameters.thighLength+parameters.calfLength),
                minz: -3, maxz: 3});
TW.toggleAxes("show");

function redraw() {
    // this variant of re-draw just adjusts the current geometry instead
    // of discarding it and creating a new one
    var foot = scene.getObjectByName("foot",true);
    var lowerleg = scene.getObjectByName("lowerleg",true);
    var leg = scene.getObjectByName("leg",true);
    foot.rotation.z = parameters.ankleRotation;
    lowerleg.rotation.z = parameters.kneeRotation;
    leg.rotation.z = parameters.hipRotation;
    TW.render();
}

var gui = new dat.GUI();
gui.add(parameters,'ankleRotation',-Math.PI/3,Math.PI/3).step(0.001).onChange(redraw);
gui.add(parameters,'kneeRotation', -2*Math.PI/3, 0.1).step(0.001).onChange(redraw);
gui.add(parameters,'hipRotation', -Math.PI/6,Math.PI).step(0.001).onChange(redraw);