// https://observablehq.com/@spattana/model-loaders@192
import define1 from "./55faae595525622e@211.js";

function _1(md){return(
md`# Model Loaders
Uses ThreeJs Loader to create SC models for Regl  
Currently Supports: Obj  and Collada file loading.  
You may try other type of files similarly.  
Note: This loader does not create elements array!  
Models sources:
rayman_2_mdl.ob: from [ModelResource](https://www.models-resource.com/dreamcast/rayman2thegreatescape/model/17577/),  
Flamingo.glb: flamingo by [mirada](http://mirada.com/) via downloaded from [ThreeJS](https://github.com/mrdoob/three.js/tree/master/examples/models/gltf).`
)}

function _2(md){return(
md`### Example`
)}

function _cameraSCs(createSCs,cameraObject){return(
createSCs(cameraObject)
)}

function _cameraObject(loadObjObject,camera_url){return(
loadObjObject(camera_url)
)}

async function _camera_url(FileAttachment){return(
await FileAttachment("video_camera.obj").url()
)}

function _flamingoObject(loadGLTFobject,Flamingo_url){return(
loadGLTFobject(Flamingo_url)
)}

async function _Flamingo_url(FileAttachment){return(
await FileAttachment("Flamingo.glb").url()
)}

function _raymanSCs(createSCs,raymanObject){return(
createSCs(raymanObject)
)}

function _raymanObject(loadObjObject,rayman_url){return(
loadObjObject(rayman_url)
)}

async function _rayman_url(FileAttachment){return(
await FileAttachment("rayman_2_mdl.obj").url()
)}

function _elfSCs(createSCs,elfObject){return(
createSCs(elfObject )
)}

function _elfObject(loadCOLLADAobject,elf_url){return(
loadCOLLADAobject(elf_url)
)}

function _elf_url(){return(
"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/collada/elf/elf.dae"
)}

function _arterySCs(createSCs,arteryObject){return(
createSCs(arteryObject)
)}

function _arteryObject(loadSTLobject,artery_url){return(
loadSTLobject(artery_url)
)}

async function _artery_url(FileAttachment){return(
await FileAttachment("artery-model2.stl").url()
)}

function _17(md){return(
md`### Useful functions`
)}

function _loadTDSObject(loadObject,THREE){return(
(url)=> loadObject(url, new THREE.TDSLoader())
)}

function _loadObjObject(loadObject,THREE){return(
(url)=> loadObject(url, new THREE.OBJLoader())
)}

function _loadCOLLADAobject(loadObject,THREE){return(
(url)=> loadObject(url, new THREE.ColladaLoader())
)}

function _loadSTLobject(loadObject,THREE){return(
(url)=> loadObject(url, new THREE.STLLoader())
)}

function _loadGLTFobject(loadObject,THREE){return(
(url)=> loadObject(url, new THREE.GLTFLoader())
)}

function _computeMatrix(mat4){return(
node => {
  const translation = node.position?[node.position.x,node.position.y,node.position.z]:[0,0,0];
  const quaternion = node.quaternion?[node.quaternion.x,node.quaternion.y,node.quaternion.z, node.quaternion.w]:[0,0,0,1];
  //const rotation = node.rotation?[node.rotation.x,node.rotation.y,node.rotation.z]:[0,0,0];// XYZ order
  const scale = node.scale.x ? [node.scale.x,node.scale.y,node.scale.z]:[1,1,1];
  //return node.scale.x
return mat4.fromRotationTranslationScale([], quaternion, translation, scale)
  return mat4.mul([],mat4.create(),mat4.fromRotationTranslationScale([], quaternion, translation, scale));
}
)}

function _24(computeMatrix,arteryObject){return(
computeMatrix(arteryObject)
)}

