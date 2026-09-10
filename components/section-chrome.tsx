"use client";

import { site } from "@/content/site";
import { useSite } from "@/lib/site-context";

export function SectionIndicator() {
  const { section } = useSite();
  const idx = Math.max(
    0,
    site.navSections.findIndex((s) => s.id === section),
  );

  if (section === "hero") return null;

  return (
    <div className="section-indicator" aria-hidden>
      <div
        className="section-indicator-inner"
        style={{ ["--si" as string]: idx }}
      >
        <div className="section-indicator-col">
          {site.navSections.map((s, i) => (
            <span key={s.id}>{i + 1}</span>
          ))}
        </div>
        <div className="section-indicator-rule" />
        <div className="section-indicator-col">
          {site.navSections.map((s) => (
            <span key={s.id}>{s.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SectionIndex({
  number,
  title,
  invert,
}: {
  number: string;
  title: string;
  invert?: boolean;
}) {
  return (
    <div className="section-index" data-invert={invert ? "true" : undefined}>
      <span>{number}</span>
      <span className="section-index-line" />
      <span>{title}</span>
    </div>
  );
}
