// https://observablehq.com/@ymmoolenaar/area-lighting-final@1926
import define1 from "./aba9cabe9ad6f6b8@2338.js";
import define2 from "./3b9492a508c57759@2163.js";
import define3 from "./c6c364132586c706@177.js";
import define4 from "./f22ba75da5716db3@8291.js";
import define5 from "./77ea1790ab65dafe@1206.js";
import define6 from "./55faae595525622e@211.js";
import define7 from "./2180fcbe75883db9@142.js";
import define8 from "./ebae0c172bd689cc@102.js";
import define9 from "./e93997d5089d7165@2303.js";
import define10 from "./a8bdf662afec8213@389.js";
import define11 from "./10023e7d8ddc32bc@90.js";

function _1(md){return(
md`# Area Lighting (Final)`
)}

function _2(md){return(
md`## Polygonal Lighting`
)}

function _polygonViewParameters(columns,slider){return(
columns({
 eyeDistance: slider({
    min: 0.1, 
    max: 10, 
    step: 0.1, 
    value: 2.1, 
    title: "Eye Distance from Scene Center"
  }),
  xAngle: slider({
    min: -89, 
    max: 0, 
    step: 1, 
    value: -40, 
    title: "Rotation Around X-axis in degrees"
  }),
  yAngle : slider({
    min: -180, 
    max: 180, 
    step: 1, 
    value: 0, 
    title: "Rotation around Y-axis in degrees"
  })
})
)}

function _polygonLightParameters(columns,slider){return(
columns({

  translatex : slider({
    min: -10, 
    max: 10, 
    step: 1, 
    value: 0, 
    title: "Translate Light along X-axis"
  }),
   translatey : slider({
    min: 0, 
    max: 10, 
    step: 1, 
    value: 0, 
    title: "Translate Light along Y-axis"
  }),
   translatez : slider({
    min: -10, 
    max: 10, 
    step: 1, 
    value: 0, 
    title: "Translate Light along Z-axis"
  })
})
)}

function _polygonPara(columns,slider){return(
columns({  
  roughness : slider({
    min: 0.1, 
    max: 1, 
    step: 0.1, 
    value: 0.3, 
    title: "Roughness"
  }),
  F0 : slider({
    min: 0.1, 
    max: 1, 
    step: 0.1, 
    value: 0.2, 
    title: "Fresnel Parameter"
  }),
  numpoints : slider({
    min: 1, 
    max: 100, 
    step: 1, 
    value: 1, 
    title: "Number of Sample Points"
  })
})
)}

function _polygonRotations(columns,slider,radio){return(
columns({
  rz : slider({
    min: 0, 
    max: 360, 
    step: 1, 
    value: 0, 
    title: "Rotatation in Z direction"
  }),
  rY : slider({
    min: 0, 
    max: 360, 
    step: 1, 
    value: 0, 
    title: "Rotatation in Y direction"
  }),
  metallic:radio({
    title: "Metallic?",
    options: [{label:"Yes",value:"1.0"}, {label: "No",value:"0.0"}],
    value: "1.0"
  })
})
)}

function _polygonExtras(columns,color,radio){return(
columns({
  color : color({
    value: "#ffffff",
    title:"Material Color"
  }),
  color2 : color({
    value: "#ffffff",
    title:"Specular Color"
  }),
  shape : radio({
    description: 'Choose shape',
    options: [{label:"Triangle",value:"0"},{label:"Rectangle",value:"1"},{label:"pentagon",value:"2"}],
    value: '1'
  }),
  samp : radio({
    description: 'Choose sample',
    options: [{label:"vandercorpus",value:"0"},{label:"Random",value:"1"}],
    value: '1'
  }),
  sampbool : radio({
    description: 'Choose sample',
    options: [{label:" no sampling",value:"0"},{label:"sampling",value:"1"}],
    value: '1'
  })
})
)}

function _polyCanvas(html){return(
html `<canvas width=900, height=400/>`
)}

function _9(polygongl,PolygonRenderablerectangle,polygonCamera,ground,polygonLightProperties,corners,PolygonrenderableLight,polygons,polygonExtras,PolygonRenderableTriangle,PolygonRenderablePentagon,PolygonRenderSampleRect,PolygonRenderSampleTri,PolygonrenderSamplepentagon)
{
  polygongl.clear({color: [0.5, 0.5, 0.6, 1]});

  
  const renderMirror = polygongl(PolygonRenderablerectangle(polygonCamera, ground, polygonLightProperties, corners));
  const renderlight = polygongl(PolygonrenderableLight(polygonCamera, polygons[parseInt(polygonExtras.shape)], polygonLightProperties));

  const renderTriplane = polygongl(PolygonRenderableTriangle(polygonCamera, ground, polygonLightProperties, corners));
  const renderpenta = polygongl(PolygonRenderablePentagon(polygonCamera, ground, polygonLightProperties, corners));
  
  const rendersamplemrect = polygongl(PolygonRenderSampleRect(polygonCamera, ground, polygonLightProperties, corners));

  const rendersampleTriplane = polygongl(PolygonRenderSampleTri(polygonCamera, ground, polygonLightProperties, corners));
  
  const rendersamplepenta = polygongl(PolygonrenderSamplepentagon(polygonCamera, 
                                                                  ground, 
                                                                  polygonLightProperties, 
                                                                  corners));  
  renderlight();
  //triangle reflections
  if(polygonExtras.shape == 0)
  {
    if(polygonExtras.sampbool == 1)
    {
      rendersampleTriplane();
    }
    else if(polygonExtras.sampbool == 0)
    {
        renderTriplane();
    }
  }
  //rectangle
  else if(polygonExtras.shape == 1)
  {
    if(polygonExtras.sampbool == 1)
    {
      rendersamplemrect();
    }
    else if(polygonExtras.sampbool == 0)
    {
         renderMirror();
    }
   
  }
  //pentagon
  else if(polygonExtras.shape == 2)
  {
    if(polygonExtras.sampbool == 1)
    {
      rendersamplepenta();
    }
    else if(polygonExtras.sampbool == 0)
    {
         renderpenta();
    }
    
  }
  return `Polygon/Rectangle Rendering`
}


function _polygongl(createGL,polyCanvas){return(
createGL(polyCanvas)
)}

function _polygonCamera(polygonViewMatrix,polygonPerspectiveMatrix,polygonEye){return(
{
  viewMatrix: polygonViewMatrix,
  projectionMatrix: polygonPerspectiveMatrix,
  eyePosition: polygonEye,
}
)}

function _polygonLightProperties(hex2rgb,polygonExtras,polygonRotations,polygonPara,polygonLightPosition,lightModelMatrix){return(
{
    matcolor: hex2rgb(polygonExtras.color),
    metallic: parseFloat(polygonRotations.metallic),
    specColor: hex2rgb(polygonExtras.color2),
    F0: polygonPara.F0,
    truesample: parseInt(polygonExtras.samp),
    roughness : polygonPara.roughness,
    numpoints : polygonPara.numpoints,
    lightposition:polygonLightPosition,
    modelMatrix: lightModelMatrix,
  }
)}

function _corners(glMatrix,polygonLightPosition,yax,zax)
{
 
  let v0 = glMatrix.vec3.add([],polygonLightPosition,[ -5, -5, 0])
  let v1 = glMatrix.vec3.add([],polygonLightPosition,[  5, -5, 0])
  let v2 = glMatrix.vec3.add([],polygonLightPosition,[  5,  5, 0])
  let v3 = glMatrix.vec3.add([],polygonLightPosition,[  -5, 5, 0])
  
  //formerly corners2.v2 and corners3.v3
  let v4 = glMatrix.vec3.add([],polygonLightPosition,[  0,  5, 0])
  //formerly corners3.v2
  let v5 = glMatrix.vec3.add([],polygonLightPosition,[  10, 0, 0])
  //formerly corners3.v4
  let v6 = glMatrix.vec3.add([],polygonLightPosition,[  -10, 0,0])
  
  //yz = yax(zax(vertices))
  v0 = yax(zax(v0))
  v1 = yax(zax(v1))
  v2 = yax(zax(v2))
  v3 = yax(zax(v3))
  v4 = yax(zax(v4))
  v5 = yax(zax(v5))
  v6 = yax(zax(v6))
  
  return { v0, v1, v2, v3, v4, v5, v6 };
}


