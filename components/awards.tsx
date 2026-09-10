"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/content/site";
import { SectionIndex } from "@/components/section-chrome";
import { BLUR_MID, BLUR_NONE, ensureGsap } from "@/lib/motion";
import { useSite } from "@/lib/site-context";

gsap.registerPlugin(ScrollTrigger);

export function Awards() {
  const root = useRef<HTMLElement>(null);
  const { ready } = useSite();

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;
    const cards = el.querySelectorAll<HTMLElement>(".award-card");
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1200px)", () => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const last = cards.length - 1;
          cards.forEach((card, i) => {
            const rel = i - self.progress * last;
            const x = 39.365 * rel;
            const y = 2.365 * Math.pow(Math.abs(rel), 1.5);
            const rot = rel * 4;
            card.style.transform = `translate(${x}rem, ${y}rem) rotate(${rot}deg)`;
          });
        },
      });
      st.refresh();
      return () => st.kill();
    });
    return () => mm.revert();
  }, [ready]);

  return (
    <section className="awards" id="awards" data-section="awards" ref={root}>
      <div className="awards-index">
        <SectionIndex number={site.awards.index} title={site.awards.label} invert />
      </div>
      <div className="awards-sticky">
        {site.awards.items.map((item, i) => (
          <article
            key={item.title}
            className="award-card"
            style={{ ["--card-index" as string]: i, zIndex: 10 - i }}
          >
            <p className="org">{item.org}</p>
            <h3>{item.title}</h3>
            <div className="meta">
              <span>{item.year}</span>
              <span>{item.note}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Press() {
  const root = useRef<HTMLElement>(null);
  const { ready } = useSite();

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(".press-list a");
      const list = el.querySelector(".press-list");
      gsap.set(items, { autoAlpha: 0, filter: BLUR_MID });
      gsap.to(items, {
        autoAlpha: 1,
        filter: BLUR_NONE,
        duration: 1.3,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
        onComplete: () => list?.classList.add("is-in"),
      });
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="press" id="press" data-section="press" ref={root}>
      <div className="press-label">
        <SectionIndex number={site.press.index} title={site.press.label} />
        <p className="desk">Selected mentions</p>
      </div>
      <div className="press-list">
        {site.press.items.map((item) => (
          <a key={item.name} href={item.href}>
            {item.name}
          </a>
        ))}
      </div>
    </section>
  );
}
