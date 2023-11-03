//the scene
var scene = new THREE.Scene();

//GUI parameters: control points and radii
var params = {
  'ctrlPt0 x': 0,
  'ctrlPt0 y': 0,
  'ctrlPt0 z': 0,
  'ctrlPt1 x': 25,
  'ctrlPt1 y': 25,
  'ctrlPt1 z': 10,
  'ctrlPt2 x': 75,
  'ctrlPt2 y': -40,
  'ctrlPt2 z': -5,
  'ctrlPt3 x': 100,
  'ctrlPt3 y': 0,
  'ctrlPt3 z': 0,
  radius0: 0,
  radius1: 10,
  radius2: 20,
  radius3: 30
};

function createTube () {
  var bezierCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(params['ctrlPt0 x'], params['ctrlPt0 y'], params['ctrlPt0 z']), 
    new THREE.Vector3(params['ctrlPt1 x'], params['ctrlPt1 y'], params['ctrlPt1 z']),
    new THREE.Vector3(params['ctrlPt2 x'], params['ctrlPt2 y'], params['ctrlPt2 z']),
    new THREE.Vector3(params['ctrlPt3 x'], params['ctrlPt3 y'], params['ctrlPt3 z'])
  );

  var radii = [params.radius0, params.radius1, params.radius2, params.radius3];

  var geom = new THREE.TubeRadialGeometry(bezierCurve, 32, radii, 16, false);
  var mat = new THREE.MeshNormalMaterial();
  mat.side = THREE.DoubleSide;
  var tube = new THREE.Mesh(geom, mat);

  return tube;
}

//redrawScene()
//redraws the scene by removing, recreating, and readding the tube
//to reflect the changed GUI parameters
function redrawScene () {
  scene.remove(tube);
  tube = createTube();
  tube.position.set(-50, 0, 0);
  scene.add(tube);
  TW.render();
}

//create a tube and add it to the scene
var tube = createTube();
tube.position.set(-50, 0, 0);
scene.add(tube);

//create the renderer
var renderer = new THREE.WebGLRenderer();
TW.mainInit(renderer,scene);

//set up the camera
TW.cameraSetup(renderer,
               scene,
               {minx: -100, maxx: 100,
                miny: -100, maxy: 100,
                minz: -50, maxz: 50});
TW.viewFromFront();

//******GUI******//
var gui = new dat.GUI();
var ctrlFolder = gui.addFolder('Control Points');
var ctrl0Folder = ctrlFolder.addFolder('Control Point 0');
ctrl0Folder.add(params, 'ctrlPt0 x', -100, 100).onChange(redrawScene);
ctrl0Folder.add(params, 'ctrlPt0 y' , -100, 100).onChange(redrawScene);
ctrl0Folder.add(params, 'ctrlPt0 z', -50, 50).onChange(redrawScene);
var ctrl1Folder = ctrlFolder.addFolder('Control Point 1');
ctrl1Folder.add(params, 'ctrlPt1 x', -100, 100).onChange(redrawScene);
ctrl1Folder.add(params, 'ctrlPt1 y' , -100, 100).onChange(redrawScene);
ctrl1Folder.add(params, 'ctrlPt1 z', -50, 50).onChange(redrawScene);
var ctrl2Folder = ctrlFolder.addFolder('Control Point 2');
ctrl2Folder.add(params, 'ctrlPt2 x', -100, 100).onChange(redrawScene);
ctrl2Folder.add(params, 'ctrlPt2 y' , -100, 100).onChange(redrawScene);
ctrl2Folder.add(params, 'ctrlPt2 z', -50, 50).onChange(redrawScene);
var ctrl3Folder = ctrlFolder.addFolder('Control Point 3');
ctrl3Folder.add(params, 'ctrlPt3 x', -100, 100).onChange(redrawScene);
ctrl3Folder.add(params, 'ctrlPt3 y' , -100, 100).onChange(redrawScene);
ctrl3Folder.add(params, 'ctrlPt3 z', -50, 50).onChange(redrawScene);
var radiusFolder = gui.addFolder('Radii');
radiusFolder.add(params, 'radius0', 0, 50).onChange(redrawScene);
radiusFolder.add(params, 'radius1', 0, 50).onChange(redrawScene);
radiusFolder.add(params, 'radius2', 0, 50).onChange(redrawScene);
radiusFolder.add(params, 'radius3', 0, 50).onChange(redrawScene);