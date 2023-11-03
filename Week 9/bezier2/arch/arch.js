var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({antialias: true});
TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: -40, maxx: 40,
                miny: -10, maxy: 10,
                minz: -10, maxz: 10});

// make a Bezier curve with a desired shape 
var bezierCurve = new THREE.CubicBezierCurve3(
   new THREE.Vector3(-30,0,0), 
   new THREE.Vector3(-10,0,0),
   new THREE.Vector3(10,0,0),
   new THREE.Vector3(30,0,0)
);

// create a pattern of radii that vary along the spine
var radii = [5,5,5,5,5,5,5];

// create the tube geometry using the Bezier curve and radii
var geom = new THREE.TubeRadialGeometry(bezierCurve, 32, radii, 16, false);
var mat = new THREE.MeshNormalMaterial();
mat.side = THREE.DoubleSide;
var tube = new THREE.Mesh(geom, mat);
scene.add(tube);

TW.render();