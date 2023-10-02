var scene = new THREE.Scene(); 

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

// *** MODIFY VALUES FOR THE SceneParams HERE, AND REPLACE THE "0" INPUTS IN
// LATER CODE STATEMENTS TO REFER TO THE APPROPRIATE PARAMETERS ***

var sceneParams = { ballColor : 0xEF8FC7,
                    ballSpecular: 0x444444,
                    ballShininess: 20,
                    spotlightX: 40,
                    spotlightY: 40,
                    spotlightZ: 0,
                    spotlightColor: 0xffffff,
                    ambLightColor: 0x333333
                  };
        
//create the ball
var ballGeom = new THREE.SphereGeometry(10,30,30);
var ballMat = new THREE.MeshPhongMaterial( {color: sceneParams.ballColor,
                                            specular: sceneParams.ballSpecular,
                                            shininess: sceneParams.ballShininess} );
var ballMesh = new THREE.Mesh(ballGeom, ballMat);
scene.add(ballMesh);
    
//create a spotlight
var spotLight = new THREE.SpotLight( sceneParams.spotlightColor );
spotLight.position.set(sceneParams.spotlightX, sceneParams.spotlightY, sceneParams.spotlightZ); 
scene.add(spotLight);
    
var ambLight = new THREE.AmbientLight( sceneParams.ambLightColor  ); // soft white light 
scene.add(ambLight);
    
var state = TW.cameraSetup(renderer,
                           scene,
                           {minx: -10, maxx: 10,
                            miny: -10, maxy: 10,
                            minz: -10, maxz: 10});

TW.render();