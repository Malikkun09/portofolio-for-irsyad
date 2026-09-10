"use client";

import "lenis/dist/lenis.css";
import { SiteProvider } from "@/lib/site-context";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Loader } from "@/components/loader";
import { Header } from "@/components/header";
import { Menu } from "@/components/menu";
import { ScrollProgress } from "@/components/scroll-progress";
import { LightBackground } from "@/components/light-background";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SiteProvider>
      <Loader />
      <Header />
      <Menu />
      <ScrollProgress />
      <SmoothScroll />
      <div className="site-shell">
        <LightBackground />
        <div className="page-flow">{children}</div>
      </div>
    </SiteProvider>
  );
}
