var renderer = new THREE.WebGLRenderer();

var scene = new THREE.Scene();

TW.mainInit(renderer,scene);
                        
var params = {
    lightX: -90,
    lightY: 175,
    lightZ: 125,
    materialType: "Phong",
    matDiffuse: '#ff0000',
    matSpecular: '#ffffff',
    matEmissive: '#000000',
    matShininess: 30,
    last_param:  null
};

// Global used by both geometries. This is just a dummy value, updated later.
var sharedMaterial = new THREE.MeshBasicMaterial();

// The two objects in the scene
var sphere = new THREE.Mesh(new THREE.SphereGeometry(60, 100, 100), sharedMaterial);
var cube = new THREE.Mesh(new THREE.BoxGeometry(100,100,100), sharedMaterial);

function updateMaterialFromParams() {
    switch (params.materialType) {
    case "Basic":
        sharedMaterial = new THREE.MeshBasicMaterial( {color: params.matDiffuse} );
        break;
        
    case 'Lambert':
        sharedMaterial = new THREE.MeshLambertMaterial(
            {color: params.matDiffuse,
             emissive: params.matEmissive});
        break;
        
    case 'Phong':
        sharedMaterial = new THREE.MeshPhongMaterial( 
            {color: params.matDiffuse,
             specular: params.matSpecular,
             emissive: params.matEmissive,
             shininess: params.matShininess});
        break;
    }
    sphere.material = sharedMaterial;
    cube.material = sharedMaterial;
}

updateMaterialFromParams();
   
cube.position.set(100,50,0);
sphere.position.set(-80,60,0);

scene.add(sphere);
scene.add(cube);
                        
// ================================================================
// There are two lights, one ambient and one point light controllable by GUI                        

var ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff);
scene.add(pointLight)

// This is so we can see the point light

var lightbulbGeometry = new THREE.SphereGeometry(10,16,8);
var lightbulbMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending});
                                
var lightbulb = new THREE.Mesh(lightbulbGeometry,lightbulbMaterial);
scene.add(lightbulb);

function updateLightFromParams() {
    pointLight.position.set(params.lightX, params.lightY, params.lightZ);
    lightbulb.position.set(params.lightX, params.lightY, params.lightZ);
}
updateLightFromParams();

// ================================================================
// Final steps. Set up the camera before loading the floor texture, so that
// the render() function will work.

var state = TW.cameraSetup(renderer,
               scene,
               {minx: -300, maxx: 300,
                miny: -10, maxy: 50,
                minz: -300, maxz: 300});
TW.viewFromAboveFrontSide();

// ================================================================
// create the ground plane

var planeGeometry = new THREE.PlaneGeometry(800,800);
var floorMaterial = new THREE.MeshBasicMaterial( { color: new THREE.Color("burlywood"), side: THREE.DoubleSide } );
var plane = new THREE.Mesh(planeGeometry,floorMaterial);
        
// rotate and position the plane
plane.rotation.x=-0.5*Math.PI;
plane.position.set(5,-2,0);
scene.add(plane);

function redo() {
    // this function is overkill for most changes since it updates
    // everything, but simplifies the code
    updateMaterialFromParams();
    updateLightFromParams();
    TW.render();
}

// GUI setup
var gui = new dat.GUI();
gui.add(params,'lightX',-200,+200).step(1).onChange(redo);
gui.add(params,'lightY',-200,+200).step(1).onChange(redo);
gui.add(params,'lightZ',-200,+200).step(1).onChange(redo);
gui.add(params,'materialType',[ "Basic", "Lambert", "Phong", "Wireframe" ]).onChange(redo);
gui.addColor(params,'matDiffuse').onChange(redo);
gui.addColor(params,'matSpecular').onChange(redo);
gui.add(params,'matShininess',0,128).step(1).onChange(redo);
gui.addColor(params,'matEmissive').onChange(redo);