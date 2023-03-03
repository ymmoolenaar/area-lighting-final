// https://observablehq.com/@spattana/rasterization-interpolation@389
import define1 from "./10023e7d8ddc32bc@90.js";
import define2 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Rasterization & Interpolation`
)}

function _vertex0(columns,Inputs,canvasWidth,canvasHeight,color){return(
columns({
  x: Inputs.range([0, canvasWidth - 1], {
    step: 1,
    value: 477,
    label: "Vertex0: X"
  }),
  y: Inputs.range([0, canvasHeight - 1], {
    step: 1,
    value: 0,
    label: "Vertex0: Y"
  }),
  color: color({
    value: "#ff0000",
    title: "Vertex0: Color"
  })
})
)}

function _vertex1(columns,Inputs,canvasWidth,canvasHeight,color){return(
columns({
  x: Inputs.range([0, canvasWidth - 1], {
    step: 1,
    value: 699,
    label: "Vertex1: X"
  }),
  y: Inputs.range([0, canvasHeight - 1], {
    step: 1,
    value: 499,
    label: "Vertex1: Y"
  }),
  color: color({
    value: "#00ff00",
    title: "Vertex1: Color"
  })
})
)}

function _vertex2(columns,Inputs,canvasWidth,canvasHeight,color){return(
columns({
  x: Inputs.range([0, canvasWidth - 1], {
    step: 1,
    value: 0,
    label: "Vertex2: X"
  }),
  y: Inputs.range([0, canvasHeight - 1], {
    step: 1,
    value: 400,
    label: "Vertex2: Y"
  }),
  color: color({
    value: "#0000ff",
    title: "Vertex2: Color"
  })
})
)}

function _PointSize(Inputs){return(
Inputs.range([1, 15], {
  step: 1,
  value: 4,
  label: "PointSize"
})
)}

function _6(vertex0,vertex1,vertex2,hex2rgb,rasterizeTriangle,PointSize,m4,canvasWidth,canvasHeight,twgl,gl,pointProgramInfo,triangleProgramInfo)
{
  const triangleVerts = [
      [vertex0.x, vertex0.y],
      [vertex1.x, vertex1.y],
      [vertex2.x, vertex2.y]
    ],
    triangleColors = [
      hex2rgb(vertex0.color),
      hex2rgb(vertex1.color),
      hex2rgb(vertex2.color)
    ];
  //return triangleColors
  const raster = rasterizeTriangle(triangleVerts, triangleColors, PointSize);
  const projectionMatrix = m4.ortho(0, canvasWidth, 0, canvasHeight, -1, 1);
  const viewMatrix = m4.identity();
  const pointBufferInfo = twgl.createBufferInfoFromArrays(gl, {
    position: {
      numComponents: 2,
      data: raster.rasterPositions.flat()
    },
    color: {
      numComponents: 3,
      data: raster.rasterColors.flat()
    }
  });
  const pointUniforms = {
    projectionMatrix: projectionMatrix,
    modelViewMatrix: viewMatrix,
    pointSize: PointSize
  };
  const triangleBufferInfo = twgl.createBufferInfoFromArrays(gl, {
    position: {
      numComponents: 2,
      data: triangleVerts.flat()
    },
    color: {
      numComponents: 3,
      data: triangleColors.flat()
    },
    indices: [
      [0, 1],
      [1, 2],
      [2, 0]
    ].flat()
  });
  const triangleUniforms = {
    projectionMatrix: projectionMatrix,
    modelViewMatrix: viewMatrix,
    pointSize: PointSize
  };
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.useProgram(pointProgramInfo.program);
  twgl.setUniforms(pointProgramInfo, pointUniforms);
  twgl.setBuffersAndAttributes(gl, pointProgramInfo, pointBufferInfo);
  twgl.drawBufferInfo(gl, pointBufferInfo, gl.POINTS);

  gl.useProgram(triangleProgramInfo.program);
  twgl.setUniforms(triangleProgramInfo, triangleUniforms);
  twgl.setBuffersAndAttributes(gl, triangleProgramInfo, triangleBufferInfo);
  twgl.drawBufferInfo(gl, triangleBufferInfo, gl.TRIANGLES);

  return gl.canvas;
}


function _canvasWidth(){return(
700
)}

function _canvasHeight(){return(
500
)}

function _rasterizeTriangle(d3,v3){return(
(vertices, colors, pixelSize) => {
  // Rasterize the triangle lying on a Horizontal plane
  //
  // Let "box" be the bounding box of the triangle
  //     "nHorizontal" be the number of pixels covering the width of the bounding box
  //     "vertices" be the position coordinates of each of the three vertices
  //     "colors" be the color associated with each of the three vertices.
  //
  // The point list is added to the scene.
  const xExtent = d3.extent(vertices, (d) => d[0]),
    yExtent = d3.extent(vertices, (d) => d[1]);

  let delta = pixelSize * 2;
  let nHorizontal = Math.round((xExtent[1] - xExtent[0]) / delta);
  let nVertical = Math.round((yExtent[1] - yExtent[0]) / delta);
  //return {xExtent, yExtent, nHorizontal, nVertical}

  let P0 = vertices[0],
    P1 = vertices[1],
    P2 = vertices[2];
  let C0 = colors[0],
    C1 = colors[1],
    C2 = colors[2];

  let V1 = [P1[0] - P0[0], P1[1] - P0[1], 0];
  let V2 = [P2[0] - P0[0], P2[1] - P0[1], 0];
  let N = v3.cross(V1, V2);
  let NdotN = v3.dot(N, N);
  const rasterPositions = [];
  const rasterColors = [];
  const P = [];
  for (let i = 0; i < nVertical; i++) {
    P[1] = yExtent[0] + (i + 0.5) * delta;
    for (let j = 0; j < nHorizontal; j++) {
      P[0] = xExtent[0] + (j + 0.5) * delta;
      // Compute Barycentric Coordinate
      //   Math was discussed in class notes posted earlier
      //
      let V = [P[0] - P0[0], P[1] - P0[1], 0];
      let VcrossV2 = v3.cross(V, V2);
      let V1crossV = v3.cross(V1, V);

      let u = v3.dot(VcrossV2, N) / NdotN;
      let v = v3.dot(V1crossV, N) / NdotN;
      // Check if the point is inside the triangle or outside
      rasterPositions.push(P.slice());
      if (u >= 0 && u <= 1 && v >= 0 && v <= 1 && u + v <= 1.0) {
        // Inside or on
        //rasterPositions.push(P.slice());
        let color = [
          (1 - u - v) * C0[0] + u * C1[0] + v * C2[0],
          (1 - u - v) * C0[1] + u * C1[1] + v * C2[1],
          (1 - u - v) * C0[2] + u * C1[2] + v * C2[2]
        ];
        rasterColors.push(color);
      } else rasterColors.push([0.4, 0.4, 0.4]);
    }
  }
  return { rasterPositions, rasterColors, nHorizontal, nVertical };
}
)}

function _10(md){return(
md  `## Shaders and Programs`
)}

