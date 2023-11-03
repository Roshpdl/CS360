var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

// setup camera for the scene, looking down the -Z axis
var camera = new THREE.PerspectiveCamera(90, 800/500, 1, 100);
camera.position.set(0,0,50);
camera.up.set(0,1,0);
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera);

// add initial dot at the center of the scene
var dot = new THREE.Mesh(new THREE.SphereGeometry(2),
                         new THREE.MeshNormalMaterial());
scene.add(dot);

// add black wireframe box to mark center of scene
var box = new THREE.Mesh(new THREE.BoxGeometry(4,4,4),
                         new THREE.MeshBasicMaterial( {color: 0x000000, 
                                                       wireframe: true} ));
scene.add(box);

renderer.render(scene, camera);

// add event listener for mouse click
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);

// global variable assigned to canvas element
var c1 = renderer.domElement;

var isDragging = false;

// when user clicks the mouse, a new dot appears around the location of the dot
function onMouseDown(event) {
   if (event.target == c1) {
      isDragging = true;
      // use canvas offset to determine mouse coordinates in canvas coordinate frame
      var rect = event.target.getBoundingClientRect();
      var canvasX = event.clientX - rect.left;
      var canvasY = event.clientY - rect.top;
   } 
   else {
      return;
   }
}

function onMouseMove(event) {
   if (isDragging) {
      // use canvas offset to determine mouse coordinates in canvas coordinate frame
      var rect = event.target.getBoundingClientRect();
      var canvasX = event.clientX - rect.left;
      var canvasY = event.clientY - rect.top;
      // get mouse coordinates in the range from -1 to +1 (canvas is 800 x 500 pixels)
      var mx = (canvasX / 800) * 2 - 1;
      var my = -(canvasY / 500) * 2 + 1;
      dot = new THREE.Mesh(new THREE.SphereGeometry(2),
                           new THREE.MeshNormalMaterial());
      // new x,y coordinates are proportional to mx,my (scale factors here were
      // determined by trial-and-error)
      dot.position.set(75*mx, 50*my, 0);
      scene.add(dot);
      renderer.render(scene, camera);
   }
}

function onMouseUp(event) {
   isDragging = false;
}