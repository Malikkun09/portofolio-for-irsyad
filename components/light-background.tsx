"use client";

import { useEffect, useRef } from "react";
import { useSite } from "@/lib/site-context";
import { sectionPalette, type SectionId } from "@/content/site";

const PALETTES: Record<
  SectionId,
  { bg: [number, number, number]; a: [number, number, number]; b: [number, number, number]; c: [number, number, number] }
> = {
  hero: {
    bg: [0.012, 0.04, 0.145],
    a: [0.22, 0.78, 0.84],
    b: [0.07, 0.2, 0.52],
    c: [1.0, 0.99, 0.9],
  },
  about: {
    bg: [0.03, 0.08, 0.22],
    a: [0.22, 0.48, 0.78],
    b: [0.55, 0.42, 0.18],
    c: [1.0, 0.97, 0.82],
  },
  what: {
    bg: [0.03, 0.05, 0.18],
    a: [0.42, 0.22, 0.72],
    b: [0.1, 0.45, 0.7],
    c: [0.95, 0.88, 1.0],
  },
  work: {
    bg: [1.0, 0.992, 0.886],
    a: [1, 1, 1],
    b: [1, 1, 1],
    c: [1, 1, 1],
  },
  practice: {
    bg: [0.02, 0.09, 0.2],
    a: [0.15, 0.7, 0.62],
    b: [0.08, 0.28, 0.55],
    c: [0.95, 1.0, 0.9],
  },
  clients: {
    bg: [0.03, 0.06, 0.18],
    a: [0.7, 0.52, 0.18],
    b: [0.12, 0.4, 0.72],
    c: [1.0, 0.96, 0.78],
  },
  awards: {
    bg: [0.824, 0.894, 0.957],
    a: [1, 1, 1],
    b: [1, 1, 1],
    c: [1, 1, 1],
  },
  press: {
    bg: [0.02, 0.07, 0.21],
    a: [0.18, 0.38, 0.78],
    b: [0.4, 0.18, 0.55],
    c: [1.0, 0.99, 0.89],
  },
  contact: {
    bg: [0.015, 0.04, 0.12],
    a: [0.1, 0.35, 0.55],
    b: [0.05, 0.15, 0.4],
    c: [0.9, 0.88, 0.75],
  },
};

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform vec3 uBg;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(0.80, 0.60, -0.60, 0.80);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p * 2.02;
    a *= 0.5;
  }
  return v;
}

float ridge(vec2 p) {
  return 1.0 - abs(fbm(p) * 2.0 - 1.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.y, uRes.x);
  uv += (uMouse - 0.5) * 0.1;
  float t = uTime * 0.028;
  vec2 q = vec2(fbm(uv * 1.15 + t), fbm(uv * 1.15 + vec2(4.8, 1.1) + t * 0.7));
  vec2 r = vec2(
    fbm(uv * 1.4 + 2.8 * q + vec2(1.7, 9.2) + t * 0.22),
    fbm(uv * 1.4 + 2.8 * q + vec2(8.3, 2.8) - t * 0.17)
  );
  float veins = pow(ridge(uv * 1.6 + 2.2 * r + t * 0.15), 5.0);
  float bloom = pow(max(fbm(uv * 0.55 + q * 0.4 - t * 0.08), 0.0), 2.2);
  float core = pow(max(1.0 - length((uv + (q - 0.5) * 0.35) * vec2(0.72, 1.05)), 0.0), 2.4);
  vec3 col = uBg * 0.55;
  col += uB * bloom * 0.55;
  col += uA * veins * 0.82;
  col += uC * pow(veins, 2.6) * 0.55;
  col += uA * core * 0.32;
  col += uC * pow(core, 3.0) * 0.18;
  float vig = smoothstep(1.45, 0.12, length(uv * vec2(0.8, 1.05)));
  col *= mix(0.32, 1.0, vig);
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function LightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { section } = useSite();
  const sectionRef = useRef(section);
  sectionRef.current = section;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uBg = gl.getUniformLocation(prog, "uBg");
    const uA = gl.getUniformLocation(prog, "uA");
    const uB = gl.getUniformLocation(prog, "uB");
    const uC = gl.getUniformLocation(prog, "uC");

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const col = {
      bg: [...PALETTES.hero.bg],
      a: [...PALETTES.hero.a],
      b: [...PALETTES.hero.b],
      c: [...PALETTES.hero.c],
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 0.85 : 1.25);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const target = PALETTES[sectionRef.current];
      const k = 0.045;
      for (let i = 0; i < 3; i++) {
        col.bg[i] = lerp(col.bg[i], target.bg[i], k);
        col.a[i] = lerp(col.a[i], target.a[i], k);
        col.b[i] = lerp(col.b[i], target.b[i], k);
        col.c[i] = lerp(col.c[i], target.c[i], k);
      }
      mouse.x = lerp(mouse.x, mouse.tx, 0.035);
      mouse.y = lerp(mouse.y, mouse.ty, 0.035);
      resize();
      gl.uniform1f(uTime, reduce ? 0 : (now - t0) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform3f(uBg, col.bg[0], col.bg[1], col.bg[2]);
      gl.uniform3f(uA, col.a[0], col.a[1], col.a[2]);
      gl.uniform3f(uB, col.b[0], col.b[1], col.b[2]);
      gl.uniform3f(uC, col.c[0], col.c[1], col.c[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const palette = sectionPalette[section];

  return (
    <div className="light-stage" aria-hidden>
      <canvas ref={canvasRef} />
      <div
        className={`light-solid${palette.lights ? "" : " is-on"}`}
        style={{ background: palette.bg }}
      />
      <div className="light-grain" />
      <div className={`light-dim${section === "contact" ? " is-on" : ""}`} />
    </div>
  );
}
