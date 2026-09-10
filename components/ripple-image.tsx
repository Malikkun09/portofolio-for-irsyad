"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uTime;
uniform float uStrength;
varying vec2 vUv;

void main() {
  vec2 to = vUv - uMouse;
  float d = length(to);
  float ripple = sin(d * 42.0 - uTime * 7.0) * exp(-d * 7.5) * uStrength;
  vec2 dir = to / max(d, 0.0001);
  vec2 uv = vUv + dir * ripple * 0.045;
  uv = clamp(uv, 0.001, 0.999);
  gl_FragColor = texture2D(uTexture, uv);
}
`;

export function RippleImage({ src, alt }: { src: string; alt: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current;
    const img = imgRef.current;
    if (!wrapEl || !img) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let raf = 0;
    let disposed = false;
    const mouse = { x: 0.5, y: 0.5 };
    let strength = 0;
    let hovering = false;

    const start = () => {
      if (disposed || renderer) return;
      const tex = new THREE.Texture(img);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      const w = wrapEl.clientWidth;
      const h = wrapEl.clientHeight;
      renderer.setSize(w, h, false);
      renderer.domElement.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;";
      wrapEl.appendChild(renderer.domElement);
      img.style.opacity = "0";

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const uniforms = {
        uTexture: { value: tex },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uTime: { value: 0 },
        uStrength: { value: 0 },
      };
      const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERT,
        fragmentShader: FRAG,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
      scene.add(mesh);

      const t0 = performance.now();
      const loop = (now: number) => {
        if (!renderer) return;
        strength += ((hovering ? 1 : 0) - strength) * 0.08;
        uniforms.uTime.value = (now - t0) / 1000;
        uniforms.uStrength.value = strength;
        uniforms.uMouse.value.set(mouse.x, mouse.y);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      const onMove = (e: PointerEvent) => {
        const r = wrapEl.getBoundingClientRect();
        mouse.x = (e.clientX - r.left) / r.width;
        mouse.y = 1 - (e.clientY - r.top) / r.height;
      };
      wrapEl.addEventListener("pointerenter", () => {
        hovering = true;
      });
      wrapEl.addEventListener("pointerleave", () => {
        hovering = false;
      });
      wrapEl.addEventListener("pointermove", onMove);

      const ro = new ResizeObserver(() => {
        if (!renderer) return;
        renderer.setSize(wrapEl.clientWidth, wrapEl.clientHeight, false);
      });
      ro.observe(wrapEl);

      cleanupExtras = () => {
        ro.disconnect();
        wrapEl.removeEventListener("pointermove", onMove);
        cancelAnimationFrame(raf);
        tex.dispose();
        mat.dispose();
        mesh.geometry.dispose();
        renderer?.dispose();
        renderer?.domElement.remove();
        renderer = null;
        img.style.opacity = "1";
      };
    };

    let cleanupExtras = () => {};
    if (img.complete) start();
    else img.addEventListener("load", start, { once: true });

    return () => {
      disposed = true;
      cleanupExtras();
    };
  }, [src]);

  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
