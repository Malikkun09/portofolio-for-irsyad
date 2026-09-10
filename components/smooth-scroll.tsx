"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useSite } from "@/lib/site-context";
import { BLUR_HEAVY, BLUR_NONE, ensureGsap } from "@/lib/motion";
import { type SectionId } from "@/content/site";

export function SmoothScroll() {
  const { ready, menuOpen, reelOpen, setProgress, setSection } = useSite();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      autoRaf: false,
      duration: reduce ? 0 : 1.15,
      lerp: reduce ? 1 : 0.08,
      smoothWheel: !reduce,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      const limit = e.limit || 1;
      setProgress(limit === 0 ? 0 : e.scroll / limit);
    });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [setProgress]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (!ready || menuOpen || reelOpen) {
      lenis.stop();
      document.body.classList.add("is-locked");
    } else {
      lenis.start();
      document.body.classList.remove("is-locked");
    }
  }, [ready, menuOpen, reelOpen]);

  useEffect(() => {
    if (!ready) return;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );
    const pick = () => {
      const mid = window.innerHeight * 0.42;
      let bestId: SectionId | null = null;
      let bestDist = Infinity;
      nodes.forEach((n) => {
        const id = n.getAttribute("data-section") as SectionId | null;
        if (!id) return;
        const r = n.getBoundingClientRect();
        if (r.bottom < 80 || r.top > window.innerHeight - 80) return;
        const dist = Math.abs(
          r.top + Math.min(r.height, window.innerHeight) * 0.35 - mid,
        );
        if (dist < bestDist) {
          bestDist = dist;
          bestId = id;
        }
      });
      if (bestId) setSection(bestId);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    return () => window.removeEventListener("scroll", pick);
  }, [ready, setSection]);

  useEffect(() => {
    if (!ready) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const els = gsap.utils.toArray<HTMLElement>(".light-in");
    if (!els.length) return;
    const tweens = els.map((el) =>
      gsap.fromTo(
        el,
        { autoAlpha: 0, filter: BLUR_HEAVY },
        {
          autoAlpha: 1,
          filter: BLUR_NONE,
          duration: 1.45,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        },
      ),
    );
    const refresh = () => ScrollTrigger.refresh();
    refresh();
    const t = window.setTimeout(refresh, 120);
    return () => {
      window.clearTimeout(t);
      tweens.forEach((tw) => tw.kill());
    };
  }, [ready]);

  return null;
}
