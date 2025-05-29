"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, keyframes } from "framer-motion";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Phone, MapPin, Send,  MessageSquare } from 'lucide-react';

import {
  Upload,
  User,
  Settings,
  Brain,
  LogOut,
  Download,
  FileImage,
  Loader2,
  AlertCircle,
  Mail,
  Calendar,
  Shield,
  X,
  Plus,
  Zap,
  Activity,
  TrendingUp,
  Users,
  Home,
  AlignHorizontalDistributeCenter,
} from "lucide-react";

// Profile component (keep from original)
import Profile from "../components/profile";

const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const fileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export default function Dashboard() {
  const [clusters, setClusters] = useState({});
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("upload");
  const [downloaded, setDownloaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        setIsLoading(false);
      } else {
        window.location.href = "/login";
      }
    });
    return unsub;
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('image/')
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) {
      alert("No files selected. Please select images to process.");
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    for (let f of files) formData.append("images", f);

    try {
      await fetch(`http://localhost:5000/process?user=${user.uid}`, {
        method: "POST",
        body: formData,
      });

      const clusterRes = await fetch(`http://localhost:5000/clusters?user=${user.uid}`);
      const clusterData = await clusterRes.json();
      setClusters(clusterData);
      setTab("results");

      alert("Processing complete. Images clustered successfully.");
    } catch (err) {
      console.error(err);
      alert("Processing failed. Error processing images.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out. You have been logged out.");
    window.location.href = "/login";
  };

  const handleDownload = (person, image = null) => {
    let url, filename;
  
    if (image) {
      // Download individual image
      url = `http://localhost:5000/clustered/${user.uid}/${person}/${image}`;
      filename = image;
    } else {
      // Download entire folder as zip
      url = `http://localhost:5000/download_cluster?user=${user.uid}&folder=${person}`;
      filename = `${person}.zip`;
    }
  
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
  
        if (!downloaded) {
          const more = window.confirm("Do you want to download more folders?");
          if (!more) {
            fetch(`http://localhost:5000/delete_all?user=${user.uid}`, {
              method: "POST",
            })
              .then((res) => res.json())
              .then((data) => {
                alert(data.message);
                setClusters({});
                setTab("upload");
                setDownloaded(false);
              })
              .catch((err) => console.error(err));
          } else {
            setDownloaded(true);
          }
        }
      })
      .catch(err => console.error("Download error:", err));
  };
  

  const navItems = [
    { id: "upload", label: "Home", icon: Home },
    { id: "account", label: "Account", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "results", label: "Results", icon: Brain },
    { id: "help", label: "Help/contact", icon: AlertCircle },
    { id: "contact", label: "Contact us", icon: Mail },
    { id: "about", label: "About", icon: TrendingUp },

  ];
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});
const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
  
