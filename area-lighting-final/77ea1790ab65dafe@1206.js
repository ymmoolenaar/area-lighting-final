// https://observablehq.com/@homshnogen/area-lighting-circular-disk@1206
import define1 from "./2180fcbe75883db9@142.js";
import define2 from "./e93997d5089d7165@2303.js";
import define3 from "./10023e7d8ddc32bc@90.js";

function _1(md){return(
md`# Area Lighting - Circular Disk
`
)}

function _radioCircleType(radio){return(
radio({
   title: 'Choose display type (does not affect lighting)',
   options: ["disk","hollow"],
   value: 'disk'
})
)}

function _radioShape(radio){return(
radio({
   title: 'Choose shape',
   options: ["teapot","plane"],
   value: 'plane'
})
)}

function _lightIntensity(slider){return(
slider({
  min: 0.1, 
  max: 3, 
  step: 0.1, 
  value: 0., 
  title: "Light Intensity"
})
)}

function _eyeDistance(slider){return(
slider({
  min: 0.1, 
  max: 5, 
  step: 0.1, 
  value: 2, 
  title: "Camera Distance"
})
)}

function _eyeElevation(slider){return(
slider({
  min: -90, 
  max: 90, 
  step: 1, 
  value: 20, 
  title: "Camera Elevation Angle"
})
)}

function _eyeRotation(slider){return(
slider({
  min: 0, 
  max: 720, 
  step: 1, 
  value: 0, 
  title: "Camera Y-axis Rotation"
})
)}

function _samp(slider){return(
slider({
  min: 1, 
  max: 100, 
  step: 1, 
  value: 10, 
  title: "Sample number"
})
)}

function _rough(slider){return(
slider({
  min: 0, 
  max: 1, 
  step: 0.01, 
  value: 0.5, 
  title: "roughness"
})
)}

function _light(columns,slider){return(
columns({
  x: slider({
  min: -2, 
  max: 2, 
  value: -0.5, 
  step: 0.1, 
  title: "Light X"
}),
  y: slider({
  min: -3, 
  max: 2, 
  value: 0, 
  step: 0.1, 
  title: "Light Y"
}),
  z: slider({
  min: -2, 
  max: 2, 
  value: 0.5, 
  step: 0.1, 
  title: "Light Z"
})
})
)}

function _canvas1(DOM){return(
DOM.canvas(800,400)
)}

function _disp(regl,canvas1){return(
regl({canvas:canvas1})
)}

function _13(disp,renderableObject,myRenderableCircle)
{
  disp.clear({color: [0.5, 0.5, 0.6, 1]});
  const renderObject =  disp(renderableObject);
  const renderCircle = disp(myRenderableCircle);
  renderObject();
  renderCircle();
  
  return "render loop"
}


function _lightsource(light,glMatrix){return(
{
  center: [light.x, light.y, light.z],
  radius: 0.4,
  norm: glMatrix.vec3.normalize([], [-light.x, -light.y, -light.z])
}
)}

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

function _stitchCD(){return(
function (a, center) {
  let ret = ({
    positions: [],
    normals: [],
    cells: [],
  });
  let length = a.length;
  if (length < 3) return ret;
  
  ret.positions = a;
  ret.positions[a.length] = center;
  
  ret.cells[0] = [length-1, 0, length];
  for (let i = 1; i < length; i++) {
    ret.cells[i] = [i-1, i, length];
  }
  
  return ret;
}
)}

function _stitchCC(){return(
function (a, b) {
  let ret = ({
    positions: [],
    normals: [],
    cells: [],
  });
  let length = a.length;
  if (length != b.length) return ret;
  
  ret.positions[0] = a[0];
  ret.positions[1] = b[0];
  ret.cells[0] = [length*2-2, length*2-1, 0];
  ret.cells[1] = [1, 0, length*2-1];
  
  for (let i = 1; i < length; i++) {
    ret.positions[2*i] = a[i];
    ret.positions[1+2*i] = b[i];
    ret.cells[2*i] = [2*i-2, 2*i-1, 2*i];
    ret.cells[1+2*i] = [2*i+1, 2*i, 2*i-1];
  }
  //todo: calculate normals
  
  return ret;
}
)}

