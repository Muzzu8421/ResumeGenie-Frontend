"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef, useState, useEffect } from "react";

const cards = [
  {
    title: "Our Mission",
    icon: "🎯",
    subtitle: "Empowering Every Job Seeker",
    description: "We believe everyone deserves a chance to showcase their best self. ResumeGenie was created to level the playing field in job applications by making professional resume optimization accessible to all.",
    highlights: [
      { emoji: "💼", label: "Empowering Candidates", text: "Stand out in competitive markets" },
      { emoji: "⚡", label: "Lightning Fast", text: "Professional results in minutes" },
      { emoji: "🌟", label: "Quality First", text: "AI-powered excellence" },
    ],
  },
  {
    title: "Our Story",
    icon: "📖",
    subtitle: "Built from Experience",
    description: "ResumeGenie was born from a simple observation: talented individuals were missing opportunities because their resumes didn't pass through Applicant Tracking Systems. We built a solution combining cutting-edge AI with recruitment expertise.",
    quote: {
      text: "After struggling with countless job applications, I realized the system was broken. That&apos;s when I decided to create ResumeGenie—a tool that gives everyone access to professional-grade resume optimization.",
      author: "Founder, ResumeGenie Team",
    },
  },
  {
    title: "Why Choose Us",
    icon: "⭐",
    subtitle: "What Makes Us Different",
    description: "Unlike generic resume builders, ResumeGenie uses advanced AI trained on thousands of successful resumes across various industries. We understand what recruiters look for and what ATS systems require.",
    features: [
      { emoji: "🤖", title: "AI-Powered", desc: "Smart algorithms that learn" },
      { emoji: "🎨", title: "ATS-Optimized", desc: "Pass automated systems" },
      { emoji: "⚡", title: "Lightning Fast", desc: "Results under 60 seconds" },
      { emoji: "🔒", title: "100% Private", desc: "Secure and confidential" },
    ],
  },
  {
    title: "Our Impact",
    icon: "📈",
    subtitle: "Making a Real Difference",
    description: "Since our launch, we've helped thousands of job seekers land their dream positions. Our platform continues to grow every day, helping professionals at every career stage achieve success.",
    stats: [
      { value: "50K+", label: "Resumes Analyzed" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Always Available" },
      { value: "100%", label: "Free to Use" },
    ],
  },
];

const StickyCard = ({ i, title, icon, subtitle, description, highlights, quote, features, stats, progress, range, targetScale, isMobile }) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="sticky top-0 flex items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 20 + 50}px)`,
        }}
        className={`rounded-4xl relative -top-1/4 flex origin-top flex-col overflow-hidden bg-gradient-to-br from-white/10 to-white/5 ${
          isMobile ? 'backdrop-blur-md' : 'backdrop-blur-xl'
        } border border-white/20 shadow-2xl w-[90%] sm:w-[85%] md:w-[75%] lg:w-[700px] xl:w-[900px] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] p-6 sm:p-8 md:p-10 lg:p-12`}
      >
        {/* Icon & Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400/20 to-pink-500/20 ${
            isMobile ? 'backdrop-blur-sm' : 'backdrop-blur-md'
          } rounded-2xl flex items-center justify-center text-3xl sm:text-4xl md:text-5xl border border-white/10`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{title}</h3>
            <p className="font-inter text-sm sm:text-base text-purple-200/80">{subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="font-inter text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-6">
          {description}
        </p>

        {/* Highlights */}
        {highlights && (
          <div className="space-y-3 sm:space-y-4">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-xl sm:text-2xl">{item.emoji}</span>
                <div>
                  <p className="font-inter font-semibold text-white text-sm sm:text-base mb-1">{item.label}</p>
                  <p className="font-inter text-xs sm:text-sm text-white/70">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quote */}
        {quote && (
          <div className={`bg-white/5 rounded-2xl p-5 sm:p-6 md:p-8 border border-white/10 ${
            isMobile ? '' : 'backdrop-blur-sm'
          }`}>
            <p className="font-inter text-sm sm:text-base text-white/80 italic mb-4">&quot;{quote.text}&quot;</p>
            <p className="font-inter text-xs sm:text-sm text-white font-semibold">— {quote.author}</p>
          </div>
        )}

        {/* Features */}
        {features && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className={`bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10 ${
                isMobile ? '' : 'hover:bg-white/10'
              } transition-all duration-300`}>
                <div className="text-3xl sm:text-4xl mb-3">{feature.emoji}</div>
                <p className="font-inter font-semibold text-white text-sm sm:text-base mb-1">{feature.title}</p>
                <p className="font-inter text-xs sm:text-sm text-white/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="font-inter text-xs sm:text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

const AboutSection = () => {
  const container = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="about" className="relative w-full">
      {/* Fixed background that doesn't scroll or stretch */}
      <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-[#784592] via-[#4C3178] to-[#21225F] -z-10" />
      
      {/* Simplified background decoration - also fixed */}
      {!isMobile && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
      )}

      <div className="relative z-20 text-center pt-16 sm:pt-20 md:pt-28 pb-4 sm:pb-6 md:pb-8 px-4">
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">About ResumeGenie</h2>
        <p className="font-inter text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
          Transforming job seekers into dream candidates with AI-powered resume optimization
        </p>
      </div>

      <ReactLenis root options={{ lerp: isMobile ? 0.05 : 0.1, duration: 1.2 }}>
        <main ref={container} className="relative flex w-full flex-col items-center justify-center pb-20 sm:pb-24 md:pb-28 lg:pb-32">
          {cards.map((card, i) => {
            const targetScale = Math.max(0.5, 1 - (cards.length - i - 1) * 0.1);
            return (
              <StickyCard
                key={`card_${i}`}
                i={i}
                {...card}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                isMobile={isMobile}
              />
            );
          })}
        </main>
      </ReactLenis>
    </section>
  );
};

export default AboutSection;
