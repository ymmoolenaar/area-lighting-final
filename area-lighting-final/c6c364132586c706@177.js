// https://observablehq.com/@krabinowitz1/stl-loader-viewer@177
import define1 from "./ebae0c172bd689cc@102.js";
import define2 from "./55faae595525622e@211.js";
import define3 from "./10023e7d8ddc32bc@90.js";
import define4 from "./a8bdf662afec8213@389.js";
import define5 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# STL Loader, Viewer
Using THREEJS  STL loader and REGL rendering.
See an example of ThreeJS loader use from https://observablehq.com/@hellonearthis/this-is-an-example-of-loading-a-three-js-object-with-objloade  
The model Slotted_disk rendered here is from https://threejs.org/examples/models/stl/ascii/slotted_disk.stl`
)}

function _lightParameters(columns,radio,slider,color){return(
columns({
    mode: radio({
    title: 'Switch Light Mode',
    description: 'Select a mode.',
    options: ['Point', 'Directional'],
    value: 'Directional'
  }),
    lightVal: slider({
    title:'Light Position/Direction',
    min: -180, 
    max: 180, 
    step: 1
  }),
    color: color({
    title: 'Color',
    value: '#ff0000', 
  })
})
)}

function _myCanvas(html,canvasWidth,canvasHeight){return(
html `<canvas width=${canvasWidth}, height=${canvasHeight}/>`
)}

function _canvasWidth(){return(
800
)}

function _canvasHeight(){return(
500
)}

function _light(glMatrix,lightParameters,objectDimensions){return(
glMatrix.vec4.transformMat4([], [0, lightParameters.mode == 'Directional' ? 1 : objectDimensions.radius * 1, 0, lightParameters.mode == 'Directional' ? 0 : 1], glMatrix.mat4.fromZRotation([], lightParameters.lightVal * Math.PI / 180))
)}

function _7(regl,camera,stlRender,invalidation)
{
  //gl.frame(() =>camera(()=>render()))
  const frame = regl.frame(() => {
    camera((state) => {
      if (!state.dirty) return;
      regl.clear({color: [0.5, 0.5, 0.6, 1]})
      stlRender()
    })
  })
  invalidation.then(() => frame.cancel());
  return `render loop`
}


function _regl(createRegl,myCanvas)
{
  const regl = createRegl({canvas:myCanvas});
  regl.clear({color: [0.5, 0.5, 0.6, 1]});
  return regl;
}


function _stlRender(regl,stl,getColorVec,hex2rgb,lightParameters){return(
regl({
    vert: `
    precision mediump float;
    attribute vec3 position;
    attribute vec3 normal;
    uniform mat4 view;
    uniform mat4 projection;
    varying vec3 fragNormal;
    varying vec3 fragPosition;

    void main () {
      gl_PointSize = 2.0;
      vec4 mPosition = vec4(position, 1.0);
      fragPosition = mPosition.xyz;
      fragNormal = normalize(normal);
      gl_Position = projection*view*vec4(position, 1);
    }
    `,
  frag: `
    precision mediump float;
    varying vec3 fragNormal;
    varying vec3 fragPosition;
    uniform vec3 materialColor;
    uniform vec4 light;
    vec3 computeColor() {
      vec3 lightVector = light.xyz;
      if (light.w > 0.)
        lightVector = light.xyz / light.w - fragPosition;
      return materialColor * clamp(dot(normalize(lightVector), normalize(fragNormal)), 0.,             1.);
    }
    void main () {
      vec3 color = computeColor();
      gl_FragColor = vec4(color, 1);
    }
    `,
  attributes: {
    position: stl.positions,
    normal: stl.normals,
    materialColor: getColorVec(hex2rgb(lightParameters.color))
  },
  count: stl.positions.length,
  primitive: "triangles"
})
)}

function _stl(stlObject)
{
  const attributes = stlObject.attributes;
  const positions = [], normals = [];
  for (let i = 0; i < attributes.position.array.length; i+=3){
    positions.push([attributes.position.array[i],attributes.position.array[i+1],attributes.position.array[i+2]]);             normals.push([attributes.normal.array[i],attributes.normal.array[i+1],attributes.normal.array[i+2]]);
  }
  return{
    positions : positions,
    normals : normals
  }
}


function _getColorVec(glMatrix){return(
function(color) {
  return glMatrix.vec3.fromValues(color[0], color[1], color[2]); 
}
)}

async function _stl_url(FileAttachment)
{
  const blob = await FileAttachment("kevin pipe v1.stl").blob();
  return  URL.createObjectURL(blob);
}


function _stlObject(THREE,stl_url){return(
new Promise ((resolve,reject) => {
  // instantiate a loader
  var loader = new THREE.STLLoader();
 
  loader.load(
	  // resource URL
    stl_url,
  	// called when resource is loaded
	  function ( object ) {
      resolve(object);
  	}
  );
})
)}

function _camera(createCamera,regl,objectDimensions){return(
createCamera(regl, {
  center: objectDimensions.center,
  theta: Math.PI/2,
  phi: Math.PI/4,
  distance: 3*objectDimensions.radius,
  near: 0.01*objectDimensions.radius,
  far: 10*objectDimensions.radius,
  damping: 0,
  noScroll: true,
  renderOnDirty: true
})
)}

function _objectDimensions(getScDimensions,stl){return(
getScDimensions(stl)
)}

function _16(md){return(
md`### Libraries`
)}

function _createCamera(require){return(
require('https://bundle.run/regl-camera@2.1.1')
)}

function _createRegl(require){return(
require("regl")
)}

function _glMatrix(require){return(
require('https://bundle.run/gl-matrix')
)}

async function _THREE(require)
{
  const THREE = (window.THREE = await require("three"));
  await require("three/examples/js/loaders/STLLoader.js").catch(
    () => {}
  );
  return THREE;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["kevin pipe v1.stl", {url: new URL("./files/352240279cf8eb9ef85ce699d91a668011d9cd63787a2681f92c82cc56f4fd33fb7a8c6f7138cea1379b853a7fef4ddd51ae37675b4f9720f8080b41b8e2fc97.stl", import.meta.url), mimeType: "model/stl", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof lightParameters")).define("viewof lightParameters", ["columns","radio","slider","color"], _lightParameters);
  main.variable(observer("lightParameters")).define("lightParameters", ["Generators", "viewof lightParameters"], (G, _) => G.input(_));
  main.variable(observer("myCanvas")).define("myCanvas", ["html","canvasWidth","canvasHeight"], _myCanvas);
  main.variable(observer("canvasWidth")).define("canvasWidth", _canvasWidth);
  main.variable(observer("canvasHeight")).define("canvasHeight", _canvasHeight);
  main.variable(observer("light")).define("light", ["glMatrix","lightParameters","objectDimensions"], _light);
  main.variable(observer()).define(["regl","camera","stlRender","invalidation"], _7);
  main.variable(observer("regl")).define("regl", ["createRegl","myCanvas"], _regl);
  main.variable(observer("stlRender")).define("stlRender", ["regl","stl","getColorVec","hex2rgb","lightParameters"], _stlRender);
  main.variable(observer("stl")).define("stl", ["stlObject"], _stl);
  main.variable(observer("getColorVec")).define("getColorVec", ["glMatrix"], _getColorVec);
  main.variable(observer("stl_url")).define("stl_url", ["FileAttachment"], _stl_url);
  main.variable(observer("stlObject")).define("stlObject", ["THREE","stl_url"], _stlObject);
  main.variable(observer("camera")).define("camera", ["createCamera","regl","objectDimensions"], _camera);
  main.variable(observer("objectDimensions")).define("objectDimensions", ["getScDimensions","stl"], _objectDimensions);
  main.variable(observer()).define(["md"], _16);
  const child1 = runtime.module(define1);
  main.import("getScDimensions", child1);
  main.import("reglScExtent", child1);
  const child2 = runtime.module(define2);
  main.import("array2Darray", child2);
  const child3 = runtime.module(define3);
  main.import("columns", child3);
  const child4 = runtime.module(define4);
  main.import("hex2rgb", child4);
  const child5 = runtime.module(define5);
  main.import("slider", child5);
  main.import("radio", child5);
  main.import("checkbox", child5);
  main.import("color", child5);
  main.variable(observer("createCamera")).define("createCamera", ["require"], _createCamera);
  main.variable(observer("createRegl")).define("createRegl", ["require"], _createRegl);
  main.variable(observer("glMatrix")).define("glMatrix", ["require"], _glMatrix);
  main.variable(observer("THREE")).define("THREE", ["require"], _THREE);
  return main;
}
