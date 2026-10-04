// Minimal WebGL2 helper for the grid simulations (Turing patterns, wave tank).
// Renders into its own canvas, which the scene then draws into the FIG canvas.
// Returns null when WebGL2 or float render targets are missing; the scene then falls back.
function makeGL(w, h) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const gl = cv.getContext('webgl2', {premultipliedAlpha: false, preserveDrawingBuffer: true, antialias: false});
  if (!gl || !gl.getExtension('EXT_color_buffer_float')) return null;
  const VS = `#version 300 es
in vec2 p; out vec2 uv; void main(){ uv = p * .5 + .5; gl_Position = vec4(p, 0., 1.); }`;
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  function program(fs) {
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
    const loc = gl.getAttribLocation(pr, 'p'), U = {};
    return {
      use(uniforms = {}) {
        gl.useProgram(pr); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        let unit = 0;
        for (const [k, v] of Object.entries(uniforms)) {
          const l = U[k] ?? (U[k] = gl.getUniformLocation(pr, k)); if (l === null) continue;
          if (v instanceof WebGLTexture) { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, v); gl.uniform1i(l, unit++); }
          else if (typeof v === 'number') gl.uniform1f(l, v);
          else if (v.length === 2) gl.uniform2fv(l, v); else if (v.length === 3) gl.uniform3fv(l, v); else gl.uniform4fv(l, v);
        }
      },
    };
  }
  function texture(tw, th, data, float = true, linear = false) {
    const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
    if (float) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, tw, th, 0, gl.RGBA, gl.FLOAT, data || null);
    else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, tw, th, 0, gl.RGBA, gl.UNSIGNED_BYTE, data || null);
    const f = linear ? gl.LINEAR : gl.NEAREST;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, f); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, f);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    return t;
  }
  function target(tex) { const fb = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, fb); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0); return fb; }
  function draw(fb, vw = w, vh = h) { gl.bindFramebuffer(gl.FRAMEBUFFER, fb); gl.viewport(0, 0, vw, vh); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); }
  // 256x1 palette texture from FIG.rgb, darkened toward black at the low end so fields sit on black.
  function paletteTexture() {
    const d = new Uint8Array(256 * 4);
    for (let k = 0; k < 256; k++) { const v = k / 255, c = FIG.rgb(v), m = Math.min(1, v * 3); d.set([c[0] * m, c[1] * m, c[2] * m, 255], k * 4); }
    const t = texture(256, 1, d, false, true); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); return t;
  }
  return {gl, canvas: cv, program, texture, target, draw, paletteTexture};
}
// A scene that cannot run here hands over to another figure with the same URL params.
function fallbackTo(name) { location.replace(name + '.html' + location.search); }