function _yax(glMatrix,polygonRotations){return(
function yax(vertercies)
{
  var v0 = glMatrix.vec3.create()
  v0[0] = vertercies[0]*Math.cos(glMatrix.glMatrix.toRadian(polygonRotations.rY)) + 
    Math.sin(glMatrix.glMatrix.toRadian(polygonRotations.rY)) * vertercies[2]
  v0[1] = vertercies[1]
  v0[2] = -vertercies[0]*Math.sin(glMatrix.glMatrix.toRadian(polygonRotations.rY)) + 
    Math.cos(glMatrix.glMatrix.toRadian(polygonRotations.rY)) * vertercies[2]
  return v0
}
)}

function _zax(glMatrix,polygonRotations){return(
function zax(vertercies)
{
  var v0 = glMatrix.vec3.create()
  v0[0] = vertercies[0]*Math.cos(glMatrix.glMatrix.toRadian(polygonRotations.rz)) - 
    Math.sin(glMatrix.glMatrix.toRadian(polygonRotations.rz))* (vertercies[1])
  v0[1] = vertercies[0]*Math.sin(glMatrix.glMatrix.toRadian(polygonRotations.rz)) + 
    Math.cos(glMatrix.glMatrix.toRadian(polygonRotations.rz))* (vertercies[1])
  v0[2] = vertercies[2]
  return v0
}
)}

function _lightModelMatrix(polygonLightdimensions,glMatrix,polygonLightParameters,polygonRotations)
{
  const s = polygonLightdimensions.radius / 20;
  const scaleMatrix = glMatrix.mat4.fromScaling([],[s,s,s]);
  
  const translationMatrix = glMatrix.mat4.fromTranslation([],
                                                          [polygonLightParameters.translatex, 
                                                           polygonLightParameters.translatey, 
                                                           polygonLightParameters.translatez]);
  
  var rZ = glMatrix.mat4.identity([]);
  const rotate = glMatrix.mat4.fromZRotation([], glMatrix.glMatrix.toRadian(polygonRotations.rz));
  const rotateY = glMatrix.mat4.fromYRotation([], glMatrix.glMatrix.toRadian(polygonRotations.rY));
  
  var view = glMatrix.mat4.identity([]);
  view = glMatrix.mat4.multiply(view, view, rotateY);
  view = glMatrix.mat4.multiply(view, view, rotate);
  view = glMatrix.mat4.multiply(view, view, translationMatrix);
  
  return view // Light is centered at origin.
}


function _polygonViewMatrix(polygonLightdimensions,polygonViewParameters,objectDimensions,glMatrix,rotationMatrix)
{
  const center = polygonLightdimensions.center;
  const D = polygonViewParameters.eyeDistance * objectDimensions.radius;
  const viewDirection = glMatrix.vec3.transformMat4([],[0,0,1],rotationMatrix);
  const eye = glMatrix.vec3.scaleAndAdd([],center,viewDirection, D);
  const up = [0, 1, 0];
  
  return glMatrix.mat4.lookAt([], eye, center, [0,1,0])
}


function _polygonPerspectiveMatrix(polyCanvas,objectDimensions,glMatrix)
{
  const aspect = polyCanvas.width/polyCanvas.height;
  const near = 0.001*objectDimensions.radius;
  const far = 10*objectDimensions.radius;
  
  return glMatrix.mat4.perspective([], glMatrix.glMatrix.toRadian(45), aspect, near, far)
}


function _rotationMatrix(glMatrix,polygonViewParameters)
{
  let xRotationMatrix = glMatrix.mat4.fromXRotation([],glMatrix.glMatrix.toRadian(polygonViewParameters.xAngle))
  let yRotationMatrix = glMatrix.mat4.fromYRotation([],glMatrix.glMatrix.toRadian(polygonViewParameters.yAngle))
  
  return glMatrix.mat4.multiply([],yRotationMatrix,xRotationMatrix);
}


function _polygonEye(objectDimensions,polygonViewParameters,glMatrix,rotationMatrix)
{
  const center = objectDimensions.center;
  const D = polygonViewParameters.eyeDistance * objectDimensions.radius;
  const viewDirection = glMatrix.vec3.transformMat4([],[0,0,1],rotationMatrix);
  const eye = glMatrix.vec3.scaleAndAdd([],center,viewDirection, D);
  
  return eye;
}


function _polygonLightPosition(glMatrix,polygonLightdimensions,polygonLightParameters)
{
  return glMatrix.vec3.scaleAndAdd([], 
                                   polygonLightdimensions.center, 
                                   [polygonLightParameters.translatex, 
                                    polygonLightParameters.translatey, 
                                    polygonLightParameters.translatez
                                   ],
                                   1);
}


function _polygonLightDirection(glMatrix){return(
glMatrix.vec3.rotateY([],[0,2,0],[0,0,2],glMatrix.glMatrix.toRadian(0))
)}

function _sphereLow(THREE,array2Darray)
{
  const sphereGeometry = new THREE.SphereBufferGeometry(3,8,8);

  return {
    positions : array2Darray(sphereGeometry.attributes.position.array,3),
    normals : array2Darray(sphereGeometry.attributes.normal.array,3),
    uvs : array2Darray(sphereGeometry.attributes.uv.array,2),
    cells : array2Darray(sphereGeometry.index.array,3)
  }
}


function _polygonLightdimensions(getScDimensions,polygons,polygonExtras){return(
getScDimensions(polygons[+polygonExtras.shape])
)}

function _polygons(Triangle,Rectangle,Pentagon){return(
[Triangle,Rectangle,Pentagon]
)}

function _Triangle(){return(
{
  positions:[[-5,-5,0],[5,-5,0],[0,5,0]],
  normals:[[0,1,0],[0,1,0],[0,1,0]],
  cells:[[0,1,2]]
}
)}

function _Rectangle(){return(
{
  positions:[[-5,-5,0],[5,-5,0],[5,5,0],[-5,5,0]],
  normals:[[0,1,0],[0,1,0],[0,1,0],[0,1,0]],
  cells:[[0,1,2],[2,3,0]]
}
)}

function _Pentagon(){return(
{
  positions:[[-5,-5,0],[5,-5,0],[10,0,0],[0,5,0],[-10,0,0]],
  normals:[[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0]],
  cells:[[0,1,2],[2,3,0],[0,3,4]]
}
)}

function _29(md){return(
md`## Tube Lighting`
)}

function _tubeView(columns,slider){return(
columns({
 eyeDistance: slider({
    min: 0.1, 
    max: 10, 
    step: 0.1, 
    value: 2.7, 
    title: "Eye Distance from the Scene Center",
  }),
  xAngle: slider({
    min: -60, 
    max: -15, 
    step: 1, 
    value: -35, 
    title: "Rotation Around X-axis in degrees",
  }),
  yAngle : slider({
    min: -180, 
    max: 180, 
    step: 1, 
    value: -90, 
    title: "Rotation around Y-axis in degrees",
  }),
  fov: slider({
    min: 15, 
    max: 120, 
    step: 1, 
    value: 45, 
    title: "Vertical FOV in Degrees",
  })
})
)}

function _tubeLightMove(columns,slider){return(
columns({
  x: slider({
  min: -100, 
  max: 100, 
  value: 0, 
  step: 0.1, 
  title: "Translate Light along X-axis"
}),
  y: slider({
  min: 50, 
  max: 150, 
  value: 71.2, 
  step: 0.1, 
  title: "Translate Light along Y-axis"
}),
  z: slider({
  min: -30, 
  max: 90, 
  value: 32.5, 
  step: 0.1, 
  title: "Translate Light along Z-axis"
})
})
)}

function _tubeLightRotate(columns,slider){return(
columns({
  x: slider({
  min: -180, 
  max: 180, 
  value: -16.1, 
  step: 0.1, 
  title: "Rotate Light around X-axis"
}),
  y: slider({
  min: -120, 
  max: 180, 
  value: 7.5, 
  step: 0.1, 
  title: "Rotate Light around Y-axis"
}),
  scalingFactor: slider({
    min: 0.1, 
    max: 2, 
    step: 0.1, 
    value: 0.7, 
    title: "Scale Light"
})
})
)}

