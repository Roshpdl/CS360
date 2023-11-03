var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1,1000);
var renderer = new THREE.WebGLRenderer();

//add an axis near the origin to show the x, y, and z axis
var axisHelper = new THREE.AxisHelper( 40 ); 
axisHelper.position.set(2,0,2);
scene.add( axisHelper );

//add a grid to the scene
var size = 300; 
var step = 10; 
var gridHelper = new THREE.GridHelper( size, step ); 
gridHelper.position = new THREE.Vector3( 0, 0, 0 ); 
//gridHelper.rotation = new THREE.Euler( 15, 0, 0 );
scene.add( gridHelper );

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);


var direction = 1; //this is the direction that his arms and legs rotate
var rotationX = 0; //this is the rotation of his arms and legs
var dx = .07; //this is the amount that the rotation of his arms and legs rotate each time the scene renders

var w = 20; //the total width of steve
var h = 40; //the total height of steve
var d = 10; //the total depth of steve

    
/**the following four variables are like containers to hold a collection
of objects that make up Steve. legs hold the left leg and the right leg,
torso holds the arms and the chest, and the upper body holds the head and 
and torso. Steve holds the upper body and the legs. Organizing Steve into
a hierarchical collection of objects makes it easier to animate him or duplicate
him within the scene. */
        
steve = new THREE.Object3D();
upperBody = new THREE.Object3D();
torso = new THREE.Object3D();
legs = new THREE.Object3D(); 

//use the same material for all of steve except the head
var steveMat = new THREE.MeshNormalMaterial();


/* The height of the head is 2/8 the total height, while the length of the 
torso (chest + arms) and legs are each 3/8 of the height. So 2/8 + 3/8 + 3/8  = 8/8. You could
easily change this if you want to change steve's proportions. */
var limbH = (3.0/8.0) * h;
var headH = (2.0/8.0) * h; 

/* The width of the limbs is 1/4 the total width while the widths of the head
and chest are 1/2 the total width */
var limbW = (1.0/4.0) * w;
var chestW = (1.0/2.0) * w;
var headW = (1.0/2.0) * w;

/* the depth of the head is the same as the total depth, while the depth of 
the limbs and chest is just 1/2 the total depth. */
var limbD = (1.0/2.0) * d;
var headD = d;
    
/**The arms and legs all have the same geometry, so we can just create it 
once and reuse it for each mesh **/
var limbG = new THREE.BoxGeometry(limbW,limbH,limbD);
limbG.applyMatrix( new THREE.Matrix4().makeTranslation(0, -(limbH * 0.5), 0) );

//draw the legs

/**create the left leg and translate half the width and height of the leg
so that the origin of Steve is between his feet at the bottom **/
var legL = new THREE.Mesh(limbG,steveMat);
legL.translateX(-0.5 * limbW);
legL.translateY(limbH);
//translate so that the origin is at the end of the box instead of in the middle

/**create the right leg and translate to the correct position plus a little 
extra so that you can see where on leg begins and the other one ends **/
var legR = new THREE.Mesh(limbG,steveMat);

legR.translateX((0.5 * limbW)+.1);
legR.translateY(limbH);
//legR.rotation.x = -rotationX;

/*add each left leg and the right leg to the legs container */
legs.add(legR);
legs.add(legL);

/*add the legs to the steve container */
steve.add(legs);

/* Now we are going to create the torso, starting with the chest. The
origin of the chest is in the center of the box, so that is the origin that
we will work from to translate the arms and head to the correct position*/
var chestG = new THREE.BoxGeometry(chestW,limbH,limbD);
var chest = new THREE.Mesh(chestG,steveMat);
torso.add(chest);    

/* add the left arm to the torso and move it 1/2 the width of the chest +1/2 
the width of the arm plus a little breathing room to see where one box begins 
and where the other ends. */
var armL = new THREE.Mesh(limbG,steveMat);
armL.translateX( (-0.5 * chestW) + (-0.5 * limbW) + -0.1);
armL.translateY( 0.5 * limbH);
torso.add(armL);

/*add the right arm and translate it the same way but in the opposite direction*/
var armR = new THREE.Mesh(limbG,steveMat);
torso.add(armR);
armR.translateX((0.5 * chestW) + (0.5 * limbW) + 0.1);
armR.translateY( 0.5 * limbH);    

upperBody.add(torso);

/*after we draw the torso we need to translate halfway up from the center of the
chest to halfway up the head to be in the right spot to draw the head. */


