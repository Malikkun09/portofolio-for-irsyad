"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { useSite } from "@/lib/site-context";
import { BLUR_MID, BLUR_NONE, BLUR_SOFT, ensureGsap, prefersReducedMotion } from "@/lib/motion";

export function Menu() {
  const { menuOpen, setMenuOpen } = useSite();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    const items = el.querySelectorAll(".nav-list a");
    const info = el.querySelector(".nav-info");
    const reduce = prefersReducedMotion();

    if (menuOpen) el.classList.add("is-open");

    const tl = gsap.timeline({
      onComplete: () => {
        if (!menuOpen) el.classList.remove("is-open");
      },
    });

    if (reduce) {
      gsap.set(el, { clipPath: menuOpen ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" });
      gsap.set([items, info], { autoAlpha: menuOpen ? 1 : 0, filter: "none" });
      if (!menuOpen) el.classList.remove("is-open");
      return;
    }

    if (menuOpen) {
      gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(items, { autoAlpha: 0, filter: BLUR_MID });
      gsap.set(info, { autoAlpha: 0, filter: BLUR_SOFT });
      tl.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.05,
        ease: "power2.inOut",
      })
        .to(
          items,
          {
            autoAlpha: 1,
            filter: BLUR_NONE,
            duration: 1.2,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.45",
        )
        .to(
          info,
          { autoAlpha: 1, filter: BLUR_NONE, duration: 0.95, ease: "power2.out" },
          "-=0.75",
        );
    } else {
      tl.to([items, info], {
        autoAlpha: 0,
        filter: BLUR_SOFT,
        duration: 0.45,
        ease: "power2.in",
      }).to(
        el,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.9,
          ease: "power2.inOut",
        },
        "-=0.15",
      );
    }

    return () => {
      tl.kill();
    };
  }, [menuOpen]);

  return (
    <div ref={root} className="nav-overlay" aria-hidden={!menuOpen}>
      <div className="nav-overlay-video" aria-hidden>
        <LightPlate />
      </div>
      <nav className="nav-list" aria-label="Primary">
        {site.menu.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="nav-info">
        <p className="nav-info-label">New brief</p>
        <a className="nav-info-link" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </div>
    </div>
  );
}

function LightPlate() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 50% 40%, rgba(78,180,196,0.45), transparent 42%), radial-gradient(circle at 30% 70%, rgba(23,64,169,0.5), #051236 70%)",
      }}
    />
  );
}