function _circlePoints(rotFromZ){return(
function (center, rad, norm, numPoints, offset) {
  let angle = [Math.cos(2*3.1416/numPoints), Math.sin(2*3.1416/numPoints)];
  let ret = [];
  let rot = rotFromZ(norm);
  let point = [rad * Math.cos(offset), rad * Math.sin(offset)];
  for (let i = 0; i < numPoints; i++) {
    ret[i] = [center[0] + point[0]*rot[0] + point[1]*rot[3], center[1] + point[0]*rot[1] + point[1]*rot[4], center[2] + point[0]*rot[2] + point[1]*rot[5]];
    point = [point[0]*angle[0] + point[1]*angle[1], point[1]*angle[0] - point[0]*angle[1]];
  }
  return ret;
}
)}

function _lightProperties(lightsource,lightIntensity,rough,samp){return(
{
  normal: lightsource.norm,
  center: lightsource.center,
  size: lightsource.radius,
  brightness: lightIntensity,
  roughness: rough,
  shininess: 10.0,
  materialColor: [1,0,1],
  color: [1,1,0],
  samples: samp,
}
)}

function _myRenderableCircle(renderableCircleDisk,renderableCircle,radioCircleType,myCamera,lightProperties){return(
({"disk": renderableCircleDisk, "hollow": renderableCircle})[radioCircleType](myCamera, lightProperties)
)}

function _renderableCircle(circlePoints,stitchCC){return(
function (camera, props) {
  let center = props.center;
  let rad = props.size;
  let norm = props.normal;
  let points = circlePoints(center, rad, norm, 100, 0);
  let points2 = circlePoints(center, rad+0.02, norm, 100, 0.03);
  let shape = stitchCC(points, points2);
  //for (let i in shape.positions) shape.normals[i] = norm;
  return ({
  vert: `
    precision mediump float;
    attribute vec3 position;
    uniform mat4 perspectiveMatrix, lookAtMatrix;
    void main () {
      gl_Position = perspectiveMatrix * lookAtMatrix * vec4(position, 1) ; 
    }
    `,
  frag: `
    precision mediump float;
    uniform vec3 color;
    void main () {
      gl_FragColor = vec4 (color, 1);
    }
    `,
  attributes: {
    position: shape.positions
  },
  uniforms:{
    lookAtMatrix: camera.viewMatrix,
    perspectiveMatrix: camera.perspectiveMatrix,
    color: props.color
  },
  elements: shape.cells
})}
)}

function _renderableCircleDisk(circlePoints,stitchCD){return(
function (camera, props) {
  let center = props.center;
  let rad = props.size;
  let norm = props.normal;
  let points = circlePoints(center, rad, norm, 100, 0);
  let shape = stitchCD(points, center);
  for (let i in shape.positions) shape.normals[i] = norm;
  return ({
  vert: `
    precision mediump float;
    attribute vec3 position;
    uniform mat4 perspectiveMatrix, lookAtMatrix;
    void main () {
      gl_Position = perspectiveMatrix * lookAtMatrix * vec4(position, 1) ; 
    }
    `,
  frag: `
    precision mediump float;
    uniform vec3 color;
    void main () {
      gl_FragColor = vec4 (color, 1);
    }
    `,
  attributes: {
    position: shape.positions
  },
  uniforms:{
    lookAtMatrix: camera.viewMatrix,
    perspectiveMatrix: camera.perspectiveMatrix,
    color: props.color
  },
  elements: shape.cells
})}
)}

function _renderableObject(objectWithCircleLight_NR,myCamera,scaledTeapot,plane,radioShape,lightProperties){return(
objectWithCircleLight_NR(myCamera, ({"teapot":scaledTeapot, "plane":plane})[radioShape], lightProperties)
)}

