import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import {
  User,
  Edit3,
  Settings,
  Camera,
  Mail,
  MapPin,
  Calendar,
  Phone,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Save,
  X,
  Upload,
  Shield,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  Heart,
  Coffee,
  Music,
  Book,
  Camera as CameraIcon,
  Gamepad2,
  Plane,
  Palette,
  Code,
  Dumbbell,
  Target,
  TrendingUp,
  Users,
  MessageSquare,
  Share2,
  Activity,
} from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ProfileInterface = () => {
  const [activeView, setActiveView] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    bio: '',
    image: '',
    coverImage: '',
    job: '',
    company: '',
    location: '',
    birthDate: '',
    joinDate: new Date().toISOString().split('T')[0],
    social: {
      twitter: '',
      linkedin: '',
      github: '',
      instagram: '',
    },
    interests: [],
    skills: [],
    achievements: [],
    stats: {
      projects: 0,
      followers: 0,
      following: 0,
    },
    preferences: {
      theme: 'dark',
      notifications: true,
      privacy: 'public',
      emailUpdates: true,
    },
  });
  const [editData, setEditData] = useState({ ...profileData });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const interestIcons = {
    'Photography': CameraIcon,
    'Gaming': Gamepad2,
    'Travel': Plane,
    'Art': Palette,
    'Coding': Code,
    'Fitness': Dumbbell,
    'Music': Music,
    'Reading': Book,
    'Coffee': Coffee,
  };

  const skillCategories = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Design', 'Marketing', 
    'Photography', 'Writing', 'Management', 'Analytics'
  ];

  const interestOptions = [
    'Photography', 'Gaming', 'Travel', 'Art', 'Coding', 'Fitness', 
    'Music', 'Reading', 'Coffee', 'Sports', 'Movies', 'Cooking'
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
  
        const defaultData = {
          name: user.displayName || '',
          email: user.email || '',
          phone: '',
          address: '',
          website: '',
          bio: '',
          image: '',
          coverImage: '',
          job: '',
          company: '',
          location: '',
          birthDate: '',
          joinDate: new Date().toISOString().split('T')[0],
          social: {
            twitter: '',
            linkedin: '',
            github: '',
            instagram: '',
          },
          interests: [],
          skills: [],
          achievements: [],
          stats: {
            projects: 0,
            followers: 0,
            following: 0,
          },
          preferences: {
            theme: 'dark',
            notifications: true,
            privacy: 'public',
            emailUpdates: true,
          },
        };
  
        if (userSnap.exists()) {
          const data = userSnap.data();
          const safeData = {
            ...defaultData,
            ...data,
            social: { ...defaultData.social, ...(data.social || {}) },
            stats: { ...defaultData.stats, ...(data.stats || {}) },
            preferences: { ...defaultData.preferences, ...(data.preferences || {}) },
          };
          setProfileData(safeData);
          setEditData(safeData);
        } else {
          await setDoc(userRef, defaultData);
          setProfileData(defaultData);
          setEditData(defaultData);
        }
  
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, editData, { merge: true });
      setProfileData({ ...editData });
      setActiveView('profile');
    }
  };

  const handleImageUpload = async (e, imageType = 'image') => {
    const file = e.target.files[0];
    if (file && auth.currentUser) {
      setUploading(true);
      const imageRef = ref(storage, `${imageType}s/${auth.currentUser.uid}`);
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);
      
      const updatedData = { ...editData, [imageType]: imageUrl };
      setEditData(updatedData);
      setProfileData(updatedData);
      
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, { [imageType]: imageUrl });
      setUploading(false);
    }
  };

  const addSkill = () => {
    if (newSkill && !editData.skills.includes(newSkill)) {
      setEditData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  };

  const addInterest = () => {
    if (newInterest && !editData.interests.includes(newInterest)) {
      setEditData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest],
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setEditData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest),
    }));
  };

  const ProfileView = () => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Cover Photo & Profile */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl overflow-hidden">
          {profileData.coverImage && (
            <img 
              src={profileData.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <img
              src={profileData.image || '/placeholder.svg'}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
            />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </div>
        
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setActiveView('edit')}
            className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center space-x-2"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mt-20">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{profileData.name}</h1>
            <p className="text-purple-300 text-lg mb-1">{profileData.job} at {profileData.company}</p>
            <p className="text-white/60 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {profileData.location || profileData.address}
            </p>
          </div>
          
          <div className="flex space-x-4">
            {profileData.social.twitter && (
              <a href={`https://twitter.com/${profileData.social.twitter}`} className="text-white/60 hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {profileData.social.linkedin && (
              <a href={profileData.social.linkedin} className="text-white/60 hover:text-blue-500">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {profileData.social.github && (
              <a href={`https://github.com/${profileData.social.github}`} className="text-white/60 hover:text-gray-300">
                <Github className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{profileData.stats.projects}</div>
            <div className="text-white/60 text-sm">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{profileData.stats.followers}</div>
            <div className="text-white/60 text-sm">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{profileData.stats.following}</div>
            <div className="text-white/60 text-sm">Following</div>
          </div>
        </div>

        {/* Bio */}
        {profileData.bio && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">About</h3>
            <p className="text-white/80 leading-relaxed">{profileData.bio}</p>
          </div>
        )}

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {profileData.email && (
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-purple-400" />
              <span className="text-white/80">{profileData.email}</span>
            </div>
          )}
          {profileData.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-purple-400" />
              <span className="text-white/80">{profileData.phone}</span>
            </div>
          )}
          {profileData.website && (
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-purple-400" />
              <a href={profileData.website} className="text-purple-300 hover:text-purple-200">
                {profileData.website}
              </a>
            </div>
          )}
          {profileData.birthDate && (
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-purple-400" />
              <span className="text-white/80">{new Date(profileData.birthDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Skills & Interests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-purple-400" />
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {profileData.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm border border-purple-500/50"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Heart className="h-5 w-5 mr-2 text-pink-400" />
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {profileData.interests?.map((interest, index) => {
              const IconComponent = interestIcons[interest];
              return (
                <span
                  key={index}
                  className="px-3 py-1 bg-pink-500/30 text-pink-200 rounded-full text-sm border border-pink-500/50 flex items-center"
                >
                  {IconComponent && <IconComponent className="h-3 w-3 mr-1" />}
                  {interest}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-green-400" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Star className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-white text-sm">Completed a new project</p>
              <p className="text-white/60 text-xs">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Award className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-white text-sm">Earned a new badge</p>
              <p className="text-white/60 text-xs">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const EditView = () => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Edit Profile</h2>
        <button
          onClick={() => setActiveView('profile')}
          className="text-white/60 hover:text-white p-2"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Image Upload */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Picture */}
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <img
                src={editData.image || '/placeholder.svg'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-500"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'image')}
                className="hidden"
              />
              <span className="bg-purple-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-600 transition-colors flex items-center justify-center">
                <Camera className="h-4 w-4 mr-2" />
                Change Profile Photo
              </span>
            </label>
          </div>

          {/* Cover Photo */}
          <div className="text-center">
            <div className="relative mb-4">
              <div className="w-full h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg overflow-hidden">
                {editData.coverImage && (
                  <img 
                    src={editData.coverImage} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'coverImage')}
                className="hidden"
              />
              <span className="bg-pink-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-pink-600 transition-colors flex items-center justify-center">
                <Upload className="h-4 w-4 mr-2" />
                Change Cover Photo
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleEditChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleEditChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={editData.phone}
              onChange={handleEditChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Website</label>
            <input
              type="url"
              name="website"
              value={editData.website}
              onChange={handleEditChange}
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Job Title</label>
            <input
              type="text"
              name="job"
              value={editData.job}
              onChange={handleEditChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Company</label>
            <input
              type="text"
              name="company"
              value={editData.company}
              onChange={handleEditChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={editData.location}
              onChange={handleEditChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={editData.birthDate}
              onChange={handleEditChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-white mb-2">Bio</label>
          <textarea
            name="bio"
            value={editData.bio}
            onChange={handleEditChange}
            rows="4"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2 flex items-center">
              <Twitter className="h-4 w-4 mr-2" />
              Twitter Username
            </label>
            <input
              type="text"
              name="social.twitter"
              value={editData.social?.twitter || ''}
              onChange={handleEditChange}
              placeholder="@username"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2 flex items-center">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="social.linkedin"
              value={editData.social?.linkedin || ''}
              onChange={handleEditChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2 flex items-center">
              <Github className="h-4 w-4 mr-2" />
              GitHub Username
            </label>
            <input
              type="text"
              name="social.github"
              value={editData.social?.github || ''}
              onChange={handleEditChange}
              placeholder="username"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2 flex items-center">
              <Instagram className="h-4 w-4 mr-2" />
              Instagram Username
            </label>
            <input
              type="text"
              name="social.instagram"
              value={editData.social?.instagram || ''}
              onChange={handleEditChange}
              placeholder="@username"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Skills & Interests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
          <div className="flex mb-4">
            <select
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select a skill</option>
              {skillCategories.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-purple-500 text-white rounded-r-lg hover:bg-purple-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {editData.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm border border-purple-500/50 flex items-center"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-purple-300 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Interests</h3>
          <div className="flex mb-4">
            <select
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select an interest</option>
              {interestOptions.map(interest => (
                <option key={interest} value={interest}>{interest}</option>
              ))}
            </select>
            <button
              onClick={addInterest}
              className="px-4 py-2 bg-pink-500 text-white rounded-r-lg hover:bg-pink-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
          {editData.interests?.map((interest, index) => {
              const IconComponent = interestIcons[interest];
              return (
                <span
                  key={index}
                  className="px-3 py-1 bg-pink-500/30 text-pink-200 rounded-full text-sm border border-pink-500/50 flex items-center"
                >
                  {IconComponent && <IconComponent className="h-3 w-3 mr-1" />}
                  {interest}
                  <button
                    onClick={() => removeInterest(interest)}
                    className="ml-2 text-pink-300 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>Save Changes</span>
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {activeView === 'profile' ? <ProfileView key="profile" /> : <EditView key="edit" />}
      </AnimatePresence>
    </div>
  );
};

export default ProfileInterface;
// Note: Ensure you have the necessary Firebase setup and imports in your project.
// Also, make sure to handle authentication and user state management properly in your app.   