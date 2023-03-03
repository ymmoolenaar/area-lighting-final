// https://observablehq.com/@spattana/ply-data-for-regl@211
function _1(md){return(
md`# PLY2SC
Uses ThreeJS PLYLoader to load the data and covert to sc format
Usage:
- *ply2sc_fromURL*(url, scaled) : *scaled* to scale and translate to fit in to WebGL clipbox.
  - ex: ply2sc_fromURL("https://threejs.org/examples/models/ply/ascii/dolphins.ply", 1)
- *ply2sc_fromBlob*(blob, scaled) : *scaled* to scale and translate to fit in to WebGL clipbox.
  - ex: Assuming you have attached dolphins.ply file to your notebook, do the following
    - ply2sc_fromBlob(await FileAttachment("dolphins.ply").blob(),1)
  - See https://people.sc.fsu.edu/~jburkardt/data/ply/ for a collection of PLY files.
- *ply2Sc* is an alia for plysc_fromBlob
`
)}

function _scaledSC(d3,translateScale,computeNormals){return(
(obj)=>{
  const xExtent = d3.extent(obj.positions,d=>d[0]);
  const yExtent = d3.extent(obj.positions,d=>d[1]);
  const zExtent = d3.extent(obj.positions,d=>d[2]);
  
  const centerX = (xExtent[0]+xExtent[1])*0.5;
  const centerY = (yExtent[0]+yExtent[1])*0.5;
  const centerZ = (zExtent[0]+zExtent[1])*0.5;
  
  const xLength = (xExtent[1]-xExtent[0]);
  const yLength = (yExtent[1]-yExtent[0]);
  const zLength = (zExtent[1]-zExtent[0]);
  
  const maxScale = Math.max(xLength,yLength,zLength)*0.5;

  const sObj = {
    positions: translateScale(obj.positions, [-centerX,-centerY,-centerZ],1/maxScale)
  };
  if (obj.normals) sObj.normals = obj.normals.slice();
  if (obj.cells){
    sObj.cells = obj.cells.slice();
    if (!sObj.normals) sObj.normals = computeNormals(obj.cells,obj.positions);
  }
  return sObj;
}
)}

function _translateScale(){return(
(P,tx,s)=>P.map(d=>[(d[0]+tx[0])*s,(d[1]+tx[1])*s, (d[2]+tx[2])*s])
)}

function _4(d3){return(
d3.blob("https://threejs.org/examples/models/ply/ascii/dolphins.ply")
)}

function _ply2sc_fromURL(d3,ply2sc){return(
(url,scaled)=>{
  const blob = d3.blob(url);
  if (blob) return ply2sc(blob,scaled);
  else return null;
}
)}

function _ply2sc_fromBlob(ply2sc){return(
ply2sc
)}

function _ply2sc(THREE,array2Darray,computeNormals,scaledSC){return(
async function (blob,scaled) {
  const plyLoader = new THREE.PLYLoader();
  const url = URL.createObjectURL(blob);
  const ply = await new Promise(resolve => plyLoader.load(url, ply => resolve(ply)));
  const sc = {
  };
  Object.keys(ply.attributes).forEach(
    d=>{
      if (d==="position")sc.positions = array2Darray(ply.attributes.position.array,3);
      else if (d==="normal")sc.normals = array2Darray(ply.attributes.normal.array,3);
      else if (d=="uv")sc.normals = array2Darray(ply.attributes.uv.array,2);
    }
  );
  
  if (ply.index) {
    sc.cells = array2Darray(ply.index.array,3);
    if (!sc.normals)sc.normals = computeNormals(sc.cells,sc.positions);
  }
  return scaled?scaledSC(sc):sc;
}
)}

function _array2Darray(){return(
(A,n)=>Array.from(A).reduce((a, c, i,data) => {
        return i % n === 0 ? a.concat([data.slice(i, i + n)]) : a;
      }, [])
)}

function _9(md){return(
md`## Require Libraries`
)}

function _d3(require){return(
require("d3@5")
)}

function _computeNormals(require){return(
require('https://bundle.run/angle-normals@1.0.0')
)}

async function _THREE(require)
{
  const THREE = window.THREE = await require('three/build/three.min.js');
  await require('three/examples/js/controls/OrbitControls.js').catch(() => {});
  await require('three/examples/js/loaders/PLYLoader.js').catch(() => {});
  return THREE;
}


function _parse_ply(require){return(
require("https://bundle.run/parse-ply")
)}

function _14(md){return(
md`See how to [require stubborn modules](https://observablehq.com/@observablehq/how-to-require-stubborn-modules).`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("scaledSC")).define("scaledSC", ["d3","translateScale","computeNormals"], _scaledSC);
  main.variable(observer("translateScale")).define("translateScale", _translateScale);
  main.variable(observer()).define(["d3"], _4);
  main.variable(observer("ply2sc_fromURL")).define("ply2sc_fromURL", ["d3","ply2sc"], _ply2sc_fromURL);
  main.variable(observer("ply2sc_fromBlob")).define("ply2sc_fromBlob", ["ply2sc"], _ply2sc_fromBlob);
  main.variable(observer("ply2sc")).define("ply2sc", ["THREE","array2Darray","computeNormals","scaledSC"], _ply2sc);
  main.variable(observer("array2Darray")).define("array2Darray", _array2Darray);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("computeNormals")).define("computeNormals", ["require"], _computeNormals);
  main.variable(observer("THREE")).define("THREE", ["require"], _THREE);
  main.variable(observer("parse_ply")).define("parse_ply", ["require"], _parse_ply);
  main.variable(observer()).define(["md"], _14);
  return main;
}
