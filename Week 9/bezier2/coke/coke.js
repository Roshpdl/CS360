var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
TW.mainInit(renderer,scene);

// upper curve, from diameter 0.75" at height 5" to diameter 1.5" at height 2.5"
var upper_cp = [ [0.5/2, 5.0],
                 [0.5/2, 4.0],
                 [1.5/2, 3.0],
                 [1.5/2, 2.5] ];

// middle curve, from upper bulge [above] to dent with diameter 1.25" at height 1.25"
middle_cp = [ [1.5/2,  2.5],
              [1.5/2,  2.0],
              [1.25/2, 1.75],
              [1.25/2, 1.25] ];
                          
// lower curve, from dent to base, with a radius the same as the bulge
lower_cp = [ [1.25/2, 1.25],
             [1.25/2, 0.75],
             [1.5/2,  0.50],
             [1.5/2,  0.0] ];

var cokePts = Array.prototype.concat(upper_cp, middle_cp, lower_cp);

// returns an array of Vector3 objects made from the input 2D points
function makePoints (pts) {
   var points = [];
   for(var i = 0; i < pts.length; i++) {
       points.push(new THREE.Vector3(pts[i][0], pts[i][1], 0));
   }
   return points;
}

var cokePoints = makePoints(cokePts);

// create a spline curve to use for the lathe geometry
var splineObj;

function makeSplineObj (points) {
   var mat = new THREE.MeshBasicMaterial( {color: 0xff0000} );
   var curve1 = new THREE.CubicBezierCurve3(points[0],points[1],points[2],points[3]);
   var curve2 = new THREE.CubicBezierCurve3(points[4],points[5],points[6],points[7]);
   var curve3 = new THREE.CubicBezierCurve3(points[8],points[9],points[10],points[11]);
   var geom = new THREE.Geometry();
   geom.vertices = Array.prototype.concat( curve1.getPoints(10),
                                           curve2.getPoints(10),
                                           curve3.getPoints(10) );
   splineObj = new THREE.Line( geom, new THREE.LineBasicMaterial( { linewidth: 3, color: 0x0000ff }) );
   // draw blue spline curve to the side of the bottle
   splineObj.translateX(0.1);
   scene.add(splineObj);
}

makeSplineObj(cokePoints);

// create a lathe geometry using the spline curve
var latheObj;

function makeLatheObj() {
   var geom = new THREE.LatheGeometry(splineObj.geometry.vertices);
   var mat1 = new THREE.MeshBasicMaterial( {color: 0xff0000, 
                                            wireframe: true});
   latheObj = new THREE.Mesh(geom, mat1);
   scene.add(latheObj);
}

makeLatheObj();

// helper function to visualize the points used for the spline curve
function addAllCP (pts) {
   var sph;
   for (var i = 0; i < pts.length; i++) {
      sph = new THREE.Mesh(new THREE.SphereGeometry(0.05),
                           new THREE.MeshNormalMaterial());
      sph.position.copy(pts[i]);
      scene.add(sph);
   }
}

addAllCP(cokePoints);

var cameraFOVY = 75;
TW.cameraSetup(renderer, scene,
               {minx: -1, maxx: 1,
                miny: 0, maxy: 5,
                minz: -1, maxz: 1},
               cameraFOVY);

TW.render();