function _objectWithCircleLight_RP(){return(
function(camera, shape, lightProps) {
  return ({
  vert: `
    precision mediump float;
    attribute vec3 position, normal;
    uniform mat4 perspectiveMatrix, lookAtMatrix;
    uniform vec3 materialColor;
    varying vec3 fragPosition, fragNormal, fragColor;
    void main () {
      fragPosition = position;
      fragNormal = normal;
      fragColor = materialColor;
      gl_Position = perspectiveMatrix * lookAtMatrix * vec4(position, 1) ; 
    }
    `,
  frag: `
    precision mediump float;
    uniform vec3 eye, circlecenter, circlenorm, lightColor;
    uniform float circleradius, brightness, diffSpec, shininess;
    varying vec3 fragPosition, fragNormal, fragColor;
    float clamp(float x) {
      return x > 0.0 ? x : 0.0;
    }
    float clamp2(float x) {
      return x > 0.0 ? x > 1.0 ? 1.0: x : 0.0;
    }
    float cull(float x) {
      return x > 0.0 ? 1.0 : 0.0;
    }
    vec3 planeToCircle(vec3 x) {
      return dot(x, x) > circleradius*circleradius ? circleradius * normalize(x) : x;
    }
    vec3 color() {
      vec3 cp = fragPosition - circlecenter; // distance from light center
      vec3 look = normalize(eye-fragPosition); //normal

      vec3 refl = -2.0*fragNormal*(dot(fragNormal, look)) - look; //normal
      vec3 RPdiff = circlecenter + planeToCircle((cp - (circlenorm * dot(circlenorm, cp)))); // point on circle

      vec3 oroc = cp - refl*dot(cp, refl);
      vec3 RPspec = circlecenter + planeToCircle(((oroc - circlenorm*dot(oroc, circlenorm)) + cross(cross(cp, refl), circlenorm)));
      //vec3 RPspec = circlecenter + planeToCircle(fragPosition + refl*(dot(circlenorm, (circlecenter - fragPosition)) / dot(circlenorm, refl)) - circlecenter);

      vec3 light = RPdiff - fragPosition;
      float d2 = dot(light, light);
      float diff = (brightness * (sign(dot(fragNormal, look))*clamp(dot(fragNormal, normalize(light))) * 0.9 / (d2+1.0))); 



      light = normalize(RPspec - fragPosition);
      refl = 2.0*fragNormal*dot(light, fragNormal) - light;
      vec3 halfVec = normalize(light + look);
      float spec = pow(clamp(dot(look, refl)), shininess);//*cull(dot(fragNormal, look)*dot(fragNormal, light));// * cull(dot(fragNormal, refl));



      // fragNormal is assumed to be normal
      vec3 diffColor = normalize(0.2*fragColor + lightColor * fragColor);
      return spec*lightColor*(1.0-diffSpec) + diff*diffColor*diffSpec + fragColor*0.1;
    }
    void main () {
      gl_FragColor = vec4 (color(), 1);
    }
    `,
  attributes: {
    position: shape.positions,
    normal: shape.normals
  },
  uniforms:{
    lookAtMatrix: camera.viewMatrix,
    perspectiveMatrix: camera.perspectiveMatrix,
    eye: camera.eye,
    circlenorm: lightProps.normal,
    circlecenter: lightProps.center,
    circleradius: lightProps.size, 
    brightness: lightProps.brightness, 
    diffSpec: lightProps.roughness, 
    shininess: lightProps.shininess, 
    materialColor: lightProps.materialColor, 
    lightColor: lightProps.color, 
  },
  elements: shape.cells
})
}
)}

function _parmCircle(rotFromZ){return(
function(circle) {
  let temp = rotFromZ(circle.normal)
return ({
  x: [circle.size*temp[0], circle.size*temp[1], circle.size*temp[2]],
  y: [circle.size*temp[3], circle.size*temp[4], circle.size*temp[5]]
})
}
)}

