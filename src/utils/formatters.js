// ============================================================================
// UTILITY FUNCTIONS AND FORMATTERS
// ============================================================================

/**
 * Format currency amounts in Nigerian Naira
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

/**
 * Format currency with decimal places for detailed views
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string with decimals
 */
export const formatCurrencyDetailed = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);
};

/**
 * Format dates for display
 * @param {string|Date} dateString - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid Date';
  }
};

/**
 * Format dates with time for detailed views
 * @param {string|Date} dateString - Date to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    return new Date(dateString).toLocaleString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('DateTime formatting error:', error);
    return 'Invalid Date';
  }
};

/**
 * Calculate number of days between two dates
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {number} Number of days
 */
export const calculateDaysBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Check if a loan is overdue
 * @param {Object} loan - Loan object
 * @returns {boolean} True if overdue
 */
export const isLoanOverdue = (loan) => {
  if (!loan || loan.status !== 'open') return false;
  return new Date(loan.dueDate) < new Date();
};

/**
 * Calculate days overdue for a loan
 * @param {Object} loan - Loan object
 * @returns {number} Number of days overdue (0 if not overdue)
 */
export const getDaysOverdue = (loan) => {
  if (!isLoanOverdue(loan)) return 0;
  return calculateDaysBetween(loan.dueDate, new Date());
};

/**
 * Get status color class for loan status
 * @param {string} status - Loan status
 * @returns {string} CSS class string
 */
export const getStatusColor = (status) => {
  const statusColors = {
    open: 'bg-red-100 text-red-800',
    closed: 'bg-green-100 text-green-800',
    defaulted: 'bg-gray-100 text-gray-800',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Get priority level for loan collection
 * @param {Object} loan - Loan object
 * @returns {string} Priority level (high, medium, low)
 */
export const getLoanPriority = (loan) => {
  if (!loan || loan.status !== 'open') return 'low';
  
  const daysOverdue = getDaysOverdue(loan);
  const balance = loan.balance || 0;
  
  if (daysOverdue > 30 || balance > 1000000) return 'high';
  if (daysOverdue > 7 || balance > 500000) return 'medium';
  return 'low';
};

/**
 * Get priority color class
 * @param {string} priority - Priority level
 * @returns {string} CSS class string
 */
export const getPriorityColor = (priority) => {
  const priorityColors = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-yellow-600 bg-yellow-50',
    low: 'text-green-600 bg-green-50',
  };
  return priorityColors[priority] || 'text-gray-600 bg-gray-50';
};

/**
 * Format phone numbers for display
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return 'N/A';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Nigerian phone numbers
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  if (cleaned.length === 13 && cleaned.startsWith('234')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  
  return phone; // Return original if format doesn't match
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Format percentage values
 * @param {number} value - Percentage value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  return `${(value || 0).toFixed(decimals)}%`;
};

/**
 * Calculate loan interest amount
 * @param {number} principal - Principal amount
 * @param {number} rate - Interest rate (annual %)
 * @param {number} days - Number of days
 * @returns {number} Interest amount
 */
export const calculateInterest = (principal, rate, days) => {
  if (!principal || !rate || !days) return 0;
  return (principal * (rate / 100) * days) / 365;
};

/**
 * Debounce function for search inputs
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Generate unique ID for components
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Nigerian phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone number
 */
export const isValidNigerianPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return (
    (cleaned.length === 11 && cleaned.startsWith('0')) ||
    (cleaned.length === 13 && cleaned.startsWith('234'))
  );
};