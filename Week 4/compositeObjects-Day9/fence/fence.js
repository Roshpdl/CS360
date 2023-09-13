var scene = new THREE.Scene();

function makeFence(scene, numPickets) {
    /* Makes a fence, with the left end at the origin and proceeding down
    the x axis. The pickets are made from barn objects, scaled to be unit
    height (at the shoulder) and very thin. */

    var fence = new THREE.Object3D();

    var picket = TW.createBarnSolidColor(0.1, 1, 0.01, "brown");
    //var turn = (2*Math.PI) / numPickets;
    
    var i;
    for( i = 0; i < numPickets; ++i ) {
        picket = picket.clone();
        picket.translateX(0.11);   // this will *accumulate* the translations
        //picket.rotateY(turn);
        fence.add(picket);
    }
    scene.add(fence);
    return fence;
}
var fence = makeFence(scene,30);

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: 0, maxx: 3,
                miny: 0, maxy: 1, 
                minz: -1, maxz: 1});
TW.toggleAxes("show");