var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
TW.mainInit(renderer,scene);

// add two directional light sources
var light1 = new THREE.DirectionalLight(0xffffff, 2);
light1.position.set(1,1,1);
scene.add(light1);

var light2 = new THREE.DirectionalLight(0xffffff);
light2.position.set(-1,-1,-1);
scene.add(light2);

// create box geometry to use for all the blocks
var geometry = new THREE.BoxGeometry(200,200,200);

// add 200 blocks to the scene at random positions and with random size and color
for (var i = 0; i < 200; i++) {
   var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: Math.random()*0xffffff}));
   object.position.set(800*Math.random()-400, 800*Math.random()-400, 800*Math.random()-400);
   object.rotation.set(2*Math.PI*Math.random(), 2*Math.PI*Math.random(), 2*Math.PI*Math.random());
   object.scale.set(0.5*Math.random()+0.1, 0.5*Math.random()+0.1, 0.5*Math.random()+0.1);
   scene.add(object);
}

// setup camera for the scene, looking down the -Z axis
var camera = new THREE.PerspectiveCamera(70, 1, 1, 1000);
camera.position.set(0,0,1000);
camera.up.set(0,1,0);
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera);

// add event listener to handle mouse clicks
document.addEventListener('click', onClick, false);

// raycasting is used to determine which objects in the 3D space map to the mouse click location
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// global variable assigned to canvas element
var c1 = renderer.domElement;

// pressing the shift key while clicking the mouse causes a block in the vicinity to be
// removed from the scene
function onClick(event) {
   if (!event.shiftKey) return;      // need to press the shift key with mouse click
   if (event.target == c1) {
      // use canvas offset to determine mouse coordinates in canvas coordinate frame
      var rect = event.target.getBoundingClientRect();
      var canvasx = event.clientX - rect.left;
      var canvasy = event.clientY - rect.top;
   }
   else {
      return;
   }
   // get mouse coordinates in the range from -1 to +1 (canvas is 600 x 600 pixels)
   mouse.x = (canvasx / 600) * 2 - 1;
   mouse.y = -(canvasy / 600) * 2 + 1;
   // setup raycaster using mouse position and camera
   raycaster.setFromCamera(mouse, camera);
   // get array of objects projecting to this mouse position
   var intersects = raycaster.intersectObjects(scene.children, true);
   // remove first object in the array, which is closest in depth to the camera
   if (intersects.length > 0) {
      scene.remove(intersects[0].object);
      renderer.render(scene, camera);
   }
}

renderer.render(scene, camera);