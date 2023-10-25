var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene(); 
TW.mainInit(renderer,scene);
TW.cameraSetup(renderer,scene, {minx:-2,maxx:2,miny:0,maxy:3,minz:0,maxz:0});
        
var controlPoints = [ [0,0,0],
                      [-1.5,0.7,0],
                      [-3.2,4,0],
                      [0,2.5,0] ];
var curveGeom = TW.createBezierCurve(controlPoints,20);
var curveMat = new THREE.LineBasicMaterial( { color: THREE.ColorKeywords.red,
                                              linewidth: 3 } );
var curve1 = new THREE.Line( curveGeom, curveMat );
var curve2 = curve1.clone();
curve2.rotation.y = Math.PI;

scene.add(curve1);
scene.add(curve2);

function showCP(cpList) {
    for( var i=0; i < cpList.length; i++ ) {
        scene.add(TW.createPoint(cpList[i]));
    }
};

// showCP(controlPoints);          // optional, for debugging.
TW.viewFromFront();  