// https://observablehq.com/@colinchu1/polygonal@2338
import define1 from "./2180fcbe75883db9@142.js";
import define2 from "./10023e7d8ddc32bc@90.js";
import define3 from "./e93997d5089d7165@2303.js";
import define4 from "./ebae0c172bd689cc@102.js";
import define5 from "./55faae595525622e@211.js";

function _1(md){return(
md`# polygonal`
)}

function _viewParameters(columns,slider){return(
columns({
 eyeDistance: slider({
    min: 0.1, 
    max: 10, 
    step: 0.1, 
    value: 2.1, 
    title: "Eye Distance from the Scene Center",
    description: "Distance relative to Scene Dimension"
  }),
  xAngle: slider({
    min: -89, 
    max: 89, 
    step: 1, 
    value: -15, 
    title: "Rotation Around X-axis in degrees",
    description: "Camera Orbiting around the scene center."
  }),
  yAngle : slider({
    min: -180, 
    max: 180, 
    step: 1, 
    value: 0, 
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

function _lightParameters(columns,slider,color,radio){return(
columns({

  translatex : slider({
    min: -10, 
    max: 10, 
    step: 1, 
    value: 0, 
    description: "translate x"
  }),
   translatey : slider({
    min: 0, 
    max: 10, 
    step: 1, 
    value: 0, 
    description: "translate y"
  }),
   translatez : slider({
    min: -10, 
    max: 10, 
    step: 1, 
    value: 0, 
    description: "translate z"
  }),
   color : color({
    value: "#ffffff",
    title:"Color"
  }),
  color2 : color({
    value: "#ffff00",
    title:"Color"
  }),
  metallic:radio({
    title: "Metallic?",
    options: [{label:"Yes",value:"true"}, {label: "No",value:"false"}],
    value: "true"
  })
})
)}

function _para(columns,slider){return(
columns({
  
  roughness : slider({
    min: 0.1, 
    max: 1, 
    step: 0.1, 
    value: 0.3, 
    description: "roughness"
  }),
  F0 : slider({
    min: 0.1, 
    max: 1, 
    step: 0.1, 
    value: 0.9, 
    description: "fresnel parameter"
  }),
  numpoints : slider({
    min: 1, 
    max: 200, 
    step: 1, 
    value: 100, 
    description: "number of sample point"
  }),
})
)}

function _shapes(columns,radio,slider){return(
columns({
  
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
  }),
  rz : slider({
    min: 0, 
    max: 360, 
    step: 1, 
    value: 0, 
    description: "zangle"
  }),
  rY : slider({
    min: 0, 
    max: 360, 
    step: 1, 
    value: 0, 
    description: "Y angle"
  }),
})
)}

function _myCanvas(html,canvasWidth,canvasHeight){return(
html `<canvas width=${canvasWidth}, height=${canvasHeight}/>`
)}

function _regl(createRegl,myCanvas){return(
createRegl({canvas:myCanvas})
)}

function _8(regl,PolygonRenderablerectangle,thecamera,ground,lightproperties,corners,PolygonrenderableLight,models,PolygonRenderableTriangle,PolygonRenderablePentagon,PolygonRenderSampleRect,PolygonRenderSampleTri,PolygonrenderSamplepentagon,shapes)
{
  regl.clear({color: [0.5, 0.5, 0.6, 1]});

  
  const renderMirror = regl(PolygonRenderablerectangle(thecamera,ground,lightproperties,corners));
  const renderlight = regl(PolygonrenderableLight(thecamera,models,lightproperties));

  const renderTriplane = regl(PolygonRenderableTriangle(thecamera,ground,lightproperties,corners));
  const renderpenta = regl(PolygonRenderablePentagon(thecamera,ground,lightproperties,corners));
  
  const rendersamplemrect = regl(PolygonRenderSampleRect(thecamera,ground,lightproperties,corners));

  const rendersampleTriplane = regl(PolygonRenderSampleTri(thecamera,ground,lightproperties,corners));
  
  const rendersamplepenta = regl(PolygonrenderSamplepentagon(thecamera,ground,lightproperties,corners));
  

  renderlight();
  if(shapes.shape == 0)
  {
    if(shapes.sampbool == 1)
    {
      rendersampleTriplane();
    }
    else if(shapes.sampbool == 0)
    {
        renderTriplane();
    }
  }
  else if(shapes.shape == 1)
  {
    if(shapes.sampbool == 1)
    {
      rendersamplemrect();
    }
    else if(shapes.sampbool == 0)
    {
         renderMirror();
    }
   
  }
  else if(shapes.shape == 2)
  {
    if(shapes.sampbool == 1)
    {
      rendersamplepenta();
    }
    else if(shapes.sampbool == 0)
    {
         renderpenta();
    }
    
  }
  return `Main Rendering`
}


function _canvasWidth(){return(
760
)}

function _canvasHeight(){return(
400
)}

function _11(md){return(
md `## Renderable Object`
)}

function _PolygonRenderablerectangle(){return(
function(camera,shape,lightprop,vertercies){
  return(
  {
  vert: `precision mediump float;

    attribute vec3 position;
    attribute vec3 normal;
    uniform mat4 viewMatrix; // Constants that must be set before the render call.
    uniform mat4 projectionMatrix;

    varying vec3 fragNormal; // Data Sent to Fragment shader
    varying vec3 fragPosition;

    void main () {
      
      gl_PointSize = 2.0;
      vec4 mPosition = vec4(position.x,position.y-6.,position.z, 1.); // modelMatrix*vec4(position, 1); 
      fragPosition = mPosition.xyz;
      fragNormal = normalize(normal);
      gl_Position =   projectionMatrix * viewMatrix * mPosition;
    }`,
  frag: `precision mediump float;

    uniform vec4 light;
    varying vec3 fragNormal; // Data Received from Vertex Shader. Gets interpolated on the way by Rasterizer.
    uniform float alpha;
    uniform vec3 materialColor;
    varying vec3 fragPosition;
    uniform vec3 eyePosition;
    uniform vec3 A,B,C,D;
    uniform float metallic;
    uniform vec3 specColor;
    uniform float rough, F0;
    uniform vec3 lightpos;
    uniform int numpoints;
    float VanDerCorpus(float n, float base)
    {
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
                n       = n / 2.0;
            }
        }
      
        return result;
    }
    vec2 HammersleyNoBitOps(float i, float N)
    {
        return vec2(i/N, VanDerCorpus(i, 2.));
    }
    float FresnelSchlickFactor(float F0, float LightDirDotHalfDir)
    {
      float Result = F0 + (1.0 - F0) * pow(1.0 - LightDirDotHalfDir, 5.0);
      return Result;
    }
    float GGXDistributionTerm(float AlphaSqr, float NormalDotHalfDir)
    {
      float Denominator = ((NormalDotHalfDir * NormalDotHalfDir) * (AlphaSqr - 1.0)) + 1.0;
      Denominator = 3.14159265359 * Denominator * Denominator;
      float Result = AlphaSqr / Denominator;

      return Result;
    }
    vec3 distribution(float rand, float rand2) {
      return A + ((B-A) * rand ) + ((D-A) * rand2);
    }
    float GGXBRDF(vec3 l,float Alpha, float F0)
    {
      vec3 n = normalize(fragNormal);
      vec3 v = normalize(eyePosition - fragPosition);
      vec3 h = normalize(normalize(l) + v );
      float NormalDotHalfDir = clamp(dot(n, h), 0., 1.);
      float NormalDotLightDir = clamp(dot(n, l), 0., 1.);
      float NormalDotViewDir = clamp(dot(n, v), 0., 1.);
      float ViewDirDotHalfDir = clamp(dot(v, h), 0., 1.);
      float LightDirDotHalfDir = clamp(dot(l, h), 0., 1.);

      float AlphaSqr = Alpha * Alpha;
      float F = FresnelSchlickFactor(F0, LightDirDotHalfDir);
      float D = GGXDistributionTerm(AlphaSqr, NormalDotHalfDir);
      float OneOverGL = NormalDotLightDir + sqrt(AlphaSqr + ((1.0 - AlphaSqr) * (NormalDotLightDir * NormalDotLightDir)));
      float OneOverGV = NormalDotViewDir + sqrt(AlphaSqr + ((1.0 - AlphaSqr) * (NormalDotViewDir * NormalDotViewDir)));

      float Result = ((F * D) / (OneOverGL * OneOverGV));

      return Result;
    }
    
    void main () {
      vec3 N = normalize(fragNormal);
      vec3 V = normalize(eyePosition - fragPosition);
      vec3 R = reflect(-V, N);
      vec3 closestPointOnSegment;
     vec3 planeNormal = normalize(cross(B - A, C-B));
      vec3 PlaneOrigin = A;
      float distanceToplane = dot(planeNormal,(PlaneOrigin - fragPosition)/ dot(planeNormal, R));
      vec3 p = fragPosition + R * distanceToplane;
      vec3 N1 = normalize(cross(B - A, p-B));
      vec3 N2 = normalize(cross(C - B, p-C));
      vec3 N3 = normalize(cross(A - C, p-A));

      vec3 N4 = normalize(cross(D - C, p-D));
      vec3 N5 = normalize(cross(A - D, p-A));
      vec3 N6 = normalize(cross(C - A, p-C));
      float d0 = dot(N1,N2);
      float d1 = dot(N2,N3);
      float d2 = dot(N4,N5);
      float d3 = dot(N5,N6);
      bool intersects = (d0 > 0.99) && (d1 > 0.99);
      bool intersects2 = (d2 > 0.99) && (d3 > 0.99);
      if(!intersects)
      {
            vec3 AB = B-A;
            float t = dot(p - A, AB)/ dot(AB,AB);
            closestPointOnSegment = A + clamp(t,0.,1.) * AB;
      }
      if(intersects || intersects2)
      {
           closestPointOnSegment = p; 
      }
      
      
      vec3 newlightvector = normalize(closestPointOnSegment - fragPosition);
      float spec = GGXBRDF(newlightvector,0.25,F0);
      float diff = dot(fragNormal, newlightvector)/dot(newlightvector, newlightvector);
      diff =   diff;
      vec3 diffColor = (1.0 - metallic) * materialColor + materialColor*specColor;
      vec3 color = spec*specColor*(1.0-rough) + diff*diffColor*(rough) + 0.1 * materialColor;
      gl_FragColor = vec4(color,1);
      
     
    }`,
  attributes: {
    position: shape.positions, // Mesh data. 
    normal:   shape.normals,    // Only vertex shader can receive this data.
  },
  
  elements: shape.cells,

  uniforms:{  // All the Uniform constants used in Shader program must be set here before making a render call.
   
    viewMatrix: camera.viewMatrix,
    projectionMatrix: camera.projectionMatrix,
    eyePosition: camera.eyePosition,
    materialColor:lightprop.matcolor,
    metallic: lightprop.metallic,
    A : vertercies.v0,
    B : vertercies.v1,
    C : vertercies.v2,
    D : vertercies.v3,
    specColor: lightprop.specColor,
    rough: lightprop.roughness,
    F0: lightprop.F0
  },
}
)
}
)}

function _PolygonRenderSampleRect(){return(
function(camera,shape,lightprop,vertercies){
  return(
  {
  vert: `precision mediump float;

    attribute vec3 position;
    attribute vec3 normal;
    uniform mat4 viewMatrix; // Constants that must be set before the render call.
    uniform mat4 projectionMatrix;

    varying vec3 fragNormal; // Data Sent to Fragment shader
    varying vec3 fragPosition;

    void main () {
      
      gl_PointSize = 2.0;
      vec4 mPosition = vec4(position.x,position.y-6.,position.z, 1.); // modelMatrix*vec4(position, 1); 
      fragPosition = mPosition.xyz;
      fragNormal = normalize(normal);
      gl_Position =   projectionMatrix * viewMatrix * mPosition;
    }`,
  frag: `precision mediump float;

    uniform vec4 light;
    varying vec3 fragNormal; // Data Received from Vertex Shader. Gets interpolated on the way by Rasterizer.
    uniform float alpha;
    uniform vec3 materialColor;
    varying vec3 fragPosition;
    uniform vec3 eyePosition;
    uniform vec3 A,B,C,D;
    uniform float metallic;
    uniform vec3 specColor;
    uniform float rough, F0;
    uniform int numpoints;
    uniform vec3 centerpt;
    uniform float truesample;
    float VanDerCorpus(float n, float base)
    {
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
                n       = n / 2.0;
            }
        }
      
        return result;
    }
    vec2 HammersleyNoBitOps(float i, float N)
    {
        return vec2(i/N, VanDerCorpus(i, 2.));
    }
    float FresnelSchlickFactor(float F0, float LightDirDotHalfDir)
    {
      float Result = F0 + (1.0 - F0) * pow(1.0 - LightDirDotHalfDir, 5.0);
      return Result;
    }
    float GGXDistributionTerm(float AlphaSqr, float NormalDotHalfDir)
    {
      float Denominator = ((NormalDotHalfDir * NormalDotHalfDir) * (AlphaSqr - 1.0)) + 1.0;
      Denominator = 3.14159265359 * Denominator * Denominator;
      float Result = AlphaSqr / Denominator;

      return Result;
    }
    vec3 distribution(float rand, float rand2) {
      rand2 = sqrt(rand2);
      float wedge = rand * 4.;
      rand = fract(rand * 4.);
      if(wedge < 1.)
      {
          return centerpt + ((A-centerpt) * rand2 ) + ((B-A) * rand2*rand);
      }
      else if(wedge < 2.)
      {
          return centerpt + ((B-centerpt) * rand2 ) + ((C-B) * rand2*rand);
      }
      else if(wedge < 3.)
      {
          return centerpt + ((C-centerpt) * rand2 ) + ((D-C) * rand2*rand);
      }
      else if(wedge < 4.)
      {
          return centerpt + ((D-centerpt) * rand2 ) + ((A-D) * rand2*rand);
      }
      
    }
    float GGXBRDF(vec3 l,float Alpha, float F0)
    {
      vec3 n = normalize(fragNormal);
      vec3 v = normalize(eyePosition - fragPosition);
      vec3 h = normalize(normalize(l) + v );
      float NormalDotHalfDir = clamp(dot(n, h), 0., 1.);
      float NormalDotLightDir = clamp(dot(n, l), 0., 1.);
      float NormalDotViewDir = clamp(dot(n, v), 0., 1.);
      float ViewDirDotHalfDir = clamp(dot(v, h), 0., 1.);
      float LightDirDotHalfDir = clamp(dot(l, h), 0., 1.);

      float AlphaSqr = Alpha * Alpha;
      float F = FresnelSchlickFactor(F0, LightDirDotHalfDir);
      float D = GGXDistributionTerm(AlphaSqr, NormalDotHalfDir);
      float OneOverGL = NormalDotLightDir + sqrt(AlphaSqr + ((1.0 - AlphaSqr) * (NormalDotLightDir * NormalDotLightDir)));
      float OneOverGV = NormalDotViewDir + sqrt(AlphaSqr + ((1.0 - AlphaSqr) * (NormalDotViewDir * NormalDotViewDir)));

      float Result = ((F * D) / (OneOverGL * OneOverGV));

      return Result;
    }
    float random (float rand, float randS) {
      return fract(sin(randS*(rand+1.0))*43758.5453123);
    }
    float randomS (float rand) {
      return 1.0 + fract(rand+0.1)*43758.5453123;
    }
    void main () {
      float brightness = 10.0;
      float shininess = 2.0;

      int NumSamples = numpoints;
      float spec, diff;
      float rand = 0.0;
      float rand2 = 0.0;
      float randS = dot(fragPosition, vec3(12.9898, 78.233, 100.9219));
      for(int i = 0; i < `+ lightprop.numpoints +`; ++i)
      {
            vec3 sample;
            if(truesample == 1.)
            {
              randS = randomS(randS);
              rand = random(rand2, randS);
              randS = randomS(randS);
              rand2 = random(rand, randS);
              sample = distribution(rand, rand2);
            }
            else
            {
              vec2 Xi = HammersleyNoBitOps(float(i), float(NumSamples));
              sample = distribution(Xi.x, Xi.y);
            }
            vec3 light = sample - fragPosition;

            diff += dot(fragNormal, light)/dot(light, light);
            spec += GGXBRDF(light,0.25,F0);
      }
      spec = spec/float(NumSamples);
      diff = 2.0 * diff/float(NumSamples);
      vec3 diffColor = (1.0 - metallic) * materialColor + materialColor*specColor;
      vec3 color = spec*specColor*(1.0-rough) + diff*diffColor*(rough) + 0.1 * materialColor;
      gl_FragColor = vec4(color,1);
    }`,
  attributes: {
    position: shape.positions, // Mesh data. 
    normal:   shape.normals,    // Only vertex shader can receive this data.
  },
  
  elements: shape.cells,

  uniforms:{  // All the Uniform constants used in Shader program must be set here before making a render call.
    viewMatrix: camera.viewMatrix,
    projectionMatrix: camera.projectionMatrix,
    eyePosition: camera.eyePosition,
    materialColor:lightprop.matcolor,
    metallic: lightprop.metallic,
    A : vertercies.v0,
    B : vertercies.v1,
    C : vertercies.v2,
    D : vertercies.v3,
    specColor: lightprop.specColor,
    rough: lightprop.roughness,
    F0: lightprop.F0,
    numpoints : lightprop.numpoints,
    centerpt : lightprop.lightposition,
    truesample: lightprop.truesample
  },
}
)
}
)}

function _PolygonRenderSampleTri(ground){return(
function(camera,shape,lightprop,vertercies){
  return(
  {
  vert: `precision mediump float;

    attribute vec3 position;
    attribute vec3 normal;
    uniform mat4 viewMatrix; // Constants that must be set before the render call.
    uniform mat4 projectionMatrix;

    varying vec3 fragNormal; // Data Sent to Fragment shader
    varying vec3 fragPosition;

    void main () {
      
      gl_PointSize = 2.0;
      vec4 mPosition = vec4(position.x,position.y-6.,position.z, 1.); // modelMatrix*vec4(position, 1); 
      fragPosition = mPosition.xyz;
      fragNormal = normalize(normal);
      gl_Position =   projectionMatrix * viewMatrix * mPosition;
    }`,
  frag: `precision mediump float;

    uniform vec4 light;
    varying vec3 fragNormal; // Data Received from Vertex Shader. Gets interpolated on the way by Rasterizer.
    uniform float alpha;
    uniform vec3 materialColor;
    varying vec3 fragPosition;
    uniform vec3 eyePosition;
    uniform vec3 A,B,C,D;
    uniform float metallic;
    uniform vec3 specColor;
    uniform float rough, F0;
    uniform int numpoints;
    uniform vec3 centerpt;
    uniform float truesample;
    float VanDerCorpus(float n, float base)
    {
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
                n       = n / 2.0;
            }
        }
      
        return result;
    }
    vec2 HammersleyNoBitOps(float i, float N)
    {
        return vec2(i/N, VanDerCorpus(i, 2.));
    }
    float FresnelSchlickFactor(float F0, float LightDirDotHalfDir)
    {
      float Result = F0 + (1.0 - F0) * pow(1.0 - LightDirDotHalfDir, 5.0);
      return Result;
    }
    float GGXDistributionTerm(float AlphaSqr, float NormalDotHalfDir)
    {
      float Denominator = ((NormalDotHalfDir * NormalDotHalfDir) * (AlphaSqr - 1.0)) + 1.0;
      Denominator = 3.14159265359 * Denominator * Denominator;
      float Result = AlphaSqr / Denominator;

      return Result;
    }
    vec3 distribution(float rand, float rand2) {
       rand2 = sqrt(rand2);
      float wedge = rand * 3.;
      rand = fract(rand * 3.);
      if(wedge < 1.)
      {
          return centerpt + ((A-centerpt) * rand2 ) + ((B-A) * rand2*rand);
      }
      else if(wedge < 2.)
      {
          return centerpt + ((B-centerpt) * rand2 ) + ((C-B) * rand2*rand);
      }
      else if(wedge < 3.)
      {
          return centerpt + ((C-centerpt) * rand2 ) + ((A-C) * rand2*rand);
      }
      
    }
    float GGXBRDF(vec3 l,float Alpha, float F0)
    {
      vec3 n = normalize(fragNormal);
      vec3 v = normalize(eyePosition - fragPosition);
      vec3 h = normalize(normalize(l) + v );
      float NormalDotHalfDir = clamp(dot(n, h), 0., 1.);
      float NormalDotLightDir = clamp(dot(n, l), 0., 1.);
      float NormalDotViewDir = clamp(dot(n, v), 0., 1.);
      float ViewDirDotHalfDir = clamp(dot(v, h), 0., 1.);
      float LightDirDotHalfDir = clamp(dot(l, h), 0., 1.);

      float AlphaSqr = Alpha * Alpha;
      float F = FresnelSchlickFactor(F0, LightDirDotHalfDir);
      float D = GGXDistributionTerm(AlphaSqr, NormalDotHalfDir);
      float OneOverGL = NormalDotLightDir + sqrt(AlphaSqr + ((1.0 - AlphaSqr) * (NormalDotLightDir * NormalDotLightDir)));
      float OneOverGV = NormalDotViewDir + sqrt(AlphaSqr + ((1.0 - AlphaSqr) * (NormalDotViewDir * NormalDotViewDir)));

      float Result = ((F * D) / (OneOverGL * OneOverGV));

      return Result;
    }
     float random (float rand, float randS) {
      return fract(sin(randS*(rand+1.0))*43758.5453123);
    }
    float randomS (float rand) {
      return 1.0 + fract(rand+0.1)*43758.5453123;
    }
    void main () {
      float brightness = 10.0;
      float shininess = 2.0;

      int NumSamples = numpoints;
      float spec, diff;
      float rand = 0.0;
      float rand2 = 0.0;
      float randS = dot(fragPosition, vec3(12.9898, 78.233, 100.9219));
      for(int i = 0; i < `+ lightprop.numpoints +`; ++i)
      {
            vec3 sample;
            if(truesample == 1.)
            {
              randS = randomS(randS);
              rand = random(rand2, randS);
              randS = randomS(randS);
              rand2 = random(rand, randS);
              sample = distribution(rand, rand2);
            }
            else
            {
              vec2 Xi = HammersleyNoBitOps(float(i), float(NumSamples));
              sample = distribution(Xi.x, Xi.y);
            }
            vec3 light = sample - fragPosition;

            diff += dot(fragNormal, light)/dot(light, light);
            spec += GGXBRDF(light,0.1,F0);
      }
      spec = spec/float(NumSamples);
      diff = 2.0* diff/float(NumSamples);
      vec3 diffColor = (1.0 - metallic) * materialColor + materialColor*specColor;
      vec3 color = spec*specColor*(1.0-rough) + diff*diffColor*(rough) + 0.1 * materialColor;
      gl_FragColor = vec4(color,1);
    }`,
  attributes: {
    position: ground.positions, // Mesh data. 
    normal:   ground.normals,    // Only vertex shader can receive this data.
  },
  
  elements: ground.cells,

  uniforms:{  // All the Uniform constants used in Shader program must be set here before making a render call.
   
    viewMatrix: camera.viewMatrix,
    projectionMatrix: camera.projectionMatrix,
    eyePosition: camera.eyePosition,
    materialColor:lightprop.matcolor,
    metallic: lightprop.metallic,
    A : vertercies.v0,
    B : vertercies.v1,
    C : vertercies.v4,
    specColor: lightprop.specColor,
    rough: lightprop.roughness,
    F0: lightprop.F0,
    numpoints : lightprop.numpoints,
    centerpt : lightprop.lightposition,
    truesample: lightprop.truesample
  },
}
)
}
)}

function _PolygonrenderSamplepentagon(ground){return(
function(camera,shape,lightprop,vertercies){
  return(
  {
  vert: `precision mediump float;

    attribute vec3 position;
    attribute vec3 normal;
    uniform mat4 viewMatrix; // Constants that must be set before the render call.
    uniform mat4 projectionMatrix;

    varying vec3 fragNormal; // Data Sent to Fragment shader
    varying vec3 fragPosition;

    void main () {
      
      gl_PointSize = 2.0;
      vec4 mPosition = vec4(position.x,position.y-6.,position.z, 1.); // modelMatrix*vec4(position, 1); 
      fragPosition = mPosition.xyz;
      fragNormal = normalize(normal);
      gl_Position =   projectionMatrix * viewMatrix * mPosition;
    }`,
  frag: `precision mediump float;

    uniform vec4 light;
    varying vec3 fragNormal; // Data Received from Vertex Shader. Gets interpolated on the way by Rasterizer.
    uniform float alpha;
    uniform vec3 materialColor;
    varying vec3 fragPosition;
    uniform vec3 eyePosition;
    uniform vec3 A,B,C,D,E;
    uniform float metallic;
    uniform mat3 anglez;
    uniform vec3 specColor;
    uniform float rough, F0;
    uniform vec3 lightpos;
    uniform int numpoints;
    uniform vec3 centerpt;
    uniform float truesample;
    float VanDerCorpus(float n, float base)
    {
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
                n       = n / 2.0;
            }
        }
      
        return result;
    }
    vec2 HammersleyNoBitOps(float i, float N)
    {
        return vec2(i/N, VanDerCorpus(i, 2.));
    }
    float FresnelSchlickFactor(float F0, float LightDirDotHalfDir)
    {
      float Result = F0 + (1.0 - F0) * pow(1.0 - LightDirDotHalfDir, 5.0);
      return Result;
    }
    float GGXDistributionTerm(float AlphaSqr, float NormalDotHalfDir)
    {
      float Denominator = ((NormalDotHalfDir * NormalDotHalfDir) * (AlphaSqr - 1.0)) + 1.0;
      Denominator = 3.14159265359 * Denominator * Denominator;
      float Result = AlphaSqr / Denominator;

      return Result;
    }
    vec3 distribution(float rand, float rand2) {
      rand2 = sqrt(rand2);
      float wedge = rand * 5.;
      rand = fract(rand * 5.);
      if(wedge < 1.)
      {
          return centerpt + ((A-centerpt) * rand2 ) + ((B-A) * rand2*rand);
      }
      else if(wedge < 2.)
      {
          return centerpt + ((B-centerpt) * rand2 ) + ((C-B) * rand2*rand);
      }
      else if(wedge < 3.)
      {
          return centerpt + ((C-centerpt) * rand2 ) + ((D-C) * rand2*rand);
      }
      else if(wedge < 4.)
      {
          return centerpt + ((D-centerpt) * rand2 ) + ((E-D) * rand2*rand);
      }
      else if(wedge < 5.)
      {
          return centerpt + ((E-centerpt) * rand2 ) + ((A-E) * rand2*rand);
      }
      
    }
    float GGXBRDF(vec3 l,float Alpha, float F0)
    {
      vec3 n = normalize(fragNormal);
      vec3 v = normalize(eyePosition - fragPosition);
      vec3 h = normalize(normalize(l) + v );
      float NormalDotHalfDir = clamp(dot(n, h), 0., 1.);
      float NormalDotLightDir = clamp(dot(n, l), 0., 1.);
      float NormalDotViewDir = clamp(dot(n, v), 0., 1.);
      float ViewDirDotHalfDir = clamp(dot(v, h), 0., 1.);
      float LightDirDotHalfDir = clamp(dot(l, h), 0., 1.);

      float AlphaSqr = Alpha * Alpha;
      float F = FresnelSchlickFactor(F0, LightDirDotHalfDir);
      float D = GGXDistributionTerm(AlphaSqr, NormalDotHalfDir);
      float OneOverGL = NormalDotLightDir + sqrt(AlphaSqr + ((1.0 - AlphaSqr) * (NormalDotLightDir * NormalDotLightDir)));
      float OneOverGV = NormalDotViewDir + sqrt(AlphaSqr + ((1.0 - AlphaSqr) * (NormalDotViewDir * NormalDotViewDir)));

      float Result = ((F * D) / (OneOverGL * OneOverGV));

      return Result;
    }
     float random (float rand, float randS) {
      return fract(sin(randS*(rand+1.0))*43758.5453123);
    }
    float randomS (float rand) {
      return 1.0 + fract(rand+0.1)*43758.5453123;
    }
    void main () {
      float brightness = 10.0;
      float shininess = 2.0;

      int NumSamples = numpoints;
      float spec, diff;
      float rand = 0.0;
      float rand2 = 0.0;
      float randS = dot(fragPosition, vec3(12.9898, 78.233, 100.9219));
      for(int i = 0; i < `+ lightprop.numpoints +`; ++i)
      {
            vec3 sample;
            if(truesample == 1.)
            {
              randS = randomS(randS);
              rand = random(rand2, randS);
              randS = randomS(randS);
              rand2 = random(rand, randS);
              sample = distribution(rand, rand2);
            }
            else
            {
              vec2 Xi = HammersleyNoBitOps(float(i), float(NumSamples));
              sample = distribution(Xi.x, Xi.y);
            }
            vec3 light = sample - fragPosition;

            diff += dot(fragNormal, light)/dot(light, light);
            spec += GGXBRDF(light,0.1,F0);
      }
      spec = spec/float(NumSamples);
      diff = 2.0 *diff/float(NumSamples);
      vec3 diffColor = (1.0- metallic) * materialColor + materialColor*specColor;
      vec3 color = spec*specColor*(1.0-rough) + diff*diffColor*(rough) + 0.1 * materialColor;
      gl_FragColor = vec4(color,1);
    }`,
  attributes: {
    position: ground.positions, // Mesh data. 
    normal:   ground.normals,    // Only vertex shader can receive this data.
  },
  
  elements: ground.cells,

  uniforms:{  // All the Uniform constants used in Shader program must be set here before making a render call.
   
    viewMatrix: camera.viewMatrix,
    projectionMatrix: camera.projectionMatrix,
    eyePosition: camera.eyePosition,
    materialColor:lightprop.matcolor,
    metallic: lightprop.metallic,
    A : vertercies.v0,
    B : vertercies.v1,
    C : vertercies.v5,
    D : vertercies.v4,
    E : vertercies.v6,
    specColor: lightprop.specColor,
    rough: lightprop.roughness,
    F0: lightprop.F0,
    numpoints : lightprop.numpoints,
    centerpt : lightprop.lightposition,
    truesample: lightprop.truesample
  },
}
)
}
)}

function _PolygonrenderableLight(){return(
function(camera,shape,lightprop){
  return(
  {
  
  vert: `precision mediump float;

    attribute vec3 position, normal;

    uniform mat4 viewMatrix; // Constants that must be set before the render call.
    uniform mat4 projectionMatrix;
    uniform mat4 modelMatrix;
    varying vec3 fragNormal;
    varying vec3 fragPosition;
    void main () {
      fragNormal = normalize(normal);
      vec4 mPosition = vec4(position, 1);
      fragPosition   = mPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * mPosition;
    }`,
  frag: `precision mediump float;
    varying vec3 fragNormal;
    uniform vec3 eyePosition;
    uniform vec3 color;
    varying vec3 fragPosition;
    uniform float solidAngle;
    uniform vec4 light;
    void main () {
      vec3 N = normalize(fragNormal);
      vec3 V = normalize(eyePosition - fragPosition);
      vec3 R = reflect(-V, N);
     
      
      gl_FragColor = vec4(color,1);
    }`,
  attributes: {
    position: shape.positions,
    normal: shape.normals// Cube Mesh data. 
  },
  elements: shape.cells,
  uniforms:{  // All the Uniform constants used in Shader program must be set here before making a render call.
    viewMatrix: camera.viewMatrix,
    projectionMatrix: camera.projectionMatrix,
    modelMatrix: lightprop.modelMatrix,
    eyePosition: camera.eyePosition,
    color: lightprop.specColor,
  }
}
)
}
)}

function _PolygonRenderableTriangle(ground){return(
function(camera,shape,lightprop,vertercies){
  return(
  {
  vert: `precision mediump float;

    attribute vec3 position;
    attribute vec3 normal;
    uniform mat4 viewMatrix; // Constants that must be set before the render call.
    uniform mat4 projectionMatrix;

    varying vec3 fragNormal; // Data Sent to Fragment shader
    varying vec3 fragPosition;

    void main () {
      
      gl_PointSize = 2.0;
      vec4 mPosition = vec4(position.x,position.y-6.,position.z, 1.); // modelMatrix*vec4(position, 1); 
      fragPosition = mPosition.xyz;
      fragNormal = normalize(normal);
      gl_Position =   projectionMatrix * viewMatrix * mPosition;
    }`,
  frag: `precision mediump float;

    uniform vec4 light;
    varying vec3 fragNormal; // Data Received from Vertex Shader. Gets interpolated on the way by Rasterizer.
    uniform float alpha;
    uniform vec3 materialColor;
    varying vec3 fragPosition;
    uniform vec3 eyePosition;
    uniform vec3 A,B,C,D;
    uniform float metallic;
    uniform mat3 anglez;
    uniform vec3 specColor;
    uniform float rough, F0;
    uniform vec3 lightpos;
    uniform int numpoints;
    float VanDerCorpus(float n, float base)
    {
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
                n       = n / 2.0;
            }
        }
      
        return result;
    }
    vec2 HammersleyNoBitOps(float i, float N)
    {
        return vec2(i/N, VanDerCorpus(i, 2.));
    }
    float FresnelSchlickFactor(float F0, float LightDirDotHalfDir)
    {
      float Result = F0 + (1.0 - F0) * pow(1.0 - LightDirDotHalfDir, 5.0);
      return Result;
    }
    float GGXDistributionTerm(float AlphaSqr, float NormalDotHalfDir)
    {
      float Denominator = ((NormalDotHalfDir * NormalDotHalfDir) * (AlphaSqr - 1.0)) + 1.0;
      Denominator = 3.14159265359 * Denominator * Denominator;
      float Result = AlphaSqr / Denominator;

      return Result;
    }
    vec3 distribution(float rand, float rand2) {
      return A + ((B-A) * rand ) + ((D-A) * rand2);
    }
    float GGXBRDF(vec3 l,float Alpha, float F0)
    {
      vec3 n = normalize(fragNormal);
      vec3 v = normalize(eyePosition - fragPosition);
      vec3 h = normalize(normalize(l) + v );
      float NormalDotHalfDir = clamp(dot(n, h), 0., 1.);
      float NormalDotLightDir = clamp(dot(n, l), 0., 1.);
      float NormalDotViewDir = clamp(dot(n, v), 0., 1.);
      float ViewDirDotHalfDir = clamp(dot(v, h), 0., 1.);
      float LightDirDotHalfDir = clamp(dot(l, h), 0., 1.);

      float AlphaSqr = Alpha * Alpha;
      float F = FresnelSchlickFactor(F0, LightDirDotHalfDir);
      float D = GGXDistributionTerm(AlphaSqr, NormalDotHalfDir);
      float OneOverGL = NormalDotLightDir + sqrt(AlphaSqr + ((1.0 - AlphaSqr) * (NormalDotLightDir * NormalDotLightDir)));
      float OneOverGV = NormalDotViewDir + sqrt(AlphaSqr + ((1.0 - AlphaSqr) * (NormalDotViewDir * NormalDotViewDir)));

      float Result = ((F * D) / (OneOverGL * OneOverGV));

      return Result;
    }
    void main () {
      vec3 N = normalize(fragNormal);
      vec3 V = normalize(eyePosition - fragPosition);
      vec3 R = reflect(-V, N);
      vec3 closestPointOnSegment;
      vec3 planeNormal = normalize(cross(B - A, C-B));
      vec3 PlaneOrigin = A;
      float distanceToplane = dot(planeNormal,(PlaneOrigin - fragPosition)/ dot(planeNormal, R));
      vec3 p = fragPosition + R * distanceToplane;
      vec3 N1 = normalize(cross(B - A, p-B));
      vec3 N2 = normalize(cross(C - B, p-C));
      vec3 N3 = normalize(cross(A - C, p-A));

      float d0 = dot(N1,N2);
      float d1 = dot(N2,N3);
    
      bool intersects = (d0 > 0.99) && (d1 > 0.99);
    
      if(!intersects)
      {
          vec3 AB = B-A;
          float t = dot(p - A, AB)/ dot(AB,AB);
          closestPointOnSegment = A + clamp(t,0.,1.) * AB;
      }
      if(intersects){
           closestPointOnSegment = p;
      }
      
      vec3 newlightvector = normalize(closestPointOnSegment - fragPosition);
      float spec = GGXBRDF(newlightvector,0.25,F0);
      float diff = dot(fragNormal, newlightvector)/dot(newlightvector, newlightvector);
      diff =  diff;
      vec3 diffColor =(1.0 - metallic)* materialColor + materialColor*specColor;
      vec3 color = spec*specColor*(1.0-rough) + diff*diffColor*(rough) + 0.1 * materialColor;
      gl_FragColor = vec4(color,1);
      
    }`,
  attributes: {
    position: ground.positions, // Mesh data. 
    normal:   ground.normals,    // Only vertex shader can receive this data.
  },
  
  elements: ground.cells,

  uniforms:{  // All the Uniform constants used in Shader program must be set here before making a render call.
   
    viewMatrix: camera.viewMatrix,
    projectionMatrix: camera.projectionMatrix,
    eyePosition: camera.eyePosition,
    materialColor:lightprop.matcolor,
    metallic: lightprop.metallic,
    A : vertercies.v0,
    B : vertercies.v1,
    C : vertercies.v4,
    specColor: lightprop.specColor,
    rough: lightprop.roughness,
    F0: lightprop.F0
  },
}
)
}
)}

function _PolygonRenderablePentagon(ground){return(
function(camera,shape,lightprop,vertercies){
  return(
  {
  vert: `precision mediump float;

    attribute vec3 position;
    attribute vec3 normal;
    uniform mat4 viewMatrix; // Constants that must be set before the render call.
    uniform mat4 projectionMatrix;

    varying vec3 fragNormal; // Data Sent to Fragment shader
    varying vec3 fragPosition;

    void main () {
      
      gl_PointSize = 2.0;
      vec4 mPosition = vec4(position.x,position.y-6.,position.z, 1.); // modelMatrix*vec4(position, 1); 
      fragPosition = mPosition.xyz;
      fragNormal = normalize(normal);
      gl_Position =   projectionMatrix * viewMatrix * mPosition;
    }`,
  frag: `precision mediump float;

    uniform vec4 light;
    varying vec3 fragNormal; // Data Received from Vertex Shader. Gets interpolated on the way by Rasterizer.
    uniform float alpha;
    uniform vec3 materialColor;
    varying vec3 fragPosition;
    uniform vec3 eyePosition;
    uniform vec3 A,B,C,D,E;
    uniform float metallic;
    uniform mat3 anglez;
    uniform vec3 specColor;
    uniform float rough, F0;
    uniform vec3 lightpos;
    uniform int numpoints;
    float VanDerCorpus(float n, float base)
    {
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
                n       = n / 2.0;
            }
        }
      
        return result;
    }
    vec2 HammersleyNoBitOps(float i, float N)
    {
        return vec2(i/N, VanDerCorpus(i, 2.));
    }
    float FresnelSchlickFactor(float F0, float LightDirDotHalfDir)
    {
      float Result = F0 + (1.0 - F0) * pow(1.0 - LightDirDotHalfDir, 5.0);
      return Result;
    }
    float GGXDistributionTerm(float AlphaSqr, float NormalDotHalfDir)
    {
      float Denominator = ((NormalDotHalfDir * NormalDotHalfDir) * (AlphaSqr - 1.0)) + 1.0;
      Denominator = 3.14159265359 * Denominator * Denominator;
      float Result = AlphaSqr / Denominator;

      return Result;
    }
    vec3 distribution(float rand, float rand2) {
      return A + ((B-A) * rand ) + ((D-A) * rand2);
    }
    float GGXBRDF(vec3 l,float Alpha, float F0)
    {
      vec3 n = normalize(fragNormal);
      vec3 v = normalize(eyePosition - fragPosition);
      vec3 h = normalize(normalize(l) + v );
      float NormalDotHalfDir = clamp(dot(n, h), 0., 1.);
      float NormalDotLightDir = clamp(dot(n, l), 0., 1.);
      float NormalDotViewDir = clamp(dot(n, v), 0., 1.);
      float ViewDirDotHalfDir = clamp(dot(v, h), 0., 1.);
      float LightDirDotHalfDir = clamp(dot(l, h), 0., 1.);

      float AlphaSqr = Alpha * Alpha;
      float F = FresnelSchlickFactor(F0, LightDirDotHalfDir);
      float D = GGXDistributionTerm(AlphaSqr, NormalDotHalfDir);
      float OneOverGL = NormalDotLightDir + sqrt(AlphaSqr + ((1.0 - AlphaSqr) * (NormalDotLightDir * NormalDotLightDir)));
      float OneOverGV = NormalDotViewDir + sqrt(AlphaSqr + ((1.0 - AlphaSqr) * (NormalDotViewDir * NormalDotViewDir)));

      float Result = ((F * D) / (OneOverGL * OneOverGV));

      return Result;
    }
    
    void main () {
      vec3 N = normalize(fragNormal);
      vec3 V = normalize(eyePosition - fragPosition);
      vec3 R = reflect(-V, N);
      vec3 closestPointOnSegment;
      vec3 planeNormal = normalize(cross(B - A, C-B));
      vec3 PlaneOrigin = A;
      float distanceToplane = dot(planeNormal,(PlaneOrigin - fragPosition)/ dot(planeNormal, R));
      vec3 p = fragPosition + R * distanceToplane;
      vec3 N1 = normalize(cross(B - A, p-B));
      vec3 N2 = normalize(cross(C - B, p-C));
      vec3 N3 = normalize(cross(A - C, p-A));

      vec3 N4 = normalize(cross(D - C, p-D));
      vec3 N5 = normalize(cross(A - D, p-A));
      vec3 N6 = normalize(cross(C - A, p-C));

      vec3 N7 = normalize(cross(E - D, p-E));
      vec3 N8 = normalize(cross(A - E, p-A));
      vec3 N9 = normalize(cross(D - A, p-D));
      float d0 = dot(N1,N2);
      float d1 = dot(N2,N3);
      float d2 = dot(N4,N5);
      float d3 = dot(N5,N6);
      float d4 = dot(N7,N8);
      float d5 = dot(N8,N9);
      bool intersects = (d0 > 0.99) && (d1 > 0.99);
      bool intersects2 = (d2 > 0.99) && (d3 > 0.99);
      bool intersects3 = (d4 > 0.99) && (d5 > 0.99);
    
      if(!intersects)
      {
            vec3 AB = B-A;
            float t = dot(p - A, AB)/ dot(AB,AB);
            closestPointOnSegment = A + clamp(t,0.,1.) * AB;
      }
      if(!intersects2){
            vec3 AB = B-A;
            float t = dot(p - A, AB)/ dot(AB,AB);
            closestPointOnSegment = A + clamp(t,0.,1.) * AB;
      }
      if(!intersects3){
            vec3 AB = B-A;
            float t = dot(p - A, AB)/ dot(AB,AB);
            closestPointOnSegment = A + clamp(t,0.,1.) * AB;
      }
      if(intersects || intersects2 || intersects3)
      {
           closestPointOnSegment = p; 
      }
      
       vec3 newlightvector = normalize(closestPointOnSegment - fragPosition);
      float spec = GGXBRDF(newlightvector,0.25,F0);
      float diff = dot(fragNormal, newlightvector)/dot(newlightvector, newlightvector);
      diff =  diff;
      vec3 diffColor = (1.0 - metallic) *(materialColor + materialColor*specColor);
      vec3 color = spec*specColor*(1.0-rough) + diff*diffColor*(rough) + 0.1 * materialColor;
      gl_FragColor = vec4(color,1);
    }`,
  attributes: {
    position: ground.positions, // Mesh data. 
    normal:   ground.normals,    // Only vertex shader can receive this data.
  },
  
  elements: ground.cells,

  uniforms:{  // All the Uniform constants used in Shader program must be set here before making a render call.
   
    viewMatrix: camera.viewMatrix,
    projectionMatrix: camera.projectionMatrix,
    eyePosition: camera.eyePosition,
    materialColor:lightprop.matcolor,
    metallic: lightprop.metallic,
    A : vertercies.v0,
    B : vertercies.v1,
    C : vertercies.v5,
    D : vertercies.v4,
    E : vertercies.v6,
    specColor: lightprop.specColor,
    rough: lightprop.roughness,
    F0: lightprop.F0
  },
}
)
}
)}

function _thecamera(viewMatrix,perspectiveMatrix,eye)
{
  return{
    viewMatrix: viewMatrix,
    projectionMatrix: perspectiveMatrix,
    eyePosition: eye,
  }
 
}


function _20(md){return(
md `## RayTracing`
)}

function _sampleval(shapes)
{
    if(shapes.samp == "1")
    {
      return 1;
    }
    else
      return 0;

}


function _centerpointrec(vec3,corners)
{
  var res = vec3.create();
  vec3.add(res,corners.v0,corners.v1);
  vec3.add(res,res,corners.v2);
   vec3.add(res,res,corners.v3);
  vec3.divide(res,res,[4,4,4]);
  return res;
}


function _zax(vec3,toRadian,shapes){return(
function zax(vertercies)
{
  var v0 = vec3.create()
  v0[0] = vertercies[0]*Math.cos(toRadian(shapes.rz))- Math.sin(toRadian(shapes.rz))* (vertercies[1])
  v0[1] = vertercies[0]*Math.sin(toRadian(shapes.rz))+ Math.cos(toRadian(shapes.rz))* (vertercies[1])
  v0[2] = vertercies[2]
  return v0
}
)}

function _yax(vec3,toRadian,shapes){return(
function yax(vertercies)
{
  var v0 = vec3.create()
  v0[0] = vertercies[0]*Math.cos(toRadian(shapes.rY))+ Math.sin(toRadian(shapes.rY))* vertercies[2]
  v0[1] = vertercies[1]
  v0[2] = -vertercies[0]*Math.sin(toRadian(shapes.rY))+ Math.cos(toRadian(shapes.rY))* vertercies[2]
  return v0
}
)}

function _yz(yax,zax){return(
function yz(vertercies)
{
  return yax(zax(vertercies))
}
)}

function _corners(vec3,lightPosition,yz)
{
  var v0 = vec3.create()
  var v1 = vec3.create()
  var v2 = vec3.create()
  var v3 = vec3.create()
  var v4 = vec3.create()
  var v5 = vec3.create()
  var v6 = vec3.create()
  vec3.add(v0,lightPosition,[ -5, -5,0])
  vec3.add(v1,lightPosition,[  5, -5,0])
  vec3.add(v2,lightPosition,[  5, 5,0])
  vec3.add(v3,lightPosition,[  -5, 5,0])
  vec3.add(v4,lightPosition,[  0, 5,0])
  vec3.add(v5,lightPosition,[  10, 0,0])
  vec3.add(v6,lightPosition,[  -10, 0,0])
  v0 = yz(v0)
  v1 = yz(v1)
  v2 = yz(v2)
  v3 = yz(v3)
  v4 = yz(v4)
  v5 = yz(v5)
  v6 = yz(v6)
  return { v0, v1, v2, v3, v4, v5, v6 };
}


function _lightproperties(materialColor,isMetallic,specColor,para,sampleval,lightPosition,lightModelMatrix)
{
  return{
    matcolor: materialColor,
    metallic: isMetallic,
    specColor: specColor,
    F0: para.F0,
    truesample: sampleval,
    roughness : para.roughness,
    numpoints : para.numpoints,
    lightposition:lightPosition,
    modelMatrix: lightModelMatrix,
  }
 
}


function _out(vec3,corners)
{
  const res =vec3.create();
  vec3.subtract(res,corners.v0,corners.v2);
  return res;
}


function _models(polygons,shapes){return(
polygons[+shapes.shape]
)}

function _polygons(Triangle,plane,Pentagon){return(
[Triangle,plane,Pentagon]
)}

function _31(md){return(
md `## Camera Matrices`
)}

function _lightDirection(glMatrix,toRadian){return(
glMatrix.vec3.rotateY([],[0,2,0],[0,0,2],toRadian(0))
)}

function _lightPosition(lightdimensions,glMatrix,lightParameters)
{
  const D = 0.0*lightdimensions.radius;
  return glMatrix.vec3.scaleAndAdd([], lightdimensions.center, [lightParameters.translatex,lightParameters.translatey,lightParameters.translatez],1);
}


function _lightModelMatrix(lightdimensions,mat4,lightParameters,toRadian,shapes)
{
  const s = lightdimensions.radius/20;
  const scaleMatrix = mat4.fromScaling([],[s,s,s]);
  const translationMatrix = mat4.fromTranslation([],[lightParameters.translatex,lightParameters.translatey,lightParameters.translatez]);
  var rZ = mat4.identity([]);
  const rotate = mat4.fromZRotation([], toRadian(shapes.rz));
  const rotateY = mat4.fromYRotation([], toRadian(shapes.rY));
  //return translationMatrix
  var view = mat4.identity([]);
  
  view = mat4.multiply(view, view, rotateY);
  view = mat4.multiply(view, view, rotate);
  view = mat4.multiply(view, view, translationMatrix);
  return view // Light is centered at origin.
}


function _eye(objectDimensions,viewParameters,vec3,rotationMatrix)
{
  const center = objectDimensions.center;
  const D = viewParameters.eyeDistance*objectDimensions.radius;
  const viewDirection = vec3.transformMat4([],[0,0,1],rotationMatrix);
  const eye = vec3.scaleAndAdd([],center,viewDirection, D);
  return eye;
}


function _viewMatrix(lightdimensions,viewParameters,objectDimensions,vec3,rotationMatrix,lookAt)
{
  const center = lightdimensions.center;
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
  const far = 10*radius;
  return perspective([], toRadian(viewParameters.fov), aspect, near, far)
}


function _41(md){return(
md `## Utility Functions`
)}

function _isMetallic(lightParameters)
{
  if (lightParameters.metallic === "true")
    return 1.0
  
  return 0.0
}


function _plane(){return(
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

function _Triangle(){return(
{
  positions:[[-5,-5,0],[5,-5,0],[0,5,0]],
  normals:[[0,1,0],[0,1,0],[0,1,0]],
  cells:[[0,1,2]]
}
)}

function _materialColor(hex2rgb,lightParameters){return(
hex2rgb(lightParameters.color)
)}

function _specColor(hex2rgb,lightParameters){return(
hex2rgb(lightParameters.color2)
)}

function _lightObject(plane){return(
plane
)}

function _objectDimensions(getScDimensions,ground){return(
getScDimensions(ground)
)}

function _lightdimensions(getScDimensions,models){return(
getScDimensions(models)
)}

function _sphereLow(THREE,array2Darray)
{
  const sphereGeometry = new THREE.SphereBufferGeometry(3,8,8);
  //return sphereGeometry
  return {
    positions : array2Darray(sphereGeometry.attributes.position.array,3),
    normals : array2Darray(sphereGeometry.attributes.normal.array,3),
    uvs : array2Darray(sphereGeometry.attributes.uv.array,2),
    cells : array2Darray(sphereGeometry.index.array,3)
  }
}


function _createRegl(require){return(
require("regl")
)}

function _glMatrix(require){return(
require('https://bundle.run/gl-matrix@3.3.0')
)}

function _toRadian(glMatrix){return(
glMatrix.glMatrix.toRadian
)}

function _vec3(glMatrix){return(
glMatrix.vec3
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

function _d3(require){return(
require("d3@5")
)}

function _THREE(require){return(
require("three")
)}

function _array2Darray(){return(
(A,n)=>Array.from(A).reduce((a, c, i,data) => {
        return i % n === 0 ? a.concat([data.slice(i, i + n)]) : a;
      }, [])
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof viewParameters")).define("viewof viewParameters", ["columns","slider"], _viewParameters);
  main.variable(observer("viewParameters")).define("viewParameters", ["Generators", "viewof viewParameters"], (G, _) => G.input(_));
  main.variable(observer("viewof lightParameters")).define("viewof lightParameters", ["columns","slider","color","radio"], _lightParameters);
  main.variable(observer("lightParameters")).define("lightParameters", ["Generators", "viewof lightParameters"], (G, _) => G.input(_));
  main.variable(observer("viewof para")).define("viewof para", ["columns","slider"], _para);
  main.variable(observer("para")).define("para", ["Generators", "viewof para"], (G, _) => G.input(_));
  main.variable(observer("viewof shapes")).define("viewof shapes", ["columns","radio","slider"], _shapes);
  main.variable(observer("shapes")).define("shapes", ["Generators", "viewof shapes"], (G, _) => G.input(_));
  main.variable(observer("myCanvas")).define("myCanvas", ["html","canvasWidth","canvasHeight"], _myCanvas);
  main.variable(observer("regl")).define("regl", ["createRegl","myCanvas"], _regl);
  main.variable(observer()).define(["regl","PolygonRenderablerectangle","thecamera","ground","lightproperties","corners","PolygonrenderableLight","models","PolygonRenderableTriangle","PolygonRenderablePentagon","PolygonRenderSampleRect","PolygonRenderSampleTri","PolygonrenderSamplepentagon","shapes"], _8);
  main.variable(observer("canvasWidth")).define("canvasWidth", _canvasWidth);
  main.variable(observer("canvasHeight")).define("canvasHeight", _canvasHeight);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("PolygonRenderablerectangle")).define("PolygonRenderablerectangle", _PolygonRenderablerectangle);
  main.variable(observer("PolygonRenderSampleRect")).define("PolygonRenderSampleRect", _PolygonRenderSampleRect);
  main.variable(observer("PolygonRenderSampleTri")).define("PolygonRenderSampleTri", ["ground"], _PolygonRenderSampleTri);
  main.variable(observer("PolygonrenderSamplepentagon")).define("PolygonrenderSamplepentagon", ["ground"], _PolygonrenderSamplepentagon);
  main.variable(observer("PolygonrenderableLight")).define("PolygonrenderableLight", _PolygonrenderableLight);
  main.variable(observer("PolygonRenderableTriangle")).define("PolygonRenderableTriangle", ["ground"], _PolygonRenderableTriangle);
  main.variable(observer("PolygonRenderablePentagon")).define("PolygonRenderablePentagon", ["ground"], _PolygonRenderablePentagon);
  main.variable(observer("thecamera")).define("thecamera", ["viewMatrix","perspectiveMatrix","eye"], _thecamera);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("sampleval")).define("sampleval", ["shapes"], _sampleval);
  main.variable(observer("centerpointrec")).define("centerpointrec", ["vec3","corners"], _centerpointrec);
  main.variable(observer("zax")).define("zax", ["vec3","toRadian","shapes"], _zax);
  main.variable(observer("yax")).define("yax", ["vec3","toRadian","shapes"], _yax);
  main.variable(observer("yz")).define("yz", ["yax","zax"], _yz);
  main.variable(observer("corners")).define("corners", ["vec3","lightPosition","yz"], _corners);
  main.variable(observer("lightproperties")).define("lightproperties", ["materialColor","isMetallic","specColor","para","sampleval","lightPosition","lightModelMatrix"], _lightproperties);
  main.variable(observer("out")).define("out", ["vec3","corners"], _out);
  main.variable(observer("models")).define("models", ["polygons","shapes"], _models);
  main.variable(observer("polygons")).define("polygons", ["Triangle","plane","Pentagon"], _polygons);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("lightDirection")).define("lightDirection", ["glMatrix","toRadian"], _lightDirection);
  main.variable(observer("lightPosition")).define("lightPosition", ["lightdimensions","glMatrix","lightParameters"], _lightPosition);
  main.variable(observer("lightModelMatrix")).define("lightModelMatrix", ["lightdimensions","mat4","lightParameters","toRadian","shapes"], _lightModelMatrix);
  main.variable(observer("eye")).define("eye", ["objectDimensions","viewParameters","vec3","rotationMatrix"], _eye);
  main.variable(observer("viewMatrix")).define("viewMatrix", ["lightdimensions","viewParameters","objectDimensions","vec3","rotationMatrix","lookAt"], _viewMatrix);
  main.variable(observer("rotationMatrix")).define("rotationMatrix", ["mat4","yRotationMatrix","xRotationMatrix"], _rotationMatrix);
  main.variable(observer("yRotationMatrix")).define("yRotationMatrix", ["mat4","toRadian","viewParameters"], _yRotationMatrix);
  main.variable(observer("xRotationMatrix")).define("xRotationMatrix", ["mat4","toRadian","viewParameters"], _xRotationMatrix);
  main.variable(observer("perspectiveMatrix")).define("perspectiveMatrix", ["canvasWidth","canvasHeight","objectDimensions","perspective","toRadian","viewParameters"], _perspectiveMatrix);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("isMetallic")).define("isMetallic", ["lightParameters"], _isMetallic);
  main.variable(observer("plane")).define("plane", _plane);
  main.variable(observer("Pentagon")).define("Pentagon", _Pentagon);
  main.variable(observer("Triangle")).define("Triangle", _Triangle);
  main.variable(observer("materialColor")).define("materialColor", ["hex2rgb","lightParameters"], _materialColor);
  main.variable(observer("specColor")).define("specColor", ["hex2rgb","lightParameters"], _specColor);
  main.variable(observer("lightObject")).define("lightObject", ["plane"], _lightObject);
  main.variable(observer("objectDimensions")).define("objectDimensions", ["getScDimensions","ground"], _objectDimensions);
  main.variable(observer("lightdimensions")).define("lightdimensions", ["getScDimensions","models"], _lightdimensions);
  main.variable(observer("sphereLow")).define("sphereLow", ["THREE","array2Darray"], _sphereLow);
  const child1 = runtime.module(define1);
  main.import("teapot", child1);
  main.import("boy", child1);
  main.import("teddy", child1);
  main.import("cow", child1);
  const child2 = runtime.module(define2);
  main.import("columns", child2);
  main.variable(observer("createRegl")).define("createRegl", ["require"], _createRegl);
  const child3 = runtime.module(define3);
  main.import("slider", child3);
  main.import("radio", child3);
  main.import("color", child3);
  main.variable(observer("glMatrix")).define("glMatrix", ["require"], _glMatrix);
  main.variable(observer("toRadian")).define("toRadian", ["glMatrix"], _toRadian);
  main.variable(observer("vec3")).define("vec3", ["glMatrix"], _vec3);
  main.variable(observer("mat4")).define("mat4", ["glMatrix"], _mat4);
  main.variable(observer("hex2rgb")).define("hex2rgb", _hex2rgb);
  main.variable(observer("lookAt")).define("lookAt", ["mat4"], _lookAt);
  main.variable(observer("perspective")).define("perspective", ["mat4"], _perspective);
  const child4 = runtime.module(define4);
  main.import("getScDimensions", child4);
  const child5 = runtime.module(define5);
  main.import("sphereLowRes", child5);
  main.import("cube", child5);
  main.import("beachHouse", child5);
  main.import("dollHouse", child5);
  main.import("house", child5);
  main.import("watchTower", child5);
  main.import("ground", child5);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("THREE")).define("THREE", ["require"], _THREE);
  main.variable(observer("array2Darray")).define("array2Darray", _array2Darray);
  return main;
}
