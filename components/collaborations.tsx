"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/content/site";
import { SectionIndex } from "@/components/section-chrome";

import { useSite } from "@/lib/site-context";

gsap.registerPlugin(ScrollTrigger);

export function Collaborations() {
  const root = useRef<HTMLElement>(null);
  const { ready } = useSite();

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;
    const items = el.querySelectorAll<HTMLElement>(".clients-arc span");
    if (!items.length) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const total = items.length;
        items.forEach((node, i) => {
          const rel = i - self.progress * (total - 1);
          const theta = rel * 11;
          const radius = 58;
          const rad = (theta * Math.PI) / 180;
          const x = radius * (1 - Math.cos(rad));
          const y = radius * Math.sin(rad);
          node.style.transform = `translate(${-x}rem, calc(-50% + ${y}rem)) rotate(${theta}deg)`;
          node.classList.toggle("is-on", Math.abs(rel) < 0.5);
        });
      },
    });
    return () => st.kill();
  }, [ready]);

  return (
    <section className="clients" id="clients" data-section="clients" ref={root}>
      <div className="clients-copy">
        <SectionIndex number={site.clients.index} title={site.clients.label} />
        <p className="light-in">{site.clients.body}</p>
      </div>
      <div className="clients-grid">
        {site.clients.names.map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
      <div className="clients-arc" aria-hidden>
        {site.clients.names.map((n, i) => (
          <span key={n} style={{ ["--index" as string]: i }}>
            {n}
          </span>
        ))}
      </div>
    </section>
  );
}
