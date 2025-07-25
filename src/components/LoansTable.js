// Loans Table Component
const LoansTable = ({ loans, onViewLoan, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <Loader className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading loans...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Financial</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan._id} className="hover:bg-gray-50">
                {/* Customer Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {loan.customer?.firstName} {loan.customer?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{loan.customer?.phone}</div>
                    </div>
                  </div>
                </td>
                
                {/* Loan Details */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{loan.loaned}</div>
                  <div className="text-sm text-gray-500">{loan.type} - {loan.description}</div>
                </td>
                
                {/* Financial Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Principal: {formatCurrency(loan.principal)}</div>
                  <div className="text-sm text-red-600 font-medium">Balance: {formatCurrency(loan.balance)}</div>
                </td>
                
                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    loan.status === 'open' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {loan.status?.toUpperCase()}
                  </span>
                </td>
                
                {/* Due Date */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className={isLoanOverdue(loan) ? 'text-red-600 font-bold' : ''}>
                    {formatDate(loan.dueDate)}
                    {isLoanOverdue(loan) && (
                      <div className="text-xs text-red-600">OVERDUE</div>
                    )}
                  </div>
                </td>
                
                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onViewLoan(loan)}
                    className="text-blue-600 hover:text-blue-900 flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {loans.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No loans found matching your criteria</div>
        </div>
      )}
    </div>
  );
};
