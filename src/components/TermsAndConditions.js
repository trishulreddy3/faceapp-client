import React, { useState, useEffect } from 'react';
import { Shield, Eye, Database, Lock, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Added this

function TermsAndConditions() {
  const navigate = useNavigate(); // ✅ Added this
  const [accepted, setAccepted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('privacy');

  const sections = [
    {
      id: 'privacy',
      icon: Shield,
      title: 'Privacy Protection',
      content: 'Your photos are processed locally on your device. We never upload, store, or access your personal images on our servers. All face recognition happens entirely on your computer.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'data',
      icon: Database,
      title: 'Data Processing',
      content: 'Face clustering creates mathematical representations (embeddings) of faces for grouping. These are stored locally and can be deleted at any time. No biometric data leaves your device.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'security',
      icon: Lock,
      title: 'Security Measures',
      content: 'All processing uses industry-standard encryption. Face data is automatically encrypted and can only be accessed by you through the application interface.',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'transparency',
      icon: Eye,
      title: 'Full Transparency',
      content: 'You have complete control over your data. View, export, or delete any processed information at any time. No hidden data collection or third-party sharing.',
      color: 'from-orange-500 to-red-600'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
      navigate('/dashboard'); // ✅ Now works correctly
    }, 500);
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900 relative">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className={`relative z-10 container mx-auto px-6 py-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-white/90 text-sm font-medium">Privacy-First Design</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Terms & 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Privacy
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            We believe in complete transparency about how Face Cluster works and protects your privacy. 
            Your photos never leave your device.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-6">Key Points</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left ${
                        isActive 
                          ? 'bg-white/20 text-white border border-white/30' 
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <div
                  key={section.id}
                  className={`bg-white/5 backdrop-blur-lg rounded-2xl p-8 border transition-all duration-500 ${
                    isActive 
                      ? 'border-white/30 shadow-2xl scale-[1.02]' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color} flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                      <p className="text-white/80 text-lg leading-relaxed mb-6">{section.content}</p>
                      
                      {/* Additional details based on section */}
                      {section.id === 'privacy' && (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-green-400 font-semibold mb-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>100% Local Processing</span>
                          </div>
                          <p className="text-white/70">No internet connection required for face clustering.</p>
                        </div>
                      )}
                      
                      {section.id === 'data' && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-blue-400">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-white/80">Mathematical face representations only</span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-400">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-white/80">Delete clusters anytime</span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-400">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-white/80">Export your organized photos</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Agreement Section */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Your Consent</h3>
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    By proceeding, you acknowledge that you understand how Face Cluster processes your photos 
                    and agree to use the application responsibly. You confirm that you have the right to process 
                    the photos you upload.
                  </p>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                    />
                    <label htmlFor="agree" className="text-white font-medium cursor-pointer">
                      I agree to the terms and understand how my data is processed
                    </label>
                  </div>
                  
                  <button
                    onClick={handleAccept}
                    disabled={!accepted}
                    className={`group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform ${
                      accepted
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-2xl'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {accepted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Continue to Dashboard
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Please accept terms to continue
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
    }
export default TermsAndConditions;
