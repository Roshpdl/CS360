var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene(); 
TW.mainInit(renderer,scene);
TW.cameraSetup(renderer,scene, {minx:-2,maxx:2,miny:0,maxy:3,minz:0,maxz:0});
        
var controlPoints = [ [-0.5,0,0],
                      [2,2,0],
                      [-2,2,0],
                      [0.5,0,0] ];
var curveGeom = TW.createBezierCurve(controlPoints,20);
var curveMat = new THREE.LineBasicMaterial( { color: THREE.ColorKeywords.blue,
                                              linewidth: 3 } );

var ribbonLeft = new THREE.Line( curveGeom, curveMat );
var ribbonRight = ribbonLeft.clone();

ribbonLeft.position.x = -2;
ribbonRight.position.x = 2;
scene.add(ribbonLeft);
scene.add(ribbonRight);

var controlPointsConnectingCurve = [ [-1.5,0,0],
                                    [-0.5,-0.75,0],
                                    [0.5,-0.75,0],
                                    [1.5,0,0] ];

var connectingCurveGeom = TW.createBezierCurve(controlPointsConnectingCurve,20);
var connectingCurveMat = new THREE.LineBasicMaterial( { color: THREE.ColorKeywords.black,
                                              linewidth: 3 } );
var connectingCurve = new THREE.Line( connectingCurveGeom, connectingCurveMat );
scene.add(connectingCurve);

function showCP(cpList) {
    for( var i=0; i < cpList.length; i++ ) {
        scene.add(TW.createPoint(cpList[i]));
    }
};

// showCP(controlPointsConnectingCurve);          // optional, for debugging.
TW.viewFromFront();  