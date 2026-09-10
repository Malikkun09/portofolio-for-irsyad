"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { useSite } from "@/lib/site-context";
import {
  BLUR_HEAVY,
  BLUR_MID,
  BLUR_NONE,
  BLUR_SOFT,
  ensureGsap,
  prefersReducedMotion,
} from "@/lib/motion";

function WordLine({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <span key={`${word}-${i}`} className="word">
      {word}
    </span>
  ));
}

export function Hero() {
  const { setReelOpen, reelOpen, ready } = useSite();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;
    const { gsap } = ensureGsap();
    const words = Array.from(el.querySelectorAll<HTMLElement>(".hero-word"));
    const bits = el.querySelectorAll(".hero-title .word, .hero-title .l3");
    const meta = el.querySelectorAll(".hero-regions, .hero-year");

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([bits, meta, words[0]], { autoAlpha: 1, filter: "none" });
        return;
      }

      gsap.set(bits, { autoAlpha: 0, filter: BLUR_HEAVY });
      gsap.set(meta, { autoAlpha: 0, filter: BLUR_MID });
      gsap.set(words, { autoAlpha: 0, filter: BLUR_MID });

      const intro = gsap.timeline({ delay: 0.08 });
      intro
        .to(bits, {
          autoAlpha: 1,
          filter: BLUR_NONE,
          duration: 1.5,
          stagger: 0.12,
          ease: "power2.out",
        })
        .to(
          meta,
          {
            autoAlpha: 1,
            filter: BLUR_NONE,
            duration: 1.15,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.9",
        )
        .to(
          words[0],
          {
            autoAlpha: 1,
            filter: BLUR_NONE,
            duration: 1.05,
            ease: "power2.out",
          },
          "-=0.75",
        )
        .add(() => {
          cycleWords(gsap, words);
        }, "+=1.1");
    }, el);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero" id="hero" data-section="hero" ref={root}>
      <div className="hero-glow" aria-hidden />
      <div className="hero-inner">
        <h1
          className="hero-title"
          aria-label="I am an artist-led creative developer"
        >
          <span className="line l1">
            <WordLine text={site.hero.line1} />
          </span>
          <span className="line l2">
            <WordLine text={site.hero.line2} />
          </span>
          <span className="line l3">
            <span>{site.hero.line3}</span>
            <button
              type="button"
              className={`media-box${reelOpen ? " is-open" : ""}`}
              aria-label={reelOpen ? "Close reel" : "Open featured reel"}
              onClick={() => setReelOpen(!reelOpen)}
            >
              <span className="media-box-inner" />
            </button>
          </span>
          <span className="line l4" aria-hidden>
            {site.hero.words.map((w) => (
              <span key={w} className="hero-word">
                {w}
              </span>
            ))}
          </span>
        </h1>
        <nav className="hero-regions" aria-label="Regions">
          {site.regions.map((r, i) => (
            <span key={r} style={{ display: "contents" }}>
              {i > 0 ? <span className="hero-sep" /> : null}
              <p>{r}</p>
            </span>
          ))}
        </nav>
        <p className="hero-year">{site.year}</p>
      </div>
    </section>
  );
}

function cycleWords(gsap: typeof import("gsap").default, words: HTMLElement[]) {
  if (words.length < 2) return;
  const hold = 1.7;
  const fade = 0.85;
  const tl = gsap.timeline({ repeat: -1, delay: hold });
  words.forEach((word, i) => {
    const next = words[(i + 1) % words.length];
    const at = i * (hold + fade);
    tl.to(
      word,
      { autoAlpha: 0, filter: BLUR_SOFT, duration: fade, ease: "power2.in" },
      at,
    ).to(
      next,
      { autoAlpha: 1, filter: BLUR_NONE, duration: fade, ease: "power2.out" },
      at,
    );
  });
}
