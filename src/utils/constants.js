// ============================================================================
// APPLICATION CONSTANTS AND CONFIGURATION
// ============================================================================

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Application Configuration
export const APP_CONFIG = {
  NAME: process.env.REACT_APP_NAME || 'Loan Management System',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  DESCRIPTION: 'Debt Collection Dashboard',
  COMPANY: 'Your Company Name',
  SUPPORT_EMAIL: 'support@yourcompany.com',
  SUPPORT_PHONE: '+234-XXX-XXX-XXXX',
  GITHUB_URL: 'https://github.com/your-repo',
  DOCUMENTATION_URL: 'https://docs.yourcompany.com',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'loan_token',
  USER_DATA: 'loan_user',
  PREFERENCES: 'loan_preferences',
  THEME: 'loan_theme',
  LANGUAGE: 'loan_language',
  FILTERS: 'loan_filters',
  SORT_PREFERENCES: 'loan_sort_prefs',
};

// Loan Status Options
export const LOAN_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  DEFAULTED: 'defaulted',
  PENDING: 'pending',
  CANCELLED: 'cancelled',
};

export const LOAN_STATUS_LABELS = {
  [LOAN_STATUS.OPEN]: 'Open',
  [LOAN_STATUS.CLOSED]: 'Closed',
  [LOAN_STATUS.DEFAULTED]: 'Defaulted',
  [LOAN_STATUS.PENDING]: 'Pending',
  [LOAN_STATUS.CANCELLED]: 'Cancelled',
};

export const LOAN_STATUS_COLORS = {
  [LOAN_STATUS.OPEN]: 'bg-red-100 text-red-800 border-red-200',
  [LOAN_STATUS.CLOSED]: 'bg-green-100 text-green-800 border-green-200',
  [LOAN_STATUS.DEFAULTED]: 'bg-gray-100 text-gray-800 border-gray-200',
  [LOAN_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  [LOAN_STATUS.CANCELLED]: 'bg-purple-100 text-purple-800 border-purple-200',
};

// Loan Types
export const LOAN_TYPES = {
  BUSINESS: 'Business',
  PERSONAL: 'Personal',
  EMERGENCY: 'Emergency',
  EDUCATION: 'Education',
  MEDICAL: 'Medical',
  AGRICULTURE: 'Agriculture',
};

export const LOAN_TYPE_OPTIONS = Object.values(LOAN_TYPES);

export const LOAN_TYPE_ICONS = {
  [LOAN_TYPES.BUSINESS]: 'Building',
  [LOAN_TYPES.PERSONAL]: 'User',
  [LOAN_TYPES.EMERGENCY]: 'AlertTriangle',
  [LOAN_TYPES.EDUCATION]: 'GraduationCap',
  [LOAN_TYPES.MEDICAL]: 'Heart',
  [LOAN_TYPES.AGRICULTURE]: 'Wheat',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  COLLECTOR: 'collector',
  VIEWER: 'viewer',
  MANAGER: 'manager',
  AGENT: 'agent',
};

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.COLLECTOR]: 'Debt Collector',
  [USER_ROLES.VIEWER]: 'Viewer',
  [USER_ROLES.MANAGER]: 'Manager',
  [USER_ROLES.AGENT]: 'Collection Agent',
};

export const USER_ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: {
    canView: true,
    canEdit: true,
    canDelete: true,
    canCreateUsers: true,
    canViewReports: true,
    canExport: true,
    canUpdateStatus: true,
    canAddNotes: true,
    canViewCustomerDetails: true,
    canAccessSettings: true,
  },
  [USER_ROLES.MANAGER]: {
    canView: true,
    canEdit: true,
    canDelete: false,
    canCreateUsers: false,
    canViewReports: true,
    canExport: true,
    canUpdateStatus: true,
    canAddNotes: true,
    canViewCustomerDetails: true,
    canAccessSettings: false,
  },
  [USER_ROLES.COLLECTOR]: {
    canView: true,
    canEdit: true,
    canDelete: false,
    canCreateUsers: false,
    canViewReports: true,
    canExport: true,
    canUpdateStatus: true,
    canAddNotes: true,
    canViewCustomerDetails: true,
    canAccessSettings: false,
  },
  [USER_ROLES.AGENT]: {
    canView: true,
    canEdit: false,
    canDelete: false,
    canCreateUsers: false,
    canViewReports: false,
    canExport: false,
    canUpdateStatus: false,
    canAddNotes: true,
    canViewCustomerDetails: true,
    canAccessSettings: false,
  },
  [USER_ROLES.VIEWER]: {
    canView: true,
    canEdit: false,
    canDelete: false,
    canCreateUsers: false,
    canViewReports: false,
    canExport: false,
    canUpdateStatus: false,
    canAddNotes: false,
    canViewCustomerDetails: false,
    canAccessSettings: false,
  },
};