function _objectWithCircleLight_RS(parmCircle){return(
function(camera, shape, lightProps) {
  let parms = parmCircle(lightProps)
  return ({
  vert: `
    precision mediump float;
    attribute vec3 position, normal;
    uniform mat4 perspectiveMatrix, lookAtMatrix;
    uniform vec3 materialColor;
    varying vec3 fragPosition, fragNormal, fragColor;
    void main () {
      fragPosition = position;
      fragNormal = normal;
      fragColor = materialColor;
      gl_Position = perspectiveMatrix * lookAtMatrix * vec4(position, 1); 
    }
    `,
  frag: `
    precision mediump float;
    uniform vec3 eye, circleX, circleY, circleCenter, lightColor;
    uniform float brightness, diffSpec, shininess;
    uniform int samples;
    varying vec3 fragPosition, fragNormal, fragColor;
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
      return circleCenter + (circleX * sin(6.28318*param1) + circleY * cos(6.28318*param1)) * pow(param2, 0.5);
    }
    float random (float rand, float randS) {
      return fract(sin(randS*(rand+1.0))*43758.5453123);
    }
    float randomS (float rand) {
      return 1.0 + fract(rand+0.1)*43758.5453123;
    }
    vec3 color() {
      float diff = 0.0;
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

        light = sample - fragPosition;
        d2 = dot(light, light);
        light = normalize(light);
        look = normalize(eye-fragPosition);
        halfVec = normalize(light + look);
        
        frontTest = sign(dot(fragNormal, look))*dot(fragNormal, light);
        diff += clamp(frontTest) / d2; 
        spec += cull(frontTest) * pow(clamp(dot(fragNormal, halfVec)), shininess);
      }
      diff = (brightness * 0.9 * diff / float(samples)); 
      spec = spec / float(samples);

      // fragNormal is assumed to be normal
      vec3 diffColor = normalize(0.2*fragColor + lightColor * fragColor);
      return spec*lightColor*(1.0-diffSpec) + diff*diffColor*diffSpec + fragColor*0.1;
    }
    void main () {
      gl_FragColor = vec4 (color(), 1);
    }
    `,
  attributes: {
    position: shape.positions,
    normal: shape.normals
  },
  uniforms:{
    lookAtMatrix: camera.viewMatrix,
    perspectiveMatrix: camera.perspectiveMatrix,
    eye: camera.eye,
    circleX: parms.x,
    circleY: parms.y,
    circleCenter: lightProps.center,
    brightness: lightProps.brightness, 
    diffSpec: lightProps.roughness, 
    shininess: lightProps.shininess, 
    materialColor: lightProps.materialColor, 
    lightColor: lightProps.color, 
    samples: lightProps.samples, 
  },
  elements: shape.cells
})
}
)}

function _objectWithCircleLight_LD(parmCircle){return(
function(camera, shape, lightProps) {
  let parms = parmCircle(lightProps)
  return ({
  vert: `
    precision mediump float;
    attribute vec3 position, normal;
    uniform mat4 perspectiveMatrix, lookAtMatrix;
    uniform vec3 materialColor;
    varying vec3 fragPosition, fragNormal, fragColor;
    void main () {
      fragPosition = position;
      fragNormal = normal;
      fragColor = materialColor;
      gl_Position = perspectiveMatrix * lookAtMatrix * vec4(position, 1); 
    }
    `,
  frag: `
    precision mediump float;
    uniform vec3 eye, circleX, circleY, circleCenter, lightColor;
    uniform float brightness, diffSpec, shininess;
    uniform int samples;
    varying vec3 fragPosition, fragNormal, fragColor;
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
      return circleCenter + (circleX * sin(6.28318*param1) + circleY * cos(6.28318*param1)) * pow(param2, 0.5);
    }
    float VanDerCorpus(float n, float base) {
        float invBase = 1.0 / base;
        float denom   = 1.0;
        float result  = 0.0;
        for(int i = 0; i < 32; ++i)
        {
            if(n > 0.)
            {
                denom = mod(n, 2.0);
                result += denom * invBase;
                invBase = invBase / 2.0;
                n = n / 2.0;
            }
        }
        return result;
    }
    vec2 HammersleyNoBitOps(float i, float N) {
        return vec2(i/N, VanDerCorpus(i, 2.));
    }
    vec3 color() {
      float diff = 0.0;
      float spec = 0.0;
      float d2, frontTest;
      vec3 sample, light, look, halfVec;
      for(int i = `+ lightProps.samples + `; i > 0; i--){
        vec2 LD = HammersleyNoBitOps(float(i), float(samples));
        sample = distribution(LD.x, LD.y);

        light = sample - fragPosition;
        d2 = dot(light, light);
        light = normalize(light);
        look = normalize(eye-fragPosition);
        halfVec = normalize(light + look);
        
        frontTest = sign(dot(fragNormal, look))*dot(fragNormal, light);
        diff += clamp(frontTest) / d2; 
        spec += cull(frontTest) * pow(clamp(dot(fragNormal, halfVec)), shininess);
      }
      diff = (brightness * 0.9 * diff / float(samples)); 
      spec = spec / float(samples);

      // fragNormal is assumed to be normal
      vec3 diffColor = normalize(0.2*fragColor + lightColor * fragColor);
      return spec*lightColor*(1.0-diffSpec) + diff*diffColor*diffSpec + fragColor*0.1;
    }
    void main () {
      gl_FragColor = vec4 (color(), 1);
    }
    `,
  attributes: {
    position: shape.positions,
    normal: shape.normals
  },
  uniforms:{
    lookAtMatrix: camera.viewMatrix,
    perspectiveMatrix: camera.perspectiveMatrix,
    eye: camera.eye,
    circleX: parms.x,
    circleY: parms.y,
    circleCenter: lightProps.center,
    brightness: lightProps.brightness, 
    diffSpec: lightProps.roughness, 
    shininess: lightProps.shininess, 
    materialColor: lightProps.materialColor, 
    lightColor: lightProps.color, 
    samples: lightProps.samples, 
  },
  elements: shape.cells
})
}
)}

