var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer, scene, 
               {minx: -5, maxx: 5,
                miny: -5, maxy: 5,
                minz: -1, maxz: 1});

// green square rotates around the z axis at a rate of one frame 
// (30 degrees) per second (real time), for 10 frames
var square;
var nframes = 0;

function drawSquare () {
     console.log(new Date());          // note the changing seconds
     if (square != null) {
         scene.remove(square);
     }
     square = new THREE.Mesh(new THREE.PlaneGeometry(10,10),
                             new THREE.MeshBasicMaterial({color: 0x009900}) );
     square.rotation.z = nframes*(Math.PI/6);
     scene.add(square);
     nframes += 1;
     if (nframes > 10) {
         clearInterval(clock);        // stop the timer started with setInterval()
         console.log("stopped");
     } else {
         TW.render();
     }
}

var clock = setInterval(drawSquare, 1000);
