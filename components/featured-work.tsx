"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { SectionIndex } from "@/components/section-chrome";
import { RippleImage } from "@/components/ripple-image";
import { BLUR_MID, BLUR_NONE, BLUR_SOFT, ensureGsap, prefersReducedMotion } from "@/lib/motion";
import { useSite } from "@/lib/site-context";

export function FeaturedWork() {
  const projects = site.work.projects;
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLAnchorElement>(null);
  const titles = useRef<HTMLHeadingElement>(null);
  const services = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  indexRef.current = index;
  const primed = useRef(false);
  const { ready } = useSite();

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
            projects.length - 1,
            Math.round(self.progress * (projects.length - 1)),
          );
          if (next !== indexRef.current) setIndex(next);
        },
      });
    }, el);
    return () => ctx.revert();
  }, [projects.length, ready]);

  useEffect(() => {
    const el = root.current;
    if (!el || !ready || prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const bits = [titles.current, stage.current, services.current].filter(Boolean);
    const ctx = gsap.context(() => {
      gsap.set(bits, { autoAlpha: 0, filter: BLUR_MID });
      gsap.to(bits, {
        autoAlpha: 1,
        filter: BLUR_NONE,
        duration: 1.3,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
      });
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    const { gsap } = ensureGsap();
    if (prefersReducedMotion()) return;
    if (!primed.current) {
      primed.current = true;
      return;
    }

    const titleEls = titles.current?.querySelectorAll("span");
    const serviceEls = services.current?.querySelectorAll("[data-set]");
    if (titleEls) {
      titleEls.forEach((node, i) => {
        gsap.to(node, {
          autoAlpha: i === index ? 1 : 0,
          filter: i === index ? BLUR_NONE : BLUR_SOFT,
          duration: 0.95,
          ease: "power2.out",
          overwrite: true,
        });
      });
    }
    if (serviceEls) {
      serviceEls.forEach((node, i) => {
        gsap.to(node, {
          autoAlpha: i === index ? 1 : 0,
          filter: i === index ? BLUR_NONE : "blur(10px)",
          duration: 0.85,
          ease: "power2.out",
          overwrite: true,
        });
      });
    }
    if (stage.current) {
      gsap.fromTo(
        stage.current,
        { autoAlpha: 0.25, filter: BLUR_MID },
        { autoAlpha: 1, filter: BLUR_NONE, duration: 1.1, ease: "power2.out" },
      );
    }
  }, [index]);

  const project = projects[index];

  return (
    <section
      className="showcase"
      id="work"
      data-section="work"
      ref={root}
      style={{ ["--total-items" as string]: projects.length }}
    >
      <div className="showcase-sticky">
        <div className="showcase-top">
          <SectionIndex
            number={site.work.index}
            title={site.work.label}
            invert
          />
          <div className="showcase-ticks" aria-hidden>
            {projects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                className={`showcase-tick${i === index ? " is-on" : ""}`}
                aria-label={`Go to ${p.title}`}
                onClick={() => setIndex(i)}
              >
                <Image src={p.poster} alt="" width={84} height={48} />
              </button>
            ))}
          </div>
        </div>

        <div className="showcase-stage">
          <Link
            ref={stage}
            href={`/work/${project.slug}`}
            className="showcase-frame"
          >
            <RippleImage src={project.image} alt={project.title} />
          </Link>
        </div>

        <h3 className="showcase-title" ref={titles}>
          {projects.map((p) => (
            <span key={p.slug}>{p.title}</span>
          ))}
        </h3>
        <div className="showcase-services" ref={services}>
          {projects.map((p) => (
            <div key={p.slug} data-set>
              {p.services.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          ))}
        </div>

        <nav className="showcase-nav" aria-label="Showcase">
          <button
            type="button"
            className="nav-sq"
            aria-label="Previous project"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            ‹
          </button>
          <Link className="view-all" href="/work">
            View all projects
          </Link>
          <button
            type="button"
            className="nav-sq"
            aria-label="Next project"
            disabled={index === projects.length - 1}
            onClick={() => setIndex((i) => Math.min(projects.length - 1, i + 1))}
          >
            ›
          </button>
        </nav>
      </div>
    </section>
  );
}
