var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

// setup camera for the scene, looking down the -Z axis
var camera = new THREE.PerspectiveCamera(90, 800/500, 1, 100);
camera.position.set(0,0,50);
camera.up.set(0,1,0);
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera);

// add initial eyes with eyeballs in the center
var eyeL = new THREE.Mesh(new THREE.CircleGeometry(10,30),
                          new THREE.MeshBasicMaterial({color: 0xffffff}));
eyeL.position.set(-12,0,0);
var eyeR = eyeL.clone();
eyeR.position.set(12,0,0);
var irisL = new THREE.Mesh(new THREE.CircleGeometry(5,30),
                           new THREE.MeshBasicMaterial({color: 0x000000}));
irisL.position.set(-12,0,0);
var irisR = irisL.clone();
irisR.position.set(12,0,0);
scene.add(eyeL);
scene.add(eyeR);
scene.add(irisL);
scene.add(irisR);

renderer.render(scene, camera);

// add event listeners for mousedown, mouseup, and mousemove
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('mousemove', onMouseMove);

// global variable assigned to canvas element
var c1 = renderer.domElement;

// global variable to store current up/down state of mouse
var isMouseDown = false;

function onMouseDown (event) {
    isMouseDown = true;
}

function onMouseUp (event) {
    isMouseDown = false;
}

// when user drags the mouse, the positions of the eyeballs follow the mouse
function onMouseMove (event) {
   if (isMouseDown) {
      if (event.target == c1) {
         // use canvas offset to determine mouse coordinates in canvas coordinate frame
         var rect = event.target.getBoundingClientRect();
         var canvasX = event.clientX - rect.left;
         var canvasY = event.clientY - rect.top;
      } 
      else {
         return;
      }
      // get mouse coordinates in the range from -1 to +1 (canvas is 800 x 500 pixels)
      var mx = (canvasX / 800) * 2 - 1;
      var my = -(canvasY / 500) * 2 + 1;
      // set position of the left and right iris
      scene.remove(irisL);
      scene.remove(irisR);
      irisL = new THREE.Mesh(new THREE.CircleGeometry(5,30),
                             new THREE.MeshBasicMaterial({color: 0x000000}));
      irisL.position.set(-12+5*mx,0,0);
      irisR = irisL.clone();
      irisR.position.set(12+5*mx,0,0);
      scene.add(irisL);
      scene.add(irisR);
      renderer.render(scene, camera);
   }
}