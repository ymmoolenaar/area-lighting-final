// https://observablehq.com/@thecatalan/area-lighting@8291
import define1 from "./55faae595525622e@211.js";
import define2 from "./2180fcbe75883db9@142.js";
import define3 from "./ebae0c172bd689cc@102.js";
import define4 from "./e93997d5089d7165@2303.js";
import define5 from "./10023e7d8ddc32bc@90.js";

function _1(md){return(
md`# Area Lighting`
)}

function _lightColorInput(color){return(
color({
  value: "#ffffff",
  description:"light Color"
  })
)}

function _materialColorInput(color){return(
color({
  value: "#ffffff",
  description:"Material Color"
  })
)}

function _viewParameters(columns,slider){return(
columns({
 eyeDistance: slider({
    min: 0.1, 
    max: 10, 
    step: 0.1, 
    value: 1.5, 
    title: "Eye Distance from the Scene Center",
    description: "Distance relative to Scene Dimension"
  }),
  xAngle: slider({
    min: -89, 
    max: 89, 
    step: 1, 
    value: -25, 
    title: "Rotation Around X-axis in degrees",
    description: "Camera Orbiting around the scene center."
  }),
  yAngle : slider({
    min: -180, 
    max: 180, 
    step: 1, 
    value: -108, 
    title: "Rotation around Y-axis in degrees",
    description: "Camera Orbiting around the scene center."
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

function _brdf_params(columns,slider,radio){return(
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

function _model(radio){return(
radio({
  description: 'Choose Model',
  options: [
   {value: 0, label: "ground"}, {value: 1, label: "teapot"}, {value: 2, label: "cube"}, {value: 3, label: "boy"}, {value: 4, label: "teddy"}, {value: 5, label: "cow"}, {value: 6, label: "sphereLowRes"}, {value: 7, label: "sphere"}],
  value: 0
})
)}

function _lightRadius(slider){return(
slider({
  min: 0.05, 
  max: 10, 
  step: 0.01, 
  value: 4., 
  title: "Light Radius"
})
)}

function _casterRadius(slider){return(
slider({
  min: 0.05, 
  max: 10, 
  step: 0.01, 
  value: 4.0, 
  title: "s Radius"
})
)}

function _light(columns,slider)
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


function _myCanvas(DOM){return(
DOM.canvas(600,400)
)}

function _objects(ground,teapot,cube,boy,teddy,cow,sphereLowRes,sphere){return(
[
   ground, teapot, cube, boy, teddy, cow, sphereLowRes, sphere
  ]
)}

function _object(objects,model){return(
objects[+model]
)}

function _14(createRegl,myCanvas,sphereRenderableObject_mc_visibility,sphereLightParams,object,sphereRenderableLight,sphereShadowCasterShader)
{
  const regl = createRegl({canvas:myCanvas});
  regl.clear({color: [0.5, 0.5, 0.6, 1]});

  //const renderObject_analyctic = regl(renderableObject);
  const renderObject_shadows = regl(sphereRenderableObject_mc_visibility(sphereLightParams.camera, sphereLightParams.model, sphereLightParams.light, object));
  const renderLight = regl(sphereRenderableLight(sphereLightParams.camera, sphereLightParams.model, sphereLightParams.light, object));
  const renderShadowCaster = regl(sphereShadowCasterShader(sphereLightParams.camera, sphereLightParams.model, sphereLightParams.light, object));

  renderObject_shadows();
  renderLight(); // Optional. In case you want to see the location/orientation of the light source.
  renderShadowCaster();
  
  return `Main Rendering`
}


function _rotFromZ(norm3){return(
function (a) {
  if ((a[0] == 0) && (a[1] == 0)) return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  /*
  let mag = Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]+a[2]);
  a = [a[0]/mag, a[1]/mag, a[2]/mag];
  let b = [a[1], -a[0], 0];
  mag = Math.sqrt(a[0]*a[0] + a[1]*a[1]);
  b = [b[0]/mag, b[1]/mag, 0];
  let c = [b[1]*a[2], -b[0]*a[2], b[0]*a[1] - b[1]*a[0]];
  */
  a = norm3(a);
  let b = norm3([a[1], -a[0], 0]);
  let c = norm3([b[1]*a[2], -b[0]*a[2], b[0]*a[1] - b[1]*a[0]]);
  return [c[0], c[1], c[2], b[0], b[1], b[2], a[0], a[1], a[2]];
}
)}

function _norm3(){return(
function (v3) {
  let mag = Math.sqrt(v3[0]*v3[0] + v3[1]*v3[1] + v3[2]*v3[2]);
  let ret = [v3[0]/mag, v3[1]/mag, v3[2]/mag];
  return ret;
}
)}

function _hex2rgb(){return(
hex => (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(l =>  parseInt(hex.length%2 ? l+l : l, 16)/255)
)}

function _sphereLightParams(viewMatrix,perspectiveMatrix,eye,casterModelMatrix,lightModelMatrix,lightModelMatrix_unscaled,lightObject,lightColorInput,hex2rgb,lightRadius,shapeDimensions,light,shadowcaster,casterRadius,brdf_params,materialColorInput,object){return(
{
  camera : 
    ({
      viewMatrix : viewMatrix,
      projectionMatrix : perspectiveMatrix,
      eye : eye
    }),
  model : 
  ({
      casterModelMatrix : casterModelMatrix,
      lightModelMatrix : lightModelMatrix,
      lightModelMatrixUnscaled: lightModelMatrix_unscaled
  }),
  light : 
    ({
      lightObjectPositions : lightObject.positions,
      lightObjectCells : lightObject.cells,
      lightColorInput : lightColorInput,
      lightColor : "#FFFFFF",
      lightColorVisibility : hex2rgb(lightColorInput),
      lightrad : lightRadius * shapeDimensions.radius,
      lightradVisibility : lightRadius,
      lightPos: [light.x, light.y, light.z],
      sPos: [shadowcaster.x,shadowcaster.y,shadowcaster.z],
      sRad: casterRadius,
      roughness : brdf_params.roughness,
      metallic : 0.0,
      metallicVisibility : (brdf_params.metallic === "true" ? 1.0 : 0.0),
      luminosity: brdf_params.luminosity,
      materialColor : hex2rgb(materialColorInput)
    }),
  objectStuff : 
  ({
    objectPositions : object.positions,
    objectNormals : object.normals,
    objectCells : object.cells
  })
}
)}

function _SphereRenderableObject(object,lightModelMatrix,viewMatrix,hex2rgb,perspectiveMatrix,eye,lightRadius,shapeDimensions,light,brdf_params,materialColorInput){return(
{
  vert: `
    precision mediump float;
    attribute vec3 position, normal;
    uniform mat4 perspectiveMatrix, lookAtMatrix;
    varying vec3 fragPosition, fragNormal, fragColor;
    void main () {
      fragPosition = position;
      fragNormal = normal;
      fragColor = 0.5 * normal + vec3(0.5, 0.5, 0.5);
      gl_Position = perspectiveMatrix * lookAtMatrix * vec4(position, 1) ; 
    }
    `,
  frag: `
     precision mediump float;
    uniform vec3 eye,lightPos;
    uniform float  lightrad, power;
    varying vec3 fragPosition, fragNormal, fragColor;
       uniform mat4 perspectiveMatrix, lookAtMatrix,modelMatrix;
    uniform vec3 materialColor; // Constants that must be set before the render call.
    uniform vec3 specularColor;
    uniform float shininess;
    uniform vec3 lightDirection;
    uniform vec3 lightColor;
    uniform float roughness;
    uniform float metallic;
    uniform float luminosity;

    float clamp(float x) {
      return clamp(x, 0.0,1.0);
    }
    vec3 clamp(vec3 v) {
      return vec3(clamp(v.x), clamp(v.y), clamp(v.z));
    }
    float saferangeclamp(float x) {
      return clamp(x, -0.9999,0.999);
    }
    vec3 saferangeclamp(vec3 v) {
      return vec3(saferangeclamp(v.x), saferangeclamp(v.y), saferangeclamp(v.z));
    }
    float D_GGX(float NoH, float a) {
      float oneMinusNoHSquared = 1.0 - NoH * NoH;
      float k = a / (oneMinusNoHSquared + a * a);
      float d = k * k * (1.0 / 3.14);
      return clamp(d);
    }

    float D_GGX_Alt(float NoH, float a) {
      float a2 = a * a;
      float f = (NoH * a2 - NoH) * NoH + 1.0;
      return a2 / (3.14 * f * f);
    }

    vec3 F_Schlick(vec3 f0, float VoH) {
      float f = pow(1.0 - VoH, 5.0);
      return f + f0 * (1.0 - f);
    }

    float V_SmithGGXCorrelated(float NoV, float NoL, float a) {
      float a2 = a * a;
      float GGXL = NoV * sqrt((-NoL * a2 + NoL) * NoL + a2);
      float GGXV = NoL * sqrt((-NoV * a2 + NoV) * NoV + a2);
      return 0.5 / (GGXV + GGXL);
    }
    
    vec3 getReflectance() {
       return .16 * .04 * .04 * (1.0 - metallic) + materialColor * metallic;
    }

    float Fd_Lambert() {
      return 1.0 / 3.14;
    }

    vec3 BRDF(vec3 l, float alphaPrime, float falloff) {
      vec3 v = normalize(eye - fragPosition);
      vec3 n = normalize(fragNormal);
      vec3 h = normalize(v + l);
      
      float NoV = abs(dot(n, v)) + 1e-5;
      float NoL = clamp(dot(n, l));
      float NoH = clamp(dot(n, h));
      float LoH = clamp(dot(l, h));
      float VoH = clamp(dot(v, h));

      float roughVal = alphaPrime * roughness;
      
      float D = D_GGX(NoH, roughVal);
      vec3 F = F_Schlick(getReflectance(), VoH);
      float V = V_SmithGGXCorrelated(NoV, NoL, roughVal);

      vec3 Fr = (D * V) * F;

      vec3 diffuseColor = (1.0 - metallic) * materialColor;
      vec3 Fd = diffuseColor * Fd_Lambert();

      vec3 light = (Fr + Fd ) * lightColor * falloff * luminosity;

      return light;
    }

    vec3 color() {

      vec3 L, strength;
     //vec3 eye = ( perspectiveMatrix*lookAtMatrix*modelMatrix* vec4(eye,1.0)).xyz; 
     // eye = vec3(0.0); //Not sure which of these eye vectors is closer to right
      vec3 Lpos =   (modelMatrix*vec4(0,0,0,1)).xyz;
      vec3 viewDir = normalize(eye - fragPosition);
      vec3 R = reflect(viewDir, normalize(fragNormal)) ;  //Maybe -viewDir instead of viewDir
      L = (Lpos-fragPosition); //Vector from frag pos to center of light
      vec3 centerToRay = (dot(L, R) * R) - L;
      float lightDist =  length(centerToRay);
      vec3 closestPointOnSphere =  L + centerToRay * clamp(lightrad / (lightDist));
      L = normalize(closestPointOnSphere-fragPosition) ;
      lightDist = length( closestPointOnSphere- fragPosition ) ; // Might be length(closestpointonsphere) instead?
     float diffuse =  1.0;//clamp(dot(fragNormal, closestPointOnSphere));
     float falloff =  pow(clamp(1.0 - pow(lightDist/(lightrad), 4.0)), 2.0) / ( (lightDist * lightDist) + 1.0 );   
      
     float alphaPrime = lightrad/((lightDist) + roughness);
      //float alphaPrime = clamp(lightrad/(lightDist * 2.0) + roughness);    
return vec3(closestPointOnSphere);
     return BRDF(L, alphaPrime, falloff + alphaPrime * 0.5);
    
     
    }
    void main () {
      gl_FragColor = vec4 (color(), 1);
    }
    `,
  attributes: {
    position: object.positions,
    normal: object.normals
  },
  uniforms:{
    modelMatrix: lightModelMatrix,
    lookAtMatrix: viewMatrix,
        lightColor: hex2rgb("#FFFFFF"),
    perspectiveMatrix: perspectiveMatrix,
    eye: eye,
    lightrad: lightRadius *shapeDimensions.radius,
    lightPos: [light.x, light.y, light.z],
        roughness: brdf_params.roughness,
    metallic: 0.0,
    luminosity: brdf_params.luminosity,
       materialColor: hex2rgb(materialColorInput)
  
  },
  elements: object.cells
}
)}

function _sphereRenderableObject_mc_visibility(object){return(
function(camera, model, light, objectStuff) { return (
  {
  vert: `
    precision mediump float;
    attribute vec3 position, normal;
    uniform mat4 perspectiveMatrix, lookAtMatrix;
    varying vec3 fragPosition, fragNormal, fragColor;
    void main () {
      fragPosition = position;
      fragNormal = normal;
      fragColor = 0.5 * normal + vec3(0.5, 0.5, 0.5);
      gl_Position = perspectiveMatrix * lookAtMatrix * vec4(position, 1) ; 
    }
    `,
  frag: `  #version 100
     precision mediump float;
    uniform vec3 eye,lightPos,sPos;
    uniform float  lightrad, power, sRad;
    varying vec3 fragPosition, fragNormal, fragColor;
       uniform mat4 perspectiveMatrix, lookAtMatrix,modelMatrix;
    uniform vec3 materialColor; // Constants that must be set before the render call.
    uniform vec3 specularColor;
    uniform float shininess;
    uniform vec3 lightDirection;
    uniform vec3 lightColor;
    uniform float roughness;
    uniform float metallic;
    uniform float luminosity;

      float clamp(float x) {
      return clamp(x, 0.0,1.0);
    }
    vec3 clamp(vec3 v) {
      return vec3(clamp(v.x), clamp(v.y), clamp(v.z));
    }
    float saferangeclamp(float x) {
      return clamp(x, -0.9999,0.9999);
    }
    vec3 saferangeclamp(vec3 v) {
      return vec3(saferangeclamp(v.x), saferangeclamp(v.y), saferangeclamp(v.z));
    }
    float D_GGX(float NoH, float a) {
      float oneMinusNoHSquared = 1.0 - NoH * NoH;
      float k = a / (oneMinusNoHSquared + a * a);
      float d = k * k * (1.0 / 3.14);
      return clamp(d);
    }

    float D_GGX_Alt(float NoH, float a) {
      float a2 = a * a;
      float f = (NoH * a2 - NoH) * NoH + 1.0;
      return a2 / (3.14 * f * f);
    }

    vec3 F_Schlick(vec3 f0, float VoH) {
      float f = pow(1.0 - VoH, 1.5); // Changed from 5.0 to 1.5 to increase reflectance on direct angles
      return f + f0 * (1.0 - f);
    }

    float V_SmithGGXCorrelated(float NoV, float NoL, float a) {
      float a2 = a * a;
      float GGXL = NoV * sqrt((-NoL * a2 + NoL) * NoL + a2);
      float GGXV = NoL * sqrt((-NoV * a2 + NoV) * NoV + a2);
      return 0.5 / (GGXV + GGXL);
    }
    
    vec3 getReflectance() {
       return .16 * .04 * .04 * (1.0 - metallic) + materialColor * metallic;
    }

    float Fd_Lambert() {
      return 1.0 / 3.14;
    }


float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

    vec3 BRDF(vec3 l, float alphaPrime, float falloff, float V_t) {
      vec3 v = normalize(eye - fragPosition) ;
      vec3 n = normalize(fragNormal) ;
      vec3 h = normalize(v + l);
      
      float NoV = abs(dot(n, v)) + 1e-5;
      float NoL = clamp(dot(n, l)) ;
      float NoH = clamp(dot(n, h)) ;
      float LoH = clamp(dot(l, h)) ;
      float VoH = clamp(dot(v, h))  ;
      
      float roughVal = alphaPrime * roughness;
      
      float D = D_GGX_Alt(NoH, roughVal * 4.0 ) ;
      vec3 F = F_Schlick(getReflectance() , VoH) * 10.0 ;
      float V = V_SmithGGXCorrelated(NoV, NoL, 5.0) ;

      vec3 Fr = (D * V  ) * F ; // * 6.0 is a magic number to brighten up our specular

      vec3 diffuseColor = (1.0 - metallic) * materialColor;
      vec3 Fd = diffuseColor * Fd_Lambert() ;

      vec3 light = (Fr  *  (V_t) + Fd *((clamp(V_t + (1.0 - roughness * 4.0)))) ) * lightColor * falloff * luminosity ;

      return light;
    }

vec3 RandomUnitVector(vec2 state)
{
    float z = rand(state) * 2.0 - 1.0;
    float a = rand(state) * 3.14159265359 * 2.0;
    float r = sqrt(1.0 - z * z);
    float x = r * cos(a);
    float y = r * sin(a);
    return vec3(x, y, z);
}
  float visibility(vec3 origin, vec3 ray,  vec3 shadowSphere, float shadowSphereRad)
{
 //Spherical shadow caster -- do ray sphere test on shadow caster and return visibility
   
vec3 oc = origin - shadowSphere;
  float a = length(ray);
  float half_b = dot(oc, ray);
  float c = length(oc) - shadowSphereRad;
   float disc = half_b - (a *c);
   float root = sqrt(disc);
   float temp = (-half_b + root) / a;
  
    vec3 hit_p = origin + (ray * temp); //probably wrong -- assumes ray is normalized i think.
    vec3 outward_normal = (hit_p - shadowSphere) / shadowSphereRad;
    //bool face = dot(normalize(ray, outward_normal) < 0.0;

return -normalize(dot(normalize(ray), outward_normal));
}

  //Shadow is identical to color except random. Generates random shading and random visibility, then outputs vis / shading to produce shadow mask
  vec3 shadow() {
    vec2 rngCo = vec2(gl_FragCoord.xy / 400.0);
    vec3 rayPosition = vec3(0.0, 0.0, 0.0);

    //vec3 viewDir = normalize(( vec4(eye,1.0)).xyz - fragPosition);
    vec3 viewDir = normalize(-eye - fragPosition);    
    vec3 r = normalize(reflect(viewDir, normalize(fragNormal))  + RandomUnitVector(rngCo));
    vec3 Lpos = ((modelMatrix)*vec4(0.0,0.0,0.0,1.0)).xyz;    
    vec3 L =  (vec3(lightPos)) - fragPosition;  // line from frag to center of light

    vec3 centerToRay = (dot(L,r)*r) - (-L);
    
    vec3 closestPoint = -L + centerToRay * (((-lightrad) / (length(centerToRay) * 2.0)));
    vec3 normalOnSphere = normalize(Lpos - closestPoint);
    //outputs
    L = normalize(closestPoint);
    float distLight = length(closestPoint);
    float distcen = length(centerToRay);
    float lightRad_specular = lightrad;
    float alphaPrime = clamp(lightRad_specular/(distLight *2.0))+roughness;

  
     float falloff =  pow(clamp(pow(distLight/0.0, 4.0)), 2.0) / ( (distLight * distLight) ); 
    //return vec3(((modelMatrix)*vec4(0.0,0.0,0.0,1.0)).xyz - fragPosition);
  // return vec3(falloff);
    //return (vec3(normalize(closestPoint)));
    float a_v = clamp((dot(normalOnSphere, fragNormal) + 0.5) * 2.0);
    //return vec3( RandomUnitVector(rngCo));
    float mc_v = visibility(fragPosition, vec3(closestPoint - fragPosition), vec3(sPos), sRad);
    vec3 non =  BRDF(-L, alphaPrime ,falloff, 1.0);
    vec3 vis =  BRDF(-L, alphaPrime ,falloff, 1.0 - clamp(mc_v * 4.0));
    
    return vis / non;
     
    }

    //WIP, several issues
    vec3 color() {
    //vec3 viewDir = normalize(( vec4(eye,1.0)).xyz - fragPosition);
    vec3 viewDir = eye - fragPosition;    
    vec3 r = normalize(reflect(viewDir, normalize(fragNormal)));
    vec3 Lpos = ((modelMatrix)*vec4(0.0,0.0,0.0,1.0)).xyz;    
    vec3 L =  (vec3(lightPos)) - fragPosition;  // line from frag to center of light

    vec3 centerToRay = (dot(-L,r)*r) - (L);
    
    vec3 closestPoint = -L + centerToRay * (((-lightrad) / (length(centerToRay) * 2.0)));
    vec3 normalOnSphere = normalize(Lpos - closestPoint);
    //outputs
    L = normalize(closestPoint);
    float distLight = length(closestPoint);
    float distcen = length(centerToRay);
    float lightRad_specular = lightrad;
    float alphaPrime = clamp(lightRad_specular/(distLight *2.0))+roughness;

       //float falloff =  pow(clamp(pow(distLight/lightrad, 4.0)), 2.0) / ( (distLight * distLight) + 1.0 );  //lightrad here is our blackout issue 
     float falloff =  pow(clamp(pow(distLight/0.0, 4.0)), 2.0) / ( (distLight * distLight) );  //lightrad here is our blackout issue 
    //return vec3(((modelMatrix)*vec4(0.0,0.0,0.0,1.0)).xyz - fragPosition);
  // return vec3(falloff);
    //return (vec3(normalize(closestPoint)));
    float a_v = clamp((dot(normalOnSphere, fragNormal) + 0.5) * 2.0);
    //return vec3( RandomUnitVector(rngCo));
    float mc_v = visibility(fragPosition, vec3(closestPoint - fragPosition), vec3(sPos), sRad);
    vec3 col =  BRDF(-L, alphaPrime ,falloff, 1.0) *a_v;
    //return normalize(closestPoint ) * 5.0;
    return col;
     
    }
    void main () {
      gl_FragColor = vec4 (color() * shadow(), 1.0);
    }
    `,
  attributes: {
    position: object.positions,
    normal: object.normals
  },
  uniforms:{
    modelMatrix: model.lightModelMatrixUnscaled,
    lookAtMatrix: camera.viewMatrix,
    lightColor: light.lightColorVisibility,
    perspectiveMatrix: camera.projectionMatrix,
    eye: camera.eye,
    lightrad: light.lightradVisibility,
    lightPos: light.lightPos,
    sPos: light.sPos,
    sRad: light.sRad,
    roughness: light.roughness,
    metallic: light.metallicVisibility,
    luminosity: light.luminosity,
    materialColor: light.materialColor
  
  },
  elements: object.cells
})
}
)}

function _sphereShadowCasterShader(){return(
function(camera, model, light, objectStuff){ return (
  {
  vert: `precision mediump float;

    attribute vec3 position;

    uniform mat4 viewMatrix; // Constants that must be set before the render call.
    uniform mat4 projectionMatrix;
    uniform mat4 modelMatrix;

    void main () {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1);
    }`,
  frag: `precision mediump float;
    void main () {
      gl_FragColor = vec4(0.5,0.4,0.9,1);
    }`,
  attributes: {
    position: light.lightObjectPositions // Cube Mesh data. 
  },
  elements: light.lightObjectCells,
  uniforms:{  // All the Uniform constants used in Shader program must be set here before making a render call.
    viewMatrix: camera.viewMatrix,
    projectionMatrix: camera.projectionMatrix,
    modelMatrix: model.casterModelMatrix
  }
}
)}
)}

function _sphereRenderableLight(){return(
function(camera, model, light, objectStuff){ return(
  {
  vert: `precision mediump float;

    attribute vec3 position;

    uniform mat4 viewMatrix; // Constants that must be set before the render call.
    uniform mat4 projectionMatrix;
    uniform mat4 modelMatrix;
  

    void main () {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1);
    }`,
  frag: `precision mediump float;
  uniform vec3 lightColor;
    void main () {
      gl_FragColor = vec4(lightColor,1);
    }`,
  attributes: {
    position: light.lightObjectPositions // Cube Mesh data. 
  },
  elements: light.lightObjectCells,
  uniforms:{  // All the Uniform constants used in Shader program must be set here before making a render call.
    viewMatrix: camera.viewMatrix,
    projectionMatrix: camera.projectionMatrix,
    modelMatrix: model.lightModelMatrix,
    lightColor: light.lightColorVisibility
  }
}
)}
)}

function _shadowcaster(){return(
{x:0,y:0,z:0}
)}

function _24(md){return(
md `# new camera `
)}

function _toRadian(glMatrix){return(
glMatrix.glMatrix.toRadian
)}

function _rotationMatrix(mat4,yRotationMatrix,xRotationMatrix){return(
mat4.multiply([],yRotationMatrix,xRotationMatrix)
)}

function _yRotationMatrix(mat4,toRadian,viewParameters){return(
mat4.fromYRotation([],toRadian(viewParameters.yAngle))
)}

function _xRotationMatrix(mat4,toRadian,viewParameters){return(
mat4.fromXRotation([],toRadian(viewParameters.xAngle))
)}

function _eye(viewParameters,shapeDimensions,vec3,rotationMatrix)
{
  const center = [0, 0, 0];
  const D = viewParameters.eyeDistance+shapeDimensions.radius;
  const viewDirection = vec3.transformMat4([],[0,0,1],rotationMatrix);
  const eye = vec3.scaleAndAdd([],center,viewDirection, D);
  return eye;
}


function _perspectiveMatrix(myCanvas,shapeDimensions,mat4,toRadian,viewParameters)
{
  const aspect = myCanvas.width/myCanvas.height;
  const radius = shapeDimensions.radius /2;
  const near = 0.001*radius;
  const far = 10*radius;
  return mat4.perspective([], toRadian(viewParameters.fov), aspect, near, far)
}


function _viewMatrix(viewParameters,shapeDimensions,vec3,rotationMatrix,mat4)
{
  const center = [0.0,0.0,0.0];
  const D = viewParameters.eyeDistance*shapeDimensions.radius;
  const viewDirection = vec3.transformMat4([],[0,0,1],rotationMatrix);
  const eye = vec3.scaleAndAdd([],center,viewDirection, D);
  const up = [0, 10, 0];
  return mat4.lookAt([], eye, center, [0,1,0])
}


function _getSphereCamera(vec3,mat4,toRadian){return(
function(eyeDistance, shapeRadius, rotationMatrix, fov, canvasWidth, canvasHeight) { 
  let center = [0.0,0.0,0.0];
  let D = eyeDistance*shapeRadius;
  let viewDirection = vec3.transformMat4([],[0,0,1],rotationMatrix);
  let eye = vec3.scaleAndAdd([],center,viewDirection, D);
  let up = [0, 10, 0];
  let aspect = canvasWidth/canvasHeight;
  let radius = shapeRadius /2;
  let near = 0.001*radius;
  let far = 10*radius;
  let viewMatrix = mat4.lookAt([], eye, center, [0,1,0]);
  let perspectiveMatrix = mat4.perspective([], toRadian(fov), aspect, near, far);
  
  return
  ({
    viewMatrix : viewMatrix,
    eye : eye,
    perspectiveMatrix : perspectiveMatrix
  });
}
)}

function _33(md){return(
md `# imports, misc`
)}

function _casterModelMatrix(casterRadius,shapeDimensions,mat4,casterModelMatrix_unscaled)
{
  const s = casterRadius;
  const scalar = Math.max(...shapeDimensions.box);
  const scaleMatrix = mat4.fromScaling([],[s,s,s]);
  return mat4.mul([],casterModelMatrix_unscaled, scaleMatrix); // Light is centered at origin.
}


function _casterModelMatrix_unscaled(mat4,shadowcaster)
{
  const translationMatrix = mat4.fromTranslation([],[shadowcaster.x  , shadowcaster.y, shadowcaster.z]);
  return translationMatrix; // Light is centered at origin.
}


function _lightModelMatrix(lightRadius,shapeDimensions,mat4,lightModelMatrix_unscaled)
{
  const s = lightRadius;
  const scalar = Math.max(...shapeDimensions.box);
  const scaleMatrix = mat4.fromScaling([],[s,s,s]);
  return mat4.mul([],lightModelMatrix_unscaled, scaleMatrix); // Light is centered at origin.
}


function _lightModelMatrix_unscaled(mat4,light)
{
  const translationMatrix = mat4.fromTranslation([],[light.x  , light.y, light.z]);
  return translationMatrix; // Light is centered at origin.
}


function _lightObject(sphere){return(
sphere
)}

function _shapeDimensions(getScDimensions,object){return(
getScDimensions(object)
)}

function _vec3(glMatrix){return(
glMatrix.vec3
)}

function _mat4(glMatrix){return(
glMatrix.mat4
)}

function _createRegl(require){return(
require("regl")
)}

function _glMatrix(require){return(
require('https://bundle.run/gl-matrix@3.3.0')
)}

function _d3(require){return(
require("d3")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof lightColorInput")).define("viewof lightColorInput", ["color"], _lightColorInput);
  main.variable(observer("lightColorInput")).define("lightColorInput", ["Generators", "viewof lightColorInput"], (G, _) => G.input(_));
  main.variable(observer("viewof materialColorInput")).define("viewof materialColorInput", ["color"], _materialColorInput);
  main.variable(observer("materialColorInput")).define("materialColorInput", ["Generators", "viewof materialColorInput"], (G, _) => G.input(_));
  main.variable(observer("viewof viewParameters")).define("viewof viewParameters", ["columns","slider"], _viewParameters);
  main.variable(observer("viewParameters")).define("viewParameters", ["Generators", "viewof viewParameters"], (G, _) => G.input(_));
  main.variable(observer("viewof brdf_params")).define("viewof brdf_params", ["columns","slider","radio"], _brdf_params);
  main.variable(observer("brdf_params")).define("brdf_params", ["Generators", "viewof brdf_params"], (G, _) => G.input(_));
  main.variable(observer("viewof model")).define("viewof model", ["radio"], _model);
  main.variable(observer("model")).define("model", ["Generators", "viewof model"], (G, _) => G.input(_));
  main.variable(observer("viewof lightRadius")).define("viewof lightRadius", ["slider"], _lightRadius);
  main.variable(observer("lightRadius")).define("lightRadius", ["Generators", "viewof lightRadius"], (G, _) => G.input(_));
  main.variable(observer("viewof casterRadius")).define("viewof casterRadius", ["slider"], _casterRadius);
  main.variable(observer("casterRadius")).define("casterRadius", ["Generators", "viewof casterRadius"], (G, _) => G.input(_));
  main.variable(observer("viewof light")).define("viewof light", ["columns","slider"], _light);
  main.variable(observer("light")).define("light", ["Generators", "viewof light"], (G, _) => G.input(_));
  main.variable(observer("myCanvas")).define("myCanvas", ["DOM"], _myCanvas);
  main.variable(observer("objects")).define("objects", ["ground","teapot","cube","boy","teddy","cow","sphereLowRes","sphere"], _objects);
  main.variable(observer("object")).define("object", ["objects","model"], _object);
  main.variable(observer()).define(["createRegl","myCanvas","sphereRenderableObject_mc_visibility","sphereLightParams","object","sphereRenderableLight","sphereShadowCasterShader"], _14);
  main.variable(observer("rotFromZ")).define("rotFromZ", ["norm3"], _rotFromZ);
  main.variable(observer("norm3")).define("norm3", _norm3);
  main.variable(observer("hex2rgb")).define("hex2rgb", _hex2rgb);
  main.variable(observer("sphereLightParams")).define("sphereLightParams", ["viewMatrix","perspectiveMatrix","eye","casterModelMatrix","lightModelMatrix","lightModelMatrix_unscaled","lightObject","lightColorInput","hex2rgb","lightRadius","shapeDimensions","light","shadowcaster","casterRadius","brdf_params","materialColorInput","object"], _sphereLightParams);
  main.variable(observer("SphereRenderableObject")).define("SphereRenderableObject", ["object","lightModelMatrix","viewMatrix","hex2rgb","perspectiveMatrix","eye","lightRadius","shapeDimensions","light","brdf_params","materialColorInput"], _SphereRenderableObject);
  main.variable(observer("sphereRenderableObject_mc_visibility")).define("sphereRenderableObject_mc_visibility", ["object"], _sphereRenderableObject_mc_visibility);
  main.variable(observer("sphereShadowCasterShader")).define("sphereShadowCasterShader", _sphereShadowCasterShader);
  main.variable(observer("sphereRenderableLight")).define("sphereRenderableLight", _sphereRenderableLight);
  main.variable(observer("shadowcaster")).define("shadowcaster", _shadowcaster);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("toRadian")).define("toRadian", ["glMatrix"], _toRadian);
  main.variable(observer("rotationMatrix")).define("rotationMatrix", ["mat4","yRotationMatrix","xRotationMatrix"], _rotationMatrix);
  main.variable(observer("yRotationMatrix")).define("yRotationMatrix", ["mat4","toRadian","viewParameters"], _yRotationMatrix);
  main.variable(observer("xRotationMatrix")).define("xRotationMatrix", ["mat4","toRadian","viewParameters"], _xRotationMatrix);
  main.variable(observer("eye")).define("eye", ["viewParameters","shapeDimensions","vec3","rotationMatrix"], _eye);
  main.variable(observer("perspectiveMatrix")).define("perspectiveMatrix", ["myCanvas","shapeDimensions","mat4","toRadian","viewParameters"], _perspectiveMatrix);
  main.variable(observer("viewMatrix")).define("viewMatrix", ["viewParameters","shapeDimensions","vec3","rotationMatrix","mat4"], _viewMatrix);
  main.variable(observer("getSphereCamera")).define("getSphereCamera", ["vec3","mat4","toRadian"], _getSphereCamera);
  main.variable(observer()).define(["md"], _33);
  const child1 = runtime.module(define1);
  main.import("sphereLowRes", child1);
  main.import("sphere", child1);
  main.import("cube", child1);
  main.import("beachHouse", child1);
  main.import("dollHouse", child1);
  main.import("house", child1);
  main.import("watchTower", child1);
  main.import("ground", child1);
  const child2 = runtime.module(define2);
  main.import("teapot", child2);
  main.import("boy", child2);
  main.import("teddy", child2);
  main.import("cow", child2);
  main.variable(observer("casterModelMatrix")).define("casterModelMatrix", ["casterRadius","shapeDimensions","mat4","casterModelMatrix_unscaled"], _casterModelMatrix);
  main.variable(observer("casterModelMatrix_unscaled")).define("casterModelMatrix_unscaled", ["mat4","shadowcaster"], _casterModelMatrix_unscaled);
  main.variable(observer("lightModelMatrix")).define("lightModelMatrix", ["lightRadius","shapeDimensions","mat4","lightModelMatrix_unscaled"], _lightModelMatrix);
  main.variable(observer("lightModelMatrix_unscaled")).define("lightModelMatrix_unscaled", ["mat4","light"], _lightModelMatrix_unscaled);
  main.variable(observer("lightObject")).define("lightObject", ["sphere"], _lightObject);
  main.variable(observer("shapeDimensions")).define("shapeDimensions", ["getScDimensions","object"], _shapeDimensions);
  main.variable(observer("vec3")).define("vec3", ["glMatrix"], _vec3);
  main.variable(observer("mat4")).define("mat4", ["glMatrix"], _mat4);
  main.variable(observer("createRegl")).define("createRegl", ["require"], _createRegl);
  const child3 = runtime.module(define2);
  main.import("scaledTeapot", child3);
  const child4 = runtime.module(define3);
  main.import("getScDimensions", child4);
  main.variable(observer("glMatrix")).define("glMatrix", ["require"], _glMatrix);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child5 = runtime.module(define4);
  main.import("slider", child5);
  main.import("radio", child5);
  main.import("color", child5);
  main.import("checkbox", child5);
  const child6 = runtime.module(define5);
  main.import("columns", child6);
  return main;
}
