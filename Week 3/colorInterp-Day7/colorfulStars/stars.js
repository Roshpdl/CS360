// We always need a scene
var scene = new THREE.Scene();

// ====================================================================

// function to create a Geometry for a three-pointed star with four triangular faces
// size is the radius of the circle that circumscribes the star

var size = 50;

function starGeometry (size) {
  var starGeom = new THREE.Geometry();
  var angle;
  var lens = [size, size/4];
  for (var i = 0; i < 6; i++) {
     angle = i*(Math.PI/3);
     len = lens[i % 2];
     starGeom.vertices.push(new THREE.Vector3(len*Math.cos(angle), len*Math.sin(angle)));
  }
  starGeom.faces.push(new THREE.Face3(0,1,5));
  starGeom.faces.push(new THREE.Face3(1,2,3));
  starGeom.faces.push(new THREE.Face3(3,4,5));
  starGeom.faces.push(new THREE.Face3(1,3,5));
  return starGeom;
}

// ====================================================================

// vector of colors to use for the 6 vertices of the star geometry

var colors = [new THREE.Color("red"), new THREE.Color("orange"), new THREE.Color("yellow"), 
              new THREE.Color("green"), new THREE.Color("blue"), new THREE.Color("violet")];

// add code to create a star using color interpolation of the triangular faces
// and add it to the scene

// ================================================================

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: -size, maxx: size,
                miny: -size, maxy: size,
                minz: 5, maxz: 5});