function _tubeBRDF_params(columns,slider,radio){return(
columns({
  roughness:slider({
    title: "Roughness of specular highlight",
    min: .1, 
    max: .5, 
    step: .01, 
    value: 0.18
  }),
  luminosity:slider({
    title: "Luminosity",
    min: 1.0, 
    max: 2.0, 
    step: .01, 
    value: 1.52
  }),
  metallic:radio({
    title: "Metallic?",
    options: [{label:"Yes",value: 5.0}, {label: "No",value: 1.0}],
    value: 1.0
  })
})
)}

function _tubeExtra(columns,color,slider,radio){return(
columns({
  tubeMaterialColor: color({
  value: "#ffffff",
  description:"Material Color"
  }),
  numOfsamples: slider({
    title: "Number of Samples",
    min: 1, 
    max: 100, 
    step: 1, 
    value: 50
  }),
  sampling: radio({
    options:[
      {label: "No Sampling", value: 0},
      {label: "Random Sampling", value: 1}
    ],
    value: 0
  })
})
)}

function _tubeCanvas(html){return(
html `<canvas width=900, height=400/>`
)}

function _36(tubegl,tubeExtra,tubeSamplingObject,tubeCamera,shape,tubeLightProperties,tubeRenderableObject,tubeRenderableLight)
{
  tubegl.clear({color: [0.5, 0.5, 0.6, 1]});
  let renderObject = null;

  if(tubeExtra.sampling == 1)
    renderObject = tubegl(tubeSamplingObject(tubeCamera, shape, tubeLightProperties));
  else
    renderObject = tubegl(tubeRenderableObject(tubeCamera, shape, tubeLightProperties));
  
  const renderLight = tubegl(tubeRenderableLight(tubeCamera, tubeLightProperties));
  
  renderObject();
  renderLight(); // Optional. In case you want to see the location/orientation of the light source.
  
  return `Main Tube Light Rendering`
}


function _tubegl(createGL,tubeCanvas){return(
createGL(tubeCanvas)
)}

function _tubeCamera(tubeEyePosition,tubeViewMatrix,tubeLightPerspectiveMatrix){return(
{
    eye: tubeEyePosition,
    viewMatrix: tubeViewMatrix,
    projectionMatrix: tubeLightPerspectiveMatrix
}
)}

function _tubeEyePosition(objectDimensions,tubeView,glMatrix,tubeRotationMatrix)
{
  const center = objectDimensions.center;
  const D = tubeView.eyeDistance * objectDimensions.radius;
  const viewDirection = glMatrix.vec3.transformMat4([],[0,0,1],tubeRotationMatrix);
  const eye = glMatrix.vec3.scaleAndAdd([],center,viewDirection, D);
  
  return eye;
}


function _tubeRotationMatrix(glMatrix,tubeView)
{
  let yRotationMatrix = glMatrix.mat4.fromYRotation([],glMatrix.glMatrix.toRadian(tubeView.yAngle));
  let xRotationMatrix = glMatrix.mat4.fromXRotation([],glMatrix.glMatrix.toRadian(tubeView.xAngle))
  
  return glMatrix.mat4.multiply([],yRotationMatrix,xRotationMatrix);
}


function _tubeViewMatrix(tubeLightDimensions,tubeView,glMatrix,tubeRotationMatrix)
{
  const center = tubeLightDimensions.center;
  const D = tubeView.eyeDistance * tubeLightDimensions.radius;
  const viewDirection = glMatrix.vec3.transformMat4([],[0,0,1],tubeRotationMatrix);
  const eye = glMatrix.vec3.scaleAndAdd([],center,viewDirection, D);
  const up = [0, 1, 0];
  return glMatrix.mat4.lookAt([], eye, center, [0,1,0])
}


function _tubeLightPerspectiveMatrix(tubeCanvas,tubeLightDimensions,glMatrix,tubeView)
{
  const aspect = tubeCanvas.width/tubeCanvas.height;
  const radius = tubeLightDimensions.radius;
  const near = 0.001*radius;
  const far = 10*radius;
  return glMatrix.mat4.perspective([], glMatrix.glMatrix.toRadian(tubeView.fov), aspect, near, far)
}


function _tubeLightModelMatrix(glMatrix,tubeLightRotate,tubeLightMove)
{
  const scaleMatrix = glMatrix.mat4.fromScaling([],[tubeLightRotate.scalingFactor, 
                                                    tubeLightRotate.scalingFactor, 
                                                    tubeLightRotate.scalingFactor]);
  const translationMatrix = glMatrix.mat4.fromTranslation([],[tubeLightMove.x,tubeLightMove.y,tubeLightMove.z]);
  const xRotationMatrix = glMatrix.mat4.fromXRotation([], tubeLightRotate.x * Math.PI / 180);
  const yRotationMatrix = glMatrix.mat4.fromYRotation([], tubeLightRotate.y * Math.PI / 180);
  const zRotationMatrix = glMatrix.mat4.fromZRotation([], 90 * Math.PI / 180);
  const rotationMatrix = glMatrix.mat4.multiply([], glMatrix.mat4.multiply([], xRotationMatrix, yRotationMatrix), zRotationMatrix)
  return glMatrix.mat4.multiply([], glMatrix.mat4.multiply([], translationMatrix, rotationMatrix), scaleMatrix); // Light is centered at origin.
}


function _endpointModelMatrix(glMatrix,tubeLightRotate,tubeLightMove)
{
    const scaleMatrix = glMatrix.mat4.fromScaling([],[tubeLightRotate.scalingFactor, 
                                                      tubeLightRotate.scalingFactor, 
                                                      tubeLightRotate.scalingFactor]);
    const transMatrix = glMatrix.mat4.fromTranslation([],[tubeLightMove.x, 
                                                          tubeLightMove.y, 
                                                          tubeLightMove.z]);
    const xRotationMatrix = glMatrix.mat4.fromXRotation([], tubeLightRotate.x * Math.PI / 180);
    const yRotationMatrix = glMatrix.mat4.fromYRotation([], tubeLightRotate.y * Math.PI / 180);
    const rotationMatrix = glMatrix.mat4.multiply([], xRotationMatrix, yRotationMatrix)
    return glMatrix.mat4.multiply([], glMatrix.mat4.multiply([], transMatrix, rotationMatrix), scaleMatrix);
}


function _shape(ground,hex2rgb,tubeExtra){return(
{
    positions: ground.positions, // Mesh data. 
    normals:   ground.normals,    // Only vertex shader can receive this data.
    cells: ground.cells,
    scale: 10.0,
    color: hex2rgb(tubeExtra.tubeMaterialColor)
}
)}

function _finalEnd(glMatrix,endpointModelMatrix,endpointA,endpointB){return(
{
  A: glMatrix.mat4.multiply([], endpointModelMatrix, [endpointA[0], endpointA[1], endpointA[2], 1]),
  B: glMatrix.mat4.multiply([], endpointModelMatrix, [endpointB[0], endpointB[1], endpointB[2], 1])
}
)}

function _tubeLightProperties(hex2rgb,glMatrix,finalEnd,tubeLightDimensions,tubeLightRotate,tubeBRDF_params,stl,tubeLightModelMatrix,tubeExtra){return(
{
    color: hex2rgb("#FFFFFF"),
    endpointA: glMatrix.vec3.fromValues(finalEnd.A[0], finalEnd.A[1], finalEnd.A[2]),
    endpointB: glMatrix.vec3.fromValues(finalEnd.B[0], finalEnd.B[1], finalEnd.B[2]),
    radius: tubeLightDimensions.box[0] / 2 * tubeLightRotate.scalingFactor,
    normal: glMatrix.vec3.rotateZ([],[0,1,0],[0,0,0],glMatrix.glMatrix.toRadian(0)),
    roughness: tubeBRDF_params.roughness,
    brightness: tubeBRDF_params.luminosity,
    shape: ({
      positions: stl.positions,
      modelMatrix: tubeLightModelMatrix,
    }),
    shininess: parseFloat(tubeBRDF_params.metallic),
    samples: tubeExtra.numOfsamples,
}
)}