// Priority Levels
export const PRIORITY_LEVELS = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.CRITICAL]: 'text-red-800 bg-red-100 border-red-200',
  [PRIORITY_LEVELS.HIGH]: 'text-red-600 bg-red-50 border-red-100',
  [PRIORITY_LEVELS.MEDIUM]: 'text-yellow-600 bg-yellow-50 border-yellow-100',
  [PRIORITY_LEVELS.LOW]: 'text-green-600 bg-green-50 border-green-100',
};

export const PRIORITY_LABELS = {
  [PRIORITY_LEVELS.CRITICAL]: 'Critical',
  [PRIORITY_LEVELS.HIGH]: 'High',
  [PRIORITY_LEVELS.MEDIUM]: 'Medium',
  [PRIORITY_LEVELS.LOW]: 'Low',
};

// Currency Configuration
export const CURRENCY_CONFIG = {
  LOCALE: 'en-NG',
  CURRENCY: 'NGN',
  SYMBOL: '₦',
  DECIMAL_PLACES: 0,
  THOUSANDS_SEPARATOR: ',',
  DECIMAL_SEPARATOR: '.',
};

// Date Format Configuration
export const DATE_CONFIG = {
  LOCALE: 'en-NG',
  SHORT_FORMAT: 'DD/MM/YYYY',
  LONG_FORMAT: 'DD MMM YYYY',
  DATETIME_FORMAT: 'DD/MM/YYYY HH:mm',
  TIME_FORMAT: 'HH:mm',
  ISO_FORMAT: 'YYYY-MM-DD',
};

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 25,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  MAX_VISIBLE_PAGES: 5,
  INFINITE_SCROLL_THRESHOLD: 100, // pixels from bottom
};

// Table Configuration
export const TABLE_CONFIG = {
  DEFAULT_SORT_FIELD: 'dueDate',
  DEFAULT_SORT_DIRECTION: 'asc',
  ROWS_PER_PAGE: 25,
  MAX_ROWS_BEFORE_PAGINATION: 100,
  STICKY_HEADER: true,
};

// Search Configuration
export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 300, // milliseconds
  MIN_SEARCH_LENGTH: 2,
  MAX_SEARCH_RESULTS: 100,
  SEARCH_FIELDS: [
    'customer.firstName',
    'customer.lastName', 
    'customer.phone',
    'customer.email',
    'customer.customerid',
    'loaned',
    'description',
    'type'
  ],
};

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: [
    'image/jpeg', 
    'image/png', 
    'image/gif',
    'application/pdf', 
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.csv', '.xls', '.xlsx'],
  UPLOAD_ENDPOINT: '/api/upload',
};

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  DEFAULT_DURATION: 5000, // 5 seconds
  SUCCESS_DURATION: 3000, // 3 seconds
  ERROR_DURATION: 7000, // 7 seconds
  WARNING_DURATION: 5000, // 5 seconds
  INFO_DURATION: 4000, // 4 seconds
  MAX_NOTIFICATIONS: 5,
  POSITION: 'top-right', // top-left, top-right, bottom-left, bottom-right
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: false,
    REQUIRE_LOWERCASE: false,
    REQUIRE_NUMBERS: false,
    REQUIRE_SPECIAL_CHARS: false,
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  PHONE: {
    NIGERIAN_PATTERN: /^(\+234|234|0)[789][01]\d{8}$/,
    MIN_LENGTH: 11,
    MAX_LENGTH: 14,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MAX_LENGTH: 255,
  },
  AMOUNT: {
    MIN_VALUE: 1000, // Minimum loan amount (₦1,000)
    MAX_VALUE: 100000000, // Maximum loan amount (₦100M)
    DECIMAL_PLACES: 2,
  },
  INTEREST_RATE: {
    MIN_VALUE: 0.1, // 0.1%
    MAX_VALUE: 50, // 50%
    DECIMAL_PLACES: 2,
  },
  TENURE: {
    MIN_DAYS: 1,
    MAX_DAYS: 3650, // 10 years
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  // Network Errors
  NETWORK_ERROR: 'Network error. Please check your internet connection and try again.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  CONNECTION_ERROR: 'Unable to connect to server. Please try again later.',
  
  // Authentication Errors
  AUTHENTICATION_FAILED: 'Invalid username or password. Please try again.',
  TOKEN_EXPIRED: 'Your session has expired. Please login again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. You do not have permission to access this resource.',
  
  // Server Errors
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  SERVICE_UNAVAILABLE: 'Service is temporarily unavailable. Please try again later.',
  INTERNAL_ERROR: 'An unexpected error occurred. Please contact support if the problem persists.',
  
  // Validation Errors
  VALIDATION_ERROR: 'Please check your input and try again.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_FORMAT: 'Invalid format. Please check your input.',
  
  // File Upload Errors
  FILE_TOO_LARGE: `File size exceeds ${UPLOAD_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB limit.`,
  INVALID_FILE_TYPE: 'Invalid file type. Please select a supported file format.',
  UPLOAD_FAILED: 'File upload failed. Please try again.',
  
  // Form Validation
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid Nigerian phone number (e.g., 08012345678).',
  WEAK_PASSWORD: `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters long.`,
  PASSWORD_MISMATCH: 'Passwords do not match.',
  
  // Data Errors
  NOT_FOUND: 'The requested resource was not found.',
  DUPLICATE_ENTRY: 'This entry already exists.',
  INVALID_DATE_RANGE: 'Invalid date range. End date must be after start date.',
  
  // Business Logic Errors
  LOAN_ALREADY_CLOSED: 'This loan is already closed.',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this operation.',
  INVALID_STATUS_TRANSITION: 'Invalid status change.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  // Authentication
  LOGIN_SUCCESS: 'Welcome! You have been logged in successfully.',
  LOGOUT_SUCCESS: 'You have been logged out successfully.',
  PASSWORD_UPDATED: 'Password updated successfully.',
  
  // CRUD Operations
  SAVE_SUCCESS: 'Changes saved successfully.',
  CREATE_SUCCESS: 'Record created successfully.',
  UPDATE_SUCCESS: 'Record updated successfully.',
  DELETE_SUCCESS: 'Record deleted successfully.',
  
  // Loan Operations
  LOAN_STATUS_UPDATED: 'Loan status updated successfully.',
  NOTE_ADDED: 'Note added successfully.',
  PAYMENT_RECORDED: 'Payment recorded successfully.',
  
  // Data Operations
  EXPORT_SUCCESS: 'Data exported successfully.',
  IMPORT_SUCCESS: 'Data imported successfully.',
  BACKUP_SUCCESS: 'Backup created successfully.',
  
  // Communication
  EMAIL_SENT: 'Email sent successfully.',
  SMS_SENT: 'SMS sent successfully.',
  CALL_INITIATED: 'Call initiated successfully.',
  
  // File Operations
  FILE_UPLOADED: 'File uploaded successfully.',
  FILE_DELETED: 'File deleted successfully.',
};

