var barnValues = {
  barnX: 0,
  barnY: 0,
  barnZ: 0,
  barnRotationX: 0,
  barnRotationY: 0,
  barnRotationZ: 0,
  barnScaleX: 1,
  barnScaleY: 1,
  barnScaleZ: 1 };

  var scene = new THREE.Scene();

// ====================================================================

var barnWidth = 50;
var barnHeight = 30;
var barnDepth = 40;

var barn1geom = TW.createBarn( barnWidth, barnHeight, barnDepth );
var barn1mesh = TW.createMesh(barn1geom);

scene.add(barn1mesh);

// ================================================================
// 
// We always need a renderer

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);
TW.cameraSetup(renderer, scene, {minx: 0, maxx: barnWidth,
                                 miny: 0, maxy: barnHeight+0.5*barnWidth,
                                 minz: -barnDepth, maxz: 0});
TW.toggleAxes("show");

function updateGraphics() {
    // the position is an absolute thing
    barn1mesh.position.set( barnValues.barnX,
                            barnValues.barnY,
                            barnValues.barnZ );
    // the rotation is an absolute thing
    barn1mesh.rotation.set( 0.01745*barnValues.barnRotationX,
                            0.01745*barnValues.barnRotationY,
                            0.01745*barnValues.barnRotationZ,
                            'XYZ');
    // the scaling is an absolute thing
    barn1mesh.scale.set( barnValues.barnScaleX,
                         barnValues.barnScaleY,
                         barnValues.barnScaleZ);
}

function redraw() {
    updateGraphics();
    TW.render();
}

var gui = new dat.GUI();
gui.add(barnValues,'barnX',-100,100).onChange(redraw);
gui.add(barnValues,'barnY',-100,100).onChange(redraw);
gui.add(barnValues,'barnZ',-100,100).onChange(redraw);
gui.add(barnValues,'barnRotationX',-90,90).onChange(redraw);
gui.add(barnValues,'barnRotationY',-90,90).onChange(redraw);
gui.add(barnValues,'barnRotationZ',-90,90).onChange(redraw);
gui.add(barnValues,'barnScaleX',-2,2).onChange(redraw);
gui.add(barnValues,'barnScaleY',-2,2).onChange(redraw);
gui.add(barnValues,'barnScaleZ',-2,2).onChange(redraw);