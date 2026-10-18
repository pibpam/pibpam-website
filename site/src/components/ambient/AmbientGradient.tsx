"use client";

import { useEffect, useRef, useState } from "react";
import { useLive } from "@/components/live/LiveProvider";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "./gradientShader";

/** Resolução interna do canvas: o degradê é suave, meia resolução basta e economiza GPU. */
const RENDER_SCALE = 0.5;
/** O movimento é lento: 30 quadros por segundo bastam e economizam metade da GPU. */
const FRAME_MS = 1000 / 30;

function readColor(name: string): [number, number, number] {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace("#", "");
  const full = hex.length === 3 ? hex.replace(/./g, (c) => c + c) : hex.padEnd(6, "0");
  const n = parseInt(full.slice(0, 6), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "shader");
  return shader;
}

/**
 * Degradê de malha animado (WebGL puro, sem biblioteca), usado como fundo
 * das seções escuras: hero, chamadas e a página ao vivo.
 * - Começa só depois do carregamento da página, para não disputar com o LCP.
 * - Anima a 30 fps em telas ≥ 768px. No mobile ou com `prefers-reduced-motion`
 *   desenha um quadro estático, redesenhado quando a transmissão começa ou acaba.
 * - Pausa quando sai da tela ou a aba fica oculta.
 * - Ao vivo: as manchas aceleram, ficam mais intensas e puxam para o lime.
 * - Sem WebGL fica o degradê em CSS por baixo (fallback).
 */
export function AmbientGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { live } = useLive();
  const liveRef = useRef(0);
  const redrawRef = useRef<(() => void) | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    liveRef.current = live ? 1 : 0;
    redrawRef.current?.();
  }, [live]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf = 0;
    let disposed = false;
    let cleanup = () => {};

    const start = () => {
      if (disposed) return;
      const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false, alpha: true });
      if (!gl) return;

      let program: WebGLProgram;
      try {
        program = gl.createProgram()!;
        gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
        gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "link");
      } catch (error) {
        console.warn("AmbientGradient desativado:", error);
        return;
      }
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, "aPosition");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      const uniform = (name: string) => gl.getUniformLocation(program, name);
      const uSize = uniform("uSize");
      const uTime = uniform("uTime");
      const uLive = uniform("uLive");
      gl.uniform3fv(uniform("uBrand"), readColor("--brand"));
      gl.uniform3fv(uniform("uBrandStrong"), readColor("--brand-strong"));
      gl.uniform3fv(uniform("uAccent"), readColor("--accent"));

      const animate =
        window.matchMedia("(min-width: 768px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Ponto de partida fixo para o quadro estático ficar sempre igual.
      const t0 = performance.now() - 20_000;
      let liveLevel = liveRef.current;
      let onScreen = true;
      let lastFrame = 0;

      const resize = () => {
        const width = Math.max(1, Math.round(canvas.clientWidth * RENDER_SCALE));
        const height = Math.max(1, Math.round(canvas.clientHeight * RENDER_SCALE));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }
        gl.uniform2f(uSize, canvas.clientWidth, canvas.clientHeight);
      };

      const draw = (now: number) => {
        // Animado: transição suave para o estado ao vivo. Estático: salta direto.
        liveLevel = animate ? liveLevel + (liveRef.current - liveLevel) * 0.03 : liveRef.current;
        gl.uniform1f(uTime, animate ? (now - t0) / 1000 : 20);
        gl.uniform1f(uLive, liveLevel);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };

      const loop = (now: number) => {
        if (now - lastFrame >= FRAME_MS - 1) {
          lastFrame = now;
          draw(now);
        }
        raf = onScreen && !document.hidden ? requestAnimationFrame(loop) : 0;
      };

      const resume = () => {
        if (animate && !raf && onScreen && !document.hidden) raf = requestAnimationFrame(loop);
      };

      const observer = new ResizeObserver(() => {
        resize();
        if (!animate) draw(performance.now());
      });
      observer.observe(canvas);

      const visibility = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        resume();
      });
      visibility.observe(canvas);
      document.addEventListener("visibilitychange", resume);

      redrawRef.current = animate ? null : () => draw(performance.now());

      resize();
      draw(performance.now());
      requestAnimationFrame(() => setVisible(true));
      if (animate) raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
        visibility.disconnect();
        document.removeEventListener("visibilitychange", resume);
        redrawRef.current = null;
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };

    // Espera o carregamento e um momento ocioso para não atrasar o conteúdo.
    const schedule = () => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(start, { timeout: 1500 });
      else setTimeout(start, 300);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      disposed = true;
      window.removeEventListener("load", schedule);
      cleanup();
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Fallback e base: o mesmo degradê em CSS, estático. */}
      <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_30%,color-mix(in_srgb,var(--brand)_28%,transparent),transparent),radial-gradient(45%_50%_at_55%_95%,color-mix(in_srgb,var(--brand-strong)_55%,transparent),transparent)]" />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 size-full transition-opacity duration-[1500ms] ease-out ${visible ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
