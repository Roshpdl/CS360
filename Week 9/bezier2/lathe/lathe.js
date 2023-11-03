var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
TW.mainInit(renderer,scene);

// sample points used to create the curve for a lathe geometry
var example = [ [6, 0],
                [5, 2],
                [3, 4],
                [1, 6],
                [0, 8] ];

// returns an array of Vector3 objects made from the input 2D points
function makePoints (pts) {
   var points = [];
   for(var i = 0; i < pts.length; i++) {
       points.push(new THREE.Vector3(pts[i][0], pts[i][1], 0));
   }
   return points;
}

var points = makePoints(example);

// create a spline curve to use for the lathe geometry
var splineObj;

function makeSplineObj (points) {
   var curve = new THREE.CatmullRomCurve3(points);
   var geom = new THREE.Geometry();
   geom.vertices = curve.getPoints(5);
   splineObj = new THREE.Line( geom, new THREE.LineBasicMaterial( { linewidth: 3, color: 0x00ff00 }) );
   scene.add(splineObj);
}

makeSplineObj(points);

// create a lathe geometry using the spline curve
var latheObj;

function makeLatheObj() {
   var geom = new THREE.LatheGeometry(splineObj.geometry.vertices);
   var mat1 = new THREE.MeshNormalMaterial( {side: THREE.DoubleSide,                                
                                             wireframe: false});
   latheObj = new THREE.Mesh(geom, mat1);
   scene.add(latheObj);
}

makeLatheObj();

// helper function to visualize the points used for the spline curve
function addAllCP (pts) {
   var sph;
   for (var i = 0; i < pts.length; i++) {
      sph = new THREE.Mesh(new THREE.SphereGeometry(0.4),
                           new THREE.MeshBasicMaterial({color:0x00FF00}));
      sph.position.copy(pts[i]);
      scene.add(sph);
   }
}

addAllCP(points);

var cameraFOVY = 75;
TW.cameraSetup(renderer, scene,
               {minx: -6, maxx: 6,
                miny: 0, maxy: 6,
                minz: -6, maxz: 6},
               cameraFOVY);

TW.render();