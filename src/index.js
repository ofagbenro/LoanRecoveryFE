// ============================================================================
// REACT APP ENTRY POINT
// ============================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ============================================================================
// GLOBAL STYLES AND CONFIGURATION
// ============================================================================

// Global CSS styles (if you have a separate CSS file)
// import './index.css';

// ============================================================================
// ERROR BOUNDARY COMPONENT
// ============================================================================

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Application Error:', error);
    console.error('Error Info:', errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. Please refresh the page to try again.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh Page
              </button>
              <button 
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Try Again
              </button>
            </div>
            
            {/* Error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-gray-700 font-medium">
                  Error Details (Development Only)
                </summary>
                <div className="mt-2 p-3 bg-gray-100 rounded text-sm">
                  <p className="font-medium text-red-600">Error:</p>
                  <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                    {this.state.error && this.state.error.toString()}
                  </pre>
                  
                  <p className="font-medium text-red-600 mt-3">Stack Trace:</p>
                  <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================================================
// APPLICATION INITIALIZATION
// ============================================================================

// Get the root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element. Make sure you have a div with id="root" in your HTML.');
}

// Create React root
const root = ReactDOM.createRoot(rootElement);

// ============================================================================
// PERFORMANCE MONITORING SETUP
// ============================================================================

// Web Vitals performance monitoring
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }).catch(err => {
      console.warn('Web Vitals could not be loaded:', err);
    });
  }
};

// ============================================================================
// SERVICE WORKER REGISTRATION
// ============================================================================

// Service Worker registration for PWA functionality
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
      
      navigator.serviceWorker.register(swUrl)
        .then((registration) => {
          console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show update notification
                if (window.confirm('New version available! Refresh to update?')) {
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// ============================================================================
// UNHANDLED ERROR LOGGING
// ============================================================================

// Global error handlers
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Log to error reporting service if configured
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Log to error reporting service if configured
});

// ============================================================================
// RENDER APPLICATION
// ============================================================================

// Render the application with error boundary
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// ============================================================================
// INITIALIZE ADDITIONAL FEATURES
// ============================================================================

// Register service worker
registerServiceWorker();

// Start performance monitoring
// Uncomment the line below to enable performance monitoring
// reportWebVitals(console.log);

// You can also send metrics to an analytics endpoint:
// reportWebVitals(sendToAnalytics);

// ============================================================================
// DEVELOPMENT HELPERS
// ============================================================================

// Development-only features
if (process.env.NODE_ENV === 'development') {
  // Enable React DevTools profiler
  if (typeof window !== 'undefined') {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {};
  }
  
  // Add development console messages
  console.log(`
    🚀 Loan Management System - Frontend
    📊 Environment: ${process.env.NODE_ENV}
    🌐 API URL: ${process.env.REACT_APP_API_URL || 'Not configured'}
    ⚡ React Version: ${React.version}
    
    🔧 Development Mode Active
    - Hot reloading enabled
    - Error boundaries active
    - Performance monitoring available
    
    📝 Need help? Check the README.md file
  `);
}

// ============================================================================
// ACCESSIBILITY SETUP
// ============================================================================

// Focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
  // Skip to main content functionality
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50';
  document.body.insertBefore(skipLink, document.body.firstChild);
});

// ============================================================================
// CLEANUP ON UNMOUNT
// ============================================================================

// Cleanup function for when the app unmounts
const cleanup = () => {
  // Clear any intervals, timeouts, or event listeners
  // This is mainly for when the app is part of a larger system
};

// Listen for beforeunload to cleanup
window.addEventListener('beforeunload', cleanup);

// Export cleanup function for testing
export { cleanup };

// ============================================================================
// ANALYTICS AND MONITORING
// ============================================================================

// Example analytics function (implement based on your analytics provider)
const sendToAnalytics = (metric) => {
  // Example: Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
  
  // Example: Custom analytics endpoint
  if (process.env.REACT_APP_ANALYTICS_ENDPOINT) {
    fetch(process.env.REACT_APP_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'web_vital',
        metric: metric.name,
        value: metric.value,
        id: metric.id,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch(err => console.warn('Analytics error:', err));
  }
};

// Uncomment to enable analytics
// reportWebVitals(sendToAnalytics);