function _createSCs(mat4,d3,createSC){return(
obj => {
  const sceneGraph = {};
  let scs = [];
  if (obj.scene)getNode(obj.scene,mat4.create());
  else getNode(obj,mat4.create());
  
  function getNode(node,M)
  {
    const sc = {};
    sc.name = node.name;

    const translation = node.position?[node.position.x,node.position.y,node.position.z]:[0,0,0];
    const quaternion = node.quaternion?[node.quaternion.x,node.quaternion.y,node.quaternion.z, node.quaternion.w]:[0,0,0,1];
    //const rotation = node.rotation?[node.rotation.x,node.rotation.y,node.rotation.z]:[0,0,0];// XYZ order
    const scale = (node.scale&&node.scale.x)?[node.scale.x,node.scale.y,node.scale.z]:[1,1,1];
    
    sc.modelMatrix = mat4.mul([],M,mat4.fromRotationTranslationScale([], quaternion, translation, scale));
    
    if (node.geometry || node.attributes){
      const attributes = (node.geometry)?node.geometry.attributes:node.attributes;
      if (node.geometry && node.geometry.groups && node.geometry.groups.length > 0){
        const groups = node.geometry.groups;
        const localScs = d3.range(0, groups.length, 1).map(i=>{
          /*
          return{
            positions : array2Darray(attributes.position.array.slice(groups[i].start*3, (groups[i].start+groups[i].count)*3),3),
            normals : array2Darray(attributes.normal.array.slice(groups[i].start*3, (groups[i].start+groups[i].count)*3),3),
            uvs : array2Darray(attributes.uv.array.slice(groups[i].start*2, (groups[i].start+groups[i].count)*2),2)
          }
          */
          return createSC(attributes,groups[i].start,groups[i].start+groups[i].count)
          }
          );
        //return scs
        localScs.forEach((d,i)=>{
          //d.cells = d3.range(0,d.positions.length/3,1).map(i=>[i*3+0,i*3+1,i*3+2]);
          scs.push({name:sc.name, sc:d, modelMatrix: sc.modelMatrix});
        });
      }
      else{
        sc.sc = createSC(attributes);
        scs.push(sc);
      }
    }
    if (node.children)node.children.forEach(d=>getNode(d,sc.modelMatrix));    
  }
  return scs;
}
)}

function _createSC(vec3){return(
(attributes, start=0, count = undefined)=>{
  let positions = [], normals = [], uvs = [];
  if (count == undefined) count = attributes.position.array.length/3; 
  for (let i = 0; i < count; i++)                    
    positions.push([attributes.position.array[(start+i)*3], 
                    attributes.position.array[(start+i)*3+1], 
                    attributes.position.array[(start+i)*3+2]
                   ]); 
  if (attributes.normal){
    for (let i = 0; i < count; i++)                   
      normals.push([attributes.normal.array[(start+i)*3], 
                    attributes.normal.array[(start+i)*3+1],
                    attributes.normal.array[(start+i)*3+2]]);
  }
  else{
    for (let i = 0; i < count; i+=3) {
      const v0 = [attributes.position.array[(start+i)*9], 
                  attributes.position.array[(start+i)*9+1],
                  attributes.position.array[(start+i)*9+2]],
            v1 = [attributes.position.array[(start+i)*9+3], 
                  attributes.position.array[(start+i)*9+4],
                  attributes.position.array[(start+i)*9+5]],
            v2 = [attributes.position.array[(start+i)*9+6], 
                  attributes.position.array[(start+i)*9+7],
                  attributes.position.array[(start+i)*9+8]];
      const N = vec3.normalize([],vec3.cross([],vec3.sub([],v1,v0), vec3.sub([],v2,v0)));
      normals.push([N[0], N[1], N[2]]);
      normals.push([N[0], N[1], N[2]]);
      normals.push([N[0], N[1], N[2]]);
    }
  }
  if (attributes.uv){
    for (let i = 0; i < count; i++)                    
      uvs.push([attributes.uv.array[(start+i)*2], 
                attributes.uv.array[(start+i)*2+1]]);
  }
  else{
    for (let i = 0; i < count; i++)                    
      uvs.push([0.5,0.5]);
  }
  return{
    positions : positions,
    normals : normals,
    uvs : uvs
  }
}
)}

function _loadObject(){return(
(url, loader) => new Promise ((resolve,reject) => {
  // instantiate a loader
  loader.load(
	  // resource URL
    url,
  	// called when resource is loaded
	  function ( object ) {
      resolve(object);
  	},
	  // called when loading is in progresses
	  function ( xhr ) {
		  return ( xhr.loaded / xhr.total * 100 ) + '% loaded' ;
  	},
	  // called when loading has errors
	  function ( error ) {
      reject ("Error in loading")
	  }
  );
})
)}

function _28(md){return(
md `### Libraries and Imports`
)}

function _mat4(glMatrix){return(
glMatrix.mat4
)}

function _vec3(glMatrix){return(
glMatrix.vec3
)}

function _glMatrix(require){return(
require('https://bundle.run/gl-matrix@3.3.0')
)}

function _d3(require){return(
require("d3@5")
)}