function _triangleProgramInfo(twgl,gl,vertShader1,fragShader){return(
twgl.createProgramInfo(gl, [vertShader1, fragShader])
)}

function _pointProgramInfo(twgl,gl,vertShader2,fragShader){return(
twgl.createProgramInfo(gl, [vertShader2, fragShader])
)}

function _vertShader1(){return(
`#version 300 es
precision highp float;
in vec2 position;
in vec3 color;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
out vec3 fColor;
void main(){
  fColor = color;
  gl_Position = projectionMatrix*modelViewMatrix*vec4(position.xy, 0, 1.0 );
}
`
)}

function _fragShader(){return(
`#version 300 es
precision highp float;
in vec3 fColor;
out vec4 outColor;
void main(){
  outColor = vec4(fColor,1.0);
}`
)}

function _vertShader2(){return(
`#version 300 es
precision highp float;
in vec2 position;
in vec3 color;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float pointSize;

out vec3 fColor;
void main(){
  fColor = color;
  gl_Position = projectionMatrix*modelViewMatrix*vec4(position.xy,0, 1.0 );
  gl_PointSize = pointSize;
}`
)}

function _gl(DOM)
{
  const myCanvas = DOM.canvas(700, 500);
  const gl = myCanvas.getContext("webgl2");
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.5, 0.5, 0.6, 1);
  return gl;
}


function _17(md){return(
md `## Useful Functions`
)}

function _hex2rgb(){return(
hex => (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(l =>  parseInt(hex.length%2 ? l+l : l, 16)/255)
)}

function _19(md){return(
md `## Libraries`
)}

function _m4(twgl){return(
twgl.m4
)}

function _v3(twgl){return(
twgl.v3
)}

function _twgl(require){return(
require("twgl.js")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof vertex0")).define("viewof vertex0", ["columns","Inputs","canvasWidth","canvasHeight","color"], _vertex0);
  main.variable(observer("vertex0")).define("vertex0", ["Generators", "viewof vertex0"], (G, _) => G.input(_));
  main.variable(observer("viewof vertex1")).define("viewof vertex1", ["columns","Inputs","canvasWidth","canvasHeight","color"], _vertex1);
  main.variable(observer("vertex1")).define("vertex1", ["Generators", "viewof vertex1"], (G, _) => G.input(_));
  main.variable(observer("viewof vertex2")).define("viewof vertex2", ["columns","Inputs","canvasWidth","canvasHeight","color"], _vertex2);
  main.variable(observer("vertex2")).define("vertex2", ["Generators", "viewof vertex2"], (G, _) => G.input(_));
  main.variable(observer("viewof PointSize")).define("viewof PointSize", ["Inputs"], _PointSize);
  main.variable(observer("PointSize")).define("PointSize", ["Generators", "viewof PointSize"], (G, _) => G.input(_));
  main.variable(observer()).define(["vertex0","vertex1","vertex2","hex2rgb","rasterizeTriangle","PointSize","m4","canvasWidth","canvasHeight","twgl","gl","pointProgramInfo","triangleProgramInfo"], _6);
  main.variable(observer("canvasWidth")).define("canvasWidth", _canvasWidth);
  main.variable(observer("canvasHeight")).define("canvasHeight", _canvasHeight);
  main.variable(observer("rasterizeTriangle")).define("rasterizeTriangle", ["d3","v3"], _rasterizeTriangle);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("triangleProgramInfo")).define("triangleProgramInfo", ["twgl","gl","vertShader1","fragShader"], _triangleProgramInfo);
  main.variable(observer("pointProgramInfo")).define("pointProgramInfo", ["twgl","gl","vertShader2","fragShader"], _pointProgramInfo);
  main.variable(observer("vertShader1")).define("vertShader1", _vertShader1);
  main.variable(observer("fragShader")).define("fragShader", _fragShader);
  main.variable(observer("vertShader2")).define("vertShader2", _vertShader2);
  main.variable(observer("gl")).define("gl", ["DOM"], _gl);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("hex2rgb")).define("hex2rgb", _hex2rgb);
  main.variable(observer()).define(["md"], _19);
  const child1 = runtime.module(define1);
  main.import("columns", child1);
  const child2 = runtime.module(define2);
  main.import("color", child2);
  main.variable(observer("m4")).define("m4", ["twgl"], _m4);
  main.variable(observer("v3")).define("v3", ["twgl"], _v3);
  main.variable(observer("twgl")).define("twgl", ["require"], _twgl);
  return main;
}
