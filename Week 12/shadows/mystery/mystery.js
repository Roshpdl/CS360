var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;


TW.mainInit(renderer,scene);

var pos = 25*Math.sqrt(2);    // used for positioning the planes

TW.cameraSetup(renderer, scene,
               {minx: -2*pos, maxx: 2*pos,
                miny: 0, maxy: 100,
                minz: 0, maxz: 100});

// create background planes
var plane1 = new THREE.Mesh(new THREE.PlaneGeometry(100,100),
                            new THREE.MeshPhongMaterial({color: 0xff8888}));
plane1.rotation.y = -Math.PI/4;
plane1.position.set(pos,50,pos);
plane1.receiveShadow = true;
scene.add(plane1);

var plane2 = new THREE.Mesh(new THREE.PlaneGeometry(100,100),
                            new THREE.MeshPhongMaterial({color: 0x88ff88}));
plane2.rotation.y = Math.PI/4;
plane2.position.set(-pos,50,pos);
plane2.receiveShadow = true;
scene.add(plane2);

var plane3 = new THREE.Mesh(new THREE.PlaneGeometry(100,100),
                            new THREE.MeshPhongMaterial({color: 0x8888ff}));
plane3.rotation.x = -Math.PI/2;
plane3.rotation.z = Math.PI/4;
plane3.position.set(0,0,2*pos);
plane3.receiveShadow = true;
scene.add(plane3);

// add ambient light to the scene
var ambLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambLight);

// add a point light source
var light = new THREE.PointLight();
light.position.set(0,10,150);
light.castShadow = true;
scene.add(light);

// place a yellow sphere in the scene at the location of the pointlight
var lightPos = new THREE.Mesh(new THREE.SphereGeometry(1),
                              new THREE.MeshBasicMaterial({color: 0xffff00}));
lightPos.position.set(0, 10, 150);
scene.add(lightPos);


//object 1
var cylinderGeom = new THREE.CylinderGeometry(5, 5, 10, 32);
var cylinderMat = new THREE.MeshBasicMaterial({color: 0x000000,
                                                transparent: true,
                                                opacity:0});
var cylinder = new THREE.Mesh(cylinderGeom, cylinderMat);
cylinder.position.set(-15, 6, 100);
cylinder.castShadow = true;
scene.add(cylinder);

//object 2
var torusGeom = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
var torusMat = new THREE.MeshBasicMaterial( {color: 0x000000,
                                                transparent: true,
                                                opacity: 0 } ); 
var torus = new THREE.Mesh( torusGeom, torusMat );
torus.position.set(0, 17, 80);
torus.castShadow = true;
scene.add( torus );

//object 3
var towerGeom = TW.createBarn(10,50,10);
var towerMat  = new THREE.MeshBasicMaterial({color: 0x000000,
                                            transparent: true,
                                            opacity: 0 });
var tower = new THREE.Mesh(towerGeom, towerMat);
tower.castShadow = true;
tower.position.set(-40, 0, 80);
tower.rotation.y = -2/3 * Math.PI;
scene.add(tower);

//object 4
var coneGeom = new THREE.ConeGeometry( 10, 50, 32 ); 
var coneMat = new THREE.MeshBasicMaterial( {color: 0x000000,
                                                transparent: true,
                                                opacity: 0 } );
var cone = new THREE.Mesh(coneGeom, coneMat );
cone.castShadow = true;
cone.position.set(40, 25, 90);
scene.add( cone );

TW.render();
