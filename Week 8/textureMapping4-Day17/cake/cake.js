// create a scene
var scene = new THREE.Scene();

// makeTexture() returns a Texture object with a 16x16 texture pattern using the input
// color object on a white background. The input design is an integer that specifies
// the desired pattern, which can be 1 (arc), 2 (dot), or 3 (triangle). The pattern is
// repeated with the input wrap styles and numbers of repeats in the horizontal and
// vertical directions. flipY should be true or false.
function makeTexture (design, color, wrapS, wrapT, repS, repT, flipY) {
    // create an array of colors to use for the texture
    var data = new Uint8Array(3*16*16);
    var i, j, n=0;
    var red = 255*color.r;      // red, green, blue on a 0-255 scale
    var green = 255*color.g;
    var blue = 255*color.b;
    if (design == 1) {                // arc texture pattern
       for (i = 0; i < 16; ++i) {
          for (j = 0; j < 16; ++j) {
             dist = Math.sqrt(i*i + j*j);
             if ((dist >= 11) && (dist < 14)) {
                data[n++] = red;
                data[n++] = green;
                data[n++] = blue;
             } else {
                data[n++] = 255;
                data[n++] = 255;
                data[n++] = 255;
             }
          }
       }
    } else if (design == 2) {        // dot texture pattern
       for (i = 0; i < 16; ++i) {
          for (j = 0; j < 16; ++j) {
             dist = Math.sqrt((i-7.5)*(i-7.5) + (j-7.5)*(j-7.5));
             if (dist <= 5) {
                data[n++] = red;
                data[n++] = green;
                data[n++] = blue;
             } else {
                data[n++] = 255;
                data[n++] = 255;
                data[n++] = 255;
             }
          }
       }
    } else {                         // triangle texture pattern
       for (i = 0; i < 16; ++i) {
          for (j = 0; j < 16; ++j) {
             if ((Math.abs(j-7.5) < (i/2)) && (i < 15)) {
                data[n++] = red;
                data[n++] = green;
                data[n++] = blue;
             } else {
                data[n++] = 255;
                data[n++] = 255;
                data[n++] = 255;
             }
          }
       }
    }

    // create a new texture object from the data array
    var textureObj = new THREE.DataTexture(data, 16, 16, THREE.RGBFormat);

    // set the wrapping methods, numbers of repeats, and flipY property
    textureObj.wrapS = wrapS;
    textureObj.wrapT = wrapT;
    textureObj.repeat.set(repS,repT);
    textureObj.flipY = flipY;

    // when mapping the texture onto a face in the Geometry, use the nearest 
    // texture pixel as the color to be rendered
    textureObj.minFilter = THREE.NearestFilter;
    textureObj.magFilter = THREE.NearestFilter;
    textureObj.needsUpdate = true;

    return textureObj;     
};

// construct the cylinder geometries and materials for a three-layer cake

// bottom layer
var baseGeom = new THREE.CylinderGeometry(50,50,20,30);
var baseMat = new THREE.MeshBasicMaterial( {color: 0xffffff, 
                                            map: makeTexture(2, new THREE.Color(0x0000ff),
                                                    THREE.RepeatWrapping,
                                                    THREE.RepeatWrapping, 15, 1, false)} );
var baseMesh = new THREE.Mesh(baseGeom, baseMat);
scene.add(baseMesh);

// ================================================================

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: -50, maxx: 50,
                miny: 0, maxy: 20,
                minz: -50, maxz: 50});

TW.render();