// Warning Messages
export const WARNING_MESSAGES = {
  UNSAVED_CHANGES: 'You have unsaved changes. Are you sure you want to leave?',
  DELETE_CONFIRMATION: 'Are you sure you want to delete this record? This action cannot be undone.',
  STATUS_CHANGE_CONFIRMATION: 'Are you sure you want to change the status of this loan?',
  BULK_ACTION_CONFIRMATION: 'Are you sure you want to perform this action on selected items?',
  OVERDUE_LOAN: 'This loan is overdue. Please follow up with the customer.',
  HIGH_AMOUNT: 'This is a high-value loan. Please verify all details carefully.',
  DATA_SYNC_WARNING: 'Some data may not be up to date. Please refresh to get the latest information.',
};

// Feature Flags (for conditional features)
export const FEATURES = {
  // UI Features
  DARK_MODE: process.env.REACT_APP_ENABLE_DARK_MODE === 'true',
  THEMES: process.env.REACT_APP_ENABLE_THEMES === 'true',
  
  // Functionality Features
  NOTIFICATIONS: process.env.REACT_APP_ENABLE_NOTIFICATIONS !== 'false',
  EXPORT: process.env.REACT_APP_ENABLE_EXPORT !== 'false',
  IMPORT: process.env.REACT_APP_ENABLE_IMPORT === 'true',
  BULK_OPERATIONS: process.env.REACT_APP_ENABLE_BULK_OPS === 'true',
  ADVANCED_SEARCH: process.env.REACT_APP_ENABLE_ADVANCED_SEARCH !== 'false',
  
  // Real-time Features
  REAL_TIME_UPDATES: process.env.REACT_APP_ENABLE_REALTIME === 'true',
  AUTO_REFRESH: process.env.REACT_APP_ENABLE_AUTO_REFRESH === 'true',
  
  // Offline Features
  OFFLINE_SUPPORT: process.env.REACT_APP_ENABLE_OFFLINE === 'true',
  SERVICE_WORKER: process.env.REACT_APP_ENABLE_SW === 'true',
  
  // Communication Features
  EMAIL_INTEGRATION: process.env.REACT_APP_ENABLE_EMAIL === 'true',
  SMS_INTEGRATION: process.env.REACT_APP_ENABLE_SMS === 'true',
  WHATSAPP_INTEGRATION: process.env.REACT_APP_ENABLE_WHATSAPP === 'true',
  
  // Analytics Features
  ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  ERROR_REPORTING: process.env.REACT_APP_ENABLE_ERROR_REPORTING === 'true',
  PERFORMANCE_MONITORING: process.env.REACT_APP_ENABLE_PERF_MONITORING === 'true',
};

