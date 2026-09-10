"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type SectionId } from "@/content/site";

type SiteContextValue = {
  ready: boolean;
  setReady: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  section: SectionId;
  setSection: (id: SectionId) => void;
  progress: number;
  setProgress: (n: number) => void;
  reelOpen: boolean;
  setReelOpen: (v: boolean) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [section, setSection] = useState<SectionId>("hero");
  const [progress, setProgress] = useState(0);
  const [reelOpen, setReelOpen] = useState(false);

  const setSectionSafe = useCallback((id: SectionId) => {
    setSection(id);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      setReady,
      menuOpen,
      setMenuOpen,
      section,
      setSection: setSectionSafe,
      progress,
      setProgress,
      reelOpen,
      setReelOpen,
    }),
    [ready, menuOpen, section, progress, reelOpen, setSectionSafe],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