function _objectWithCircleLight_NR(parmCircle){return(
function(camera, shape, lightProps) {
  let parms = parmCircle(lightProps)
  return ({
  vert: `
    precision mediump float;
    attribute vec3 position, normal;
    uniform mat4 perspectiveMatrix, lookAtMatrix;
    uniform vec3 materialColor;
    varying vec3 fragPosition, fragNormal, fragColor;
    void main () {
      fragPosition = position;
      fragNormal = normal;
      fragColor = materialColor;
      gl_Position = perspectiveMatrix * lookAtMatrix * vec4(position, 1); 
    }
    `,
  frag: `
    precision mediump float;
    uniform vec3 eye, circleX, circleY, circleCenter, lightColor;
    uniform float brightness, diffSpec, shininess;
    uniform int samples;
    varying vec3 fragPosition, fragNormal, fragColor;
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
      return circleCenter + (circleX * sin(6.28318*param1) + circleY * cos(6.28318*param1)) * pow(param2, 0.5);
    }
    float VanDerCorpus(float n, float base) {
        float invBase = 1.0 / base;
        float denom   = 1.0;
        float result  = 0.0;
        for(int i = 0; i < 32; ++i)
        {
            if(n > 0.)
            {
                denom = mod(n, 2.0);
                result += denom * invBase;
                invBase = invBase / 2.0;
                n = n / 2.0;
            }
        }
        return result;
    }
    vec2 NRooks(float i, float N, float seed) {
        return vec2(i/N, VanDerCorpus(seed+mod(130.0 + floor(seed*500.0)*i,709.0), 2.0));
    }
    vec3 color() {
      float diff = 0.0;
      float spec = 0.0;
      float d2, frontTest;
      float randSeed = floor(fract(sin(dot(fragPosition, vec3(12.9898, 76.912954, 103.529183)))*497238.6598));
      vec3 sample, light, look, halfVec;
      for(int i = `+ lightProps.samples + `; i > 0; i--){
        vec2 NR = NRooks(float(i), float(samples), randSeed);
        sample = distribution(NR.x, NR.y);

        light = sample - fragPosition;
        d2 = dot(light, light);
        light = normalize(light);
        look = normalize(eye-fragPosition);
        halfVec = normalize(light + look);
        
        frontTest = sign(dot(fragNormal, look))*dot(fragNormal, light);
        diff += clamp(frontTest) / d2; 
        spec += cull(frontTest) * pow(clamp(dot(fragNormal, halfVec)), shininess);
      }
      diff = (brightness * 0.9 * diff / float(samples)); 
      spec = spec / float(samples);

      // fragNormal is assumed to be normal
      vec3 diffColor = normalize(0.2*fragColor + lightColor * fragColor);
      return spec*lightColor*(1.0-diffSpec) + diff*diffColor*diffSpec + fragColor*0.1;
    }
    void main () {
      gl_FragColor = vec4 (color(), 1);
    }
    `,
  attributes: {
    position: shape.positions,
    normal: shape.normals
  },
  uniforms:{
    lookAtMatrix: camera.viewMatrix,
    perspectiveMatrix: camera.perspectiveMatrix,
    eye: camera.eye,
    circleX: parms.x,
    circleY: parms.y,
    circleCenter: lightProps.center,
    brightness: lightProps.brightness, 
    diffSpec: lightProps.roughness, 
    shininess: lightProps.shininess, 
    materialColor: lightProps.materialColor, 
    lightColor: lightProps.color, 
    samples: lightProps.samples, 
  },
  elements: shape.cells
})
}
)}