// External Service URLs
export const EXTERNAL_SERVICES = {
  GOOGLE_MAPS: 'https://maps.google.com',
  GOOGLE_MAPS_API: 'https://maps.googleapis.com/maps/api',
  WHATSAPP: 'https://wa.me',
  WHATSAPP_BUSINESS: 'https://business.whatsapp.com',
  EMAIL_CLIENT: 'mailto:',
  PHONE_DIALER: 'tel:',
  SMS_GATEWAY: process.env.REACT_APP_SMS_GATEWAY_URL,
  PAYMENT_GATEWAY: process.env.REACT_APP_PAYMENT_GATEWAY_URL,
};

// Chart Colors (for dashboard visualizations)
export const CHART_COLORS = {
  PRIMARY: '#3B82F6', // Blue
  SECONDARY: '#8B5CF6', // Purple
  SUCCESS: '#10B981', // Green
  WARNING: '#F59E0B', // Yellow
  DANGER: '#EF4444', // Red
  INFO: '#06B6D4', // Cyan
  LIGHT: '#F3F4F6', // Light Gray
  DARK: '#1F2937', // Dark Gray
  
  // Gradient Colors
  GRADIENTS: {
    PRIMARY: ['#3B82F6', '#1D4ED8'],
    SUCCESS: ['#10B981', '#047857'],
    WARNING: ['#F59E0B', '#D97706'],
    DANGER: ['#EF4444', '#DC2626'],
  },
};

// Responsive Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  XS: 475,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Z-Index Levels
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
  LOADING: 1090,
};

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  INSTANT: 0,
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
};

// Easing Functions
export const EASING = {
  LINEAR: 'linear',
  EASE: 'ease',
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  EASE_IN_OUT: 'ease-in-out',
  SPRING: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  
  // Loans
  LOANS: {
    LIST: '/loans',
    CREATE: '/loans',
    DETAIL: '/loans/:id',
    UPDATE: '/loans/:id',
    DELETE: '/loans/:id',
    UPDATE_STATUS: '/loans/:id/status',
    ADD_NOTE: '/loans/:id/notes',
    GET_NOTES: '/loans/:id/notes',
    SEARCH: '/loans/search',
    EXPORT: '/loans/export',
  },
  
  // Customers
  CUSTOMERS: {
    LIST: '/customers',
    CREATE: '/customers',
    DETAIL: '/customers/:id',
    UPDATE: '/customers/:id',
    DELETE: '/customers/:id',
    SEARCH: '/customers/search',
    EXPORT: '/customers/export',
  },
  
  // Dashboard
  DASHBOARD: {
    STATS: '/dashboard/stats',
    RECENT_ACTIVITY: '/dashboard/recent-activity',
    METRICS: '/dashboard/metrics',
    CHARTS: '/dashboard/charts',
  },
  
  // Reports
  REPORTS: {
    GENERATE: '/reports/generate',
    LIST: '/reports',
    DOWNLOAD: '/reports/:id/download',
    DELETE: '/reports/:id',
  },
  
  // Users (Admin only)
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    DETAIL: '/users/:id',
    UPDATE: '/users/:id',
    DELETE: '/users/:id',
    ACTIVATE: '/users/:id/activate',
    DEACTIVATE: '/users/:id/deactivate',
  },
  
  // System
  HEALTH: '/health',
  VERSION: '/version',
  SETTINGS: '/settings',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

// Quick Filter Presets
export const QUICK_FILTERS = {
  OVERDUE_LOANS: {
    name: 'Overdue Loans',
    filters: { status: 'open', overdue: true },
    color: 'red',
  },
  DUE_THIS_WEEK: {
    name: 'Due This Week',
    filters: { status: 'open', dueWithin: 7 },
    color: 'yellow',
  },
  HIGH_VALUE: {
    name: 'High Value (>₦1M)',
    filters: { minAmount: 1000000 },
    color: 'purple',
  },
  RECENT_CLOSED: {
    name: 'Recently Closed',
    filters: { status: 'closed', closedWithin: 7 },
    color: 'green',
  },
  BUSINESS_LOANS: {
    name: 'Business Loans',
    filters: { type: 'Business', status: 'open' },
    color: 'blue',
  },
};

// Export default configuration object
export default {
  API_CONFIG,
  APP_CONFIG,
  STORAGE_KEYS,
  LOAN_STATUS,
  LOAN_TYPES,
  USER_ROLES,
  CURRENCY_CONFIG,
  DATE_CONFIG,
  FEATURES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  WARNING_MESSAGES,
  CHART_COLORS,
  BREAKPOINTS,
  Z_INDEX,
  ANIMATION_DURATION,
  API_ENDPOINTS,
  HTTP_STATUS,
  QUICK_FILTERS,
};