
// ============================================================================
// API CONFIGURATION & SERVICES
// ============================================================================

// API Configuration
// For deployment, replace with your actual backend URL
// In a real React app, you can use: process.env.REACT_APP_API_URL
const API_BASE_URL = 'https://your-backend-app.onrender.com/api';

// API Service Layer - Handles all backend communication
const apiService = {
  // Authentication Services
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  // Loan Management Services
  getLoans: async (token, filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.status && filters.status !== 'all') queryParams.append('status', filters.status);
    if (filters.type && filters.type !== 'all') queryParams.append('type', filters.type);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);

    const response = await fetch(`${API_BASE_URL}/loans?${queryParams}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch loans');
    return response.json();
  },

  getLoanById: async (token, loanId) => {
    const response = await fetch(`${API_BASE_URL}/loans/${loanId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch loan details');
    return response.json();
  },

  updateLoanStatus: async (token, loanId, status) => {
    const response = await fetch(`${API_BASE_URL}/loans/${loanId}/status`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to update loan status');
    return response.json();
  },

  // Dashboard Services
  getDashboardStats: async (token) => {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
  }
};