// Dashboard Header Component
const DashboardHeader = ({ user, onLogout }) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Debt Collection Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.username || 'User'}</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};