var scene = new THREE.Scene();

// position of sun adjusted with GUI
var params = { xsun: 5,
               ysun: 10,
               zsun: -2 }

// enable use of a shadow map by the renderer
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer, scene,
               {minx: -10, maxx: 10,
                miny: 0, maxy: 6,
                minz: -10, maxz: 10});

// used for tree trunk and sign
var brownMat = new THREE.MeshBasicMaterial({color: THREE.ColorKeywords.brown});

// createTree() creates and returns a THREE.Object3D that is an instance of a tree, 
// with its origin at the center of the base of the trunk, and adds it to the scene
// individual cone and trunk meshes can cast shadows
function createTree (trunkRadius, trunkHeight, coneRadius, coneHeight) {
    var tree = new THREE.Object3D();
    var cone = new THREE.Mesh(new THREE.ConeGeometry(coneRadius,coneHeight),
                              new THREE.MeshBasicMaterial({color: THREE.ColorKeywords.darkgreen}));
    cone.position.y = coneHeight/2+trunkHeight;
    cone.castShadow = true;
    tree.add(cone);
    var trunk = new THREE.Mesh(new THREE.CylinderGeometry(trunkRadius,trunkRadius,trunkHeight),
                               brownMat); 
    trunk.position.y = trunkHeight/2;
    trunk.castShadow = true;
    tree.add(trunk);
    return tree;
}

// createSnowperson() creates and returns a THREE.Object3D that is an instance of a snowperson, 
// with its origin at the center of its base, and adds it to the scene
// individual snowball meshes can cast shadows
function createSnowperson (radiusBot) {
   var snowPerson = new THREE.Object3D();
   var radiusMid = 0.8*radiusBot;
   var radiusTop = 0.6*radiusMid;
   var snow = new THREE.MeshBasicMaterial({color: 0xeeeeee});
   var snowBot = new THREE.Mesh(new THREE.SphereGeometry(radiusBot), snow);
   var snowMid = new THREE.Mesh(new THREE.SphereGeometry(radiusMid), snow);
   var snowTop = new THREE.Mesh(new THREE.SphereGeometry(radiusTop), snow);
   snowBot.position.y = radiusBot;
   snowMid.position.y = 2*radiusBot + radiusMid;
   snowTop.position.y = 2*radiusBot + 2*radiusMid + radiusTop;
   snowBot.castShadow = true;
   snowMid.castShadow = true;
   snowTop.castShadow = true;
   snowPerson.add(snowBot);
   snowPerson.add(snowMid);
   snowPerson.add(snowTop);
   return snowPerson;
}

// add three houses (solid color barns) to the scene that can cast a shadow
var house1 = TW.createBarnSolidColor(2,3,3,0xff0000);
house1.position.set(-7,0,4);
house1.castShadow = true;
scene.add(house1);

var house2 = TW.createBarnSolidColor(2,3,3,0x00ff00);
house2.position.set(-1,0,-4);
house2.castShadow = true;
scene.add(house2);

var house3 = TW.createBarnSolidColor(2,3,3,0x0000ff);
house3.position.set(5,0,3);
house3.castShadow = true;
scene.add(house3);

// add three trees to the scene
var tree1 = createTree(0.1,0.5,1,4);
tree1.position.set(-5,0,-3);
scene.add(tree1);

var tree2 = createTree(0.15,0.8,1.5,5);
tree2.position.set(6,0,-2);
scene.add(tree2);

var tree3 = createTree(0.2,1,1,4);
tree3.position.set(2,0,5);
scene.add(tree3);

// add three snowpeople to the scene
var snow1 = createSnowperson(0.6);
snow1.position.set(4,0,3);
scene.add(snow1);

var snow2 = createSnowperson(0.5);
snow2.position.set(0.5,0,3);
scene.add(snow2);

var snow3 = createSnowperson(0.4);
snow3.position.set(-5,0,6);
scene.add(snow3);

// add a brown sign to the scene that can cast a shadow
var sign = new THREE.Mesh(new THREE.BoxGeometry(4,1,1), brownMat);
sign.position.set(-2,2,0);
sign.castShadow = true;
scene.add(sign);
var signPost = new THREE.Mesh(new THREE.BoxGeometry(0.5,2,0.5), brownMat);
signPost.position.set(-2,1,0);
signPost.castShadow = true;
scene.add(signPost);

// add a flat ground with snow that can receive shadows
var circle = new THREE.Mesh(new THREE.CircleGeometry(10,32),
                            new THREE.MeshPhongMaterial({color: 0xffffff}));
circle.rotation.x = -Math.PI/2;
circle.receiveShadow = true;
scene.add(circle);

// add ambient light to the scene
var ambLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambLight);

// add a spotlight that can cast shadows
var light = new THREE.SpotLight();
light.position.set(5,10,-2);
light.castShadow = true;
scene.add(light);

// place a yellow sphere in the scene at the location of the spotlight
var lightPos = new THREE.Mesh(new THREE.SphereGeometry(1),
                              new THREE.MeshBasicMaterial({color: 0xffff00}));
lightPos.position.set(5,10,-2);
scene.add(lightPos);

function shiftSun () {
   scene.remove(light);
   scene.remove(lightPos);
   light = new THREE.SpotLight();
   light.position.set(params.xsun, params.ysun, params.zsun);
   light.castShadow = true;
   lightPos = new THREE.Mesh(new THREE.SphereGeometry(1),
                             new THREE.MeshBasicMaterial({color: 0xffff00}));
   lightPos.position.set(params.xsun, params.ysun, params.zsun);
   scene.add(light);
   scene.add(lightPos);
   TW.render();
}   

var gui = new dat.GUI();
gui.add(params, 'xsun', -10, 10).onChange(shiftSun);
gui.add(params, 'ysun', 0, 20).onChange(shiftSun);
gui.add(params, 'zsun', -10, 10).onChange(shiftSun);

TW.render();