function _48(md){return(
md`## Sphere Lighting`
)}

function _sphereViewParameters(columns,slider){return(
columns({
 eyeDistance: slider({
    min: 0.1, 
    max: 10, 
    step: 0.1, 
    value: 1.5, 
    title: "Eye Distance from the Scene Center"
  }),
  xAngle: slider({
    min: -89, 
    max: 89, 
    step: 1, 
    value: -25, 
    title: "Rotation Around X-axis in degrees",
  }),
  yAngle : slider({
    min: -180, 
    max: 180, 
    step: 1, 
    value: -108, 
    title: "Rotation around Y-axis in degrees"
  }),
  fov: slider({
    min: 15, 
    max: 120, 
    step: 1, 
    value: 45, 
    title: "Vertical FOV in Degrees",
  })
})
)}

function _sphereLight(columns,slider)
{
const ls = 20.0;
return columns({
  x: slider({
  min: -ls, 
  max: ls, 
  value: 15, 
  step: 0.01, 
  title: "Light X"
}),
  y: slider({
  min: -ls, 
  max: ls, 
  value: 10, 
  step: 0.01, 
  title: "Light Y"
}),
  z: slider({
  min: -ls, 
  max: ls, 
  value: 5, 
  step: 0.01, 
  title: "Light Z"
})
})
}


function _sphereBRDF_params(columns,slider,radio){return(
columns({
  roughness:slider({
    title: "Roughness of specular highlight",
    min: .01, 
    max: .3, 
    step: .01, 
    value: .15
  }),
  luminosity:slider({
    title: "Luminosity",
    min: 1.0, 
    max: 1800.0, 
    step: 1.0, 
    value: 400
  }),
  metallic:radio({
    title: "Metallic?",
    options: [{label:"Yes",value:"true"}, {label: "No",value:"false"}],
    value: "false"
  })
})
)}

function _sphereRadius(columns,slider,color){return(
columns({
  casterRadius: slider({
    min: 0.05, 
    max: 10, 
    step: 0.01, 
    value: 4.0, 
    title: "Shadow Radius"
  }),
  lightRadius: slider({
    min: 0.05, 
    max: 10, 
    step: 0.01, 
    value: 4., 
    title: "Light Radius"
  }),
  lightColorInput: color({
    value: "#ffffff",
    description:"light Color"
  }),
  materialColorInput: color({
    value: "#ffffff",
    description:"Material Color"
  })
})
)}

function _sphereCanvas(DOM){return(
DOM.canvas(900,400)
)}

function _54(spheregl,sphereRenderableObject_mc_visibility,sphereCamera,sphereModel,sphereLightParams,ground,sphereRenderableLight,sphereShadowCasterShader)
{
  spheregl.clear({color: [0.5, 0.5, 0.6, 1]});

  const renderObject_shadows = spheregl((sphereRenderableObject_mc_visibility(sphereCamera, 
                                                                        sphereModel, 
                                                                        sphereLightParams, 
                                                                        ground)));
  const renderLight = spheregl(sphereRenderableLight(sphereCamera, 
                                                     sphereModel, 
                                                     sphereLightParams, 
                                                     ground));
  const renderShadowCaster = spheregl(sphereShadowCasterShader(sphereCamera, 
                                                     sphereModel, 
                                                     sphereLightParams, 
                                                     ground));

  renderObject_shadows();
  renderLight(); // Optional. In case you want to see the location/orientation of the light source.
  renderShadowCaster();
  
  return `Sphere Rendering`
}


function _sphereCamera(sphereViewMatrix,spherePerspectiveMatrix,sphereEye){return(
{
  viewMatrix : sphereViewMatrix,
  projectionMatrix : spherePerspectiveMatrix,
  eye : sphereEye
}
)}

function _sphereModel(sphereCasterModelMatrix,sphereLightModelMatrix,sphereLightModelMatrix_unscaled){return(
{
      casterModelMatrix : sphereCasterModelMatrix,
      lightModelMatrix : sphereLightModelMatrix,
      lightModelMatrixUnscaled: sphereLightModelMatrix_unscaled
  }
)}

function _sphereLightParams(sphere,sphereRadius,hex2rgb,objectDimensions,sphereLight,shadowcaster,sphereBRDF_params){return(
{
      lightObjectPositions : sphere.positions,
      lightObjectCells : sphere.cells,
      lightColorInput : sphereRadius.lightColorInput,
      lightColor : "#FFFFFF",
      lightColorVisibility : hex2rgb(sphereRadius.lightColorInput),
      lightrad : sphereRadius.lightRadius * objectDimensions.radius,
      lightradVisibility : sphereRadius.lightRadius,
      lightPos: [sphereLight.x, sphereLight.y, sphereLight.z],
      sPos: [shadowcaster.x,shadowcaster.y,shadowcaster.z],
      sRad: sphereRadius.casterRadius,
      roughness : sphereBRDF_params.roughness,
      metallic : 0.0,
      metallicVisibility : (sphereBRDF_params.metallic === "true" ? 1.0 : 0.0),
      luminosity: sphereBRDF_params.luminosity,
      materialColor : hex2rgb(sphereRadius.materialColorInput)
    }
)}

function _sphereCasterModelMatrix(sphereRadius,objectDimensions,glMatrix,sphereCasterModelMatrix_unscaled)
{
  const s = sphereRadius.casterRadius;
  const scalar = Math.max(...objectDimensions.box);
  const scaleMatrix = glMatrix.mat4.fromScaling([],[s,s,s]);
  return glMatrix.mat4.mul([],sphereCasterModelMatrix_unscaled, scaleMatrix); // Light is centered at origin.
}


function _sphereCasterModelMatrix_unscaled(glMatrix,shadowcaster)
{
  const translationMatrix = glMatrix.mat4.fromTranslation([],[shadowcaster.x  , shadowcaster.y, shadowcaster.z]);
  return translationMatrix; // Light is centered at origin.
}


function _sphereLightModelMatrix(sphereRadius,objectDimensions,glMatrix,sphereLightModelMatrix_unscaled)
{
  const s = sphereRadius.lightRadius;
  const scalar = Math.max(...objectDimensions.box);
  const scaleMatrix = glMatrix.mat4.fromScaling([],[s,s,s]);
  return glMatrix.mat4.mul([],sphereLightModelMatrix_unscaled, scaleMatrix); // Light is centered at origin.
}


function _sphereLightModelMatrix_unscaled(glMatrix,sphereLight)
{
  const translationMatrix = glMatrix.mat4.fromTranslation([],[sphereLight.x  , sphereLight.y, sphereLight.z]);
  return translationMatrix; // Light is centered at origin.
}


function _sphereViewMatrix(sphereViewParameters,objectDimensions,glMatrix,sphereRotationMatrix)
{
  const center = [0.0,0.0,0.0];
  const D = sphereViewParameters.eyeDistance*objectDimensions.radius;
  const viewDirection = glMatrix.vec3.transformMat4([],[0,0,1],sphereRotationMatrix);
  const eye = glMatrix.vec3.scaleAndAdd([],center,viewDirection, D);
  const up = [0, 10, 0];
  return glMatrix.mat4.lookAt([], eye, center, [0,1,0])
}


function _sphereRotationMatrix(glMatrix,sphereViewParameters)
{
  let yRotationMatrix = glMatrix.mat4.fromYRotation([],glMatrix.glMatrix.toRadian(sphereViewParameters.yAngle))
  let xRotationMatrix = glMatrix.mat4.fromXRotation([],glMatrix.glMatrix.toRadian(sphereViewParameters.xAngle))
  
  return glMatrix.mat4.multiply([],yRotationMatrix,xRotationMatrix)
}


function _spherePerspectiveMatrix(sphereCanvas,objectDimensions,glMatrix,sphereViewParameters)
{
  const aspect = sphereCanvas.width/sphereCanvas.height;
  const radius = objectDimensions.radius /2;
  const near = 0.001*radius;
  const far = 10*radius;
  return glMatrix.mat4.perspective([], glMatrix.glMatrix.toRadian(sphereViewParameters.fov), aspect, near, far)
}