function _myCamera(getCamera,shapeDimensions,eyeRotation,eyeElevation,eyeDistance){return(
getCamera(shapeDimensions, eyeRotation, eyeElevation, 45, eyeDistance)
)}

function _getCamera(glMatrix){return(
function(dim, rot, elev, fov, dist) {
  let tilt = 0;
  let rotateMatrix = glMatrix.mat4.multiply([], glMatrix.mat4.multiply([], glMatrix.mat4.fromYRotation([], 3.1416*rot/180), glMatrix.mat4.fromXRotation([], -3.1416*elev/180)), glMatrix.mat4.fromZRotation([], 3.1416*tilt/180));
  let eye = [rotateMatrix[8]*dist*dim.radius + dim.center[0], rotateMatrix[9]*dist*dim.radius + dim.center[1], rotateMatrix[10]*dist*dim.radius + dim.center[2]];
  let up = [rotateMatrix[4], rotateMatrix[5], rotateMatrix[6]] // y from 4d matrix
  let lookAtMatrix = glMatrix.mat4.lookAt([], eye, dim.center, up);
  let perspectiveMatrix = glMatrix.mat4.perspective([], 3.1416*fov/180, 2, dist*dim.radius/10, dist*dim.radius*10)
  return {
    viewMatrix: lookAtMatrix, 
    perspectiveMatrix: perspectiveMatrix, 
    eye: eye
  };
}
)}

function _shapeDimensions(teapotDimensions,planeDimensions,radioShape){return(
({"teapot":teapotDimensions, "plane":planeDimensions})[radioShape]
)}

function _teapotDimensions(){return(
{
  radius: 1,
  center: [0, 0, 0]
}
)}

function _planeDimensions(){return(
{
  radius: 2.8,
  center: [0, -2, 0]
}
)}

function _plane(){return(
{
  positions: [[-2, -2, -2],[-2, -2, 2],[2, -2, 2],[2, -2, -2]],
  normals: [[0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]],
  cells: [[0, 1, 2], [0, 2, 3]]
}
)}

