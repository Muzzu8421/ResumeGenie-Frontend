"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import ReactLenis from "lenis/react";

// Dynamically import heavy components with loading states
const HeroWithNavbar = dynamic(() => import("@/components/HeroWithNavbar"), {
  ssr: true, // Keep SSR for hero (above the fold)
});

const ProblemSolutionSection = dynamic(() => import("@/components/Problem"), {
  ssr: false, // Lazy load below-the-fold content
  loading: () => <div className="h-screen bg-white" />, // Placeholder to prevent layout shift
});

const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  ssr: false, // Lazy load About section
  loading: () => <div className="h-screen bg-gradient-to-br from-[#784592] via-[#4C3178] to-[#21225F]" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false, // Lazy load footer
  loading: () => <div className="h-64 bg-[#0f0f2e]" />,
});

export default function Home() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false, // Disable smooth scroll on touch for better mobile performance
      }}
    >
      <main className="relative">
        {/* Hero loads immediately with SSR */}
        <HeroWithNavbar />

        {/* Below-the-fold sections lazy load */}
        <Suspense fallback={<div className="h-screen bg-white" />}>
          <ProblemSolutionSection />
        </Suspense>

        <Suspense fallback={<div className="h-screen bg-gradient-to-br from-[#784592] via-[#4C3178] to-[#21225F]" />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<div className="h-64 bg-[#0f0f2e]" />}>
          <Footer />
        </Suspense>
      </main>
    </ReactLenis>
  );
}
