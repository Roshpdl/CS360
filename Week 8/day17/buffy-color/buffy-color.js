var guiParams = {
    color: 0x6fca74,
    last: null
};

var buffy;

function makeBuffyPlane() {
    TW.loadTexture(
        'buffy.gif',
        function (texture) {
            var planeGeom = new THREE.PlaneGeometry( 4, 4);
            var buffyMat = new THREE.MeshBasicMaterial(
                {color: guiParams.color,
                 map: texture});
            scene.remove(buffy);
            buffy = new THREE.Mesh( planeGeom, buffyMat );
            scene.add(buffy);
            TW.render();
        });
}

// We always need a scene.
var scene = new THREE.Scene();

makeBuffyPlane();

// ================================================================
// 
var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

var state = TW.cameraSetup(renderer,
                           scene,
                           {minx: -2, maxx: 2,
                            miny: -2, maxy: 2,
                            minz: 0, maxz: 1});

var gui = new dat.GUI();
gui.addColor(guiParams, "color").onChange(function () {
    document.getElementById("color").style.backgroundColor = "#"+guiParams.color.toString(16);
    makeBuffyPlane();
    TW.render();
});