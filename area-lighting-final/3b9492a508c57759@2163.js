// https://observablehq.com/@colive20/sandbox-v2@2163
import define1 from "./55faae595525622e@211.js";
import define2 from "./2180fcbe75883db9@142.js";
import define3 from "./ebae0c172bd689cc@102.js";
import define4 from "./25788596efed383e@192.js";
import define5 from "./c6c364132586c706@177.js";
import define6 from "./e93997d5089d7165@2303.js";
import define7 from "./10023e7d8ddc32bc@90.js";
import define8 from "./4999f76212508574@211.js";

function _1(md){return(
md`# SANDBOX V2`
)}

function _model(radio){return(
radio({
  description: 'Choose Model',
  options: [{value: 0, label: "ground"}, {value: 1, label: "house"}, {value: 2, label: "teapot"}],
  value: 0
})
)}

function _3(md){return(
md `### Choose Camera parameters`
)}

function _viewParameters(columns,slider){return(
columns({
 eyeDistance: slider({
    min: 0.1, 
    max: 10, 
    step: 0.1, 
    value: 2.7, 
    title: "Eye Distance from the Scene Center",
    description: "Distance relative to Scene Dimension"
  }),
  xAngle: slider({
    min: -89, 
    max: 89, 
    step: 1, 
    value: -35, 
    title: "Rotation Around X-axis in degrees",
    description: "Camera Orbiting around the scene center."
  }),
  yAngle : slider({
    min: -180, 
    max: 180, 
    step: 1, 
    value: -90, 
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

function _lightParameters(columns,slider){return(
columns({
  lightDistance : slider({
    min: .2, 
    max: 2, 
    step: 0.01, 
    value: 0.2, 
    description: "Relative Distance of Point Light from the Center"
  })
})
)}

function _sampleNum(columns,slider){return(
columns({
  samples : slider({
    min: 1, 
    max: 100, 
    step: 1, 
    value: 1, 
    description: "Number of Samples"
  })
})
)}

function _scalingFactor(slider){return(
slider({
    min: 0.1, 
    max: 2, 
    step: 0.1, 
    value: 0.5, 
    title: "Scale Light"
})
)}

function _lightMove(columns,slider){return(
columns({
  x: slider({
  min: -100, 
  max: 100, 
  value: 2.7, 
  step: 0.1, 
  title: "Translate Light along X-axis"
}),
  y: slider({
  min: 50, 
  max: 150, 
  value: 109.4, 
  step: 0.1, 
  title: "Translate Light along Y-axis"
}),
  z: slider({
  min: -100, 
  max: 100, 
  value: 0, 
  step: 0.1, 
  title: "Translate Light along Z-axis"
})
})
)}

function _lightRotate(columns,slider){return(
columns({
  x: slider({
  min: -100, 
  max: 100, 
  value: 0, 
  step: 0.1, 
  title: "Rotate Light around X-axis"
}),
  y: slider({
  min: 10, 
  max: 100, 
  value: 10, 
  step: 0.1, 
  title: "Rotate Light around Y-axis"
})
})
)}

function _10(md){return(
md `### Set BRDF parameters`
)}

function _brdf_params(columns,slider){return(
columns({
  roughness:slider({
    title: "Roughness of specular highlight",
    min: .1, 
    max: .5, 
    step: .01, 
    value: .2
  }),
  luminosity:slider({
    title: "Luminosity",
    min: 1.0, 
    max: 2.0, 
    step: .01, 
    value: 1.0
  })
})
)}

function _myCanvas(html,canvasWidth,canvasHeight){return(
html `<canvas width=${canvasWidth}, height=${canvasHeight}/>`
)}

function _materialColor(color){return(
color({
  value: "#ffffff",
  description:"Material Color"
  })
)}

function _canvasWidth(){return(
760
)}

function _canvasHeight(){return(
400
)}

function _camera(eyePosition,viewMatrix,lightPerspectiveMatrix){return(
{
    eye: eyePosition,
    viewMatrix: viewMatrix,
    projectionMatrix: lightPerspectiveMatrix
}
)}

function _shape(object,hex2rgb,materialColor){return(
{
    positions: object.positions, // Mesh data. 
    normals:   object.normals,    // Only vertex shader can receive this data.
    cells: object.cells,
    scale: 10.0,
    color: hex2rgb(materialColor)
}
)}

function _lightProperties(hex2rgb,vec3,finalEndA,finalEndB,tubeLightDimensions,scalingFactor,lightDirection,brdf_params,stl,lightModelMatrix,sampleNum){return(
{
    color: hex2rgb("#FFFFFF"),
    endpointA: vec3.fromValues(finalEndA[0], finalEndA[1], finalEndA[2]),
    endpointB: vec3.fromValues(finalEndB[0], finalEndB[1], finalEndB[2]),
    radius: tubeLightDimensions.box[0] / 2 * scalingFactor,
    normal: lightDirection,
    roughness: brdf_params.roughness,
    brightness: brdf_params.luminosity,
    shape: ({
      positions: stl.positions,
      modelMatrix: lightModelMatrix,
    }),
    shininess: 1.0,
    samples: sampleNum.samples,
}
)}

function _19(createRegl,myCanvas,tubeSamplingObject,camera,shape,lightProperties,tubeRenderableLight)
{
  const regl = createRegl({canvas:myCanvas});
  regl.clear({color: [0.5, 0.5, 0.6, 1]});

  const renderObject = regl(tubeSamplingObject(camera, shape, lightProperties));
  const renderLight = regl(tubeRenderableLight(camera, lightProperties));
  
  renderObject();
  renderLight(); // Optional. In case you want to see the location/orientation of the light source.
  
  return `Main Rendering`
}


function _norm3(){return(
function (v3) {
  let mag = Math.sqrt(v3[0]*v3[0] + v3[1]*v3[1] + v3[2]*v3[2]);
  let ret = [v3[0]/mag, v3[1]/mag, v3[2]/mag];
  return ret;
}
)}

function _rotFromZ(norm3){return(
function (a) {
  if ((a[0] == 0) && (a[1] == 0)) return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  a = norm3(a);
  let b = norm3([a[1], -a[0], 0]);
  let c = norm3([b[1]*a[2], -b[0]*a[2], b[0]*a[1] - b[1]*a[0]]);
  return [c[0], c[1], c[2], b[0], b[1], b[2], a[0], a[1], a[2]];
}
)}

function _22(md){return(
md `## This is where I'm not sure where to go with tube sampling`
)}

function _parmTube(rotFromZ,glMatrix,lightMove,lightProperties){return(
function(tube) {
 let temp = rotFromZ(glMatrix.vec3.normalize([], [-lightMove.x, -lightMove.y, -lightMove.z]))
 return ({
   x: [lightProperties.radius*temp[0], lightProperties.radius*temp[1], lightProperties.radius*temp[2]],
   y: [lightProperties.radius*temp[3], lightProperties.radius*temp[4], lightProperties.radius*temp[5]]
 })
}
)}

function _tubeSamplingObject(parmTube,lightProperties){return(
function (cam, sh, lightProps) {
  return (
  {
  vert: `precision mediump float;

    attribute vec3 position;
    attribute vec3 normal;

    uniform vec3 leftEndpoint;
    uniform vec3 rightEndpoint;
    uniform mat4 viewMatrix; // Constants that must be set before the render call.
    uniform mat4 projectionMatrix;

    varying vec3 fragNormal; // Data Sent to Fragment shader
    varying vec3 fragPosition;
    varying vec3 Ae;
    varying vec3 Be;

    void main () {
      gl_PointSize = 2.0;
      vec4 mPosition = vec4(10.0 * position, 1); // modelMatrix*vec4(position, 1); 
      fragPosition   = mPosition.xyz;
      fragNormal  = normalize(normal); // normalize(normalMatrix*normal)
                                       // You must normalize it here before sending to Fragment shader.      
      gl_Position = projectionMatrix * viewMatrix * mPosition;
    }`,
  frag: `precision mediump float;

    uniform vec3 materialColor; // Constants that must be set before the render call.
    uniform vec3 specularColor;
    uniform float shininess;
    uniform vec3 eyePosition;
    uniform float k_s;
    uniform vec4 light;
    uniform vec3 leftEndpoint;
    uniform vec3 rightEndpoint;
    uniform float tubeRadius;
    uniform vec3 lightDirection;
    uniform vec3 lightColor;
    uniform float roughness;
    uniform float luminosity;
    uniform float metallic;
    uniform mat4 modelMatrix;
    uniform vec3 testX;
    uniform vec3 testY;
    uniform float samples;
    uniform mat4 viewMatrix; // Constants that must be set before the render call.

    varying vec3 Ae;
    varying vec3 Be;
    varying vec3 fragNormal; // Data Received from Vertex Shader. Gets interpolated on the way by Rasterizer.
    varying vec3 fragPosition;

    
    vec3 getClosestPoint() {
      vec3 N = normalize(fragNormal);
      vec3 V = normalize(eyePosition - fragPosition);
      vec3 R = reflect(-V, N);

      vec3 L0 = leftEndpoint.xyz - fragPosition;
      vec3 L1 = rightEndpoint.xyz - fragPosition;
      
      float distL0 = length(L0);
      float distL1 = length(L1);

      float NoL0 = dot(L0, N) / (2.0 * distL0);
      float NoL1 = dot(L1, N) / (2.0 * distL1);
      float NoL = (2.0 * clamp(NoL0 + NoL1, 0., 1.)) / (distL0 * distL1 + dot(L0, L1) * 2.0);

      vec3 Ldist = L1 - L0;
      float RoLd = dot(R, Ldist);
      float distLd = length(Ldist);
      float t = (dot(R, L0) * RoLd - dot( L0, Ldist)) / (distLd * distLd - RoLd * RoLd);

      vec3 closestPoint = L0 + Ldist * clamp(t, 0., 1.);
      vec3 centerToRay = dot(closestPoint, R) * R - closestPoint;
      closestPoint = closestPoint + centerToRay * clamp(tubeRadius / length(centerToRay), 0., 1.);
      vec3 L = normalize(closestPoint);
      return L;
    }

    float clamp(float x) {
      return x > 0.0 ? x : 0.0;
    }
    float clamp2(float x) {
      return x > 0.0 ? x > 1.0 ? 1.0: x : 0.0;
    }
    float cull(float x) {
      return x > 0.0 ? 1.0 : 0.0;
    }
    
    vec3 distribution(float param1, float param2) {
      vec3 A = leftEndpoint.xyz;
      vec3 B = rightEndpoint.xyz;

      return A + (B - A) * param1 + testX * sin(2.0*3.14159 * param2) + testY*cos(2.0 * 3.14159 * param2);
    }
    float random (float rand, float randS) {
      return fract(sin(randS*(rand+1.0))*43758.5453123);
    }
    float randomS (float rand) {
      return 1.0 + fract(rand+0.1)*43758.5453123;
    }

    float D_GGX(float NoH, float a) {
      float oneMinusNoHSquared = 1.0 - NoH * NoH;
      float k = a / (oneMinusNoHSquared + a * a);
      float d = k * k * (1.0 / 3.14);
      return clamp(d, 0., 1.);
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
      vec3 v = normalize(eyePosition - fragPosition);
      vec3 n = normalize(fragNormal);
      vec3 h = normalize(v + l);
      
      float NoV = abs(dot(n, v)) + 1e-5;
      float NoL = clamp(dot(n, l), 0., 1.);
      float NoH = clamp(dot(n, h), 0., 1.);
      float LoH = clamp(dot(l, h), 0., 1.);
      float VoH = clamp(dot(v, h), 0., 1.);

      float roughVal = roughness * roughness;
      
      float D = D_GGX(NoH, roughVal);
      vec3 F = F_Schlick(getReflectance(), VoH);
      float V = V_SmithGGXCorrelated(NoV, NoL, roughVal);

      vec3 Fr = (D * V) * F;

      vec3 diffuseColor = (1.0 - metallic) * materialColor;
      vec3 Fd = diffuseColor * Fd_Lambert();

      vec3 light = (Fr + Fd ) * lightColor * falloff * luminosity;

      return light;
    }

    vec3 color(float alphaPrime, float falloff) {
      vec3 diff = vec3(0.0);
      float spec = 0.0;
      float rand = 0.0;
      float rand2 = 0.0;
      float randS = dot(fragPosition, vec3(12.9898, 78.233, 100.9219));
      float d2, frontTest;
      vec3 sample, light, look, halfVec;
      for(int i = `+ lightProps.samples + `; i > 0; i--){
        randS = randomS(randS);
        rand = random(rand2, randS);
        randS = randomS(randS);
        rand2 = random(rand, randS);
        sample = distribution(rand, rand2);
        
        
        diff += BRDF(sample, alphaPrime, falloff); 
      }
      diff = diff / samples; 
      
      return diff;
    }

    void main () {
      // Normalized new light vector.
      vec3 closestPoint = getClosestPoint();

      // Magnitude of the new light vector.
      float distLight = length(closestPoint);

      // Roughness and falloff calculations described in https://alextardif.com/arealights.html
      float alphaPrime = clamp(tubeRadius/(distLight*2.0) + roughness, 0., 1.);
      float falloff = pow(clamp(1.0 - pow(distLight/(tubeRadius), 4.0), 0., 1.), 2.0) / ((distLight * distLight) + 1.0);

      // Feed new light vector to brdf function.
      vec3 color = color(alphaPrime, falloff);
      gl_FragColor = vec4(color, 1);
    }`,
  attributes: {
    position: sh.positions, // Mesh data. 
    normal:   sh.normals    // Only vertex shader can receive this data.
  },
  elements: sh.cells,
  uniforms:{  // All the Uniform constants used in Shader program must be set here before making a render call.
    materialColor: sh.color,
    lightColor: lightProps.color,
    eyePosition: cam.eye,
    viewMatrix: cam.viewMatrix,
    projectionMatrix: cam.projectionMatrix,
    leftEndpoint: lightProps.endpointA,
    rightEndpoint: lightProps.endpointB,
    tubeRadius: lightProps.radius,
    luminosity: lightProps.brightness,
    roughness: lightProps.roughness,
    metallic: lightProps.shininess,
    testX: parmTube(lightProperties).x,
    testY: parmTube(lightProperties).y,
    samples: lightProperties.samples
  }
}
)}
)}

function _25(parmTube,lightProperties){return(
parmTube(lightProperties).x
)}

function _tubeRenderableObject(){return(
function (cam, sh, lightProps) {return (
  {
  vert: `precision mediump float;

    attribute vec3 position;
    attribute vec3 normal;

    uniform vec3 leftEndpoint;
    uniform vec3 rightEndpoint;
    uniform mat4 viewMatrix; // Constants that must be set before the render call.
    uniform mat4 projectionMatrix;

    varying vec3 fragNormal; // Data Sent to Fragment shader
    varying vec3 fragPosition;
    varying vec3 Ae;
    varying vec3 Be;

    void main () {
      gl_PointSize = 2.0;
      vec4 mPosition = vec4(10.0 * position, 1); // modelMatrix*vec4(position, 1); 
      fragPosition   = mPosition.xyz;
      fragNormal  = normalize(normal); // normalize(normalMatrix*normal)
                                       // You must normalize it here before sending to Fragment shader.      
      gl_Position = projectionMatrix * viewMatrix * mPosition;
    }`,
  frag: `precision mediump float;

    uniform vec3 materialColor; // Constants that must be set before the render call.
    uniform vec3 specularColor;
    uniform float shininess;
    uniform vec3 eyePosition;
    uniform float k_s;
    uniform vec4 light;
    uniform vec3 leftEndpoint;
    uniform vec3 rightEndpoint;
    uniform float tubeRadius;
    uniform vec3 lightDirection;
    uniform vec3 lightColor;
    uniform float roughness;
    uniform float luminosity;
    uniform float metallic;
    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix; // Constants that must be set before the render call.

    varying vec3 Ae;
    varying vec3 Be;
    varying vec3 fragNormal; // Data Received from Vertex Shader. Gets interpolated on the way by Rasterizer.
    varying vec3 fragPosition;

    
    vec3 getClosestPoint() {
      vec3 N = normalize(fragNormal);
      vec3 V = normalize(eyePosition - fragPosition);
      vec3 R = reflect(-V, N);
    
      // vec4 A =  vec4(leftEndpoint, 1.0);
      // A = modelMatrix * A;
      // vec4 B =  vec4(rightEndpoint, 1.0);
      // B = modelMatrix * A;
      // vec4 B = modelMatrix * vec4(rightEndpoint.xyz, 1)

      vec3 L0 = leftEndpoint.xyz - fragPosition;
      vec3 L1 = rightEndpoint.xyz - fragPosition;
      
      float distL0 = length(L0);
      float distL1 = length(L1);

      float NoL0 = dot(L0, N) / (2.0 * distL0);
      float NoL1 = dot(L1, N) / (2.0 * distL1);
      float NoL = (2.0 * clamp(NoL0 + NoL1, 0., 1.)) / (distL0 * distL1 + dot(L0, L1) * 2.0);

      vec3 Ldist = L1 - L0;
      float RoLd = dot(R, Ldist);
      float distLd = length(Ldist);
      float t = (dot(R, L0) * RoLd - dot( L0, Ldist)) / (distLd * distLd - RoLd * RoLd);

      vec3 closestPoint = L0 + Ldist * clamp(t, 0., 1.);
      vec3 centerToRay = dot(closestPoint, R) * R - closestPoint;
      closestPoint = closestPoint + centerToRay * clamp(tubeRadius / length(centerToRay), 0., 1.);
      vec3 L = normalize(closestPoint);
      return L;
    }

    float D_GGX(float NoH, float a) {
      float oneMinusNoHSquared = 1.0 - NoH * NoH;
      float k = a / (oneMinusNoHSquared + a * a);
      float d = k * k * (1.0 / 3.14);
      return clamp(d, 0., 1.);
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
      vec3 v = normalize(eyePosition - fragPosition);
      vec3 n = normalize(fragNormal);
      vec3 h = normalize(v + l);
      
      float NoV = abs(dot(n, v)) + 1e-5;
      float NoL = clamp(dot(n, l), 0., 1.);
      float NoH = clamp(dot(n, h), 0., 1.);
      float LoH = clamp(dot(l, h), 0., 1.);
      float VoH = clamp(dot(v, h), 0., 1.);

      float roughVal = roughness * roughness;
      
      float D = D_GGX(NoH, roughVal);
      vec3 F = F_Schlick(getReflectance(), VoH);
      float V = V_SmithGGXCorrelated(NoV, NoL, roughVal);

      vec3 Fr = (D * V) * F;

      vec3 diffuseColor = (1.0 - metallic) * materialColor;
      vec3 Fd = diffuseColor * Fd_Lambert();

      vec3 light = (Fr + Fd ) * lightColor * falloff * luminosity;

      return light;
    }

    void main () {
      // Normalized new light vector.
      vec3 closestPoint = getClosestPoint();

      // Magnitude of the new light vector.
      float distLight = length(closestPoint);

      // Roughness and falloff calculations described in https://alextardif.com/arealights.html
      float alphaPrime = clamp(tubeRadius/(distLight*2.0) + roughness, 0., 1.);
      float falloff = pow(clamp(1.0 - pow(distLight/(tubeRadius), 4.0), 0., 1.), 2.0) / ((distLight * distLight) + 1.0);

      // Feed new light vector to brdf function.
      vec3 color = BRDF(closestPoint, alphaPrime, falloff);
      gl_FragColor = vec4(color, 1);
    }`,
  attributes: {
    position: sh.positions, // Mesh data. 
    normal:   sh.normals    // Only vertex shader can receive this data.
  },
  elements: sh.cells,
  uniforms:{  // All the Uniform constants used in Shader program must be set here before making a render call.
    materialColor: sh.color,
    lightColor: lightProps.color,
    eyePosition: cam.eye,
    viewMatrix: cam.viewMatrix,
    projectionMatrix: cam.projectionMatrix,
    leftEndpoint: lightProps.endpointA,
    rightEndpoint: lightProps.endpointB,
    tubeRadius: lightProps.radius,
    luminosity: lightProps.brightness,
    roughness: lightProps.roughness,
    metallic: lightProps.shininess
  }
}
)}
)}

function _tubeRenderableLight(){return(
function(cam, lightProps){ return (
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
      gl_FragColor = vec4(1,1,0,1);
    }`,
  attributes: {
    position: lightProps.shape.positions // Cube Mesh data. 
  },
  uniforms:{  // All the Uniform constants used in Shader program must be set here before making a render call.
    viewMatrix: cam.viewMatrix,
    projectionMatrix: cam.projectionMatrix,
    modelMatrix: lightProps.shape.modelMatrix
  },
  count: lightProps.shape.positions.length,
}
)}
)}

function _lightDirection(glMatrix,toRadian){return(
glMatrix.vec3.rotateZ([],[0,1,0],[0,0,0],toRadian(0))
)}

function _lightPosition(lightParameters,tubeLightDimensions,glMatrix,lightDirection)
{
  const D = lightParameters.lightDistance*tubeLightDimensions.radius;
  return glMatrix.vec3.scaleAndAdd([], tubeLightDimensions.center, lightDirection, D);
}


function _groundModelMatrix(mat4)
{
  const s = 10;
  const scaleMatrix = mat4.fromScaling([],[s,s,s]);
  const translationMatrix = mat4.fromTranslation([],[0, 0, 0]);
  //return translationMatrix
  return mat4.multiply([], translationMatrix, scaleMatrix) // Light is centered at origin.
}


function _lightModelMatrix(mat4,scalingFactor,lightMove,lightRotate)
{
  const scaleMatrix = mat4.fromScaling([],[scalingFactor,scalingFactor,scalingFactor]);
  const translationMatrix = mat4.fromTranslation([],[lightMove.x,lightMove.y,lightMove.z]); //CHANGE HERE
  const xRotationMatrix = mat4.fromXRotation([], lightRotate.x);
  const yRotationMatrix = mat4.fromYRotation([], lightRotate.y);
  const zRotationMatrix = mat4.fromZRotation([], 90 * Math.PI / 180);
  const rotationMatrix = mat4.multiply([], mat4.multiply([], xRotationMatrix, yRotationMatrix), zRotationMatrix)
  return mat4.multiply([], mat4.multiply([], translationMatrix, rotationMatrix), scaleMatrix); // Light is centered at origin.
}


function _endpointModelMatrix(mat4,scalingFactor,lightMove,lightRotate)
{
    const scaleMatrix = mat4.fromScaling([],[scalingFactor,scalingFactor,scalingFactor]);
    const transMatrix = mat4.fromTranslation([],[lightMove.x,lightMove.y,lightMove.z]);
    const xRotationMatrix = mat4.fromXRotation([], lightRotate.x);
    const yRotationMatrix = mat4.fromYRotation([], lightRotate.y);
    const rotationMatrix = mat4.multiply([], xRotationMatrix, yRotationMatrix)
    return mat4.multiply([], mat4.multiply([], transMatrix, rotationMatrix), scaleMatrix);
}


function _sphereRightModelMatrix(mat4,endpointB)
{
  const s = 30;
  const rotationMatrix = mat4.fromZRotation([], 90 * Math.PI / 180);
  const scaleMatrix = mat4.fromScaling([],[s,s,s]);
  const r = [1, 1, 1];
  const translationMatrix = mat4.fromTranslation([], endpointB);
  //return translationMatrix
  return mat4.multiply([], mat4.multiply([], translationMatrix, rotationMatrix), scaleMatrix) // Light is centered at origin.
}


function _sphereLeftModelMatrix(mat4,endpointA)
{
  const s = 30;
  const rotationMatrix = mat4.fromZRotation([], 90 * Math.PI / 180);
  const scaleMatrix = mat4.fromScaling([],[s,s,s]);
  const r = [1, 1, 1];
  const translationMatrix = mat4.fromTranslation([], endpointA);
  //return translationMatrix
  return mat4.multiply([], mat4.multiply([], translationMatrix, rotationMatrix), scaleMatrix) // Light is centered at origin.
}


function _35(md){return(
md `## Specular/Ambient`
)}

function _eyePosition(objectDimensions,viewParameters,vec3,rotationMatrix)
{
  const center = objectDimensions.center;
  const D = viewParameters.eyeDistance*objectDimensions.radius;
  const viewDirection = vec3.transformMat4([],[0,0,1],rotationMatrix);
  const eye = vec3.scaleAndAdd([],center,viewDirection, D);
  return eye;
}


function _37(md){return(
md `## Rendered Object`
)}

function _object(objects,model){return(
objects[+model]
)}

function _objectDimensions(getScDimensions,object){return(
getScDimensions(object)
)}

function _sphereDimensions(getScDimensions,sphereLowRes){return(
getScDimensions(sphereLowRes)
)}

function _41(md){return(
md `## Camera Matrices`
)}

function _lightObject(sphereLowRes){return(
sphereLowRes
)}

function _viewMatrix(tubeLightDimensions,viewParameters,vec3,rotationMatrix,lookAt)
{
  const center = tubeLightDimensions.center;
  const D = viewParameters.eyeDistance*tubeLightDimensions.radius;
  const viewDirection = vec3.transformMat4([],[0,0,1],rotationMatrix);
  const eye = vec3.scaleAndAdd([],center,viewDirection, D);
  const up = [0, 1, 0];
  return lookAt([], eye, center, [0,1,0])
}


function _groundViewMatrix(objectDimensions,viewParameters,vec3,rotationMatrix,lookAt)
{
  const center = objectDimensions.center;
  const D = viewParameters.eyeDistance*objectDimensions.radius;
  const viewDirection = vec3.transformMat4([],[0,0,1],rotationMatrix);
  const eye = vec3.scaleAndAdd([],center,viewDirection, D);
  const up = [0, 1, 0];
  return lookAt([], eye, center, [0,1,0])
}


function _rotationMatrix(mat4,yRotationMatrix,xRotationMatrix){return(
mat4.multiply([],yRotationMatrix,xRotationMatrix)
)}

function _yRotationMatrix(mat4,toRadian,viewParameters){return(
mat4.fromYRotation([],toRadian(viewParameters.yAngle))
)}

function _xRotationMatrix(mat4,toRadian,viewParameters){return(
mat4.fromXRotation([],toRadian(viewParameters.xAngle))
)}

function _perspectiveMatrix(canvasWidth,canvasHeight,objectDimensions,perspective,toRadian,viewParameters)
{
  const aspect = canvasWidth/canvasHeight;
  const radius = objectDimensions.radius;
  const near = 0.001*radius;
  const far = 100*radius;
  return perspective([], toRadian(viewParameters.fov), aspect, near, far)
}


function _lightPerspectiveMatrix(canvasWidth,canvasHeight,tubeLightDimensions,perspective,toRadian,viewParameters)
{
  const aspect = canvasWidth/canvasHeight;
  const radius = tubeLightDimensions.radius;
  const near = 0.001*radius;
  const far = 10*radius;
  return perspective([], toRadian(viewParameters.fov), aspect, near, far)
}


function _spherePerspectiveMatrix(canvasWidth,canvasHeight,objectDimensions,perspective,toRadian,viewParameters)
{
  const aspect = canvasWidth/canvasHeight;
  const radius = objectDimensions.radius;
  const near = 0.001*radius;
  const far = 10*radius;
  return perspective([], toRadian(viewParameters.fov), aspect, near, far)
}


function _tubeLightDimensions(getScDimensions,stl){return(
getScDimensions(stl)
)}

function _endpointA(tubeLightDimensions){return(
[(-tubeLightDimensions.box[1] / 2), 0, 0]
)}

function _endpointB(tubeLightDimensions){return(
[(tubeLightDimensions.box[1] / 2), 0, 0]
)}

function _finalEndA(mat4,endpointModelMatrix,endpointA){return(
mat4.multiply([], endpointModelMatrix, [endpointA[0], endpointA[1], endpointA[2], 1])
)}

function _finalEndB(mat4,endpointModelMatrix,endpointB){return(
mat4.multiply([], endpointModelMatrix, [endpointB[0], endpointB[1], endpointB[2], 1])
)}

function _56(md){return(
md `## Utility Functions`
)}

function _toRadian(glMatrix){return(
glMatrix.glMatrix.toRadian
)}

function _vec3(glMatrix){return(
glMatrix.vec3
)}

function _vec4(glMatrix){return(
glMatrix.vec4
)}

function _mat4(glMatrix){return(
glMatrix.mat4
)}

function _hex2rgb(){return(
hex => (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(l =>  parseInt(hex.length%2 ? l+l : l, 16)/255)
)}

function _lookAt(mat4){return(
mat4.lookAt
)}

function _perspective(mat4){return(
mat4.perspective
)}

function _64(md){return(
md`## External Libraries and Functions`
)}

function _objects(ground,house,teapot,beachHouse,dollHouse,watchTower,boy,teddy,cow){return(
[
   ground, house, teapot, beachHouse, dollHouse, watchTower, boy, teddy, cow
  ]
)}

function _stl_scaled(scaledSC,stl){return(
scaledSC(stl)
)}

function _glMatrix(require){return(
require('https://bundle.run/gl-matrix@3.3.0')
)}

async function _stl_url(FileAttachment)
{
  const blob = await FileAttachment("kevin pipe v1.stl").blob();
  return  URL.createObjectURL(blob);
}


function _createRegl(require){return(
require("regl")
)}

function _array2Darray(){return(
(A,n)=>Array.from(A).reduce((a, c, i,data) => {
        return i % n === 0 ? a.concat([data.slice(i, i + n)]) : a;
      }, [])
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["kevin pipe v1.stl", {url: new URL("./files/352240279cf8eb9ef85ce699d91a668011d9cd63787a2681f92c82cc56f4fd33fb7a8c6f7138cea1379b853a7fef4ddd51ae37675b4f9720f8080b41b8e2fc97.stl", import.meta.url), mimeType: "model/stl", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof model")).define("viewof model", ["radio"], _model);
  main.variable(observer("model")).define("model", ["Generators", "viewof model"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof viewParameters")).define("viewof viewParameters", ["columns","slider"], _viewParameters);
  main.variable(observer("viewParameters")).define("viewParameters", ["Generators", "viewof viewParameters"], (G, _) => G.input(_));
  main.variable(observer("viewof lightParameters")).define("viewof lightParameters", ["columns","slider"], _lightParameters);
  main.variable(observer("lightParameters")).define("lightParameters", ["Generators", "viewof lightParameters"], (G, _) => G.input(_));
  main.variable(observer("viewof sampleNum")).define("viewof sampleNum", ["columns","slider"], _sampleNum);
  main.variable(observer("sampleNum")).define("sampleNum", ["Generators", "viewof sampleNum"], (G, _) => G.input(_));
  main.variable(observer("viewof scalingFactor")).define("viewof scalingFactor", ["slider"], _scalingFactor);
  main.variable(observer("scalingFactor")).define("scalingFactor", ["Generators", "viewof scalingFactor"], (G, _) => G.input(_));
  main.variable(observer("viewof lightMove")).define("viewof lightMove", ["columns","slider"], _lightMove);
  main.variable(observer("lightMove")).define("lightMove", ["Generators", "viewof lightMove"], (G, _) => G.input(_));
  main.variable(observer("viewof lightRotate")).define("viewof lightRotate", ["columns","slider"], _lightRotate);
  main.variable(observer("lightRotate")).define("lightRotate", ["Generators", "viewof lightRotate"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof brdf_params")).define("viewof brdf_params", ["columns","slider"], _brdf_params);
  main.variable(observer("brdf_params")).define("brdf_params", ["Generators", "viewof brdf_params"], (G, _) => G.input(_));
  main.variable(observer("myCanvas")).define("myCanvas", ["html","canvasWidth","canvasHeight"], _myCanvas);
  main.variable(observer("viewof materialColor")).define("viewof materialColor", ["color"], _materialColor);
  main.variable(observer("materialColor")).define("materialColor", ["Generators", "viewof materialColor"], (G, _) => G.input(_));
  main.variable(observer("canvasWidth")).define("canvasWidth", _canvasWidth);
  main.variable(observer("canvasHeight")).define("canvasHeight", _canvasHeight);
  main.variable(observer("camera")).define("camera", ["eyePosition","viewMatrix","lightPerspectiveMatrix"], _camera);
  main.variable(observer("shape")).define("shape", ["object","hex2rgb","materialColor"], _shape);
  main.variable(observer("lightProperties")).define("lightProperties", ["hex2rgb","vec3","finalEndA","finalEndB","tubeLightDimensions","scalingFactor","lightDirection","brdf_params","stl","lightModelMatrix","sampleNum"], _lightProperties);
  main.variable(observer()).define(["createRegl","myCanvas","tubeSamplingObject","camera","shape","lightProperties","tubeRenderableLight"], _19);
  main.variable(observer("norm3")).define("norm3", _norm3);
  main.variable(observer("rotFromZ")).define("rotFromZ", ["norm3"], _rotFromZ);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("parmTube")).define("parmTube", ["rotFromZ","glMatrix","lightMove","lightProperties"], _parmTube);
  main.variable(observer("tubeSamplingObject")).define("tubeSamplingObject", ["parmTube","lightProperties"], _tubeSamplingObject);
  main.variable(observer()).define(["parmTube","lightProperties"], _25);
  main.variable(observer("tubeRenderableObject")).define("tubeRenderableObject", _tubeRenderableObject);
  main.variable(observer("tubeRenderableLight")).define("tubeRenderableLight", _tubeRenderableLight);
  main.variable(observer("lightDirection")).define("lightDirection", ["glMatrix","toRadian"], _lightDirection);
  main.variable(observer("lightPosition")).define("lightPosition", ["lightParameters","tubeLightDimensions","glMatrix","lightDirection"], _lightPosition);
  main.variable(observer("groundModelMatrix")).define("groundModelMatrix", ["mat4"], _groundModelMatrix);
  main.variable(observer("lightModelMatrix")).define("lightModelMatrix", ["mat4","scalingFactor","lightMove","lightRotate"], _lightModelMatrix);
  main.variable(observer("endpointModelMatrix")).define("endpointModelMatrix", ["mat4","scalingFactor","lightMove","lightRotate"], _endpointModelMatrix);
  main.variable(observer("sphereRightModelMatrix")).define("sphereRightModelMatrix", ["mat4","endpointB"], _sphereRightModelMatrix);
  main.variable(observer("sphereLeftModelMatrix")).define("sphereLeftModelMatrix", ["mat4","endpointA"], _sphereLeftModelMatrix);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("eyePosition")).define("eyePosition", ["objectDimensions","viewParameters","vec3","rotationMatrix"], _eyePosition);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("object")).define("object", ["objects","model"], _object);
  main.variable(observer("objectDimensions")).define("objectDimensions", ["getScDimensions","object"], _objectDimensions);
  main.variable(observer("sphereDimensions")).define("sphereDimensions", ["getScDimensions","sphereLowRes"], _sphereDimensions);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("lightObject")).define("lightObject", ["sphereLowRes"], _lightObject);
  main.variable(observer("viewMatrix")).define("viewMatrix", ["tubeLightDimensions","viewParameters","vec3","rotationMatrix","lookAt"], _viewMatrix);
  main.variable(observer("groundViewMatrix")).define("groundViewMatrix", ["objectDimensions","viewParameters","vec3","rotationMatrix","lookAt"], _groundViewMatrix);
  main.variable(observer("rotationMatrix")).define("rotationMatrix", ["mat4","yRotationMatrix","xRotationMatrix"], _rotationMatrix);
  main.variable(observer("yRotationMatrix")).define("yRotationMatrix", ["mat4","toRadian","viewParameters"], _yRotationMatrix);
  main.variable(observer("xRotationMatrix")).define("xRotationMatrix", ["mat4","toRadian","viewParameters"], _xRotationMatrix);
  main.variable(observer("perspectiveMatrix")).define("perspectiveMatrix", ["canvasWidth","canvasHeight","objectDimensions","perspective","toRadian","viewParameters"], _perspectiveMatrix);
  main.variable(observer("lightPerspectiveMatrix")).define("lightPerspectiveMatrix", ["canvasWidth","canvasHeight","tubeLightDimensions","perspective","toRadian","viewParameters"], _lightPerspectiveMatrix);
  main.variable(observer("spherePerspectiveMatrix")).define("spherePerspectiveMatrix", ["canvasWidth","canvasHeight","objectDimensions","perspective","toRadian","viewParameters"], _spherePerspectiveMatrix);
  main.variable(observer("tubeLightDimensions")).define("tubeLightDimensions", ["getScDimensions","stl"], _tubeLightDimensions);
  main.variable(observer("endpointA")).define("endpointA", ["tubeLightDimensions"], _endpointA);
  main.variable(observer("endpointB")).define("endpointB", ["tubeLightDimensions"], _endpointB);
  main.variable(observer("finalEndA")).define("finalEndA", ["mat4","endpointModelMatrix","endpointA"], _finalEndA);
  main.variable(observer("finalEndB")).define("finalEndB", ["mat4","endpointModelMatrix","endpointB"], _finalEndB);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("toRadian")).define("toRadian", ["glMatrix"], _toRadian);
  main.variable(observer("vec3")).define("vec3", ["glMatrix"], _vec3);
  main.variable(observer("vec4")).define("vec4", ["glMatrix"], _vec4);
  main.variable(observer("mat4")).define("mat4", ["glMatrix"], _mat4);
  main.variable(observer("hex2rgb")).define("hex2rgb", _hex2rgb);
  main.variable(observer("lookAt")).define("lookAt", ["mat4"], _lookAt);
  main.variable(observer("perspective")).define("perspective", ["mat4"], _perspective);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("objects")).define("objects", ["ground","house","teapot","beachHouse","dollHouse","watchTower","boy","teddy","cow"], _objects);
  const child1 = runtime.module(define1);
  main.import("sphereLowRes", child1);
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
  const child3 = runtime.module(define3);
  main.import("getScDimensions", child3);
  const child4 = runtime.module(define4);
  main.import("loadSTLobject", child4);
  main.import("createSCs", child4);
  const child5 = runtime.module(define5);
  main.import("stl", child5);
  main.variable(observer("stl_scaled")).define("stl_scaled", ["scaledSC","stl"], _stl_scaled);
  const child6 = runtime.module(define6);
  main.import("slider", child6);
  main.import("radio", child6);
  main.import("color", child6);
  const child7 = runtime.module(define7);
  main.import("columns", child7);
  const child8 = runtime.module(define3);
  main.import("obj2sc", child8);
  const child9 = runtime.module(define8);
  main.import("scaledSC", child9);
  main.variable(observer("glMatrix")).define("glMatrix", ["require"], _glMatrix);
  main.variable(observer("stl_url")).define("stl_url", ["FileAttachment"], _stl_url);
  main.variable(observer("createRegl")).define("createRegl", ["require"], _createRegl);
  main.variable(observer("array2Darray")).define("array2Darray", _array2Darray);
  return main;
}
