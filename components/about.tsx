"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { SectionIndex } from "@/components/section-chrome";
import { BLUR_HEAVY, BLUR_MID, BLUR_NONE, ensureGsap, prefersReducedMotion } from "@/lib/motion";
import { useSite } from "@/lib/site-context";

export function About() {
  const root = useRef<HTMLElement>(null);
  const { ready } = useSite();
  const words = site.about.heading.split(" ");

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      const wordEls = el.querySelectorAll(".word");
      const body = el.querySelector(".about-body");
      const index = el.querySelector(".about-index");
      if (prefersReducedMotion()) {
        gsap.set([wordEls, body, index], { autoAlpha: 1, filter: "none" });
        return;
      }
      gsap.set([wordEls, body, index], { autoAlpha: 0, filter: BLUR_HEAVY });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
      });
      tl.to(index, {
        autoAlpha: 1,
        filter: BLUR_NONE,
        duration: 1,
        ease: "power2.out",
      }).to(
        wordEls,
        {
          autoAlpha: 1,
          filter: BLUR_NONE,
          duration: 1.35,
          stagger: 0.07,
          ease: "power2.out",
        },
        "-=0.55",
      ).to(
        body,
        {
          autoAlpha: 1,
          filter: BLUR_NONE,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.7",
      );
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="about" id="about" data-section="about" ref={root}>
      <div className="about-block">
        <div className="about-index">
          <SectionIndex number={site.about.index} title={site.about.label} />
        </div>
        <h2>
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="word">
              {word}
            </span>
          ))}
        </h2>
        <p className="about-body">{site.about.body}</p>
      </div>
    </section>
  );
}

export function WhatIDo() {
  const root = useRef<HTMLElement>(null);
  const { ready } = useSite();

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>(".what-item");
      items.forEach((item) => {
        const rows = item.querySelectorAll("li");
        const labels = item.querySelectorAll(".what-sticky, .what-mobile-cat");
        gsap.set([rows, labels], { autoAlpha: 0, filter: BLUR_MID });
        ScrollTrigger.create({
          trigger: item,
          start: "top 68%",
          once: true,
          onEnter: () => {
            item.classList.add("is-on");
            gsap.to(labels, {
              autoAlpha: 1,
              filter: BLUR_NONE,
              duration: 1.1,
              ease: "power2.out",
              overwrite: true,
            });
            gsap.to(rows, {
              autoAlpha: 1,
              filter: BLUR_NONE,
              duration: 1.35,
              stagger: 0.12,
              ease: "power2.out",
              overwrite: true,
            });
          },
        });
      });
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="what" id="what" data-section="what" ref={root}>
      <div className="what-index">
        <SectionIndex number={site.services.index} title={site.services.label} />
      </div>
      {site.services.items.map((item) => (
        <div className="what-item" key={item.no}>
          <p className="what-sticky">{item.no}</p>
          <p className="what-sticky">{item.name}</p>
          <div className="what-content">
            <div className="what-mobile-cat">
              <span>{item.sub}</span>
              <span>{item.name}</span>
            </div>
            <ul className="what-list">
              {item.list.map((row) => (
                <li key={row}>{row}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}