//add a new material for steve's head so that one of the faces has 
//an image mapped on it to differentiate the front
var loader = new THREE.TextureLoader();
loader.load('lil-bub.jpg',
            function (texture) {
                var material1 = new THREE.MeshBasicMaterial({ map: texture });
                var material2 = new THREE.MeshNormalMaterial();
                var material3 = new THREE.MeshNormalMaterial();
                var material4 = new THREE.MeshNormalMaterial();
                var material5 = new THREE.MeshNormalMaterial();
                var material6 = new THREE.MeshNormalMaterial();

                var materials = [material5,material2,material3,material4,material1,material6];

                var headMaterial = new THREE.MeshFaceMaterial( materials );

                var headG = new THREE.BoxGeometry( headW, headH, headD);
                var head = new THREE.Mesh(headG,headMaterial);
                head.translateY((limbH * 0.5) + (headH * 0.5) + 0.1);
                upperBody.add(head);
            })


/*translate up the length of the legs plus half the height of the chest to draw
the upper body */
upperBody.translateY(limbH + (0.5 * limbH) + 0.1); 
steve.add(upperBody);

var directionVec= new THREE.Vector3(0.0, 0.0, 0.0);
//console.log("direction init:" + direction.x+ ","+ direction.y+","+direction.z);

//console.log("Steve direction init:" + direction.x+ ","+ direction.y+","+direction.z);

scene.add(steve);

//change the color of the background
renderer.setClearColor( 0xffffff );

camera.position.z = -50;
//steve.add(camera);

//this allows the user to drag the scene around the origin 
var controls = new THREE.OrbitControls( camera, renderer.domElement );


/*do you want to change this function so that when he is not moving his legs are 
together??? */

/* this function rotates steve's arms and legs as he is moving */
function walk(){
    if (direction == 1){
        rotationX += dx;
    }
    
    if (direction == -1){
        rotationX -= dx;
    }
    
    if (rotationX >= (1) || rotationX <= (-1)){
        direction = direction * -1; 
    }
    
    legL.rotation.x = rotationX; //this is in radians!!!
    legR.rotation.x = -rotationX;
    armR.rotation.x = rotationX; //this is in radians!!!
    armL .rotation.x = -rotationX;  
    
    }
//camera.lookAt(steve.position);
        
//determines which key has been pressed and updates the direction vector accordingly
function onKeyDown( event ) {

    switch ( event.keyCode ) {

        case 38: // up  move forward
        case 87: // w
            //up = true;
            directionVec.setZ(1);
            break;

        case 37: // left
        case 65: // a
            directionVec.setX(1);
            break;
    
        case 40: // down move backwards
        case 83: // s
            directionVec.setZ(-1);
            break;

        case 39: // right
        case 68: // d
            directionVec.setX(-1);
            break;

        case 68: // e
            directionVec.setX(0);
            directionVec.setZ(0);
            break;
    }

}


//resets the direction vector to (0,0,0) so that steve does not move infinitely
function onKeyUp( event ) {

    switch ( event.keyCode ) {

        case 38: // up  move forward
        case 87: // w
            directionVec.setZ(0);
            break;

        case 37: // left
        case 65: // a
            directionVec.setX(0);
            break;

        case 40: // down move backwards
        case 83: // s
            directionVec.setZ(0);
            break;

        case 39: // right
        case 68: // d
            directionVec.setX(0);
            break;
        case 69: //e  - northeast (toward back right corner)
            direction.setX(-1);
            direction.setZ(1);
            break;
        case 84: //t  - teleport to the initial position
            steve.position.x = 0;
            steve.position.z = 0;
            break;

    }

}


//the following functions are adapted from http://webmaestro.fr/character-controls-three-js/
function motion() {
    //setDirection();
    // (if any)
    if (directionVec.x !== 0 || directionVec.z !== 0) {
        walk(); 
        // Rotate the character
        rotate();
        move();
        return true;
    }
}

// Rotate the character
function rotate() {
    // Set the direction's angle, and the difference between it and our Object3D's current rotation
    var angle = Math.atan2(directionVec.x, directionVec.z),
        difference = angle - steve.rotation.y;
    // If we're doing more than a 180°
    if (Math.abs(difference) > Math.PI) {
        // We proceed to a direct 360° rotation in the opposite way
        if (difference > 0) {
            steve.rotation.y += 2 * Math.PI;
        } else {
            steve.rotation.y -= 2 * Math.PI;
        }
        // And we set a new smarter (because shorter) difference
        difference = angle - steve.rotation.y;
        // In short : we make sure not to turn "left" to go "right"
    }
    // Now if we haven't reached our target angle
    if (difference !== 0) {
        // We slightly get closer to it
        steve.rotation.y += difference / 4;
    }
}

function move() {
    // We update our Object3D's position from our "direction"
    steve.position.x += directionVec.x * ((directionVec.z === 0) ? 2 : Math.sqrt(6));
    steve.position.z += directionVec.z * ((directionVec.x === 0) ? 2 : Math.sqrt(6));
}

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );

function render() {
    requestAnimationFrame(render);
    motion();
    //console.log(rotationX);
    renderer.render(scene,camera);
}
    
render();                   