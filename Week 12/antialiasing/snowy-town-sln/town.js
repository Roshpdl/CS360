var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer, scene,
               {minx: -5, maxx: 5,
                miny: -5, maxy: 10,
                minz: -5, maxz: 5});

// used for tree trunk and sign
var brownMat = new THREE.MeshBasicMaterial({color: THREE.ColorKeywords.brown});

// createTree() creates and returns a THREE.Object3D that is an instance of a tree, 
// with its origin at the center of the base of the trunk, and adds it to the scene
function createTree (trunkRadius, trunkHeight, coneRadius, coneHeight) {
    var tree = new THREE.Object3D();
    var cone = new THREE.Mesh(new THREE.ConeGeometry(coneRadius,coneHeight),
                              new THREE.MeshBasicMaterial({color: THREE.ColorKeywords.darkgreen}));
    cone.position.y = coneHeight/2+trunkHeight;
    tree.add(cone);
    var trunk = new THREE.Mesh(new THREE.CylinderGeometry(trunkRadius,trunkRadius,trunkHeight),
                               brownMat); 
    trunk.position.y = trunkHeight/2;
    tree.add(trunk);
    return tree;
}

// createSnowperson() creates and returns a THREE.Object3D that is an instance of a snowperson, 
// with its origin at the center of its base, and adds it to the scene
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
   snowPerson.add(snowBot);
   snowPerson.add(snowMid);
   snowPerson.add(snowTop);
   return snowPerson;
}

// add three houses (solid color barns) to the scene
var house1 = TW.createBarnSolidColor(2,3,3,0xff0000);
house1.position.set(-7,0,4);
scene.add(house1);

var house2 = TW.createBarnSolidColor(2,3,3,0x00ff00);
house2.position.set(-1,0,-4);
scene.add(house2);

var house3 = TW.createBarnSolidColor(2,3,3,0x0000ff);
house3.position.set(5,0,3);
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

// add a brown sign to the scene
var sign = new THREE.Mesh(new THREE.BoxGeometry(4,1,1), brownMat);
sign.position.set(-2,2,0);
scene.add(sign);
var signPost = new THREE.Mesh(new THREE.BoxGeometry(0.5,2,0.5), brownMat);
signPost.position.set(-2,1,0);
scene.add(signPost);

// add a flat ground with snow
var circle = new THREE.Mesh(new THREE.CircleGeometry(8.7,32),
                            new THREE.MeshBasicMaterial({color: 0xffffff}));
circle.rotation.x = -Math.PI/2;
scene.add(circle);

var ambLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambLight);

// add snow to the town with THREE.Points
var snowGeometry = new THREE.Geometry();

// create an array of 200 randomly positioned vertices
for ( var i = 0; i < 200; i ++ ) {
    var snow = new THREE.Vector3();
    snow.x = 15*(Math.random()-0.5);
    snow.y = 10+(10*Math.random());
    snow.z = 15*(Math.random()-0.5);                     
    snowGeometry.vertices.push( snow );
}

var snowMaterial, snowField;
                     
var posY = 0;
                     
function snowStorm () {
   if (snowField != null) {
       scene.remove(snowField);
   }
   posY = posY - 1;
   snowField = new THREE.Points( snowGeometry, snowMaterial );
   snowField.position.set(0, posY, 0);
   scene.add(snowField);
   if (posY < -10) {
       clearInterval(clock);
   } else {
       TW.render();
   }
}

// texture-map a snowflake image onto each point
var loader = new THREE.TextureLoader();

var clock;
              
loader.load("snowFlake.png",
      function (texture) {
           texture.minFilter = THREE.NearestFilter;
           texture.magFilter = THREE.NearestFilter;
           snowMaterial = new THREE.PointsMaterial( { map: texture,
                                                      blending: THREE.AdditiveBlending,
                                                      size: 0.6} );
           clock = setInterval(snowStorm, 200);
      } );