function _sphereEye(sphereViewParameters,objectDimensions,glMatrix,sphereRotationMatrix)
{
  const center = [0  , 0, 0];
  const D = sphereViewParameters.eyeDistance + objectDimensions.radius;
  const viewDirection = glMatrix.vec3.transformMat4([],[0,0,1],sphereRotationMatrix);
  const eye = glMatrix.vec3.scaleAndAdd([],center,viewDirection, D);
  return eye;
}


function _shadowcaster(){return(
{x:0,y:0,z:0}
)}

function _spheregl(createGL,sphereCanvas){return(
createGL(sphereCanvas)
)}

function _68(md){return(
md`## Curve Lighting`
)}

function _curveCameraPos(columns,slider){return(
columns({
  distance: slider({
    min: 0.1, 
    max: 5, 
    step: 0.1, 
    value: 2, 
    title: "Camera Distance"
  }),
  elevation: slider({
    min: -90, 
    max: 90, 
    step: 1, 
    value: 20, 
    title: "Camera Elevation Angle"
  }),
  rotation: slider({
    min: 0, 
    max: 720, 
    step: 1, 
    value: 360, 
    title: "Camera Y-axis Rotation"
  })
})
)}

function _curveLight(columns,slider){return(
columns({
  x: slider({
  min: -1, 
  max: 1, 
  value: -0.5, 
  step: 0.1, 
  title: "Light X Position"
}),
  y: slider({
  min: -1, 
  max: 1, 
  value: 0.4, 
  step: 0.1, 
  title: "Light Y Position"
}),
  z: slider({
  min: -1, 
  max: 1, 
  value: 0.5, 
  step: 0.1, 
  title: "Light Z Position"
})
})
)}

function _curveLightExtra(columns,slider){return(
columns({
    brightness: slider({
    min: 0.1, 
    max: 8, 
    step: 0.1, 
    value: 1.0, 
    title: "Light Intensity"
  }),
  roughness: slider({
    min: 0, 
    max: 1, 
    step: 0.1, 
    value: 0.5, 
    title: "Roughness"
  }),
  curveSamples: slider({
    min:  1, 
    max: 100, 
    value: 10, 
    step: 1, 
    title: "Samples"
  })
})
)}

function _curveLightNorm(columns,slider){return(
columns({
  rot: slider({
    min: 0, 
    max: 360, 
    value: 90, 
    step: 1, 
    title: "Light Y-axis Rotation"
  }),
  elev: slider({
    min: -90, 
    max: 90, 
    value: 20, 
    step: 1, 
    title: "Light Vertical Tilt"
  }),
  size: slider({
    min: 0.1, 
    max: 1.0, 
    value: 0.2, 
    title: "Light Radius"
  })
})
)}

function _curveLightColorandMetallic(columns,radio,color){return(
columns({
  shininess: radio({
    title: "Metallic",
    options:[
      {label: "Yes", value: 10.0},
      {label: "No", value: 2.0}
    ],
    value: 2.0
  }),
  
  materialColor: color({
    value: "#ffffff",
    description:"Material Color"
  }),
  
  lightColor: color({
    value: "#ffffff",
    description:"Light Color"
  })
})
)}

function _sampling(radio){return(
radio({
  options: [
    {label: "No Sampling", value: "0"},
    {label: "Random Sampling", value: "1"},
    {label: "Low Discrepency", value: "2"},
    {label: "N-Rooks", value: "3"}
  ],
  value: "0"
})
)}

function _curveCanvas(html){return(
html `<canvas width=900, height=400/>`
)}

function _76(curvegl,sampling,objectWithCircleLight_RS,curveCamera,ground,curveLightProperties,objectWithCircleLight_LD,objectWithCircleLight_NR,objectWithCircleLight_RP,renderableCircleDisk)
{ 
  curvegl.clear({color: [0.5, 0.5, 0.6, 1]});
  let renderObject = null;
  
  switch(sampling)
  {
    case "1": 
      renderObject =  curvegl(objectWithCircleLight_RS(curveCamera, ground, curveLightProperties));
      break;
    case "2":
      renderObject =  curvegl(objectWithCircleLight_LD(curveCamera, ground, curveLightProperties));
      break;
    case "3":
      renderObject =  curvegl(objectWithCircleLight_NR(curveCamera, ground, curveLightProperties));
      break;
    default:
      renderObject =  curvegl(objectWithCircleLight_RP(curveCamera, ground, curveLightProperties));
  }
  
  const renderCircle = curvegl(renderableCircleDisk(curveCamera, curveLightProperties));
  
  renderObject();
  renderCircle();
  
  return "Curve Rendering";
}


function _curvegl(createGL,curveCanvas){return(
createGL(curveCanvas)
)}

function _curveCamera(getCamera,objectDimensions,curveCameraPos){return(
getCamera(objectDimensions, curveCameraPos.rotation, curveCameraPos.elevation, 45, curveCameraPos.distance)
)}

function _curveLightProperties(hex2rgb,curveLightColorandMetallic,curveLightExtra,curveLightNorm,objectDimensions,curveLight){return(
{
  materialColor: hex2rgb(curveLightColorandMetallic.materialColor),
  color: hex2rgb(curveLightColorandMetallic.lightColor),
  brightness: curveLightExtra.brightness * curveLightNorm.size * objectDimensions.radius * curveLightNorm.size * objectDimensions.radius,
  roughness: curveLightExtra.roughness,
  shininess: parseFloat(curveLightColorandMetallic.shininess),
  samples: curveLightExtra.curveSamples,
  center: [curveLight.x * 0.5 * objectDimensions.radius, 
           curveLight.y * 0.5 * objectDimensions.radius, 
           curveLight.z * 0.5 * objectDimensions.radius],
  size: curveLightNorm.size * 0.5 * objectDimensions.radius,
  normal: [Math.sin(3.14159/180*curveLightNorm.rot) * Math.cos(3.14159/180*curveLightNorm.elev), 
           Math.sin(3.14159/180*curveLightNorm.elev), 
           Math.cos(3.14159/180*curveLightNorm.rot) * Math.cos(3.14159/180*curveLightNorm.elev)]
}
)}

