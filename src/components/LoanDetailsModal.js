// ============================================================================
// LOAN DETAILS MODAL COMPONENT
// ============================================================================

import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  CreditCard, 
  DollarSign, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Loader,
  Edit,
  Save
} from 'lucide-react';
import { 
  formatCurrency, 
  formatDate, 
  formatDateTime,
  isLoanOverdue, 
  getDaysOverdue,
  getStatusColor,
  formatPhoneNumber,
  calculateInterest 
} from '../utils/formatters';
import apiService from '../services/apiService';

const LoanDetailsModal = ({ loan, token, onClose, onStatusUpdate }) => {
  const [loanDetails, setLoanDetails] = useState(loan);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  // Load detailed loan information
  useEffect(() => {
    if (loan && loan._id && token) {
      loadLoanDetails();
    }
  }, [loan, token]);

  const loadLoanDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await apiService.getLoanById(token, loan._id);
      setLoanDetails(response.data || response);
    } catch (err) {
      setError('Failed to load loan details');
      console.error('Failed to load loan details:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this loan as ${newStatus}?`)) {
      return;
    }

    try {
      setSaving(true);
      await onStatusUpdate(loanDetails._id, newStatus);
      
      // Update local state
      setLoanDetails(prev => ({
        ...prev,
        status: newStatus,
        closedDate: newStatus === 'closed' ? new Date().toISOString() : prev.closedDate
      }));
      
      setError('');
    } catch (err) {
      setError('Failed to update loan status');
      console.error('Status update error:', err);
    } finally {
      setSaving(false);
    }
  };

  // Handle adding note
  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      setAddingNote(true);
      await apiService.addLoanNote(token, loanDetails._id, newNote.trim());
      
      // Update local state with new note
      const newNoteObj = {
        content: newNote.trim(),
        createdBy: 'Current User', // Replace with actual user
        createdAt: new Date().toISOString()
      };
      
      setLoanDetails(prev => ({
        ...prev,
        notes: [...(prev.notes || []), newNoteObj]
      }));
      
      setNewNote('');
      setError('');
    } catch (err) {
      setError('Failed to add note');
      console.error('Add note error:', err);
    } finally {
      setAddingNote(false);
    }
  };

  // Calculate current balance with accrued interest
  const calculateCurrentBalance = () => {
    if (!loanDetails || loanDetails.status === 'closed') return 0;
    
    const now = new Date();
    const bookedDate = new Date(loanDetails.bookedDate);
    const daysElapsed = Math.floor((now - bookedDate) / (1000 * 60 * 60 * 24));
    
    return loanDetails.balance + calculateInterest(
      loanDetails.principal, 
      loanDetails.interestRate, 
      daysElapsed
    );
  };

  if (!loanDetails) return null;

  const currentBalance = calculateCurrentBalance();
  const overdue = isLoanOverdue(loanDetails);
  const daysOverdue = getDaysOverdue(loanDetails);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-800">
              Loan Details
            </h2>
            {loading && <Loader className="h-5 w-5 animate-spin text-blue-600" />}
            {overdue && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                {daysOverdue} days overdue
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-6 mt-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: CreditCard },
              { id: 'customer', label: 'Customer', icon: User },
              { id: 'financial', label: 'Financial', icon: DollarSign },
              { id: 'activity', label: 'Activity', icon: Clock },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Quick Stats */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-blue-900">
                    Loan Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan ID:</span>
                      <span className="font-medium">{loanDetails.loaned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{loanDetails.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal:</span>
                      <span className="font-medium">{formatCurrency(loanDetails.principal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Balance:</span>
                      <span className={`font-bold ${currentBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {formatCurrency(currentBalance)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(loanDetails.status)}`}>
                        {loanDetails.status?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Important Dates */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    Important Dates
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Booked:</span>
                      <span className="font-medium">{formatDate(loanDetails.bookedDate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Due:</span>
                      <span className={`font-medium ${overdue ? 'text-red-600' : ''}`}>
                        {formatDate(loanDetails.dueDate)}
                        {overdue && <AlertTriangle className="inline h-4 w-4 ml-1" />}
                      </span>
                    </div>
                    {loanDetails.closedDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Closed:</span>
                        <span className="font-medium text-green-600">{formatDate(loanDetails.closedDate)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tenure:</span>
                      <span className="font-medium">{loanDetails.tenure} days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customer' && (
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Full Name:</span>
                      <p className="text-gray-900 mt-1">
                        {loanDetails.customer?.customerTitle} {loanDetails.customer?.firstName} {loanDetails.customer?.lastName}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Customer ID:</span>
                      <p className="text-gray-900 mt-1">{loanDetails.customer?.customerid}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Gender:</span>
                      <p className="text-gray-900 mt-1">{loanDetails.customer?.gender}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Marital Status:</span>
                      <p className="text-gray-900 mt-1">{loanDetails.customer?.maritalStatus}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Date of Birth:</span>
                      <p className="text-gray-900 mt-1">{formatDate(loanDetails.customer?.dateOfBirth)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Nationality:</span>
                      <p className="text-gray-900 mt-1">{loanDetails.customer?.nationality}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Phone:</span>
                      <p className="text-gray-900 mt-1">
                        <a href={`tel:${loanDetails.customer?.phone}`} className="text-blue-600 hover:underline">
                          {formatPhoneNumber(loanDetails.customer?.phone)}
                        </a>
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Email:</span>
                      <p className="text-gray-900 mt-1">
                        <a href={`mailto:${loanDetails.customer?.email}`} className="text-blue-600 hover:underline">
                          {loanDetails.customer?.email || 'Not provided'}
                        </a>
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Address:</span>
                      <p className="text-gray-900 mt-1">{loanDetails.customer?.contactAddress}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Next of Kin:</span>
                      <p className="text-gray-900 mt-1">
                        {loanDetails.customer?.nok} ({loanDetails.customer?.nokRelationship})
                      </p>
                      <p className="text-gray-600 text-xs mt-1">{loanDetails.customer?.nokNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Professional Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Job Title:</span>
                      <p className="text-gray-900 mt-1">{loanDetails.customer?.jobTitle}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Company:</span>
                      <p className="text-gray-900 mt-1">{loanDetails.customer?.companyName}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Industry:</span>
                      <p className="text-gray-900 mt-1">{loanDetails.customer?.companyIndustry}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Trade Specialization:</span>
                      <p className="text-gray-900 mt-1">{loanDetails.customer?.tradeSpecialization}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Qualification:</span>
                      <p className="text-gray-900 mt-1">{loanDetails.customer?.qualification}</p>
                    </div>
                  </div>
                </div>

                {/* Banking Information */}
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Banking Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Bank:</span>
                      <p className="text-gray-900 mt-1">{loanDetails.customer?.nameOfBank?.toUpperCase()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Account Name:</span>
                      <p className="text-gray-900 mt-1">{loanDetails.customer?.accountName}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Account Number:</span>
                      <p className="text-gray-900 mt-1 font-mono">{loanDetails.customer?.accountNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">BVN:</span>
                      <p className="text-gray-900 mt-1 font-mono">{loanDetails.customer?.bvn}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Loan Details */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Loan Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal Amount:</span>
                      <span className="font-medium">{formatCurrency(loanDetails.principal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-medium">{loanDetails.interestRate}% per annum</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Upfront Fee:</span>
                      <span className="font-medium">{formatCurrency(loanDetails.upfrontAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tenure:</span>
                      <span className="font-medium">{loanDetails.tenure} days</span>
                    </div>
                  </div>
                </div>

                {/* Current Financial Status */}
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Current Status
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Balance:</span>
                      <span className={`font-bold ${currentBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {formatCurrency(currentBalance)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Incurred:</span>
                      <span className="font-medium">{formatCurrency(loanDetails.interestIncurred || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Total:</span>
                      <span className="font-medium">{formatCurrency(loanDetails.estimatedBalance || 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="p-6">
              {/* Add Note Section */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Add Follow-up Note</h4>
                <div className="flex space-x-3">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note about customer contact, payment plans, etc..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!newNote.trim() || addingNote}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                  >
                    {addingNote ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Notes History */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Activity History</h4>
                <div className="space-y-4">
                  {(loanDetails.notes || []).map((note, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{note.createdBy}</span>
                        <span className="text-xs text-gray-500">{formatDateTime(note.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{note.content}</p>
                    </div>
                  ))}
                  
                  {(!loanDetails.notes || loanDetails.notes.length === 0) && (
                    <p className="text-gray-500 text-center py-8">No activity notes yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <a
              href={`tel:${loanDetails.customer?.phone}`}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Customer
            </a>
            <a
              href={`mailto:${loanDetails.customer?.email}`}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Customer
            </a>
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <MapPin className="h-4 w-4 mr-2" />
              View Location
            </button>
          </div>

          {/* Status Actions */}
          <div className="flex space-x-3">
            {loanDetails.status === 'open' && (
              <button
                onClick={() => handleStatusUpdate('closed')}
                disabled={saving}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Mark as Paid
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsModal;