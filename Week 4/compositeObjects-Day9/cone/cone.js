function makeConeScene(scene,parameters) {
    var rb = parameters.radiusBottom;
    var height = parameters.height;
    // using globals for these objects, to allow updates from GUI.
    inner = TW.createMesh(new THREE.ConeGeometry(rb, height));
    inner.name = "inner";
    inner.position.y = parameters.positionOffset;
    inner.rotation.z = parameters.innerRotation;

    outer = new THREE.Object3D();
    outer.name = "outer";
    outer.add(inner);
    outer.rotation.z = parameters.outerRotation;
    scene.add(outer);
}

var parameters = {
    radiusBottom: 3,
    height: 10,
    positionOffset: 0.0,
    innerRotation: 0.01,
    outerRotation: 0.01
};

var scene = new THREE.Scene();

makeConeScene(scene,parameters);

var renderer = new THREE.WebGLRenderer();

var width = parameters.radiusBottom;
var height = parameters.height;

TW.mainInit(renderer,scene);

var state = TW.cameraSetup(renderer,
               scene,
               {minx: -width, maxx: width,
                miny: -height, maxy: height,
                minz: -width, maxz: width});
TW.toggleAxes("show");

function redraw() {
    var outer = scene.getObjectByName("outer",false);
    var inner = scene.getObjectByName("inner",true);
    inner.position.y = parameters.positionOffset;
    inner.rotation.z = parameters.innerRotation;
    outer.rotation.z = parameters.outerRotation;
    TW.render();
}

var gui = new dat.GUI();
gui.add(parameters,'innerRotation',-Math.PI,Math.PI).step(0.01).onChange(redraw);
gui.add(parameters,'outerRotation',-Math.PI,Math.PI).step(0.01).onChange(redraw);
gui.add(parameters,'positionOffset',-height,0).step(1).onChange(redraw);