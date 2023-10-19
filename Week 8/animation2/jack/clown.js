// global parameters for colored materials for parts
var chestMat, legMat, footMat, eyeMat, faceMat, originMat;

/* 
 createClown() function creates and returns a clown object with the
 input radii of the head, chest, limbs, and height of the limbs
*/
function createClown (headR, chestR, limbR, limbH) {
   var clown = new THREE.Object3D();

   // colored materials of parts of clown
   chestMat = new THREE.MeshBasicMaterial({color: 0x00A6FF});  // ~blue
   legMat = new THREE.MeshBasicMaterial({color: 0xF022D8});    // ~magenta
   footMat = new THREE.MeshBasicMaterial({color: 0x22F0B2});   // ~green
   eyeMat = new THREE.MeshBasicMaterial({color: 0x452469});    // navy blue
   faceMat = new THREE.MeshBasicMaterial({color: 0xB8FFE5});   // ~aqua
   originMat = new THREE.MeshBasicMaterial({color: 0xFFFF00}); // yellow

   // make the head and add to the clown
   var head = makeHead(clownHeadR);
   head.position.y = clownHeadR + 2.2*clownChestR + clownLimbH;
   clown.add(head);

   // make the body and add to the clown
   var body = makeBody(limbR, limbH, chestR);
   body.position.y = 1.1*clownChestR + clownLimbH;
   clown.add(body);

   // add a sphere at the origin between the clown's feet
   var originG = new THREE.SphereGeometry(limbR/2, 10, 10);
   var originM = new THREE.Mesh(originG, originMat);
   clown.add(originM);

   // return the final clown object
   return clown;
}

// makeBody() creates a body with a chest, two legs, and two arms
function makeBody (limbR, limbH, chestR) {
   body = new THREE.Object3D();

   // make the chest and add to the body
   var chestG = new THREE.SphereGeometry(chestR, 20, 20);
   var chest = new THREE.Mesh(chestG, chestMat);
   // scale the chest in y to make it look like an elongated ellipse
   chest.scale.y = 1.25;
   body.add(chest);

   // make the legs and add them to the body
   var legL = makeLeg(limbR, limbH);
   legL.position.set(-0.4*chestR, -1.1*chestR, 0);
   body.add(legL);
   legR = legL.clone();
   legR.position.x = 0.4*chestR;
   body.add(legR);

   // make the arms and add them to the body
   var armL = makeArm(limbR, limbH);
   armL.position.set(-0.8*chestR, chestR, 0);
   armL.rotation.z = -Math.PI/6;
   body.add(armL);
   var armR = armL.clone();
   armR.position.x = 0.8*chestR;
   armR.rotation.z = Math.PI/6;
   body.add(armR);

   // return the final body object
   return body;
}

// makeLeg() makes a single leg with a foot
function makeLeg (limbR, limbH) {
   var leg = new THREE.Object3D();

   // make a cylinder mesh and add to the leg
   var legG = new THREE.CylinderGeometry(limbR, limbR, limbH, 20, 20);
   var legM = new THREE.Mesh(legG, legMat);
   legM.position.y = -clownLimbH/2;
   leg.add(legM);

   // make a half-sphere foot and add to the leg
   var footG = new THREE.SphereGeometry(3*limbR, 20, 20, 0, 2*Math.PI, 0, Math.PI/2);
   var foot = new THREE.Mesh(footG, footMat);
   foot.position.y = -clownLimbH;
   leg.add(foot);

   // return the final leg object
   return leg;
}

// makeArm() makes a single arm with a shoulder and hand
function makeArm (limbR, limbH) {
   var arm = new THREE.Object3D();

   // make a cylinder mesh and add to the arm
   var armG = new THREE.CylinderGeometry(limbR, limbR, limbH, 20, 20);
   var armM = new THREE.Mesh(armG, chestMat);
   armM.position.y = -limbH/2;
   arm.add(armM);

   // make a spherical shoulder and add to the arm
   var shoulderG = new THREE.SphereGeometry(2.5*limbR, 20, 20);
   var shoulder = new THREE.Mesh(shoulderG, legMat);
   arm.add(shoulder);

   // make a spherical hand and add to the arm
   var handG = new THREE.SphereGeometry(2*limbR, 20, 20);
   var hand = new THREE.Mesh(handG, footMat);
   hand.position.y = -limbH;
   arm.add(hand);

   // return the final arm object
   return arm;
}

// makeHead() creates a head with a face, two ears, two eyes,
// a mouth and a hat. All of the proportions are based on the
// radius of the head
function makeHead (headR) {
   var head = new THREE.Object3D();

   // make a sphere and add to the head
   var faceG = new THREE.SphereGeometry(headR, 20, 20);
   var face = new THREE.Mesh(faceG, faceMat);
   head.add(face);

   // make left and right eyes and add to the head
   var eyeG = new THREE.SphereGeometry(0.1*headR, 10, 10);
   var eyeL = new THREE.Mesh(eyeG, eyeMat);
   eyeL.position.set(-0.35*headR, 0, 0.95*headR);
   head.add(eyeL);
   var eyeR = eyeL.clone();
   eyeR.position.x = 0.35*headR;
   head.add(eyeR);

   // make nose and add to the head
   var noseG = new THREE.SphereGeometry(0.08*headR, 10, 10);
   var nose = new THREE.Mesh(noseG, eyeMat);
   nose.position.set(0, -0.2*headR, headR);
   head.add(nose);

   // make left and right ears and add to the head
   var earG = new THREE.SphereGeometry(0.3*headR, 10, 10);
   var earL = new THREE.Mesh(earG, eyeMat);
   earL.position.x = 0.95*headR;
   head.add(earL);
   var earR = earL.clone();
   earR.position.x = -0.95*headR;
   head.add(earR);

   // make mouth and add to the head
   var mouthG = new THREE.TorusGeometry(0.2*headR, 0.04*headR, 30, 30, 5*Math.PI/8);
   var mouth = new THREE.Mesh(mouthG, legMat);
   mouth.position.set(0, -0.35*headR, 0.92*headR);
   mouth.rotation.set(Math.PI, 0, Math.PI/8);
   head.add(mouth);

   // make hat and add to the head
   var hat = new THREE.Object3D();
   var topG = new THREE.CylinderGeometry(headR, 0.8*headR, 1.2*headR, 20, 20);
   var top = new THREE.Mesh(topG, chestMat);
   var brimG = new THREE.CylinderGeometry(1.3*headR, 1.3*headR, 0.05*headR, 20, 20);
   var brim = new THREE.Mesh(brimG, chestMat);
   hat.add(top);
   brim.position.y = -0.6*headR;
   hat.add(brim);
   hat.position.set(0.2*headR, 1.2*headR, 0);
   hat.rotation.set(-Math.PI/20, 0, -Math.PI/20);
   head.add(hat);

   // return the final head object
   return head;
}
