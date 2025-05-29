// src/pages/AuthScreens.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function AuthScreens() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ code: '+963', flag: '🇸🇾', name: 'Syria' });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const countries = [
    { code: '+963', flag: '🇸🇾', name: 'Syria' },
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+7', flag: '🇷🇺', name: 'Russia' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      {currentScreen === 'login' ? (
        <Login
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          setCurrentScreen={setCurrentScreen}
        />
      ) : (
        <Register
          signupPhone={signupPhone}
          setSignupPhone={setSignupPhone}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          showCountryDropdown={showCountryDropdown}
          setShowCountryDropdown={setShowCountryDropdown}
          countries={countries}
          setCurrentScreen={setCurrentScreen}
        />
      )}
    </div>
  );
}
