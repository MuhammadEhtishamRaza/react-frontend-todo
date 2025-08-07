import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ mode = 'login', onSubmit, onToggleMode, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isSignup = mode === 'signup';

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation (signup only)
    if (isSignup) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    // Name validation (signup only)
    if (isSignup && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = {
        email: formData.email,
        password: formData.password,
        ...(isSignup && { name: formData.name })
      };
      onSubmit(submitData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            {isSignup ? '👋' : '🔐'}
          </div>
          <h2 className="auth-title">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="auth-subtitle">
            {isSignup 
              ? 'Join us and start organizing your life!' 
              : 'Sign in to continue to your todo list'
            }
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
                <span className="input-icon">👤</span>
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              <span className="input-icon">📧</span>
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <span className="input-icon">🔒</span>
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility('password')}
                disabled={isLoading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {isSignup && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <span className="input-icon">🔒</span>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          )}

          <button
            type="submit"
            className={`submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">⏳</span>
            ) : (
              <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="toggle-text">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              className="toggle-btn"
              onClick={onToggleMode}
              disabled={isLoading}
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <div className="social-auth">
          <button className="social-btn google-btn" disabled={isLoading}>
            <span className="social-icon">🔍</span>
            Continue with Google
          </button>
          <button className="social-btn github-btn" disabled={isLoading}>
            <span className="social-icon">🐙</span>
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm; 