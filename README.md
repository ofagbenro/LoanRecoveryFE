# Loan Management System - Frontend

A modern React-based frontend for the Loan Management and Debt Collection System. This application provides a comprehensive dashboard for managing loans, tracking customer information, and facilitating debt collection activities.

## 🚀 Features

- **Modern Dashboard** - Clean, responsive interface with real-time data
- **Loan Management** - View, search, filter, and manage loans effectively
- **Customer Information** - Comprehensive customer profiles and contact management
- **Advanced Search** - Multi-field search with filters and quick actions
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Authentication** - Secure JWT-based authentication system
- **Offline Support** - Basic functionality available when offline
- **Export Capabilities** - Export loan data to CSV for external processing
- **Real-time Updates** - Live updates for loan status changes

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide React** - Beautiful, customizable icons
- **Axios** - HTTP client for API communication
- **React Scripts** - Build tools and development server

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Backend API** running (see backend documentation)

## 🏃‍♂️ Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd frontend

# Install dependencies
npm install

# Or using yarn
yarn install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Application Configuration
REACT_APP_ENV=development
REACT_APP_NAME=Loan Management System
REACT_APP_VERSION=1.0.0

# Feature Flags (optional)
REACT_APP_ENABLE_DARK_MODE=false
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENABLE_EXPORT=true
REACT_APP_ENABLE_BULK_OPS=true
```

### 3. Development Server

```bash
# Start the development server
npm start

# Or using yarn
yarn start
```

The application will open at `http://localhost:3000`

### 4. Default Login Credentials

For development and testing:
- **Username:** `admin`
- **Password:** `admin123`

## 🏗️ Project Structure

```
frontend/
├── public/                     # Static files
│   ├── index.html             # HTML template
│   ├── manifest.json          # PWA manifest
│   └── favicon.ico            # Application icon
├── src/
│   ├── components/            # React components
│   │   ├── LoginForm.js       # Authentication component
│   │   ├── DashboardHeader.js # Header navigation
│   │   ├── StatsCards.js      # Dashboard statistics
│   │   ├── SearchAndFilters.js # Search functionality
│   │   ├── LoansTable.js      # Loan data table
│   │   └── LoanDetailsModal.js # Detailed loan view
│   ├── services/              # API services
│   │   └── apiService.js      # HTTP client and API calls
│   ├── utils/                 # Utility functions
│   │   ├── formatters.js      # Data formatting utilities
│   │   └── constants.js       # Application constants
│   ├── App.js                 # Main application component
│   └── index.js               # Application entry point
├── .env                       # Environment variables
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🎨 Component Architecture

### Core Components

#### `App.js`
- Main application wrapper
- Handles authentication state
- Manages global data and error handling
- Coordinates between all child components

#### `LoginForm.js`
- User authentication interface
- Input validation and error handling
- Responsive design for all devices

#### `DashboardHeader.js`
- Navigation and user information
- Logout functionality
- Mobile-responsive menu

#### `StatsCards.js`
- Dashboard statistics display
- Loan metrics and KPIs
- Performance indicators

#### `SearchAndFilters.js`
- Advanced search functionality
- Multi-field filtering
- Quick filter presets
- Export capabilities

#### `LoansTable.js`
- Sortable data table
- Loan listing with pagination
- Bulk selection and actions
- Priority indicators

#### `LoanDetailsModal.js`
- Detailed loan information
- Customer contact integration
- Status update functionality
- Activity notes and history

### Service Layer

#### `apiService.js`
- Centralized API communication
- Authentication token management
- Error handling and retry logic
- Request/response interceptors

### Utilities

#### `formatters.js`
- Currency formatting (Nigerian Naira)
- Date and time formatting
- Phone number formatting
- Data validation helpers

#### `constants.js`
- Application configuration
- API endpoints
- Status codes and labels
- Feature flags

## 🔧 Available Scripts

```bash
# Development
npm start          # Start development server
npm test           # Run test suite
npm run build      # Build for production
npm run eject      # Eject from Create React App

