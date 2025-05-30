import React, { useState, useEffect } from 'react';
import { Camera, Users, Zap, Shield, ChevronRight, Play, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: Camera,
      title: "Smart Photo Upload",
      description: "Upload thousands of photos at once with drag & drop support"
    },
    {
      icon: Users,
      title: "Face Recognition",
      description: "Advanced AI automatically detects and groups faces"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process large photo collections in minutes, not hours"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "All processing happens locally - your photos stay private"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    navigate('/terms');
  };

  const handleDemo = () => {
    console.log('Demo clicked');
  };





  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className={`relative z-10 container mx-auto px-6 py-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90 text-sm font-medium">Powered by Advanced AI</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Smart photo 
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Organizer
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Organize your photo collection effortlessly with AI-powered face recognition. 
            Group photos by people automatically and find memories faster than ever.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={handleContinue}
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2 min-w-[200px]"
            >
              Get Started
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={handleDemo}
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center gap-2 min-w-[200px]"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Features Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Feature Cards */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = currentFeature === index;
                
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl transition-all duration-500 cursor-pointer transform ${
                      isActive 
                        ? 'bg-white/20 backdrop-blur-lg border border-white/30 scale-105 shadow-2xl' 
                        : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => setCurrentFeature(index)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl transition-all duration-300 ${
                        isActive ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/10'
                      }`}>
                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white/70'}`} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-white/80'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className={`transition-colors duration-300 ${
                          isActive ? 'text-white/90' : 'text-white/60'
                        }`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visual Demo Area */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      {React.createElement(features[currentFeature].icon, { 
                        className: "w-12 h-12 text-white animate-pulse" 
                      })}
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-3">
                    {features[currentFeature].title}
                  </h4>
                  
                  <p className="text-white/80 text-lg leading-relaxed">
                    {features[currentFeature].description}
                  </p>
                </div>
              </div>

              {/* Progress indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentFeature === index 
                        ? 'bg-white scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { number: "99.9%", label: "Accuracy Rate" },
            { number: "10k+", label: "Photos Processed" },
            { number: "<5min", label: "Average Processing Time" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Welcome;