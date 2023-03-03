// https://observablehq.com/@spattana/general-obj2sc@211
import define1 from "./dd5e3bdbece67f4e@230.js";

function _1(md){return(
md `# General Obj2SC
Uses: https://github.com/frenchtoast747/webgl-obj-loader`
)}

function _2(md){return(
md `## Simple Cube
From https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial`
)}

function _cube(array2Darray){return(
{
  positions: array2Darray([
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
  ],3),
  cells: array2Darray([
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
  ],3),
  normals: array2Darray([
// Front face
     0.0, 0.0,  1.0,
     0.0, 0.0,  1.0,
     0.0, 0.0,  1.0,
     0.0, 0.0,  1.0,

    // Back face
     0.0, 0.0, -1.0,
     0.0, 0.0, -1.0,
     0.0, 0.0, -1.0,
     0.0, 0.0, -1.0,

    // Top face
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,

    // Bottom face
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,

    // Right face
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,

    // Left face
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0
  ],3),
  uvs : array2Darray([
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Back
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Top
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Bottom
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Right
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Left
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0
  ],2)
}
)}

function _ground(cube,glMatrix)
{
  const positions = cube.positions.map(d=>glMatrix.vec3.multiply([],d,[20,1/20,20]));
  const normals = cube.normals.map(d=>glMatrix.vec3.normalize([],glMatrix.vec3.multiply([],d,[1/20,20,1/20])));
  const cells = cube.cells.map(d=>d.slice());
  const uvs = cube.uvs.map(d=>d.slice());
  return {
    positions, normals, cells, uvs
  }
}


function _groundBelow(cube,glMatrix){return(
function(position, size){
  const positions = cube.positions.map(d=>glMatrix.vec3.add([],glMatrix.vec3.multiply([],d,[size,1/20,size]),[0,-1/20,0]));
  const normals = cube.normals.slice();//map(d=>glMatrix.vec3.normalize([],glMatrix.vec3.multiply([],d,[1/20,20,1/20])));
  const cells = cube.cells.map(d=>d.slice());
  const uvs = cube.uvs.map(d=>d.slice());
  return {
    positions, normals, cells, uvs
  }
}
)}

function _6(md){return(
md`## Obj Models`
)}

async function _beachHouse(convertObjStr2Sc,FileAttachment){return(
convertObjStr2Sc(await FileAttachment("beach house type 1.obj").text())
)}

async function _house(convertObjStr2Sc,FileAttachment){return(
convertObjStr2Sc(await FileAttachment("247_House 15_obj.obj").text())
)}

async function _watchTower(convertObjStr2Sc,FileAttachment){return(
convertObjStr2Sc(await FileAttachment("watchtower  B.obj").text())
)}

async function _dollHouse(convertObjStr2Sc,FileAttachment){return(
convertObjStr2Sc(await FileAttachment("Doll-s house.obj").text())
)}

function _sphere(THREE,array2Darray)
{
  const sphereGeometry = new THREE.SphereBufferGeometry( 1, 32, 32 );
  //return sphereGeometry
  return {
    positions : array2Darray(sphereGeometry.attributes.position.array,3),
    normals : array2Darray(sphereGeometry.attributes.normal.array,3),
    uvs : array2Darray(sphereGeometry.attributes.uv.array,2),
    cells : array2Darray(sphereGeometry.index.array,3)
  }
}


function _sphereLowRes(THREE,array2Darray)
{
  const sphereGeometry = new THREE.SphereBufferGeometry(1,8,8);
  //return sphereGeometry
  return {
    positions : array2Darray(sphereGeometry.attributes.position.array,3),
    normals : array2Darray(sphereGeometry.attributes.normal.array,3),
    uvs : array2Darray(sphereGeometry.attributes.uv.array,2),
    cells : array2Darray(sphereGeometry.index.array,3)
  }
}


function _13(md){return(
md`## Functions`
)}

function _fetchImage(getImageData){return(
async function fetchImage(url) {
  const blob = await fetch(url).then(r => r.blob());
  return getImageData(blob)
}
)}

