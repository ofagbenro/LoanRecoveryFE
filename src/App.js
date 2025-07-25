const LoanManagementApp = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Authentication Handlers
  const handleLogin = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Render Application
  return (
    <div>
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <LoanDashboard token={token} user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default LoanManagementApp;