function _regl(require){return(
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
  main.variable(observer("viewof radioCircleType")).define("viewof radioCircleType", ["radio"], _radioCircleType);
  main.variable(observer("radioCircleType")).define("radioCircleType", ["Generators", "viewof radioCircleType"], (G, _) => G.input(_));
  main.variable(observer("viewof radioShape")).define("viewof radioShape", ["radio"], _radioShape);
  main.variable(observer("radioShape")).define("radioShape", ["Generators", "viewof radioShape"], (G, _) => G.input(_));
  main.variable(observer("viewof lightIntensity")).define("viewof lightIntensity", ["slider"], _lightIntensity);
  main.variable(observer("lightIntensity")).define("lightIntensity", ["Generators", "viewof lightIntensity"], (G, _) => G.input(_));
  main.variable(observer("viewof eyeDistance")).define("viewof eyeDistance", ["slider"], _eyeDistance);
  main.variable(observer("eyeDistance")).define("eyeDistance", ["Generators", "viewof eyeDistance"], (G, _) => G.input(_));
  main.variable(observer("viewof eyeElevation")).define("viewof eyeElevation", ["slider"], _eyeElevation);
  main.variable(observer("eyeElevation")).define("eyeElevation", ["Generators", "viewof eyeElevation"], (G, _) => G.input(_));
  main.variable(observer("viewof eyeRotation")).define("viewof eyeRotation", ["slider"], _eyeRotation);
  main.variable(observer("eyeRotation")).define("eyeRotation", ["Generators", "viewof eyeRotation"], (G, _) => G.input(_));
  main.variable(observer("viewof samp")).define("viewof samp", ["slider"], _samp);
  main.variable(observer("samp")).define("samp", ["Generators", "viewof samp"], (G, _) => G.input(_));
  main.variable(observer("viewof rough")).define("viewof rough", ["slider"], _rough);
  main.variable(observer("rough")).define("rough", ["Generators", "viewof rough"], (G, _) => G.input(_));
  main.variable(observer("viewof light")).define("viewof light", ["columns","slider"], _light);
  main.variable(observer("light")).define("light", ["Generators", "viewof light"], (G, _) => G.input(_));
  main.variable(observer("canvas1")).define("canvas1", ["DOM"], _canvas1);
  main.variable(observer("disp")).define("disp", ["regl","canvas1"], _disp);
  main.variable(observer()).define(["disp","renderableObject","myRenderableCircle"], _13);
  main.variable(observer("lightsource")).define("lightsource", ["light","glMatrix"], _lightsource);
  main.variable(observer("rotFromZ")).define("rotFromZ", ["norm3"], _rotFromZ);
  main.variable(observer("norm3")).define("norm3", _norm3);
  main.variable(observer("stitchCD")).define("stitchCD", _stitchCD);
  main.variable(observer("stitchCC")).define("stitchCC", _stitchCC);
  main.variable(observer("circlePoints")).define("circlePoints", ["rotFromZ"], _circlePoints);
  main.variable(observer("lightProperties")).define("lightProperties", ["lightsource","lightIntensity","rough","samp"], _lightProperties);
  main.variable(observer("myRenderableCircle")).define("myRenderableCircle", ["renderableCircleDisk","renderableCircle","radioCircleType","myCamera","lightProperties"], _myRenderableCircle);
  main.variable(observer("renderableCircle")).define("renderableCircle", ["circlePoints","stitchCC"], _renderableCircle);
  main.variable(observer("renderableCircleDisk")).define("renderableCircleDisk", ["circlePoints","stitchCD"], _renderableCircleDisk);
  main.variable(observer("renderableObject")).define("renderableObject", ["objectWithCircleLight_NR","myCamera","scaledTeapot","plane","radioShape","lightProperties"], _renderableObject);
  main.variable(observer("objectWithCircleLight_RP")).define("objectWithCircleLight_RP", _objectWithCircleLight_RP);
  main.variable(observer("parmCircle")).define("parmCircle", ["rotFromZ"], _parmCircle);
  main.variable(observer("objectWithCircleLight_RS")).define("objectWithCircleLight_RS", ["parmCircle"], _objectWithCircleLight_RS);
  main.variable(observer("objectWithCircleLight_LD")).define("objectWithCircleLight_LD", ["parmCircle"], _objectWithCircleLight_LD);
  main.variable(observer("objectWithCircleLight_NR")).define("objectWithCircleLight_NR", ["parmCircle"], _objectWithCircleLight_NR);
  main.variable(observer("myCamera")).define("myCamera", ["getCamera","shapeDimensions","eyeRotation","eyeElevation","eyeDistance"], _myCamera);
  main.variable(observer("getCamera")).define("getCamera", ["glMatrix"], _getCamera);
  main.variable(observer("shapeDimensions")).define("shapeDimensions", ["teapotDimensions","planeDimensions","radioShape"], _shapeDimensions);
  main.variable(observer("teapotDimensions")).define("teapotDimensions", _teapotDimensions);
  main.variable(observer("planeDimensions")).define("planeDimensions", _planeDimensions);
  main.variable(observer("plane")).define("plane", _plane);
  const child1 = runtime.module(define1);
  main.import("scaledTeapot", child1);
  main.variable(observer("regl")).define("regl", ["require"], _regl);
  main.variable(observer("glMatrix")).define("glMatrix", ["require"], _glMatrix);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  main.import("radio", child2);
  main.import("color", child2);
  main.import("checkbox", child2);
  const child3 = runtime.module(define3);
  main.import("columns", child3);
  return main;
}
