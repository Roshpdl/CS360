var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer, scene,
               {minx: -4, maxx: 12,
                miny: 0, maxy: 60,
                minz: -12, maxz: 6});

// create and add the Shapard Tower
var towerGeom = TW.createBarn(10,60,10);
var towerMesh = TW.createMesh(towerGeom);
scene.add(towerMesh);

// load a font file and add text to the scene
var loader = new THREE.FontLoader();

loader.load('../fonts/helvetiker_regular.typeface.json', 
            function (font) {
               var textGeom = new THREE.TextGeometry('Ecce Quam Bonum', 
                                                     {font: font,
                                                      size: 6,
                                                      height: 2,
                                                     } );
               var textMat = new THREE.MeshBasicMaterial({color: 0x582c83});
               var textObj = new THREE.Mesh(textGeom, textMat);
               textObj.position.set(-28,2,2);
               scene.add(textObj);
               TW.render();
            } );