precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_fluid;

varying vec2 v_uv;

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float snoise(vec3 uv) {
  return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float fbm(vec3 p, float time) {
  float sum = 0.0;
  float amp = 1.0;
  float freq = 1.0;
  for (int i = 0; i < 6; i++) {
    sum += amp * snoise(p * freq + time * 0.15 * freq);
    freq *= 2.07;
    amp *= 0.5;
    p = p.yxz;
  }
  return sum;
}

void main() {
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 uv = v_uv * aspect * 2.0 - aspect;
  float t = u_time * 0.3;

  float r = fbm(vec3(uv, t * 0.7), t);
  float g = fbm(vec3(uv + 2.3, t * 0.6), t * 0.9);
  float b = fbm(vec3(uv + 4.1, t * 0.8), t * 1.1);

  vec3 color = vec3(r, (r + g) * 0.5, b);

  vec3 fluidData = texture2D(u_fluid, v_uv).rgb;
  vec3 fluid = fluidData * 0.8 - 0.4;
  float fluidVel = length(fluid.xy);
  float fluidInk = fluid.z;

  vec3 fluidColor = mix(color, fluidData, fluidVel * 0.08 + abs(fluidInk) * 0.02);

  vec3 col = pow(fluidColor, vec3(1.5, 0.9, 1.1));

  float grain = rand(v_uv * u_time) * 0.08 - 0.04;
  col += grain;

  float vig = smoothstep(1.2, 0.3, length(v_uv - 0.5) * 2.0);
  col *= 0.5 + 0.5 * vig;

  col = 1.0 - exp(-col * 1.0);

  gl_FragColor = vec4(col, 1.0);
}
