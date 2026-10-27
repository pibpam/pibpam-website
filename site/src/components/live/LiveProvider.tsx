"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { IBroadcast } from "@/types";

const POLL_MS = 60_000;

interface LiveState {
  live: IBroadcast | null;
  ready: boolean;
}

// Exportado para o app (WebView) alimentar o estado "ao vivo" com o contexto dele.
export const LiveContext = createContext<LiveState>({ live: null, ready: false });

/**
 * Consulta /api/site/live a cada minuto (e quando a aba volta ao foco).
 * Fica no cliente para que as páginas continuem estáticas/cacheadas.
 */
export function LiveProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LiveState>({ live: null, ready: false });

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/site/live");
        const lives = (await res.json()) as IBroadcast[];
        if (active) setState({ live: lives[0] ?? null, ready: true });
      } catch {
        if (active) setState((current) => ({ ...current, ready: true }));
      }
    };
    const onVisible = () => document.visibilityState === "visible" && load();

    load();
    const timer = setInterval(load, POLL_MS);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      active = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return <LiveContext.Provider value={state}>{children}</LiveContext.Provider>;
}

export const useLive = () => useContext(LiveContext);
