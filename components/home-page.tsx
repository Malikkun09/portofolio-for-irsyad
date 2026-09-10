"use client";

import { Hero } from "@/components/hero";
import { About, WhatIDo } from "@/components/about";
import { FeaturedWork } from "@/components/featured-work";
import { Practice } from "@/components/practice";
import { Collaborations } from "@/components/collaborations";
import { Awards, Press } from "@/components/awards";
import { Footer } from "@/components/footer";
import { SectionIndicator } from "@/components/section-chrome";

export function HomePage() {
  return (
    <main>
      <Hero />
      <div style={{ position: "relative" }}>
        <SectionIndicator />
        <About />
        <WhatIDo />
        <FeaturedWork />
        <Practice />
        <Collaborations />
        <Awards />
        <Press />
        <Footer />
      </div>
    </main>
  );
}
