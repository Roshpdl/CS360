var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene(); 
TW.mainInit(renderer,scene);
TW.cameraSetup(renderer,scene, {minx:0,maxx:1,miny:0,maxy:1,minz:0,maxz:1});
        
var controlPoints = [ [0,0,1],
                      [1,0,1],
                      [1,0,0],
                      [1,1,0] ];
var curveGeom = TW.createBezierCurve(controlPoints,20);
var curve = new THREE.Line( curveGeom,
                            new THREE.LineBasicMaterial( { color: THREE.ColorKeywords.blue, linewidth: 3 } ));
scene.add(curve);

var cp_shown = false;
var cpObj;

function showCP(cpList) {
    cpObj = new THREE.Object3D();
    for( var i=0; i < cpList.length; i++ ) {
        cpObj.add(TW.createPoint(cpList[i]));
    }
};
showCP(controlPoints);
                      
function toggleControlPoints() {
    cp_shown = !cp_shown;
    if( cp_shown ) {
        scene.add(cpObj);
    } else {
        scene.remove(cpObj);
    }                      
    TW.render();                     
}                      

TW.setKeyboardCallback("c",toggleControlPoints,"toggle control points")

showCP(controlPoints);          // optional, for debugging.
TW.viewFromFront();        