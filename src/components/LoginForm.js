// ============================================================================
// LOGIN FORM COMPONENT
// ============================================================================

import React, { useState } from 'react';
import { Lock, AlertCircle, Loader } from 'lucide-react';
import apiService from '../services/apiService';

const LoginForm = ({ onLogin }) => {
  // State Management
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle login submission
  const handleSubmit = async () => {
    // Validation
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    if (credentials.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    if (credentials.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiService.login(credentials);
      
      // Store authentication data
      localStorage.setItem('loan_token', response.token);
      localStorage.setItem('loan_user', JSON.stringify(response.user));
      
      // Call parent login handler
      onLogin(response.token, response.user);
      
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  // Demo login function
  const handleDemoLogin = () => {
    setCredentials({ username: 'admin', password: 'admin123' });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* Login Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Loan Management System</h1>
          <p className="text-gray-600 mt-2">Debt Collection Dashboard</p>
        </div>
        
        {/* Login Form */}
        <div className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your username"
              disabled={loading}
              onKeyPress={handleKeyPress}
              autoComplete="username"
              aria-describedby={error ? "error-message" : undefined}
            />
          </div>
          
          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your password"
              disabled={loading}
              onKeyPress={handleKeyPress}
              autoComplete="current-password"
              aria-describedby={error ? "error-message" : undefined}
            />
          </div>
          
          {/* Error Display */}
          {error && (
            <div 
              id="error-message"
              className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
              role="alert"
              aria-live="polite"
            >
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}
          
          {/* Login Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
            aria-describedby={loading ? "loading-message" : undefined}
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-4 w-4 mr-2" />
                <span id="loading-message">Signing In...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Demo Login Button */}
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Use Demo Credentials
          </button>
        </div>
        
        {/* Footer Information */}
        <div className="mt-8 text-center">
          <div className="text-sm text-gray-500 mb-2">
            Demo Credentials
          </div>
          <div className="text-xs text-gray-400 bg-gray-50 p-3 rounded-lg">
            <strong>Username:</strong> admin<br />
            <strong>Password:</strong> admin123
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Need help? Contact your system administrator
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;