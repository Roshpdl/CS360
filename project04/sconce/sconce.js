// We always need a scene.
var scene = new THREE.Scene();

// ====================================================================

/* Next, we create objects in our scene. Here, just a box and barn. The
center of the box is the origin, so, for example, the x coordinates go
from -2 to +2. Delete these and put your code here.  */

var box = TW.createMesh( new THREE.BoxGeometry(4,6,8) );
scene.add(box);

var barn = TW.createMesh( TW.createBarn(10,12,20) );
scene.add(barn);

// ================================================================
// 
// We always need a renderer

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

/* We always need a camera; here we'll use a default orbiting camera.  The
third argument are the ranges for the coordinates, to help with setting up
the placement of the camera. They need not be perfectly accurate, but if
they are way off, your camera might not see anything, and you'll get a
blank canvas. */

TW.cameraSetup(renderer,
               scene,
               {minx: -2, maxx: 10,
                miny: -3, maxy: 17,
                minz: -20, maxz: 4});