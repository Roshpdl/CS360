var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene(); 
TW.mainInit(renderer,scene);
TW.cameraSetup(renderer,scene, {minx:-1,maxx:8,miny:0,maxy:3,minz:0,maxz:0});
        
var controlPoints = [ [ [0,0,0],  [2,-1,0], [4,-1,0], [6, 0, 0] ],
                      [ [-1,1,0], [2,1,1],  [4,1,1],  [7, 1, 0] ],
                      [ [-1,2,0], [2,2,1],  [4,2,1],  [7, 2, 0] ],
                      [ [0,3,0],  [2,4,1],  [4,4,1],  [6, 3, 0] ] ];

var topToBottom = [
    [ [0,3,0],  [2,4,1],  [4,4,1],  [6, 3, 0] ],
    [ [-1,2,0], [2,2,1],  [4,2,1],  [7, 2, 0] ],
    [ [-1,1,0], [2,1,1],  [4,1,1],  [7, 1, 0] ],
    [ [0,0,0],  [2,-1,0], [4,-1,0], [6, 0, 0] ],
];

var surfGeom = new THREE.BezierSurfaceGeometry( topToBottom.reverse(), 10, 10 );

// note that the controlPoints can be used directly: 
// var surfGeom = new THREE.BezierSurfaceGeometry(controlPoints, 10, 10 );

// var surfMat  = new THREE.MeshBasicMaterial( { color: THREE.ColorKeywords.blue,
//                                               wireframe: true,
//                                               linewidth: 2 } );

var surfMat = new THREE.MeshNormalMaterial();
var surf = new THREE.Mesh( surfGeom, surfMat );
scene.add(surf);

function showCP(cpList) {
    for( var j=0; j < cpList.length; j++ ) {
        var subList = cpList[j];                      
        for( var i=0; i < subList.length; i++ ) {
            scene.add(TW.createPoint(subList[i]));
        }
    }
};

showCP(controlPoints);          // optional, for debugging.
TW.viewFromFront();  