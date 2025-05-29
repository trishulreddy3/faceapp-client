import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import '../App.css'; // Adjust the path if needed

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Check your email to reset your password.");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="centered-container">
      <div className="card" style={{ width: '300px' }}>
        <h1>Reset Password</h1>
        <form onSubmit={handleReset}>
          <input
            type="email"
            className="input"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="button">Send Reset Link</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/login" className="link">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