function _convertObjStr2Sc(webgl_obj_loader,array2Darray,computeNormals){return(
function(text){
  const model = new webgl_obj_loader.Mesh(text);
  const sc = {
    positions: array2Darray(model.vertices,3),
    cells: array2Darray(model.indices,3),
    normals: (model.normals)?array2Darray(model.vertexNormals,3):undefined,
    uvs: (model.textures)?array2Darray(model.textures,2):undefined
  };
  if (!sc.normals && sc.cells)sc.normals = computeNormals(sc.cells,sc.positions);
  return sc;
}
)}

function _array2Darray(){return(
(A,n)=>Array.from(A).reduce((a, c, i,data) => {
        return i % n === 0 ? a.concat([data.slice(i, i + n)]) : a;
      }, [])
)}

function _17(md){return(
md`## Libraries`
)}

async function _webgl_obj_loader(require)
{
  const response = await fetch("https://raw.githubusercontent.com"
      + "/frenchtoast747/webgl-obj-loader"
      + "/master/dist/webgl-obj-loader.js");
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  return require(url).catch(() => window.webgl_obj_loader);
}


function _computeNormals(require){return(
require('https://bundle.run/angle-normals@1.0.0')
)}

function _glMatrix(require){return(
require('https://bundle.run/gl-matrix@3.3.0')
)}

function _d3(require){return(
require("d3@5")
)}

function _THREE(require){return(
require("three")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["beach house type 1.obj", {url: new URL("./files/298e441f1755be06163a87eea782e9394d9d7837c576c35d7cab2dd600ce1d21211ff6a79a9c61deff111c806f49dfcfbc4a4efcc5677d485fa145a7f9af637c.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["247_House 15_obj.obj", {url: new URL("./files/14dacf4b987e19356033495dfccd39174591cf07a57168946e51ac82c84fc7c6a46c1d86aabb3bbcc5b14fdf4b6f19052bde7af14d77c4639c4fb437b2f0a2a5.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["Doll-s house.obj", {url: new URL("./files/826d54fb8a025f799822e650a2881eb5716e6c9529ae8811acb90d748444e60498fd1c55f92bf925b55ad97d3450e9191ff735950a9c6902b0bc9afc5cc3b6dd.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["watchtower  B.obj", {url: new URL("./files/94e5b39af3164466cf24f300c00d43715ec130ee3c7ac8dc01fd4635ce36b8d8ce3b9150014680f69cbe7c29e6e3f81cc933b9f6710cf89f5cdead2ad0a88dbf.bin", import.meta.url), mimeType: "application/octet-stream", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("cube")).define("cube", ["array2Darray"], _cube);
  main.variable(observer("ground")).define("ground", ["cube","glMatrix"], _ground);
  main.variable(observer("groundBelow")).define("groundBelow", ["cube","glMatrix"], _groundBelow);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("beachHouse")).define("beachHouse", ["convertObjStr2Sc","FileAttachment"], _beachHouse);
  main.variable(observer("house")).define("house", ["convertObjStr2Sc","FileAttachment"], _house);
  main.variable(observer("watchTower")).define("watchTower", ["convertObjStr2Sc","FileAttachment"], _watchTower);
  main.variable(observer("dollHouse")).define("dollHouse", ["convertObjStr2Sc","FileAttachment"], _dollHouse);
  main.variable(observer("sphere")).define("sphere", ["THREE","array2Darray"], _sphere);
  main.variable(observer("sphereLowRes")).define("sphereLowRes", ["THREE","array2Darray"], _sphereLowRes);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("fetchImage")).define("fetchImage", ["getImageData"], _fetchImage);
  main.variable(observer("convertObjStr2Sc")).define("convertObjStr2Sc", ["webgl_obj_loader","array2Darray","computeNormals"], _convertObjStr2Sc);
  main.variable(observer("array2Darray")).define("array2Darray", _array2Darray);
  main.variable(observer()).define(["md"], _17);
  const child1 = runtime.module(define1);
  main.import("getImageData", child1);
  main.variable(observer("webgl_obj_loader")).define("webgl_obj_loader", ["require"], _webgl_obj_loader);
  main.variable(observer("computeNormals")).define("computeNormals", ["require"], _computeNormals);
  main.variable(observer("glMatrix")).define("glMatrix", ["require"], _glMatrix);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("THREE")).define("THREE", ["require"], _THREE);
  return main;
}
