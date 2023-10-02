var scene = new THREE.Scene(); 
var renderer = new THREE.WebGLRenderer();
TW.mainInit(renderer,scene);

var sceneParams = { ballColor : 0xFF8FC7,
                    ballSpecular: 0x444444,
                    ballShininess: 20,
                    spotlightX: 40,
                    spotlightY: 40,
                    spotlightZ: 0,
                    spotlightColor: 0xffffff,
                    spotlightExponentt: 100,
                    ambLightColor: 0x333333,
                    undefined: null
                  };
        
function removeByName(name) {
    var obj = scene.getObjectByName(name);
    if( obj ) scene.remove(obj);
}

function drawScene() {
    // delete old stuff; important when we adjust parameters
    removeByName("ball");
    removeByName("spot");
    removeByName("ambient");

    //create the ball
    var ballG = new THREE.SphereGeometry(10,30,30);
    var ballM = new THREE.MeshPhongMaterial({color: sceneParams.ballColor,
                                             specular: sceneParams.ballSpecular,
                                             shininess: sceneParams.ballShininess});
    var ball = new THREE.Mesh(ballG,ballM);
    ball.name = "ball";         // give it a name, so we can remove it next time.
    
    scene.add(ball);
    
    //create a spotlight
    var spotLight = new THREE.SpotLight( sceneParams.spotlightColor );
    spotLight.name = "spot";
    spotLight.position.set(sceneParams.spotlightX,sceneParams.spotlightY,sceneParams.spotlightZ); 
    
    scene.add(spotLight);
    
    var ambLight = new THREE.AmbientLight( sceneParams.ambLightColor); // soft white light 
    ambLight.name = "ambient";
    scene.add( ambLight );
    
    TW.render();
}
    
    
var gui = new dat.GUI();
gui.addColor(sceneParams,'ballColor').onChange(drawScene);
gui.addColor(sceneParams,'ballSpecular').onChange(drawScene);
gui.add(sceneParams,'ballShininess',0,100).onChange(drawScene);
gui.add(sceneParams,'spotlightX',-100,200).onChange(drawScene);
gui.add(sceneParams,'spotlightY',-100,200).onChange(drawScene);
gui.add(sceneParams,'spotlightZ',-100,200).onChange(drawScene);
gui.addColor(sceneParams,'spotlightColor').onChange(drawScene);
gui.addColor(sceneParams,'ambLightColor').onChange(drawScene);
        
var state = TW.cameraSetup(renderer,
                           scene,
                           {minx: -10, maxx: 10,
                            miny: -10, maxy: 10,
                            minz: -10, maxz: 10});

drawScene();