precision mediump float;

uniform sampler2D uFluidPrev;
uniform vec4 iMouse;
uniform vec2 uResolution;
uniform float uBrushSize;
uniform float uBrushStrength;
uniform float uFluidDecay;
uniform float uTrailLength;
uniform float uStopDecay;

varying vec2 v_uv;

vec3 encode(vec3 value) {
  return (value + 0.4) / 0.8;
}

vec3 decode(vec3 value) {
  return value * 0.8 - 0.4;
}

void main() {
  vec2 pixel = v_uv * uResolution;
  vec2 texelSize = 1.0 / uResolution;

  vec3 state = decode(texture2D(uFluidPrev, v_uv).rgb);

  vec3 left = decode(texture2D(uFluidPrev, v_uv + vec2(-texelSize.x, 0.0)).rgb);
  vec3 right = decode(texture2D(uFluidPrev, v_uv + vec2(texelSize.x, 0.0)).rgb);
  vec3 up = decode(texture2D(uFluidPrev, v_uv + vec2(0.0, texelSize.y)).rgb);
  vec3 down = decode(texture2D(uFluidPrev, v_uv + vec2(0.0, -texelSize.y)).rgb);

  vec3 diffuse = 0.25 * (left + right + up + down) - state;

  state.xy += uTrailLength * diffuse.xy;
  state.z += uTrailLength * diffuse.z;

  vec2 advectUV = v_uv - state.xy * texelSize;
  vec3 advected = decode(texture2D(uFluidPrev, advectUV).rgb);
  state = mix(state, advected, 0.6);

  vec2 mousePos = iMouse.xy;
  vec2 mousePrev = iMouse.zw;
  vec2 motionVec = mousePos - mousePrev;
  float motionLen = length(motionVec);
  if (motionLen > 6.0) {
    float scale = 6.0 / motionLen;
    motionVec *= scale;
  }

  vec2 pixelDelta = motionVec * uResolution;
  vec2 q = pixel - (mousePos * uResolution);
  float dist = length(q);

  float brushSizeFactor = 2.2e-4 / uBrushSize;
  float strengthFactor = 0.03 * uBrushStrength;

  float brushFalloff = exp(-dist * dist * brushSizeFactor);
  float falloffBig = brushFalloff * strengthFactor;
  float falloffSmall = exp(-dist * dist * brushSizeFactor * 2.5) * strengthFactor;

  state.xy += pixelDelta * falloffBig;
  state.z += (length(pixelDelta) * 100.0 - state.z) * falloffSmall;

  state *= uFluidDecay;

  float motion = length(state.xy);
  float ink = abs(state.z);
  if (motion < 0.001 && ink < 0.001) {
    state *= uStopDecay;
  }

  gl_FragColor = vec4(encode(state), 1.0);
}
