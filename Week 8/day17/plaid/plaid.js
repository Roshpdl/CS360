// create a scene
var scene = new THREE.Scene();

// createGeometry() creates a Geometry with four triangular faces
function createGeometry () {
  var geom = new THREE.Geometry();

  // 7 vertices
  geom.vertices.push(new THREE.Vector3(0,0,0));
  geom.vertices.push(new THREE.Vector3(20,0,0));
  geom.vertices.push(new THREE.Vector3(20,-10,0));
  geom.vertices.push(new THREE.Vector3(0,-10,0));
  geom.vertices.push(new THREE.Vector3(5,10,0));
  geom.vertices.push(new THREE.Vector3(10,0,0));
  geom.vertices.push(new THREE.Vector3(15,10,0));

  // 4 faces
  geom.faces.push(new THREE.Face3(0,3,1));  // bottom rectangle, upper left half
  geom.faces.push(new THREE.Face3(3,2,1));  // bottom rectangle, lower right half
  geom.faces.push(new THREE.Face3(0,5,4));  // upper left triangle
  geom.faces.push(new THREE.Face3(5,1,6));  // upper right triangle
 
  return geom;
}

// makeTexture() returns a texture object with a 4x4 texture pattern 
// of colors that combine different amounts of green and blue
function makeTexture () {
    // create an array of colors to use for the texture
    var data = new Uint8Array(3*4*4);
    var i, j, n=0;
    for (i = 0; i < 4; ++i) {
       for (j = 0; j < 4; ++j) {
          data[n++] = 0;
          data[n++] = i*84;
          data[n++] = j*84;
       }
    }
    // create a new texture object from the data array
    var textureObj = new THREE.DataTexture(data, 4, 4, THREE.RGBFormat);
                       
    // when mapping the texture onto a face in the Geometry, use the nearest 
    // texture pixel as the color to be rendered
    textureObj.minFilter = THREE.NearestFilter;
    textureObj.magFilter = THREE.NearestFilter;
    textureObj.needsUpdate = true;

    return textureObj;     
};

// addTextureCoords() adds texture coordinates to the input Geometry
function addTextureCoords (geom) {
    var UVs = [];           // array of face descriptors

    function faceCoords(as,at, bs,bt, cs,ct) {
       // adds the texture coordinates for a single face to the UVs array
       UVs.push( [ new THREE.Vector2(as,at),
                   new THREE.Vector2(bs,bt),
                   new THREE.Vector2(cs,ct)] );
    }

    // set up texture coordinates for the four sides
    faceCoords(0,0, 0,1, 1,0);      // bottom rectangle, upper left half
    faceCoords(0,1, 1,1, 1,0);      // bottom rectangle, lower right half
    faceCoords(0,1, 1,1, 0.5,0);    // upper left triangle
    faceCoords(0,1, 1,1, 0.5,0);    // upper right triangle

    // attach the UVs array to the Geometry
    geom.faceVertexUvs = [ UVs ];
}

// construct the geometry, textures, and materials

var geom = createGeometry();
                       
addTextureCoords(geom);         // add texture coordinates to geometry

var texture1 = makeTexture();   // texture for bottom rectangle
                       
var texture2 = makeTexture();   // texture for upper left triangle

var texture3 = makeTexture();   // texture for upper right triangle                       
                       
var materials = 
    [ new THREE.MeshBasicMaterial( {color: 0xffffff, 
                                    map: texture1} ),
      new THREE.MeshBasicMaterial( {color: 0xffffff, 
                                    map: texture2} ),
      new THREE.MeshBasicMaterial( {color: 0xffffff, 
                                    map: texture3} )
    ];

// use different materials for the triangular faces
geom.faces[0].materialIndex = 0;   // bottom rectangle
geom.faces[1].materialIndex = 0;   
geom.faces[2].materialIndex = 1;   // upper left triangle
geom.faces[3].materialIndex = 2;   // upper right triangle

// create a Mesh and add it to the scene
var mesh = new THREE.Mesh(geom, materials);
scene.add(mesh);

// ================================================================

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);

TW.cameraSetup(renderer,
               scene,
               {minx: 0, maxx: 20,
                miny: -10, maxy: 10,
                minz: -0.5, maxz: 0.5});

TW.render();