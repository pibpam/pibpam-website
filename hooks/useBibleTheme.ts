import { useSyncExternalStore } from "react";

export type BibleTheme = "light" | "dark";

const STORAGE_KEY = "pibpam:bible-theme";
const CHANGE_EVENT = "pibpam:bible-theme-change";
const DARK_QUERY = "(prefers-color-scheme: dark)";

// Escolha da sessão, para quando o localStorage lança (modo privado, WebView sem storage).
let sessionChoice: BibleTheme | null = null;

const readSaved = (): BibleTheme | null => {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : sessionChoice;
  } catch {
    return sessionChoice;
  }
};

const getSnapshot = (): BibleTheme =>
  readSaved() ?? (window.matchMedia(DARK_QUERY).matches ? "dark" : "light");

// No servidor não há preferência: renderiza claro e corrige na hidratação.
const getServerSnapshot = (): BibleTheme => "light";

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
};

/**
 * Tema das telas da Bíblia: segue o claro/escuro do aparelho até o usuário
 * escolher no botão; a escolha fica salva no aparelho.
 */
export const useBibleTheme = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    sessionChoice = theme === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem(STORAGE_KEY, sessionChoice);
    } catch {
      // Fica só na sessão.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return { theme, dark: theme === "dark", toggle };
};
