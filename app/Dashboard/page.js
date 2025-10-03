"use client";

import { motion, AnimatePresence } from "framer-motion";
import { memo, useState, useEffect, useCallback } from "react";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Dashboard = memo(function Dashboard() {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Wrap validateFile in useCallback to fix dependency issues
  const validateFile = useCallback((file) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast.error('❌ Invalid file type! Please upload PDF, DOC, or DOCX files only.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDarkMode ? "dark" : "light",
        transition: Bounce,
      });
      return false;
    }

    if (file.size > maxSize) {
      toast.error('⚠️ File too large! Maximum file size is 10MB.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDarkMode ? "dark" : "light",
        transition: Bounce,
      });
      return false;
    }

    // Success toast
    toast.success('✅ File uploaded successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: isDarkMode ? "dark" : "light",
      transition: Bounce,
    });

    return true;
  }, [isDarkMode]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x <= rect.left || x >= rect.right || y <= rect.top || y >= rect.bottom) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        setUploadedFile(file);
      }
    }
  }, [validateFile]); // Added validateFile to dependencies

  const handleFileInput = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        setUploadedFile(file);
      }
    }
  }, [validateFile]); // Added validateFile to dependencies

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('resume', uploadedFile);

      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('resumeAnalysis', JSON.stringify(data.data));
        toast.success('🎉 Resume analyzed successfully!');
        router.push('/results');
      } else {
        toast.error(`❌ ${data.error}`);
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('❌ Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    toast.info('🗑️ File removed', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: isDarkMode ? "dark" : "light",
      transition: Bounce,
    });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0d0d0d]' : 'bg-white'} transition-colors duration-200`}>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
        transition={Bounce}
      />

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || !isMobile) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed left-0 top-0 h-screen w-64 ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-gray-50 border-gray-200'} border-r z-50 flex flex-col`}
          >
            {/* Logo */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-inherit">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
                </div>
                <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>ResumeGenie</span>
              </div>
              {isMobile && (
                <button onClick={() => setSidebarOpen(false)} className={`p-1 rounded ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-200'}`}>
                  <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1">
              <NavItem icon={<HomeIcon />} label="Dashboard" active isDarkMode={isDarkMode} />
              <div className={`my-4 border-t ${isDarkMode ? 'border-[#2a2a2a]' : 'border-gray-200'}`} />
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
                <span>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
              </button>
            </nav>

            {/* User */}
            <div className={`p-3 border-t ${isDarkMode ? 'border-[#2a2a2a]' : 'border-gray-200'}`}>
              <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-200'} transition-colors cursor-pointer`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-semibold">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>John Doe</p>
                  <p className={`text-xs truncate ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>john@example.com</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`${!isMobile && sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>

        {/* Header */}
        <header className={`sticky top-0 z-40 ${isDarkMode ? 'bg-[#0d0d0d]/80 border-[#2a2a2a]' : 'bg-white/80 border-gray-200'} backdrop-blur-xl border-b`}>
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
            <div className="flex items-center gap-4">
              {isMobile && (
                <button onClick={() => setSidebarOpen(true)} className={`p-1.5 rounded-lg ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
                  <MenuIcon isDarkMode={isDarkMode} />
                </button>
              )}
              <div>
                <h1 className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Resume Analyzer
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className={`hidden cursor-pointer sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${isDarkMode
                ? 'border-[#2a2a2a] text-gray-400 hover:bg-white/5'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}>
                <span>⌘K</span>
                <span>Command menu</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl mx-auto">

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`rounded-xl border ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'
              }`}
          >
            <div className="p-6 sm:p-8">

              {!uploadedFile ? (
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-12 sm:p-16 lg:p-20 text-center transition-all ${isDragging
                    ? isDarkMode ? 'border-purple-500 bg-purple-500/5 scale-[1.01]' : 'border-purple-500 bg-purple-50 scale-[1.01]'
                    : isDarkMode ? 'border-[#2a2a2a] hover:border-[#3a3a3a]' : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                  <div className="flex flex-col items-center pointer-events-none">
                    <motion.div
                      animate={{
                        y: isDragging ? -8 : 0,
                        scale: isDragging ? 1.1 : 1
                      }}
                      transition={{ duration: 0.2 }}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 ${isDragging
                        ? 'bg-purple-500/20'
                        : isDarkMode ? 'bg-white/5' : 'bg-gray-100'
                        }`}
                    >
                      <svg className={`w-8 h-8 sm:w-10 sm:h-10 ${isDragging
                        ? 'text-purple-500'
                        : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </motion.div>

                    <h3 className={`text-xl sm:text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {isDragging ? 'Drop your file here' : 'Upload your resume'}
                    </h3>
                    <p className={`text-sm sm:text-base mb-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                      Drag and drop or click to browse • PDF, DOC, DOCX • Max 10MB
                    </p>
                  </div>

                  <label htmlFor="file-input" className="cursor-pointer pointer-events-auto">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#784592] hover:bg-[#6a3f82] text-white text-sm font-medium rounded-lg transition-colors">
                      <span>Choose file</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {/* File Info */}
                  <div className={`flex items-center gap-4 p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {uploadedFile.name}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        {(uploadedFile.size / 1024).toFixed(1)} KB • {uploadedFile.type.split('/')[1].toUpperCase()}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      disabled={isAnalyzing}
                      className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#784592] hover:bg-[#6a3f82] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <span>Analyze resume</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: '⚡', title: 'Instant Analysis', desc: '60-second AI feedback' },
              { icon: '🎯', title: 'ATS Optimized', desc: 'Pass screening systems' },
              { icon: '🔒', title: 'Secure & Private', desc: 'Your data is protected' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={`p-4 sm:p-5 rounded-xl border ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'
                  }`}
              >
                <div className="text-2xl sm:text-3xl mb-3">{feature.icon}</div>
                <h4 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h4>
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
});

// Icon Components
const NavItem = ({ icon, label, active, isDarkMode }) => (
  <button className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active
    ? 'bg-[#784592] text-white'
    : isDarkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-200'
    }`}>
    {icon}
    <span>{label}</span>
  </button>
);

const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const MenuIcon = ({ isDarkMode }) => (
  <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default Dashboard;
