import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ force3D: false });
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const lightEase = "power2.out";
export const lightEaseIn = "power2.in";
export const lightEaseInOut = "power2.inOut";

export const BLUR_HEAVY = "blur(36px)";
export const BLUR_MID = "blur(24px)";
export const BLUR_SOFT = "blur(16px)";
export const BLUR_NONE = "blur(0px)";

export const lightFrom = {
  autoAlpha: 0,
  filter: BLUR_HEAVY,
};

export function lightIn(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
) {
  const { gsap } = ensureGsap();
  return gsap.fromTo(
    targets,
    { autoAlpha: 0, filter: BLUR_HEAVY },
    {
      autoAlpha: 1,
      filter: BLUR_NONE,
      duration: 1.45,
      ease: lightEase,
      force3D: false,
      ...vars,
    },
  );
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
