"use client";
import { useState, useEffect, memo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load heavy components
const TextType = dynamic(() => import("./textype"), { ssr: false });
const RotatingText = dynamic(() => import("./rotatingtext"), { ssr: false });
const ElectricBorder = dynamic(() => import("./ElectricBorder"), { ssr: false });

const HeroWithNavbar = memo(function HeroWithNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateZ(0); }
          50% { transform: translateY(-15px) translateZ(0); }
        }
        .animate-gradient-x {
          animation: gradient-x 20s ease infinite;
          background-size: 200% 200%;
          will-change: background-position;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
          will-change: transform;
        }
        @media (max-width: 768px) {
          .animate-float { animation: none; }
          .animate-gradient-x { animation-duration: 30s; }
        }
      `}</style>

      <section className="relative min-h-screen bg-gradient-to-br from-[#784592] via-[#4C3178] to-[#21225F] overflow-hidden">
        {/* Navbar */}
        <nav className={`absolute top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 sm:py-2 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center group cursor-pointer">
              <span className="transform group-hover:scale-110 transition-transform duration-300"><Image className="w-20" src="/favicon.ico" alt="Logo" width={80} height={80} /></span>
              <span className="font-inter text-gray-50 font-semibold text-base sm:text-lg lg:text-xl tracking-tight">ResumeGenie</span>
            </div>

            <div className="font-inter hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8">
              <a href="#home" className="text-gray-50 font-medium hover:text-gray-100 transition-colors text-sm lg:text-base relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-50 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#about" className="text-gray-50 font-medium hover:text-gray-100 transition-colors text-sm lg:text-base relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-50 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#features" className="text-gray-50 font-medium hover:text-gray-100 transition-colors text-sm lg:text-base relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-50 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="text-gray-50 font-medium hover:text-gray-100 transition-colors text-sm lg:text-base relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-50 group-hover:w-full transition-all duration-300"></span>
              </a>
              <Link href="/Dashboard">
                <button className="ml-1 lg:ml-3 bg-gray-50 text-[#784592] px-4 lg:px-6 py-2 lg:py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-sm lg:text-base">
                  Get Started
                </button>
              </Link>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-50 p-2 hover:bg-white/10 rounded-lg transition-all duration-300" aria-label="Toggle menu">
              <div className="relative w-6 h-6">
                <span className={`absolute top-1 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                <span className={`absolute top-1/2 left-0 w-6 h-0.5 bg-current transform -translate-y-1/2 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
                <span className={`absolute bottom-1 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
              </div>
            </button>
          </div>

          <div className={`font-inter md:hidden mt-4 overflow-hidden transition-all duration-500 ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="pb-4 space-y-3 bg-[#784592]/90 backdrop-blur-md rounded-2xl p-4 shadow-xl">
              <a href="#home" className="block text-gray-50 font-medium hover:text-gray-100 py-2 hover:pl-2 transition-all duration-300">Home</a>
              <a href="#about" className="block text-gray-50 font-medium hover:text-gray-100 py-2 hover:pl-2 transition-all duration-300">About</a>
              <a href="#features" className="block text-gray-50 font-medium hover:text-gray-100 py-2 hover:pl-2 transition-all duration-300">Features</a>
              <a href="#contact" className="block text-gray-50 font-medium hover:text-gray-100 py-2 hover:pl-2 transition-all duration-300">Contact</a>
              <Link href="/Dashboard">
                <button className="w-full bg-gray-50 text-[#784592] px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 mt-2">Get Started</button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10">
          {!isMobile && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-36 h-36 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-80 lg:h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
            </div>
          )}

          <div className={`max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-12 xl:gap-16 items-center min-h-screen transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>

            {/* Text Content */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 xl:space-y-7 text-center lg:text-left order-2 lg:order-1">
              <h1 className="flex flex-wrap gap-2 items-center justify-center lg:justify-start font-playfair text-gray-50 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-[3.4rem] 2xl:text-6xl leading-[1.15] tracking-tight">
                Boost Your
                <RotatingText
                  texts={["Career", "Resume", "Potential", "Success", "Profile", "Future", "Growth", "Journey!"]}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-[#ffffff59] text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </h1>
              <p className="font-inter text-gray-100/95 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed font-normal max-w-xl mx-auto lg:mx-0 px-2 sm:px-0">
                <TextType
                  text={["Revolutionize your job search experience. Our AI-driven platform analyzes, optimizes, and boosts your resume to open doors to your dream job."]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-3 px-2 sm:px-0">
                <Link href="/Dashboard">
                  <button className="font-inter bg-gray-50 text-[#784592] font-semibold px-5 sm:px-7 lg:px-9 xl:px-12 py-2.5 sm:py-3 lg:py-3.5 xl:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base lg:text-lg group">
                    Analyze Your Resume
                    <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </Link>
                <ElectricBorder color="#7df9ff" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: "9999px" }} className="font-inter">
                  <button className="font-inter bg-transparent text-white font-semibold px-5 sm:px-7 lg:px-9 xl:px-12 py-2.5 sm:py-3 lg:py-3.5 xl:py-4 rounded-full transition-all duration-300 hover:scale-105 text-sm sm:text-base lg:text-lg w-full hover:bg-white/5">Watch Demo</button>
                </ElectricBorder>
              </div>
            </div>

            {/* Image */}
            <div className="flex items-center justify-center relative order-1 lg:order-2 py-8 sm:py-10 lg:py-0">
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 ${!isMobile ? 'animate-gradient-x' : ''} opacity-60 blur-3xl`}></div>
              {!isMobile && <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400 via-purple-600 to-pink-500 animate-gradient-x opacity-40 blur-2xl" style={{ animationDelay: "2s", animationDuration: "25s" }}></div>}
              <div className={`relative w-[260px] h-[360px] xs:w-[280px] xs:h-[390px] sm:w-[310px] sm:h-[435px] md:w-[350px] md:h-[490px] lg:w-[320px] lg:h-[450px] xl:w-[370px] xl:h-[520px] 2xl:w-[400px] 2xl:h-[560px] ${!isMobile ? 'animate-float' : ''}`}>
                <Image src="/Right.png" alt="Document illustration" fill className="object-contain relative z-10" priority quality={isMobile ? 75 : 90} loading="eager" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default HeroWithNavbar;
