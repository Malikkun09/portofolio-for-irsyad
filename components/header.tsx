"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { useSite } from "@/lib/site-context";
import { ArrowIcon, FlipText } from "@/components/flip-text";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";

export function Header() {
  const { menuOpen, setMenuOpen, ready } = useSite();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;
    const { gsap } = ensureGsap();
    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }
    gsap.fromTo(
      el,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.15, ease: "power2.out" },
    );
  }, [ready]);

  return (
    <header ref={root} className={`header${ready ? "" : " is-hidden"}`}>
      <div className="header-left">
        <button
          className="menu-btn flip-hover"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`hamburger${menuOpen ? " is-close" : ""}`}>
            <span className="hamburger-line">
              <span />
            </span>
            <span className="hamburger-line">
              <span />
            </span>
          </span>
          <span className="menu-label">
            <FlipText on={menuOpen}>{menuOpen ? "Close" : "Menu"}</FlipText>
          </span>
        </button>
      </div>
      <div className="header-center">
        <Link href="/" className="logo" aria-label={site.name}>
          {site.name}
        </Link>
      </div>
      <div className="header-right">
        <a
          className="chat-link flip-hover"
          href={`mailto:${site.email}`}
          aria-label="Send an email"
        >
          <span className="chat-text">
            <FlipText>Let’s chat</FlipText>
          </span>
          <span className="arrow-swap">
            <span>
              <ArrowIcon />
            </span>
            <span>
              <ArrowIcon />
            </span>
          </span>
        </a>
      </div>
    </header>
  );
}
