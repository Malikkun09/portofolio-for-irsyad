"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useSite } from "@/lib/site-context";
import { site } from "@/content/site";

export function Loader() {
  const { setReady } = useSite();
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.add("is-ready");
        setReady(true);
      },
    });
    tl.to(mark.current, {
      autoAlpha: 1,
      filter: "blur(0px)",
      duration: 1.15,
      ease: "power2.out",
    })
      .to(
        bar.current,
        { width: "100%", duration: 1.35, ease: "power2.inOut" },
        0.15,
      )
      .to(mark.current, {
        autoAlpha: 0,
        filter: "blur(18px)",
        duration: 0.7,
        ease: "power2.in",
      })
      .to(
        root.current,
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.05,
          ease: "power2.inOut",
        },
        "-=0.15",
      )
      .set(root.current, { display: "none" });

    return () => {
      tl.kill();
    };
  }, [setReady]);

  return (
    <div ref={root} className="loader" aria-hidden>
      <div ref={mark} className="loader-mark">
        {site.name}
      </div>
      <div className="loader-bar">
        <i ref={bar} />
      </div>
    </div>
  );
}
