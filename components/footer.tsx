"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { BLUR_MID, BLUR_NONE, ensureGsap, prefersReducedMotion } from "@/lib/motion";
import { useSite } from "@/lib/site-context";

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const { ready } = useSite();

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      const bits = el.querySelectorAll(
        ".footer-slogan, .footer-mail, .studios > div, .socials, .wordmark-lg",
      );
      if (prefersReducedMotion()) {
        gsap.set(bits, { autoAlpha: 1, filter: "none" });
        return;
      }
      gsap.set(bits, { autoAlpha: 0, filter: BLUR_MID });
      gsap.to(bits, {
        autoAlpha: 1,
        filter: BLUR_NONE,
        duration: 1.3,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready]);

  return (
    <footer className="footer" id="contact" data-section="contact" ref={root}>
      <div className="footer-top">
        <div>
          <p className="footer-slogan">{site.contact.heading}</p>
          <a className="footer-mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
        <div className="studios">
          {site.contact.studios.map((s) => (
            <div key={s.city}>
              <h3>{s.city}</h3>
              <p>{s.address}</p>
              <p>{s.phone}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="socials">
          {site.contact.socials.map((s) => (
            <a key={s.name} href={s.href}>
              {s.name}
            </a>
          ))}
        </div>
        <div className="wordmark-lg">{site.name}</div>
      </div>
    </footer>
  );
}
