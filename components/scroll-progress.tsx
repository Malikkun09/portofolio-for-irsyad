"use client";

import { useSite } from "@/lib/site-context";

export function ScrollProgress() {
  const { progress, ready } = useSite();
  return (
    <div
      className="scroll-progress"
      style={{ ["--progress" as string]: ready ? progress : 0 }}
      aria-hidden
    >
      <div className="scroll-progress-bar" />
    </div>
  );
}
