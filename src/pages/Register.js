import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const countries = [
  { name: 'India', code: '+91' },
  { name: 'Syria', code: '+963' },
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
];

export default function Register() {
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = enter phone, 2 = verify OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {},
        'expired-callback': () => {
          setError('reCAPTCHA expired. Please try again.');
        },
      });
    }
  }, []);

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const fullPhone = countryCode + phone;
      const confirmation = await signInWithPhoneNumber(
        auth,
        fullPhone,
        window.recaptchaVerifier
      );
      window.confirmationResult = confirmation;
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await window.confirmationResult.confirm(otp);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const registerWithGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const registerWithFacebook = async () => {
    setLoading(true);
    setError('');
    try {
      alert('Facebook authentication not configured yet.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* ✅ Always keep this div rendered for invisible reCAPTCHA */}
      <div id="recaptcha-container" className="absolute top-0 left-0 z-0"></div>

      {/* Decorative Blurs */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-purple-200/30 blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-blue-200/20 blur-lg"></div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign Up</h2>
          <p className="text-gray-600 text-sm">Use your phone number to sign up</p>
        </div>

        <form onSubmit={step === 1 ? sendOTP : verifyOTP} className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800"
                  required
                  disabled={loading}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the 6-digit OTP"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800"
                required
                disabled={loading}
              />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? step === 1
                ? 'Sending OTP...'
                : 'Verifying...'
              : step === 1
              ? 'Send OTP'
              : 'Verify & Continue'}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="space-y-3">
            <button
              onClick={registerWithFacebook}
              disabled={loading}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-5 h-5 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">f</div>
              <span className="text-gray-700">Continue with Facebook</span>
            </button>

            <button
              onClick={registerWithGoogle}
              disabled={loading}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-5 h-5 bg-red-500 rounded-full text-white flex items-center justify-center text-xs font-bold">G</div>
              <span className="text-gray-700">Continue with Google</span>
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