async function _THREE(require)
{
  const THREE = (window.THREE = await require("three"));
  await require("three/examples/js/loaders/ColladaLoader.js").catch(
    () => {}
  );
  await require("three/examples/js/loaders/OBJLoader.js").catch(
    () => {}
  );
  await require("three/examples/js/loaders/STLLoader.js").catch(
    () => {}
  );
  await require("three/examples/js/loaders/GLTFLoader.js").catch(
    () => {}
  );
  await require("three/examples/js/loaders/TDSLoader.js").catch(
    () => {}
  );
  return THREE;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["rayman_2_mdl.obj", {url: new URL("./files/c1fc0d2fbf2bed5669afae79d4c0e896701b9e7257924c92a873b376bb2e65d7c217aeb899c11088d648cf89535a89089cdabff9da336ba7e6a739dd5e20a5cf.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["artery-model2.stl", {url: new URL("./files/0bbcf255d498f0b442f986ebe9468fcffd3ebd0d6ec590bcf456ec80bbe8b175bfe74088e693a8cbdec9ed732fd49fa7bf95c01558e762719bfd9838f597f85e.stl", import.meta.url), mimeType: "model/stl", toString}],
    ["Flamingo.glb", {url: new URL("./files/3781d7389142db9c5242a3c3e1bc3ea31304e19429d9f751dba1f5ce572240c66063141a8f6ca081a2e985862470e98d9ca1013773f8ff1c344987127370958a.glb", import.meta.url), mimeType: "model/gltf-binary", toString}],
    ["video_camera.obj", {url: new URL("./files/0a7b63f1155a1d788eac2a32351d3cd594521765918479a9bf243d77858add5752c961ef0fa7c39943249521d49985e593060d7dcf7a3b458da1ad22aadfd4f8.bin", import.meta.url), mimeType: "application/octet-stream", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("cameraSCs")).define("cameraSCs", ["createSCs","cameraObject"], _cameraSCs);
  main.variable(observer("cameraObject")).define("cameraObject", ["loadObjObject","camera_url"], _cameraObject);
  main.variable(observer("camera_url")).define("camera_url", ["FileAttachment"], _camera_url);
  main.variable(observer("flamingoObject")).define("flamingoObject", ["loadGLTFobject","Flamingo_url"], _flamingoObject);
  main.variable(observer("Flamingo_url")).define("Flamingo_url", ["FileAttachment"], _Flamingo_url);
  main.variable(observer("raymanSCs")).define("raymanSCs", ["createSCs","raymanObject"], _raymanSCs);
  main.variable(observer("raymanObject")).define("raymanObject", ["loadObjObject","rayman_url"], _raymanObject);
  main.variable(observer("rayman_url")).define("rayman_url", ["FileAttachment"], _rayman_url);
  main.variable(observer("elfSCs")).define("elfSCs", ["createSCs","elfObject"], _elfSCs);
  main.variable(observer("elfObject")).define("elfObject", ["loadCOLLADAobject","elf_url"], _elfObject);
  main.variable(observer("elf_url")).define("elf_url", _elf_url);
  main.variable(observer("arterySCs")).define("arterySCs", ["createSCs","arteryObject"], _arterySCs);
  main.variable(observer("arteryObject")).define("arteryObject", ["loadSTLobject","artery_url"], _arteryObject);
  main.variable(observer("artery_url")).define("artery_url", ["FileAttachment"], _artery_url);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("loadTDSObject")).define("loadTDSObject", ["loadObject","THREE"], _loadTDSObject);
  main.variable(observer("loadObjObject")).define("loadObjObject", ["loadObject","THREE"], _loadObjObject);
  main.variable(observer("loadCOLLADAobject")).define("loadCOLLADAobject", ["loadObject","THREE"], _loadCOLLADAobject);
  main.variable(observer("loadSTLobject")).define("loadSTLobject", ["loadObject","THREE"], _loadSTLobject);
  main.variable(observer("loadGLTFobject")).define("loadGLTFobject", ["loadObject","THREE"], _loadGLTFobject);
  main.variable(observer("computeMatrix")).define("computeMatrix", ["mat4"], _computeMatrix);
  main.variable(observer()).define(["computeMatrix","arteryObject"], _24);
  main.variable(observer("createSCs")).define("createSCs", ["mat4","d3","createSC"], _createSCs);
  main.variable(observer("createSC")).define("createSC", ["vec3"], _createSC);
  main.variable(observer("loadObject")).define("loadObject", _loadObject);
  main.variable(observer()).define(["md"], _28);
  const child1 = runtime.module(define1);
  main.import("array2Darray", child1);
  main.variable(observer("mat4")).define("mat4", ["glMatrix"], _mat4);
  main.variable(observer("vec3")).define("vec3", ["glMatrix"], _vec3);
  main.variable(observer("glMatrix")).define("glMatrix", ["require"], _glMatrix);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("THREE")).define("THREE", ["require"], _THREE);
  return main;
}
