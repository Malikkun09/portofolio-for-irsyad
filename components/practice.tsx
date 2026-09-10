"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/content/site";
import { SectionIndex } from "@/components/section-chrome";
import { BLUR_HEAVY, BLUR_MID, BLUR_NONE, ensureGsap, prefersReducedMotion } from "@/lib/motion";
import { useSite } from "@/lib/site-context";

gsap.registerPlugin(ScrollTrigger);

export function Practice() {
  const chapters = site.practice.chapters;
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const inter = useRef<HTMLElement>(null);
  const indexRef = useRef(0);
  indexRef.current = index;
  const primed = useRef(false);
  const { ready } = useSite();

  useEffect(() => {
    const el = inter.current;
    if (!el || !ready) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll(".word");
      if (prefersReducedMotion()) {
        gsap.set(lines, { autoAlpha: 1, filter: "none" });
        return;
      }
      gsap.set(lines, { autoAlpha: 0, filter: BLUR_HEAVY });
      gsap.to(lines, {
        autoAlpha: 1,
        filter: BLUR_NONE,
        duration: 1.45,
        stagger: 0.16,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (window.innerWidth < 1200) return;
          const next = Math.min(
            chapters.length - 1,
            Math.round(self.progress * (chapters.length - 1)),
          );
          if (next !== indexRef.current) setIndex(next);
        },
      });
    }, el);
    return () => ctx.revert();
  }, [chapters.length, ready]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!primed.current) {
      primed.current = true;
      return;
    }
    const { gsap } = ensureGsap();
    const targets = [card.current, copy.current].filter(Boolean);
    gsap.fromTo(
      targets,
      { autoAlpha: 0.15, filter: BLUR_MID },
      { autoAlpha: 1, filter: BLUR_NONE, duration: 1, ease: "power2.out", stagger: 0.08 },
    );
  }, [index]);

  const ch = chapters[index];

  return (
    <>
      <section className="intertitle" data-section="practice" ref={inter}>
        <h2>
          {site.practice.intertitle.split("\n").map((line) => (
            <span key={line} className="word line-word">
              {line}
            </span>
          ))}
        </h2>
      </section>
      <section
        className="practice"
        id="practice"
        data-section="practice"
        ref={root}
      >
        <div className="practice-sticky">
          <div>
            <div className="practice-index">
              <SectionIndex
                number={site.practice.index}
                title={site.practice.label}
              />
            </div>
          </div>
          <div className="practice-card" ref={card}>
            <Image
              src={ch.image}
              alt={ch.title}
              fill
              sizes="(min-width: 1200px) 504px, 90vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="practice-copy" ref={copy}>
            <p className="role">{ch.role}</p>
            <h3>{ch.title}</h3>
            <p>{ch.body}</p>
            <div className="practice-controls">
              <button
                type="button"
                className="nav-sq"
                aria-label="Previous"
                disabled={index === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
              >
                ‹
              </button>
              {chapters.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`dash${i === index ? " is-on" : ""}`}
                  aria-label={`Go to ${chapters[i].title}`}
                  onClick={() => setIndex(i)}
                />
              ))}
              <button
                type="button"
                className="nav-sq"
                aria-label="Next"
                disabled={index === chapters.length - 1}
                onClick={() =>
                  setIndex((i) => Math.min(chapters.length - 1, i + 1))
                }
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