const handlecontactSubmit = () => {
  console.log('Form submitted:', formData);
  alert('Message sent successfully!');
};
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-center"
        >
          <div className="relative">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute inset-0 rounded-full border-4 border-purple-200 opacity-25"></div>
              <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
            </div>
          </div>
          <p className="text-white/80 text-lg">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="w-72 min-h-screen bg-white/10 backdrop-blur-xl border-r border-white/10 relative"
        >
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3 mb-8"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Face Cluster</h2>
                <p className="text-sm text-white/60">AI-Powered Recognition</p>
              </div>
            </motion.div>

            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    tab === item.id
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30 shadow-lg"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </nav>

            {/* Stats Cards */}
            <div className="mt-8 space-y-3">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Total Clusters</p>
                    <p className="text-white text-2xl font-bold">{Object.keys(clusters).length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Images Processed</p>
                    <p className="text-white text-2xl font-bold">
                      {Object.values(clusters).reduce((acc, curr) => acc + curr.length, 0)}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <img
                    src={user.photoURL || "/placeholder.svg"}
                    alt="avatar"
                    className="h-10 w-10 rounded-full object-cover border-2 border-purple-500"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{user.displayName || user.email}</p>
                  <p className="text-white/60 text-sm truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {tab === "upload" && (
              <motion.div
                key="upload"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-white mb-4"
                  >
                    Upload Your Images
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-white/70 text-lg max-w-2xl mx-auto"
                  >
                    Upload your images and let our AI-powered system automatically group them by faces. 
                    Support for multiple formats and batch processing.
                  </motion.p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl"
                  >
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Drag and Drop Zone */}
                      <div
                        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                          dragActive
                            ? "border-purple-400 bg-purple-500/10"
                            : "border-white/30 hover:border-purple-400/50 hover:bg-white/5"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileSelect}
                          disabled={isProcessing}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          id="file-upload"
                        />
                        
                        <div className="space-y-4">
                          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Upload className="h-8 w-8 text-white" />
                          </div>
                          
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                              Drop your images here
                            </h3>
                            <p className="text-white/60 mb-4">
                              or click to browse your files
                            </p>
                            <label
                              htmlFor="file-upload"
                              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 cursor-pointer shadow-lg"
                            >
                              <Plus className="h-5 w-5 mr-2" />
                              Choose Files
                            </label>
                          </div>
                          
                          <p className="text-sm text-white/50">
                            Supports: JPG, PNG, GIF, WEBP • Max 10MB per file
                          </p>
                        </div>
                      </div>

                      {/* Selected Files */}
                      {files.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-white">
                              Selected Files ({files.length})
                            </h4>
                            <button
                              type="button"
                              onClick={() => setFiles([])}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              Clear All
                            </button>
                          </div>
                          
                          <div className="max-h-60 overflow-y-auto space-y-2 bg-black/20 rounded-xl p-4">
                            <AnimatePresence>
                              {files.map((file, index) => (
                                <motion.div
                                  key={`${file.name}-${index}`}
                                  variants={fileItemVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <FileImage className="h-5 w-5 text-purple-400" />
                                    <div>
                                      <p className="text-white text-sm font-medium truncate max-w-xs">
                                        {file.name}
                                      </p>
                                      <p className="text-white/50 text-xs">
                                        {formatFileSize(file.size)}
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="text-red-400 hover:text-red-300 p-1"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <motion.div 
                        className="pt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <button
                          type="submit"
                          disabled={isProcessing || files.length === 0}
                          className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg text-lg"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                              Processing Images...
                            </>
                          ) : (
                            <>
                              <Zap className="h-5 w-5 mr-3" />
                              Start Clustering ({files.length} files)
                            </>
                          )}
                        </button>
                      </motion.div>

                      {/* Processing Info */}
                      {isProcessing && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="animate-pulse">
                              <Brain className="h-6 w-6 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-blue-300 font-medium">AI Processing in Progress</p>
                              <p className="text-blue-200/70 text-sm">
                                Our advanced algorithms are analyzing faces and creating clusters...
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {tab === "account" && (
              <motion.div key="account" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                <Profile user={user} />
              </motion.div>
            )}

            {tab === "settings" && (
              <motion.div key="settings" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                <div className="max-w-2xl mx-auto">
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl"
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
                      <p className="text-white/70">Configure your preferences and account settings.</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-white">Email Notifications</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                          <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-white">Time Zone</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                          <input
                            placeholder="e.g. UTC+2"
                            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-white">Security</label>
                        <div className="relative">
                          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                          <input
                            type="password"
                            placeholder="New password"
                            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                        Save Changes
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
            {tab === "contact" && (
  <motion.div 
    key="contact" 
    variants={contentVariants} 
    initial="hidden" 
    animate="visible" 
    exit="exit"
  >
    <div className="max-w-2xl mx-auto">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Contact Us</h2>
          <p className="text-white/70">Get in touch with us. We'd love to hear from you.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-white">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-white">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-white">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-white">Subject</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What's this about?"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-white">Message</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-white/50" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your inquiry..."
                rows="5"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                required
              />
            </div>
          </div>

          <button 
            onClick={handlecontactSubmit}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Send className="h-5 w-5" />
            Send Message
          </button>
        </div>

        {/* Contact Info Section */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Other Ways to Reach Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 text-white/70">
              <Mail className="h-5 w-5 text-purple-400" />
              <span className="text-sm">garena1144q@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Phone className="h-5 w-5 text-purple-400" />
              <span className="text-sm">+91 7386986921</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <MapPin className="h-5 w-5 text-purple-400" />
              <span className="text-sm">New York, NY</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
)}


{tab === "results" && (
  <motion.div
    key="results"
    variants={contentVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <div className="mb-8">
      <h2 className="text-4xl font-bold text-white mb-2">Clustered Results</h2>
      <p className="text-white/70 text-lg">
        Your images have been organized by faces
      </p>
    </div>

    {Object.keys(clusters).length === 0 ? (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
          <Brain className="h-12 w-12 text-white/50" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Results Yet</h3>
        <p className="text-white/60">
          Upload some images to see the clustering results here.
        </p>
      </motion.div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(clusters).map(([person, images], index) => (
          <motion.div
            key={person}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                {/* Thumbnail preview from the first image */}
                <img
                  src={`http://localhost:5000/clustered/${user.uid}/${person}/${images[0]}`}
                  alt="Preview"
                  className="h-10 w-10 rounded-full object-cover border border-white/20"
                />
                <h3 className="text-lg font-semibold text-white">
                  Cluster: {person}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className="inline-block text-xs font-medium bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full border border-purple-500/30">
                  {images.length} images
                </span>
                <button
                  className="inline-flex items-center px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-all duration-200 text-sm"
                  onClick={() => handleDownload(person)} // entire cluster
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download Cluster
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.1 + idx * 0.05,
                  }}
                  className="flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/10"
                >
                  <div className="flex items-center space-x-3">
                    <FileImage className="h-4 w-4 text-purple-400" />
                    <span className="flex-1 text-sm text-white truncate max-w-xs">
                      {img}
                    </span>
                  </div>
                  <button
                    className="inline-flex items-center px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 hover:bg-green-500/30 transition-all duration-200 text-sm"
                    onClick={() => handleDownload(person, img)} // individual image
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </motion.div>
)}
</AnimatePresence>
</main>
</div>
</div>
  );
}