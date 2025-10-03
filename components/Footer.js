"use client";

import { motion } from "framer-motion";
import { memo } from "react";

const Footer = memo(function Footer() {
  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-30px" },
    transition: { duration: 0.4 }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#21225F] via-[#1a1b4b] to-[#0f0f2e] text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="py-12 sm:py-14 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">

          {/* Brand */}
          <motion.div {...fadeInUp} className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center">
              <span className="w-18"><img src="favicon.ico" alt="Logo" /></span>
              <span className="font-inter text-lg font-bold">ResumeGenie</span>
            </div>
            <p className="font-inter text-sm text-gray-300 leading-relaxed max-w-xs">
              AI-powered resume optimization for your dream job.
            </p>
            <div className="flex gap-3 pt-2">
              {["𝕏", "in", "IG", "YT"].map((icon, idx) => (
                <a key={idx} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <span className="text-base">{icon}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Product */}
          <motion.div {...fadeInUp} transition={{ delay: 0.05 }}>
            <h4 className="font-inter font-semibold text-base mb-4">Product</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "Success Stories", "FAQs"].map((item, idx) => (
                <li key={idx}><a href="#" className="font-inter text-sm text-gray-300 hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <h4 className="font-inter font-semibold text-base mb-4">Company</h4>
            <ul className="space-y-2">
              {[{ name: "About Us", link: "#about" }, { name: "Blog", link: "#" }, { name: "Careers", link: "#" }, { name: "Contact", link: "#contact" }].map((item, idx) => (
                <li key={idx}><a href={item.link} className="font-inter text-sm text-gray-300 hover:text-white transition-colors">{item.name}</a></li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div {...fadeInUp} transition={{ delay: 0.15 }}>
            <h4 className="font-inter font-semibold text-base mb-4">Support</h4>
            <ul className="space-y-2">
              {["Help Center", "Privacy Policy", "Terms of Service", "Security"].map((item, idx) => (
                <li key={idx}><a href="#" className="font-inter text-sm text-gray-300 hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-400">
          <p className="font-inter">© 2025 ResumeGenie. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="font-inter hover:text-white transition-colors">Privacy</a>
            <a href="#" className="font-inter hover:text-white transition-colors">Terms</a>
            <a href="#" className="font-inter hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
