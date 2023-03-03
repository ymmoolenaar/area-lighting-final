// https://observablehq.com/@spattana/scaled-teapot@142
import define1 from "./ebae0c172bd689cc@102.js";
import define2 from "./4999f76212508574@211.js";

function _1(md){return(
md`# Scaled Objects from OBJ models
Here are a couple of modesl that I have parsed from OBJ models and scaled to fit into WebGL ClipBox (the coordinate ranges within -1 to +1). They are:   
*scaledTeapot*, *scaledCow*, *scaledTeddy*, *scaledBoy*, *scaledWindmill*.  
You may download OBJ model files from web and attach to you notebook and use the following steps to get you data.  
*scaledSC(obj2sc(await FileAttachment("teapot.obj").text()))*   
  Replace *teapot.obj* by your .obj file.  
Make sure that you have imported *scaledSC* and *obj2sc* by adding the following import statements to your notebook.  
*import {scaledSC} from "@spattana/ply-data-for-regl"*  
*import {obj2sc} from "@spattana/obj-parser-obj2sc"*  
You may also try to use URL (note that not all URLs allow download access through from webpage! You will know that if you get "TypeError: Failed to fetch") as follows.  
*scaledSC(obj2sc(await d3.text("https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj")))*  
Use your url in place as the argument to *d3.text* method.

**Note**: Scaled models are to get started on WebGL programming. Once we learn about Camera and related transformations we do not need any prescaling or our mesh geometry. You can then simply use *obj2sc* functions to parse .obj files. No need of *scaledSC* method.
`
)}

function _scaledTeapot(scaledSC,teapot){return(
scaledSC(teapot)
)}

async function _teapot(obj2sc,FileAttachment,computeNormals)
{
  const obj = obj2sc(await FileAttachment("teapot.obj").text());
  if (!obj.normals) obj.normals = computeNormals(obj.cells,obj.positions);
  return obj
}


async function _cow(obj2sc,FileAttachment,computeNormals)
{
  const obj = obj2sc(await FileAttachment("cow.obj").text());
  if (!obj.normals) obj.normals = computeNormals(obj.cells,obj.positions);
  return obj;
}


function _scaledCow(scaledSC,cow){return(
scaledSC(cow)
)}

async function _cesna(obj2sc,FileAttachment,computeNormals)
{
  const obj = obj2sc(await FileAttachment("cessna.obj").text());
  if (!obj.normals) obj.normals = computeNormals(obj.cells,obj.positions);
  return obj;
}


function _scaledCesna(scaledSC,cesna){return(
scaledSC(cesna)
)}

async function _teddy(obj2sc,FileAttachment,computeNormals)
{
  const obj = obj2sc(await FileAttachment("teddy.obj").text());
  if (!obj.normals) obj.normals = computeNormals(obj.cells,obj.positions);
  return obj;
}


function _scaledTeddy(scaledSC,teddy){return(
scaledSC(teddy)
)}

async function _scaledWindmill(scaledSC,obj2sc,d3){return(
scaledSC(obj2sc(await d3.text("https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj")))
)}

function _teapotObj(FileAttachment){return(
FileAttachment("teapot.obj").text()
)}

function _scaledBoy(scaledSC,boy){return(
scaledSC(boy)
)}

function _boy(obj2sc,boyObj){return(
obj2sc(boyObj)
)}

function _boyObj(FileAttachment){return(
FileAttachment("BoyOBJ.obj").text()
)}

function _computeNormals(require){return(
require('https://bundle.run/angle-normals@1.0.0')
)}

function _d3(require){return(
require("d3@5")
)}

function _threejs(require){return(
require("three")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["teapot.obj", {url: new URL("./files/d1652511080b6593a3eb5e9ce6dc9aa886a65015ba49b361ea5583e91aa9ffe76b822c494cee5f6f0bfefba9ff76ce8f55e9fbf170f816e02707f9edeccf96e0.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["BoyOBJ.obj", {url: new URL("./files/60f4958fe3739037c4330662b193a0651d3cec40746c44cd3c047e6b359b755b44c5fef73b71ec2be9945fdbcad9cfce0cbe9463c25acbb2aa8f08e608fe914d.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["teddy.obj", {url: new URL("./files/ac9cf416616bff050e042f9d4b03ef219077b0f748d2cf66bcd13558f65c819dce4e038a550119a5170a4fbf422bd581ea0a4a076036b75f0d8afe3e95b4f0e6.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["cow.obj", {url: new URL("./files/b34711587ec641e2f8d86172546d0a6d128e7e8d6dfbcf112070ffcb9fcd93016345283a6f9f6c385b962c1d3cc1e93e87fed62ab8eb37b882022596502faa61.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["cessna.obj", {url: new URL("./files/7048ae3b7c9b25b1e47942fdc61babc099bf8ea76925ce6c22b3f4965d44f549bfd5f88113220ced6753b86210824457193899dc095f5fe7255b726327597964.bin", import.meta.url), mimeType: "application/octet-stream", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("scaledTeapot")).define("scaledTeapot", ["scaledSC","teapot"], _scaledTeapot);
  main.variable(observer("teapot")).define("teapot", ["obj2sc","FileAttachment","computeNormals"], _teapot);
  main.variable(observer("cow")).define("cow", ["obj2sc","FileAttachment","computeNormals"], _cow);
  main.variable(observer("scaledCow")).define("scaledCow", ["scaledSC","cow"], _scaledCow);
  main.variable(observer("cesna")).define("cesna", ["obj2sc","FileAttachment","computeNormals"], _cesna);
  main.variable(observer("scaledCesna")).define("scaledCesna", ["scaledSC","cesna"], _scaledCesna);
  main.variable(observer("teddy")).define("teddy", ["obj2sc","FileAttachment","computeNormals"], _teddy);
  main.variable(observer("scaledTeddy")).define("scaledTeddy", ["scaledSC","teddy"], _scaledTeddy);
  main.variable(observer("scaledWindmill")).define("scaledWindmill", ["scaledSC","obj2sc","d3"], _scaledWindmill);
  main.variable(observer("teapotObj")).define("teapotObj", ["FileAttachment"], _teapotObj);
  main.variable(observer("scaledBoy")).define("scaledBoy", ["scaledSC","boy"], _scaledBoy);
  main.variable(observer("boy")).define("boy", ["obj2sc","boyObj"], _boy);
  main.variable(observer("boyObj")).define("boyObj", ["FileAttachment"], _boyObj);
  main.variable(observer("computeNormals")).define("computeNormals", ["require"], _computeNormals);
  const child1 = runtime.module(define1);
  main.import("obj2sc", child1);
  const child2 = runtime.module(define2);
  main.import("scaledSC", child2);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("threejs")).define("threejs", ["require"], _threejs);
  return main;
}
