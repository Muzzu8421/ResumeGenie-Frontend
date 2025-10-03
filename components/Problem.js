"use client";

import { motion } from "framer-motion";
import { memo } from "react";

const ProblemSolutionSection = memo(function ProblemSolutionSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            The ResumeGenie Difference
          </h2>
          <p className="font-inter text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            See how our AI-powered platform transforms the resume creation experience
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          
          {/* Problem */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-8 sm:p-10 md:p-12 border border-gray-100"
          >
            <div className="text-5xl mb-6">😞</div>
            <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Old Way</h3>
            <p className="font-inter text-base sm:text-lg text-gray-600 mb-8">Struggling with traditional resume building</p>
            
            <ul className="space-y-5">
              {[
                { title: "Hours of Manual Work", desc: "Endless formatting and guessing what employers want" },
                { title: "ATS Black Hole", desc: "90% of resumes never reach human eyes due to ATS filters" },
                { title: "Generic Templates", desc: "Cookie-cutter designs that don't showcase your uniqueness" },
                { title: "No Feedback Loop", desc: "Apply blindly without knowing what's working or not" },
                { title: "Missed Opportunities", desc: "Lose out on dream jobs due to poor resume quality" }
              ].map((item, idx) => (
                <li key={idx} className="font-inter text-base text-gray-700 flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center mt-1">
                    <span className="text-red-500 text-lg">✗</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Solution */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.12)] p-8 sm:p-10 md:p-12 border-2 border-[#784592]/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-50/50 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="text-5xl mb-6">✨</div>
              <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">The ResumeGenie Way</h3>
              <p className="font-inter text-base sm:text-lg text-gray-600 mb-8">AI-powered resume optimization made simple</p>
              
              <ul className="space-y-5">
                {[
                  { title: "60-Second Optimization", desc: "AI analyzes and improves your resume instantly" },
                  { title: "ATS-Optimized Format", desc: "Guaranteed to pass automated screening systems" },
                  { title: "Industry-Specific Insights", desc: "Tailored recommendations based on your field" },
                  { title: "Real-Time Scoring", desc: "Watch your resume improve with instant feedback" },
                  { title: "95% Success Rate", desc: "Join thousands who landed their dream jobs" }
                ].map((item, idx) => (
                  <li key={idx} className="font-inter text-base text-gray-700 flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-lg">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div {...fadeInUp} className="bg-white rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.08)] p-10 sm:p-12 md:p-14 text-center border border-gray-100">
          <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Resume?</h3>
          <p className="font-inter text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join over 50,000 successful job seekers who've used ResumeGenie to land their dream positions
          </p>
          <button className="font-inter bg-[#784592] text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-full font-semibold hover:bg-[#5d3472] transition-all duration-300 hover:scale-105 shadow-lg">
            Get Started Free →
          </button>
          <p className="font-inter text-xs sm:text-sm text-gray-500 mt-4">No credit card required • Takes less than 60 seconds</p>
        </motion.div>

      </div>
    </section>
  );
});

export default ProblemSolutionSection;
