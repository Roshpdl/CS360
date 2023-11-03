var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer, scene,
               {minx: -10, maxx: 10,
                miny: -8, maxy: 12,
                minz: -10, maxz: 10});

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


// ADD A SHINY, TRANSPARENT GLOBE AROUND THE SCENE

// ADD A BASE TO HOLD THE GLOBE 

// ADD A BASE OF SNOW TO THE BOTTOM PART OF THE GLOBE


// add some lights to the scene
var ambLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambLight);

var spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI/30, 1);
spotLight.position.set(10,20,25);
scene.add(spotLight);

var directLight = new THREE.DirectionalLight(0xffffff, 0.5);
directLight.position.set(-20,30,10);
scene.add(directLight);

// addSnow() adds "numFlakes" snowflakes to a scene, randomly positioned within 
// a sphere of the input radius, shifted vertically by the input yshift
function addSnow (numFlakes, radius, yshift) {
   var x, y, z, keepgoing, snowflake;
   var snow = new THREE.MeshBasicMaterial({color: 0xffffff});
   var scale = radius/0.5;    // adjust coordinates to size of sphere
   for (var i = 0; i < numFlakes; i++) {
      keepgoing = true;
      while (keepgoing) {
         x = Math.random()-0.5;
         y = Math.random()-0.5;
         z = Math.random()-0.5;
         if (x*x + y*y + z*z < 0.25) {
            keepgoing = false;
            snowflake = new THREE.Mesh(new THREE.SphereGeometry(0.1),snow);
            snowflake.position.set(scale*x, scale*y+yshift, scale*z);
            scene.add(snowflake);
         }
      }
   }
}

// 1. ADD A TRANSPARENT GLOBE AROUND THE SCENE
var globeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.8});
var globe = new THREE.Mesh(new THREE.SphereGeometry(8.7, 32, 32, Math.PI/2), globeMaterial);
scene.add(globe);

// 2. ADD A BASE TO HOLD THE GLOBE
var baseMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
var base = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 0.5, 32), baseMaterial);
base.position.y = -9;
scene.add(base);

// 3. ADD SNOW TO THE BASE OF THE GLOBE
var snowBaseMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
var snowBase = new THREE.Mesh(new THREE.CircleGeometry(9, 32), snowBaseMaterial);
snowBase.position.y = -9.25;
snowBase.rotation.x = -Math.PI/2;
scene.add(snowBase);

// 4. ADD SNOW INSIDE THE GLOBE
addSnow(1000, 8.5, 0);

var loader = new THREE.FontLoader();
loader.load('Week 11/transparency/fonts/gentilis_bold.typeface.json', function(font) {
    var textGeometry = new THREE.TextGeometry('my town', {
        font: font,
        size: 1,
        height: 0.1,
    });
    var textMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
    var textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-3, 3, 0);  // Adjust these values to position the text on the sign
    scene.add(textMesh);
});


TW.render();