# Linting and Formatting
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
npm run format     # Format code with Prettier
```

## 🌐 Deployment

### Build for Production

```bash
# Create production build
npm run build

# The build folder contains the production-ready files
```

### Deployment Options

#### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard
5. Deploy automatically on git push

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow the setup prompts
4. Set environment variables in Vercel dashboard

#### Manual Deployment
1. Run `npm run build`
2. Upload `build` folder contents to your web server
3. Configure server to serve `index.html` for all routes (SPA)

### Environment Variables for Production

```env
REACT_APP_API_URL=https://your-backend-app.onrender.com/api
REACT_APP_ENV=production
```

## 🎯 Usage Guide

### Logging In
1. Open the application in your browser
2. Enter your username and password
3. Click "Sign In" or press Enter
4. Use "Demo Credentials" button for quick access during development

### Dashboard Overview
- **Statistics Cards** - View loan metrics and collection performance
- **Search Bar** - Find loans by customer name, phone, ID, or loan details
- **Filters** - Filter by status, type, date range
- **Quick Filters** - Pre-configured filter presets

### Managing Loans
1. **View Loans** - Click the eye icon to see detailed information
2. **Contact Customers** - Use phone or email buttons for direct contact
3. **Update Status** - Mark loans as closed when payments are received
4. **Add Notes** - Track follow-up activities and customer interactions

### Advanced Features
- **Bulk Operations** - Select multiple loans for batch updates
- **Export Data** - Download loan information as CSV
- **Offline Access** - Basic functionality available without internet
- **Mobile Support** - Full functionality on mobile devices

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Input Validation** - Client-side validation for all forms
- **CORS Protection** - Configured for secure API communication
- **XSS Prevention** - React's built-in XSS protection
- **Secure Storage** - Sensitive data stored securely in localStorage

## ⚡ Performance

- **Code Splitting** - Automatic code splitting with React.lazy()
- **Lazy Loading** - Components loaded on demand
- **Memoization** - React.memo for expensive components
- **Debounced Search** - Optimized search performance
- **Efficient Rendering** - Optimized re-renders with proper key props

## 🎨 Styling

### Tailwind CSS
The application uses Tailwind CSS for styling:
- **Utility Classes** - Comprehensive utility-first CSS
- **Responsive Design** - Mobile-first responsive utilities
- **Dark Mode Ready** - Dark mode support (when enabled)
- **Custom Components** - Consistent design system

### Customization
To customize the appearance:
1. Modify Tailwind classes in components
2. Add custom CSS in `src/index.css`
3. Update color scheme in `tailwind.config.js`

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 🐛 Troubleshooting

### Common Issues

#### API Connection Errors
- Verify backend server is running
- Check API URL in environment variables
- Ensure CORS is configured correctly

#### Authentication Issues
- Clear browser localStorage
- Check JWT token expiration
- Verify credentials with backend

#### Build Errors
- Delete `node_modules` and reinstall
- Clear npm cache: `npm cache clean --force`
- Check Node.js version compatibility

### Debug Mode
Enable debug mode by adding to `.env`:
```env
REACT_APP_DEBUG=true
```

## 📚 API Integration

### Authentication
```javascript
// Login
POST /api/auth/login
{
  "username": "admin",
  "password": "admin123"
}

// Response
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "admin",
    "role": "admin"
  }
}
```

### Loans
```javascript
// Get loans with filters
GET /api/loans?search=term&status=open&type=Business

// Get loan details
GET /api/loans/:id

// Update loan status
PUT /api/loans/:id/status
{
  "status": "closed"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and commit: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

### Code Style
- Use ESLint configuration
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- **Email:** support@yourcompany.com
- **Documentation:** [Link to documentation]
- **Issues:** [GitHub Issues]

## 🚀 Roadmap

### Upcoming Features
- [ ] Real-time notifications
- [ ] Advanced reporting dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced user permissions
- [ ] Integration with SMS services
- [ ] Payment gateway integration
- [ ] Document management
- [ ] Advanced analytics
- [ ] API webhooks

---

**Built with ❤️ using React and modern web technologies**