/**
 * Shader do hero: gradiente de malha (mesh gradient) com manchas grandes e
 * suaves nas cores do tema, desenhado como luz sobre o fundo escuro da seção.
 * As manchas derivam devagar; durante uma transmissão ao vivo elas aceleram,
 * ficam mais intensas e puxam para o lime.
 */

export const VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uSize;        // tamanho do canvas em px CSS
uniform float uTime;
uniform float uLive;       // 0..1: transmissão ao vivo acontecendo
uniform vec3 uBrand;       // teal
uniform vec3 uBrandStrong; // teal escuro
uniform vec3 uAccent;      // lime
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Mancha gaussiana de raio r.
float blob(vec2 p, vec2 c, float r) {
  vec2 d = p - c;
  return exp(-dot(d, d) / (r * r));
}

void main() {
  // Unidades de 700px: as manchas têm o mesmo tamanho em qualquer tela.
  float W = uSize.x / 700.0;
  float H = uSize.y / 700.0;
  vec2 p = vUv * vec2(W, H);
  float t = uTime * (0.09 + uLive * 0.08);

  // Leve distorção de baixa frequência deixa as bordas orgânicas.
  p += (vec2(noise(p * 1.4 + t * 0.6), noise(p * 1.4 - t * 0.5 + 7.0)) - 0.5) * 0.35;

  // Quatro manchas em órbitas lentas (Lissajous), concentradas à direita.
  vec2 c1 = vec2(W * (0.85 + 0.08 * sin(t * 0.7)), H * (0.85 + 0.1 * cos(t * 0.9)));
  vec2 c2 = vec2(W * (1.0 + 0.06 * cos(t * 0.5)), H * (0.35 + 0.15 * sin(t * 0.8)));
  vec2 c3 = vec2(W * (0.55 + 0.12 * sin(t * 0.4 + 1.3)), H * (0.08 + 0.1 * cos(t * 0.6)));
  vec2 c4 = vec2(W * (0.12 + 0.1 * cos(t * 0.45 + 2.0)), H * (0.98 + 0.06 * sin(t * 0.7)));

  float b1 = blob(p, c1, 0.55);
  float b2 = blob(p, c2, 0.5);
  float b3 = blob(p, c3, 0.45 + uLive * 0.12);
  float b4 = blob(p, c4, 0.5);

  vec3 lime = mix(uBrand, uAccent, 0.35 + uLive * 0.55);
  vec3 color = uBrand * b1 + uBrandStrong * b2 * 1.4 + lime * b3 + uBrandStrong * b4 * 1.2;
  float glow = b1 * 0.38 + b2 * 0.45 + b3 * (0.36 + uLive * 0.2) + b4 * 0.28;

  float pulse = 1.0 + uLive * (0.3 + 0.12 * sin(uTime * 1.3));
  float alpha = clamp(glow * pulse, 0.0, 0.6);

  // Granulação leve evita faixas (banding) no degradê.
  float grain = (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.02;
  vec3 rgb = clamp(color / max(b1 + b2 * 1.4 + b3 + b4 * 1.2, 0.001) + grain, 0.0, 1.0);
  gl_FragColor = vec4(rgb * alpha, alpha);
}
`;
