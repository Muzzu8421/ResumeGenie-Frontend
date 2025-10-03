"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const storedResults = localStorage.getItem('resumeAnalysis');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      router.push('/Dashboard');
    }
  }, [router]);

  if (!results) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="text-white">Loading results...</div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-500/10 border-green-500/20';
    if (score >= 60) return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  const getPriorityColor = (priority) => {
    if (priority === 'high') return 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400';
    if (priority === 'medium') return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400';
    return 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400';
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0d0d0d]' : 'bg-white'} transition-colors duration-200`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-40 ${isDarkMode ? 'bg-[#0d0d0d]/80 border-[#2a2a2a]' : 'bg-white/80 border-gray-200'} backdrop-blur-xl border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/Dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-white/5 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back to Dashboard</span>
            </button>

            <div className="flex items-center gap-2">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {results.fileName}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Resume Analysis Results
          </h1>
          <p className={`text-base sm:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Detailed breakdown of your resume with actionable insights
          </p>
        </motion.div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className={`relative overflow-hidden rounded-2xl border ${getScoreBg(results.overallScore)} p-8`}
          >
            <div className="relative z-10">
              <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Overall Score
              </p>
              <p className={`text-6xl font-bold mb-2 ${getScoreColor(results.overallScore)}`}>
                {results.overallScore}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                out of 100
              </p>
            </div>
            <div className={`absolute top-0 right-0 w-32 h-32 ${getScoreColor(results.overallScore)} opacity-5 rounded-full blur-3xl`}></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`relative overflow-hidden rounded-2xl border ${getScoreBg(results.atsScore)} p-8`}
          >
            <div className="relative z-10">
              <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                ATS Compatibility
              </p>
              <p className={`text-6xl font-bold mb-2 ${getScoreColor(results.atsScore)}`}>
                {results.atsScore}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                out of 100
              </p>
            </div>
            <div className={`absolute top-0 right-0 w-32 h-32 ${getScoreColor(results.atsScore)} opacity-5 rounded-full blur-3xl`}></div>
          </motion.div>
        </div>

        {/* Section Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl border ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'} p-8 mb-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Section Breakdown
          </h2>
          
          <div className="space-y-4">
            {Object.entries(results.sections).map(([section, data], idx) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-semibold capitalize ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {section}
                  </h3>
                  <span className={`text-2xl font-bold ${getScoreColor(data.score)}`}>
                    {data.score}
                  </span>
                </div>
                
                <div className={`w-full h-2 rounded-full overflow-hidden mb-3 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.score}%` }}
                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                    className={`h-full ${
                      data.score >= 80 ? 'bg-green-500' :
                      data.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  />
                </div>

                {data.issues && data.issues.length > 0 && (
                  <div className="mt-3">
                    <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Issues Found:
                    </p>
                    <ul className="space-y-1">
                      {data.issues.map((issue, i) => (
                        <li key={i} className={`text-sm flex items-start gap-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                          <span className="text-red-500 mt-0.5">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`rounded-2xl border ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'} p-8 mb-8`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <span className="text-2xl">💪</span>
            </div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Key Strengths
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.strengths.map((strength, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className={`p-4 rounded-xl border ${isDarkMode ? 'bg-green-500/5 border-green-500/20' : 'bg-green-50 border-green-200'}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-1">✓</span>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {strength}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`rounded-2xl border ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'} p-8 mb-8`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recommendations
            </h2>
          </div>

          <div className="space-y-4">
            {results.recommendations.map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + idx * 0.1 }}
                className={`p-6 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}
              >
                <div className="flex items-start gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(rec.priority)}`}>
                    {rec.priority.toUpperCase()}
                  </span>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {rec.title}
                    </h3>
                    <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Section: {rec.section}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {rec.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className={`rounded-2xl border ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'} p-8`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <span className="text-2xl">🔑</span>
            </div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Keywords Analysis
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className={`font-semibold mb-4 text-green-500`}>
                Present Keywords ({results.keywords.present.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.keywords.present.map((keyword, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'}`}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`font-semibold mb-4 text-red-500`}>
                Missing Keywords ({results.keywords.missing.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.keywords.missing.map((keyword, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'}`}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <button
            onClick={() => router.push('/Dashboard')}
            className="flex-1 px-6 py-4 bg-[#784592] hover:bg-[#6a3f82] text-white font-semibold rounded-xl transition-colors"
          >
            Analyze Another Resume
          </button>
          <button
            onClick={() => window.print()}
            className={`flex-1 px-6 py-4 font-semibold rounded-xl border-2 transition-colors ${
              isDarkMode 
                ? 'border-white/20 text-white hover:bg-white/5' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Download Report
          </button>
        </motion.div>

      </main>
    </div>
  );
}