function _80(md){return(
md ` # Report

Each member in the group utilized concepts that were taught in the Computer Grahpics class along with some extra research. The Area Lighting for each shape: Rectangle, Polygon, Tube, Sphere and Curve/Disk were implemented via "Representative Point Method" that was obtained from the algorithm specified in the reference section. The math calculations for each shape were done. 
The goals that were achieved by the group are as follows:
1. 5 different types of lighting over an environment (Ground)
2. The user has the ability to manipulate and change the intensity, position of the area light
3. Random sampling was implemented to  compare the area lighting result that were produced by the approximation results

Detailed explanation for each Area Lighting:
## Polygonal Lighting
Polygonal lighting contains total of three shapes: triangle, rectangle and pentagon.
All shapes are hard coded. In order calculate the vertices of each shapes, we used the center of the light source and compute the vertices of the shape.
The reflected image is produced by ray tracing the vertices. There are 3-5 points on the polygons labeled points A through up to E with edges between the points. If the ray doesn't hit the light source we clamp it to the edge B-A. 
The new vector we be passed into a  GGX Bidirectional reflectance distribution function (BRDF)  lighting techniques for specular.
We also have a Vander-Corpus sampling technique(Low-discrepancy) implemented. Currently, there are 100 sample points rendered

## Tube Lighting
For tube lighting we've implemented our area light using the closest representative point method. This works similarly to sphere lighting, but we also take into account the length of the tube to determine where the closest point lies to the reflection ray. We use a cylinder model to represent our tube light and keep track of its endpoint coordinates as the light object moves around the scene. To simulate the tube light's specular highlight, we have implemented an approximated BRDF model for the specular term which is modeled with the Fresnel function as well as a normal distribution function. You can observe the Fresnel effect taking place by rotating the camera up and down the scene. You'll see the reflection of the light change in response to the change in viewing angle, just like what you'd see in real life. You may change the roughness of the highlight to see how it affects the light reflection. A lower roughness results in a smaller but stronger reflective appearance. Increasing the roughness scatters the light around a wider area which gives it a diffuse effect. Toggle the metallic radio button to see how the highlight changes appearance between metallic and non-metallic surfaces. Metallic represents a Boolean value that determines how reflectance should be calculated depending on the material of the surface. We began implementing random sampling in an effort to produce more realistic lighting, but we were not successful. Nonetheless we believe this is a relatively accurate description of tube light specular highlight.

## Sphere Lighting
Implemented soft shadows and ray-sphere intersection test via monte carlo shadows based off the Eric Heitz paper http://advances.realtimerendering.com/. 
The sphere shadow caster is visualized by the lavender sphere
The shadowcaster has variable size and soft shadows which can be seen as they become softer as light is scaled up. The shadow and color functions are similar, but inside shadow, there is a ray direction being randomized and raytraced against the shadow casting sphere to add the shadows. this technique is from the Heitz paper and is implemented by extracting the shadows through division with a shadowless version and then multiplied by color. 

## Disk/Curve Lighting
For Disk/Curve Lighting, we generalized a circular disk surface light using various algorithms for real-time execution. All lighting computations are based on mathematics and real-world light mechanics. Algorithms include representative point, which is discussed by Turánszki János at https://wickedengine.net/2017/09/07/area-lights/ . In addition to this, various sampling techniques were implemented. These include uniform random sampling through pseudo-random number generation, sampling through random low-discrepancy sequences, and sampling using an N-rooks distribution with noise. For all sampling techniques, points on the light disk are parametrized by the uniformity of the angle from the center and the square of the distance from the center.

# Organization of the Team
## Team Members:
1. Yasmine Moolenaar - Co-manager
 -  Helped in organizing the team work 
 - Researched to find references for the project
 - Integrated the final project in one observable notebook
2. Sadiyah Bhuria - Co-manager
  - Helped in organizing the team work 
  - Researched the references for rectangle area light(worked with Colin) and sampling
  - Set each progress meeting with the Professor
  - Integrated the final project in one observable notebook
3. Ryan Ghamandi
  - Researched the references for rectangle area light and sampling
  - Helped with the Integration of the final project in one observable notebook
  - Helped with the implementation of the rectangle area lighting
4. Colin Chu
  - Researched to find resources for implementing the area lighting
  - Implemented the square, polygon and triangle area lighting on plane ground with all the sliders, the implementation of the area lighting can be found in this link:
https://observablehq.com/d/aba9cabe9ad6f6b8
5. Cody Oliver
 - Researched to find resources for implementing Tube area lighting
 - Implemented the Tube lighting on a plane ground with sliders.
6. Omar Kalam
 - Researched to find resources for implementing Disk/Curve area lighting
 - Implemented the Disk/Curve lighting on a plane ground with sliders, also helped implementing the sampling and the link to his notebook is: https://observablehq.com/d/77ea1790ab65dafe
7. Dylan Duke
  - Helped research, create and implement polygonal shapes 
  - Worked with Colin to implement polygonal lighting
8. Kaitlin Garcia
 - Researched to find resources for implementing Sphere area lighting
 - Implemented the Sphere lighting on a plane ground with sliders. The implementation of the Sphere lighting can be found in this link: https://observablehq.com/d/ec6e4faa1078b1d6
9. Matthew Bautista
 - Researched to find resources for implementing Sphere area lighting
 - Implemented the Sphere lighting on a plane ground with sliders. 
 - Matthew and Kaitlin worked together to implement the Sphere lighting 
10. Kevin Rabinowitz
 - Researched to find resources for implementing Tube area lighting
 - Implemented the Tube lighting on a plane ground with sliders. The link for the notebook is: https://observablehq.com/d/457fa92fb317bde9
 - Kevin and Cody worked together to implement the Tube lighting 

Apart from individual contribution, every member in the group helped and collaborated with each other. There were few bugs that were seen during the implementation. Each member tried thier best to work togther and get the make the project succesful.

# Challenges
Despite of the COVID-19 pandemic going around, each team memeber in the group was active and helped each other in this project. However there were several difficulties we as group had to face:
1. Being a large group of 10 people, it was difficult to communicate with everyone at the same time
2. Researching for this project for each individual was a very big challange as we were all new to this
3. It was very difficult for two memebrs to work on same observable notebook
4. The integration for this project was the biggest challenge and a lot of time was spent on it

# Acknowledgment
The group members gratefully appreciate and thank each other for making this project successful during the Covid-19 Pandemic. 

# References
The following references were utilized by the teams members:
https://wickedengine.net/2017/09/07/area-lights/
https://eheitzresearch.wordpress.com/415-2/
https://observablehq.com/@spattana/diffuse-lighting
https://observablehq.com/d/50cff3d009460770
https://blog.selfshadow.com/ltc/webgl/ltc_quad.html
https://blog.selfshadow.com/ltc/webgl/ltc_line.html
http://web.cs.wpi.edu/~emmanuel/courses/cs563/S10/talks/wk3_p1_wadii_sampling_techniques.pdf
http://advances.realtimerendering.com/s2016/s2016_ltc_rnd.pdf http://www.elopezr.com/rendering-line-lights/
http://learnwebgl.brown37.net/09_lights/lights_other_models.html
https://thebookofshaders.com/10/
http://advances.realtimerendering.com/s2018/s2018_real_time_correct_soft_shadows.pdf
https://learnopengl.com/PBR/IBL/Specular-IBL
https://www.realtimerendering.com/raytracing/Ray%20Tracing_%20the%20Rest%20of%20Your%20Life.pdf
https://www.cs.princeton.edu/courses/archive/fall10/cos526/papers/jensen03.pdf
https://alextardif.com/arealights.html
https://google.github.io/filament/Filament.html#materialsystem/specularbrdf
https://en.wikipedia.org/wiki/Low-discrepancy_sequence

`
)}

function _81(md){return(
md`## Universal Functions`
)}

function _createGL(regl){return(
function(thiscanvas){
  return regl({canvas:thiscanvas});
}
)}

function _groundModelMatrix(glMatrix)
{
  let s = 10;
  let scaleMatrix = glMatrix.mat4.fromScaling([],[s,s,s]);
  let translationMatrix = glMatrix.mat4.fromTranslation([],[0, 0, 0]);
  
  return glMatrix.mat4.multiply([], translationMatrix, scaleMatrix) // Light is centered at origin.
}


function _objectDimensions(getScDimensions,ground){return(
getScDimensions(ground)
)}

function _d3(require){return(
require("d3@5")
)}

function _array2Darray(){return(
(A,n)=>Array.from(A).reduce((a, c, i,data) => {
        return i % n === 0 ? a.concat([data.slice(i, i + n)]) : a;
      }, [])
)}

function _87(md){return(
md `## Group Imports`
)}

function _93(md){return(
md`## Other Imports`
)}

function _THREE(require){return(
require("three")
)}

function _glMatrix(require){return(
require('https://bundle.run/gl-matrix@3.3.0')
)}

