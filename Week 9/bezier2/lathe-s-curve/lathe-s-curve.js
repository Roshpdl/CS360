var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene(); 
TW.mainInit(renderer,scene);
TW.cameraSetup(renderer,scene, {minx:-2,maxx:2,miny:0,maxy:3,minz:0,maxz:0});
        
var controlPoints = [ [0,0,0],
                      [2,2,0],
                      [-2,1,0],
                      [0,3,0] ];
var curveGeom = TW.createBezierCurve(controlPoints,20);
var curveMat = new THREE.LineBasicMaterial( { color: THREE.ColorKeywords.red,
                                              linewidth: 3 } );
var curve = new THREE.Line( curveGeom, curveMat );
scene.add(curve);

var geom = new THREE.LatheGeometry(curveGeom.vertices);
var mat = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
var latheObj = new THREE.Mesh(geom, mat);
scene.add(latheObj);

function showCP(cpList) {
    for( var i=0; i < cpList.length; i++ ) {
        scene.add(TW.createPoint(cpList[i]));
    }
};
        
// showCP(controlPoints);          // optional, for debugging.
TW.viewFromFront();        