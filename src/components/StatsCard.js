

// Dashboard Statistics Cards Component
const StatsCards = ({ stats }) => {
  const statsData = [
    {
      title: 'Total Loans',
      value: stats.totalLoans || 0,
      icon: CreditCard,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-gray-900'
    },
    {
      title: 'Open Loans',
      value: stats.openLoans || 0,
      icon: DollarSign,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-600'
    },
    {
      title: 'Outstanding',
      value: formatCurrency(stats.totalOutstanding),
      icon: Building,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Closed Loans',
      value: stats.closedLoans || 0,
      icon: User,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {statsData.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className={`p-2 ${stat.bgColor} rounded-lg`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};