function _regl(require){return(
require("regl")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof polygonViewParameters")).define("viewof polygonViewParameters", ["columns","slider"], _polygonViewParameters);
  main.variable(observer("polygonViewParameters")).define("polygonViewParameters", ["Generators", "viewof polygonViewParameters"], (G, _) => G.input(_));
  main.variable(observer("viewof polygonLightParameters")).define("viewof polygonLightParameters", ["columns","slider"], _polygonLightParameters);
  main.variable(observer("polygonLightParameters")).define("polygonLightParameters", ["Generators", "viewof polygonLightParameters"], (G, _) => G.input(_));
  main.variable(observer("viewof polygonPara")).define("viewof polygonPara", ["columns","slider"], _polygonPara);
  main.variable(observer("polygonPara")).define("polygonPara", ["Generators", "viewof polygonPara"], (G, _) => G.input(_));
  main.variable(observer("viewof polygonRotations")).define("viewof polygonRotations", ["columns","slider","radio"], _polygonRotations);
  main.variable(observer("polygonRotations")).define("polygonRotations", ["Generators", "viewof polygonRotations"], (G, _) => G.input(_));
  main.variable(observer("viewof polygonExtras")).define("viewof polygonExtras", ["columns","color","radio"], _polygonExtras);
  main.variable(observer("polygonExtras")).define("polygonExtras", ["Generators", "viewof polygonExtras"], (G, _) => G.input(_));
  main.variable(observer("polyCanvas")).define("polyCanvas", ["html"], _polyCanvas);
  main.variable(observer()).define(["polygongl","PolygonRenderablerectangle","polygonCamera","ground","polygonLightProperties","corners","PolygonrenderableLight","polygons","polygonExtras","PolygonRenderableTriangle","PolygonRenderablePentagon","PolygonRenderSampleRect","PolygonRenderSampleTri","PolygonrenderSamplepentagon"], _9);
  main.variable(observer("polygongl")).define("polygongl", ["createGL","polyCanvas"], _polygongl);
  main.variable(observer("polygonCamera")).define("polygonCamera", ["polygonViewMatrix","polygonPerspectiveMatrix","polygonEye"], _polygonCamera);
  main.variable(observer("polygonLightProperties")).define("polygonLightProperties", ["hex2rgb","polygonExtras","polygonRotations","polygonPara","polygonLightPosition","lightModelMatrix"], _polygonLightProperties);
  main.variable(observer("corners")).define("corners", ["glMatrix","polygonLightPosition","yax","zax"], _corners);
  main.variable(observer("yax")).define("yax", ["glMatrix","polygonRotations"], _yax);
  main.variable(observer("zax")).define("zax", ["glMatrix","polygonRotations"], _zax);
  main.variable(observer("lightModelMatrix")).define("lightModelMatrix", ["polygonLightdimensions","glMatrix","polygonLightParameters","polygonRotations"], _lightModelMatrix);
  main.variable(observer("polygonViewMatrix")).define("polygonViewMatrix", ["polygonLightdimensions","polygonViewParameters","objectDimensions","glMatrix","rotationMatrix"], _polygonViewMatrix);
  main.variable(observer("polygonPerspectiveMatrix")).define("polygonPerspectiveMatrix", ["polyCanvas","objectDimensions","glMatrix"], _polygonPerspectiveMatrix);
  main.variable(observer("rotationMatrix")).define("rotationMatrix", ["glMatrix","polygonViewParameters"], _rotationMatrix);
  main.variable(observer("polygonEye")).define("polygonEye", ["objectDimensions","polygonViewParameters","glMatrix","rotationMatrix"], _polygonEye);
  main.variable(observer("polygonLightPosition")).define("polygonLightPosition", ["glMatrix","polygonLightdimensions","polygonLightParameters"], _polygonLightPosition);
  main.variable(observer("polygonLightDirection")).define("polygonLightDirection", ["glMatrix"], _polygonLightDirection);
  main.variable(observer("sphereLow")).define("sphereLow", ["THREE","array2Darray"], _sphereLow);
  main.variable(observer("polygonLightdimensions")).define("polygonLightdimensions", ["getScDimensions","polygons","polygonExtras"], _polygonLightdimensions);
  main.variable(observer("polygons")).define("polygons", ["Triangle","Rectangle","Pentagon"], _polygons);
  main.variable(observer("Triangle")).define("Triangle", _Triangle);
  main.variable(observer("Rectangle")).define("Rectangle", _Rectangle);
  main.variable(observer("Pentagon")).define("Pentagon", _Pentagon);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("viewof tubeView")).define("viewof tubeView", ["columns","slider"], _tubeView);
  main.variable(observer("tubeView")).define("tubeView", ["Generators", "viewof tubeView"], (G, _) => G.input(_));
  main.variable(observer("viewof tubeLightMove")).define("viewof tubeLightMove", ["columns","slider"], _tubeLightMove);
  main.variable(observer("tubeLightMove")).define("tubeLightMove", ["Generators", "viewof tubeLightMove"], (G, _) => G.input(_));
  main.variable(observer("viewof tubeLightRotate")).define("viewof tubeLightRotate", ["columns","slider"], _tubeLightRotate);
  main.variable(observer("tubeLightRotate")).define("tubeLightRotate", ["Generators", "viewof tubeLightRotate"], (G, _) => G.input(_));
  main.variable(observer("viewof tubeBRDF_params")).define("viewof tubeBRDF_params", ["columns","slider","radio"], _tubeBRDF_params);
  main.variable(observer("tubeBRDF_params")).define("tubeBRDF_params", ["Generators", "viewof tubeBRDF_params"], (G, _) => G.input(_));
  main.variable(observer("viewof tubeExtra")).define("viewof tubeExtra", ["columns","color","slider","radio"], _tubeExtra);
  main.variable(observer("tubeExtra")).define("tubeExtra", ["Generators", "viewof tubeExtra"], (G, _) => G.input(_));
  main.variable(observer("tubeCanvas")).define("tubeCanvas", ["html"], _tubeCanvas);
  main.variable(observer()).define(["tubegl","tubeExtra","tubeSamplingObject","tubeCamera","shape","tubeLightProperties","tubeRenderableObject","tubeRenderableLight"], _36);
  main.variable(observer("tubegl")).define("tubegl", ["createGL","tubeCanvas"], _tubegl);
  main.variable(observer("tubeCamera")).define("tubeCamera", ["tubeEyePosition","tubeViewMatrix","tubeLightPerspectiveMatrix"], _tubeCamera);
  main.variable(observer("tubeEyePosition")).define("tubeEyePosition", ["objectDimensions","tubeView","glMatrix","tubeRotationMatrix"], _tubeEyePosition);
  main.variable(observer("tubeRotationMatrix")).define("tubeRotationMatrix", ["glMatrix","tubeView"], _tubeRotationMatrix);
  main.variable(observer("tubeViewMatrix")).define("tubeViewMatrix", ["tubeLightDimensions","tubeView","glMatrix","tubeRotationMatrix"], _tubeViewMatrix);
  main.variable(observer("tubeLightPerspectiveMatrix")).define("tubeLightPerspectiveMatrix", ["tubeCanvas","tubeLightDimensions","glMatrix","tubeView"], _tubeLightPerspectiveMatrix);
  main.variable(observer("tubeLightModelMatrix")).define("tubeLightModelMatrix", ["glMatrix","tubeLightRotate","tubeLightMove"], _tubeLightModelMatrix);
  main.variable(observer("endpointModelMatrix")).define("endpointModelMatrix", ["glMatrix","tubeLightRotate","tubeLightMove"], _endpointModelMatrix);
  main.variable(observer("shape")).define("shape", ["ground","hex2rgb","tubeExtra"], _shape);
  main.variable(observer("finalEnd")).define("finalEnd", ["glMatrix","endpointModelMatrix","endpointA","endpointB"], _finalEnd);
  main.variable(observer("tubeLightProperties")).define("tubeLightProperties", ["hex2rgb","glMatrix","finalEnd","tubeLightDimensions","tubeLightRotate","tubeBRDF_params","stl","tubeLightModelMatrix","tubeExtra"], _tubeLightProperties);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("viewof sphereViewParameters")).define("viewof sphereViewParameters", ["columns","slider"], _sphereViewParameters);
  main.variable(observer("sphereViewParameters")).define("sphereViewParameters", ["Generators", "viewof sphereViewParameters"], (G, _) => G.input(_));
  main.variable(observer("viewof sphereLight")).define("viewof sphereLight", ["columns","slider"], _sphereLight);
  main.variable(observer("sphereLight")).define("sphereLight", ["Generators", "viewof sphereLight"], (G, _) => G.input(_));
  main.variable(observer("viewof sphereBRDF_params")).define("viewof sphereBRDF_params", ["columns","slider","radio"], _sphereBRDF_params);
  main.variable(observer("sphereBRDF_params")).define("sphereBRDF_params", ["Generators", "viewof sphereBRDF_params"], (G, _) => G.input(_));
  main.variable(observer("viewof sphereRadius")).define("viewof sphereRadius", ["columns","slider","color"], _sphereRadius);
  main.variable(observer("sphereRadius")).define("sphereRadius", ["Generators", "viewof sphereRadius"], (G, _) => G.input(_));
  main.variable(observer("sphereCanvas")).define("sphereCanvas", ["DOM"], _sphereCanvas);
  main.variable(observer()).define(["spheregl","sphereRenderableObject_mc_visibility","sphereCamera","sphereModel","sphereLightParams","ground","sphereRenderableLight","sphereShadowCasterShader"], _54);
  main.variable(observer("sphereCamera")).define("sphereCamera", ["sphereViewMatrix","spherePerspectiveMatrix","sphereEye"], _sphereCamera);
  main.variable(observer("sphereModel")).define("sphereModel", ["sphereCasterModelMatrix","sphereLightModelMatrix","sphereLightModelMatrix_unscaled"], _sphereModel);
  main.variable(observer("sphereLightParams")).define("sphereLightParams", ["sphere","sphereRadius","hex2rgb","objectDimensions","sphereLight","shadowcaster","sphereBRDF_params"], _sphereLightParams);
  main.variable(observer("sphereCasterModelMatrix")).define("sphereCasterModelMatrix", ["sphereRadius","objectDimensions","glMatrix","sphereCasterModelMatrix_unscaled"], _sphereCasterModelMatrix);
  main.variable(observer("sphereCasterModelMatrix_unscaled")).define("sphereCasterModelMatrix_unscaled", ["glMatrix","shadowcaster"], _sphereCasterModelMatrix_unscaled);
  main.variable(observer("sphereLightModelMatrix")).define("sphereLightModelMatrix", ["sphereRadius","objectDimensions","glMatrix","sphereLightModelMatrix_unscaled"], _sphereLightModelMatrix);
  main.variable(observer("sphereLightModelMatrix_unscaled")).define("sphereLightModelMatrix_unscaled", ["glMatrix","sphereLight"], _sphereLightModelMatrix_unscaled);
  main.variable(observer("sphereViewMatrix")).define("sphereViewMatrix", ["sphereViewParameters","objectDimensions","glMatrix","sphereRotationMatrix"], _sphereViewMatrix);
  main.variable(observer("sphereRotationMatrix")).define("sphereRotationMatrix", ["glMatrix","sphereViewParameters"], _sphereRotationMatrix);
  main.variable(observer("spherePerspectiveMatrix")).define("spherePerspectiveMatrix", ["sphereCanvas","objectDimensions","glMatrix","sphereViewParameters"], _spherePerspectiveMatrix);
  main.variable(observer("sphereEye")).define("sphereEye", ["sphereViewParameters","objectDimensions","glMatrix","sphereRotationMatrix"], _sphereEye);
  main.variable(observer("shadowcaster")).define("shadowcaster", _shadowcaster);
  main.variable(observer("spheregl")).define("spheregl", ["createGL","sphereCanvas"], _spheregl);
  main.variable(observer()).define(["md"], _68);
  main.variable(observer("viewof curveCameraPos")).define("viewof curveCameraPos", ["columns","slider"], _curveCameraPos);
  main.variable(observer("curveCameraPos")).define("curveCameraPos", ["Generators", "viewof curveCameraPos"], (G, _) => G.input(_));
  main.variable(observer("viewof curveLight")).define("viewof curveLight", ["columns","slider"], _curveLight);
  main.variable(observer("curveLight")).define("curveLight", ["Generators", "viewof curveLight"], (G, _) => G.input(_));
  main.variable(observer("viewof curveLightExtra")).define("viewof curveLightExtra", ["columns","slider"], _curveLightExtra);
  main.variable(observer("curveLightExtra")).define("curveLightExtra", ["Generators", "viewof curveLightExtra"], (G, _) => G.input(_));
  main.variable(observer("viewof curveLightNorm")).define("viewof curveLightNorm", ["columns","slider"], _curveLightNorm);
  main.variable(observer("curveLightNorm")).define("curveLightNorm", ["Generators", "viewof curveLightNorm"], (G, _) => G.input(_));
  main.variable(observer("viewof curveLightColorandMetallic")).define("viewof curveLightColorandMetallic", ["columns","radio","color"], _curveLightColorandMetallic);
  main.variable(observer("curveLightColorandMetallic")).define("curveLightColorandMetallic", ["Generators", "viewof curveLightColorandMetallic"], (G, _) => G.input(_));
  main.variable(observer("viewof sampling")).define("viewof sampling", ["radio"], _sampling);
  main.variable(observer("sampling")).define("sampling", ["Generators", "viewof sampling"], (G, _) => G.input(_));
  main.variable(observer("curveCanvas")).define("curveCanvas", ["html"], _curveCanvas);
  main.variable(observer()).define(["curvegl","sampling","objectWithCircleLight_RS","curveCamera","ground","curveLightProperties","objectWithCircleLight_LD","objectWithCircleLight_NR","objectWithCircleLight_RP","renderableCircleDisk"], _76);
  main.variable(observer("curvegl")).define("curvegl", ["createGL","curveCanvas"], _curvegl);
  main.variable(observer("curveCamera")).define("curveCamera", ["getCamera","objectDimensions","curveCameraPos"], _curveCamera);
  main.variable(observer("curveLightProperties")).define("curveLightProperties", ["hex2rgb","curveLightColorandMetallic","curveLightExtra","curveLightNorm","objectDimensions","curveLight"], _curveLightProperties);
  main.variable(observer()).define(["md"], _80);
  main.variable(observer()).define(["md"], _81);
  main.variable(observer("createGL")).define("createGL", ["regl"], _createGL);
  main.variable(observer("groundModelMatrix")).define("groundModelMatrix", ["glMatrix"], _groundModelMatrix);
  main.variable(observer("objectDimensions")).define("objectDimensions", ["getScDimensions","ground"], _objectDimensions);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("array2Darray")).define("array2Darray", _array2Darray);
  main.variable(observer()).define(["md"], _87);
  const child1 = runtime.module(define1);
  main.import("PolygonRenderablerectangle", child1);
  main.import("PolygonrenderableLight", child1);
  main.import("PolygonRenderableTriangle", child1);
  main.import("PolygonRenderablePentagon", child1);
  main.import("PolygonRenderSampleRect", child1);
  main.import("PolygonRenderSampleTri", child1);
  main.import("PolygonrenderSamplepentagon", child1);
  const child2 = runtime.module(define2);
  main.import("tubeRenderableObject", child2);
  main.import("tubeRenderableLight", child2);
  main.import("tubeLightDimensions", child2);
  main.import("tubeSamplingObject", child2);
  main.import("endpointA", child2);
  main.import("endpointB", child2);
  const child3 = runtime.module(define3);
  main.import("stl", child3);
  const child4 = runtime.module(define4);
  main.import("sphereRenderableObject_mc_visibility", child4);
  main.import("sphereShadowCasterShader", child4);
  main.import("sphereRenderableLight", child4);
  const child5 = runtime.module(define5);
  main.import("objectWithCircleLight_RS", child5);
  main.import("objectWithCircleLight_LD", child5);
  main.import("objectWithCircleLight_NR", child5);
  main.import("objectWithCircleLight_RP", child5);
  main.import("renderableCircleDisk", child5);
  main.import("getCamera", child5);
  main.variable(observer()).define(["md"], _93);
  const child6 = runtime.module(define6);
  main.import("ground", child6);
  const child7 = runtime.module(define7);
  main.import("scaledTeapot", child7);
  const child8 = runtime.module(define8);
  main.import("getScDimensions", child8);
  const child9 = runtime.module(define6);
  main.import("sphereLowRes", child9);
  main.import("sphere", child9);
  const child10 = runtime.module(define9);
  main.import("slider", child10);
  main.import("radio", child10);
  main.import("color", child10);
  const child11 = runtime.module(define10);
  main.import("hex2rgb", child11);
  const child12 = runtime.module(define11);
  main.import("columns", child12);
  main.variable(observer("THREE")).define("THREE", ["require"], _THREE);
  main.variable(observer("glMatrix")).define("glMatrix", ["require"], _glMatrix);
  main.variable(observer("regl")).define("regl", ["require"], _regl);
  return main;
}
