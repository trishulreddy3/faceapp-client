import React, { useState, useEffect } from 'react';
import { Brain, Heart, Target, Users, Zap, Shield, Award, Code, Camera, Sparkles, ArrowRight, Github, Mail, Twitter, Star, Play, ChevronDown, ChevronRight, Clock, TrendingUp, Globe, Lightbulb, Coffee, Rocket } from 'lucide-react';

function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState(0);
  const [currentStat, setCurrentStat] = useState(0);
  const [activeTeamMember, setActiveTeamMember] = useState(0);
  const [expandedTimeline, setExpandedTimeline] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const values = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your memories belong to you. We built Face Cluster with privacy at its core - all processing happens locally on your device.",
      color: "from-green-500 to-emerald-600",
      features: ["Local Processing", "Zero Data Collection", "Open Source"]
    },
    {
      icon: Brain,
      title: "Smart Technology",
      description: "Cutting-edge AI that understands faces without compromising your privacy. Advanced algorithms that work entirely offline.",
      color: "from-blue-500 to-cyan-600",
      features: ["Neural Networks", "Edge Computing", "Real-time Processing"]
    },
    {
      icon: Heart,
      title: "Human-Centered",
      description: "Technology should serve people, not the other way around. We design for real humans with real photo collections.",
      color: "from-pink-500 to-rose-600",
      features: ["Intuitive Design", "Accessibility", "User Research"]
    },
    {
      icon: Zap,
      title: "Effortless Experience",
      description: "Complex technology, simple interface. Organizing thousands of photos should feel magical, not overwhelming.",
      color: "from-purple-500 to-violet-600",
      features: ["One-Click Setup", "Drag & Drop", "Smart Suggestions"]
    }
  ];

  const stats = [
    { number: "99.9%", label: "Face Recognition Accuracy", sublabel: "Industry-leading precision", icon: Target },
    { number: "10,000+", label: "Photos Processed Daily", sublabel: "By users worldwide", icon: Camera },
    { number: "100%", label: "Local Processing", sublabel: "Zero cloud dependency", icon: Shield },
    { number: "50ms", label: "Average Processing Time", sublabel: "Per photo analysis", icon: Zap },
    { number: "24/7", label: "Privacy Protection", sublabel: "Always offline", icon: Heart },
    { number: "∞", label: "Photo Capacity", sublabel: "No storage limits", icon: Globe }
  ];

  const teamMembers = [
    {
      name: "Trishul Reddy",
      role: "AI Research Lead",
      avatar: "🧠",
      background: "from-blue-400 to-purple-600",
      bio: "Former Google AI researcher with 8+ years in computer vision. Passionate about privacy-preserving ML.",
      skills: ["Machine Learning", "Computer Vision", "Privacy Tech"]
    },
    {
      name: "Sarika ",
      role: "Product Designer",
      avatar: "🎨",
      background: "from-pink-400 to-red-600",
      bio: "Award-winning UX designer who believes beautiful interfaces should also be accessible to everyone.",
      skills: ["UX Design", "Accessibility", "User Research"]
    },
    {
      name: "Harsha Reddy",
      role: "Full-Stack Engineer",
      avatar: "⚡",
      background: "from-green-400 to-blue-600",
      bio: "Performance optimization expert who makes complex systems feel instant and effortless.",
      skills: ["React", "Node.js", "Performance"]
    },
    {
      name: "Pooja sri",
      role: "Privacy Advocate",
      avatar: "🔒",
      background: "from-purple-400 to-pink-600",
      bio: "Privacy researcher and former EFF fellow ensuring user rights are built into every feature.",
      skills: ["Privacy Law", "Security", "Ethics"]
    }
  ];

  const timeline = [
    {
      year: "2024",
      title: "The Vision",
      description: "Started with a simple frustration: why should organizing photos require giving up privacy?",
      icon: Lightbulb,
      details: ["Initial concept development", "Privacy-first architecture design", "Team formation"]
    },
    {
      year: "2024 Q2",
      title: "First Prototype",
      description: "Built the first working version with local face recognition capabilities.",
      icon: Code,
      details: ["Core AI engine development", "Local processing framework", "Initial UI prototypes"]
    },
    {
      year: "2024 Q3",
      title: "Beta Launch",
      description: "Released to a small group of privacy-conscious photographers and families.",
      icon: Rocket,
      details: ["Closed beta program", "User feedback integration", "Performance optimizations"]
    },
    {
      year: "2024 Q4",
      title: "Public Release",
      description: "Launched Face Cluster to the world with 99.9% accuracy and complete privacy.",
      icon: Globe,
      details: ["Public release", "Community building", "Open source components"]
    },
    {
      year: "2025",
      title: "The Future",
      description: "Expanding capabilities while keeping privacy and simplicity at the core.",
      icon: Star,
      details: ["Advanced clustering algorithms", "Multi-device sync", "Plugin ecosystem"]
    }
  ];

  const testimonials = [
    {
      name: "Jennifer M.",
      role: "Family Photographer",
      content: "Finally, a photo organizer that doesn't require uploading my family's memories to the cloud. The face recognition is incredibly accurate!",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "David L.",
      role: "Privacy Researcher",
      content: "As someone who studies privacy tech, I'm impressed by Face Cluster's local-first approach. This is how all AI should work.",
      rating: 5,
      avatar: "🔬"
    },
    {
      name: "Maria S.",
      role: "Event Organizer",
      content: "Organizing thousands of event photos used to take hours. Now it happens in minutes, and I don't worry about data breaches.",
      rating: 5,
      avatar: "🎉"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    const statInterval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);

    const valueInterval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length);
    }, 4000);

    const teamInterval = setInterval(() => {
      setActiveTeamMember((prev) => (prev + 1) % teamMembers.length);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(statInterval);
      clearInterval(valueInterval);
      clearInterval(teamInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{
            left: `${20 + Math.sin(scrollY * 0.001) * 10}%`,
            top: `${10 + Math.cos(scrollY * 0.001) * 5}%`
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"
          style={{
            right: `${15 + Math.cos(scrollY * 0.001) * 8}%`,
            top: `${30 + Math.sin(scrollY * 0.001) * 6}%`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-2000"
          style={{
            left: `${40 + Math.sin(scrollY * 0.0015) * 12}%`,
            bottom: `${20 + Math.cos(scrollY * 0.0015) * 8}%`
          }}
        />
      </div>

      {/* Mouse follower */}
      <div 
        className="fixed w-6 h-6 bg-white/20 rounded-full pointer-events-none z-50 transition-all duration-300 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isVisible ? 1 : 0})`
        }}
      />

      <div className={`relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-white/90 font-medium">Built by Privacy Advocates</span>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-8 leading-tight">
              About
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Face Cluster
              </span>
            </h1>
            
            <p className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12">
              We're reimagining photo organization with AI that respects your privacy. 
              No cloud uploads, no data mining, just intelligent local processing that keeps your memories yours.
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3">
                <Play className="w-5 h-5" />
                Watch Our Story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center gap-3">
                <Github className="w-5 h-5" />
                Open Source
              </button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                To democratize advanced AI technology while keeping user privacy sacred
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Privacy by Design</h3>
                <p className="text-white/70">Every feature built with privacy as the foundation, not an afterthought</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Accessible AI</h3>
                <p className="text-white/70">Making cutting-edge technology simple and approachable for everyone</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Human-Centered</h3>
                <p className="text-white/70">Technology that enhances human connections, not replaces them</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Stats Grid */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">By the Numbers</h2>
            <p className="text-xl text-white/80">Real impact, real results</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isActive = currentStat === index;
              
              return (
                <div
                  key={index}
                  className={`p-8 rounded-2xl transition-all duration-500 cursor-pointer transform ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg border-2 border-white/30 scale-105 shadow-2xl' 
                      : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-102'
                  }`}
                  onClick={() => setCurrentStat(index)}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-4 ${isActive ? 'text-white' : 'text-white/60'}`} />
                  <div className={`text-4xl font-bold mb-2 ${isActive ? 'text-white' : 'text-white/80'}`}>
                    {stat.number}
                  </div>
                  <div className={`font-semibold mb-1 ${isActive ? 'text-white' : 'text-white/70'}`}>
                    {stat.label}
                  </div>
                  <div className={`text-sm ${isActive ? 'text-white/80' : 'text-white/50'}`}>
                    {stat.sublabel}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Core Values Interactive Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-xl text-white/80">Principles that guide every decision we make</p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  const isActive = activeValue === index;
                  
                  return (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl transition-all duration-500 cursor-pointer transform ${
                        isActive 
                          ? 'bg-white/20 backdrop-blur-lg border border-white/30 scale-105 shadow-2xl' 
                          : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10'
                      }`}
                      onClick={() => setActiveValue(index)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl transition-all duration-300 bg-gradient-to-r ${value.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-white/80'
                          }`}>
                            {value.title}
                          </h3>
                          <p className={`transition-colors duration-300 mb-3 ${
                            isActive ? 'text-white/90' : 'text-white/60'
                          }`}>
                            {value.description}
                          </p>
                          {isActive && (
                            <div className="flex flex-wrap gap-2">
                              {value.features.map((feature, featureIndex) => (
                                <span
                                  key={featureIndex}
                                  className="px-3 py-1 bg-white/20 rounded-full text-sm text-white/90"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Visual */}
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
                  <div className="text-center">
                    <div className={`w-40 h-40 mx-auto mb-8 rounded-3xl bg-gradient-to-r ${values[activeValue].color} flex items-center justify-center transition-all duration-500 transform hover:scale-110 hover:rotate-3`}>
                      <div className="w-32 h-32 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        {React.createElement(values[activeValue].icon, { 
                          className: "w-16 h-16 text-white animate-pulse" 
                        })}
                      </div>
                    </div>
                    
                    <h4 className="text-3xl font-bold text-white mb-4">
                      {values[activeValue].title}
                    </h4>
                    
                    <p className="text-white/80 text-lg leading-relaxed mb-6">
                      {values[activeValue].description}
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {values[activeValue].features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-white/20 rounded-full text-white/90 font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Meet the Team</h2>
            <p className="text-xl text-white/80">Privacy advocates, AI researchers, and design thinkers</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => {
                const isActive = activeTeamMember === index;
                
                return (
                  <div
                    key={index}
                    className={`group cursor-pointer transition-all duration-500 transform ${
                      isActive ? 'scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => setActiveTeamMember(index)}
                  >
                    <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${
                      isActive ? 'border-white/30 shadow-2xl' : 'border-white/10 hover:border-white/20'
                    }`}>
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${member.background} flex items-center justify-center text-3xl transition-all duration-300 ${
                        isActive ? 'animate-bounce' : ''
                      }`}>
                        {member.avatar}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white text-center mb-2">{member.name}</h3>
                      <p className="text-blue-400 text-center font-medium mb-4">{member.role}</p>
                      
                      {isActive && (
                        <div className="space-y-4 animate-fadeIn">
                          <p className="text-white/80 text-sm leading-relaxed">{member.bio}</p>
                          <div className="flex flex-wrap gap-2">
                            {member.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-white/20 rounded-full text-xs text-white/90"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Our Journey</h2>
            <p className="text-xl text-white/80">From idea to privacy-first photo organization</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
              
              <div className="space-y-8">
                {timeline.map((item, index) => {
                  const Icon = item.icon;
                  const isExpanded = expandedTimeline === index;
                  
                  return (
                    <div
                      key={index}
                      className="relative flex items-start gap-6 cursor-pointer"
                      onClick={() => setExpandedTimeline(isExpanded ? -1 : index)}
                    >
                      {/* Timeline dot */}
                      <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center transition-all duration-300 ${
                        isExpanded ? 'scale-110 shadow-2xl' : 'hover:scale-105'
                      }`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className={`flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${
                        isExpanded ? 'border-white/30 shadow-2xl' : 'border-white/10 hover:border-white/20'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-blue-400 font-bold text-lg">{item.year}</div>
                            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                          </div>
                          <ChevronDown className={`w-6 h-6 text-white/60 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`} />
                        </div>
                        
                        <p className="text-white/80 mb-4">{item.description}</p>
                        
                        {isExpanded && (
                          <div className="space-y-2 animate-fadeIn">
                            {item.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center gap-2 text-white/70">
                                <ChevronRight className="w-4 h-4 text-blue-400" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">What People Say</h2>
            <p className="text-xl text-white/80">Real feedback from real users</p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-blue-400">{testimonial.role}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-12 border border-white/20 text-center">
            <h2 className="text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of users who've taken control of their photo organization while keeping their privacy intact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3">
                <Camera className="w-5 h-5" />
                Try Face Cluster Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <div className="flex gap-4">
                <button className="p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40">
                  <Github className="w-6 h-6 text-white" />
                </button>
                <button className="p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40">
                  <Twitter className="w-6 h-6 text-white" />
                </button>
                <button className="p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40">
                  <Mail className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="mt-8 text-white/60">
              <p className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                100% Private • No Cloud Storage • Open Source
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/10">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-xl">Face Cluster</span>
            </div>
            
            <p className="text-white/60 mb-6">
              Privacy-first photo organization powered by local AI
            </p>
            
            <div className="flex justify-center gap-6 mb-8">
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">Documentation</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">Support</a>
            </div>
            
            <div className="flex justify-center gap-4">
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 border border-white/10 hover:border-white/20">
                <Github className="w-5 h-5 text-white/60 hover:text-white transition-colors duration-300" />
              </button>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 border border-white/10 hover:border-white/20">
                <Twitter className="w-5 h-5 text-white/60 hover:text-white transition-colors duration-300" />
              </button>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 border border-white/10 hover:border-white/20">
                <Mail className="w-5 h-5 text-white/60 hover:text-white transition-colors duration-300" />
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm">
                © 2025 Face Cluster. Made with ❤️ for privacy advocates.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AboutUs;
                