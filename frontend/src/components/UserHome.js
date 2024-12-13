import React, { useEffect, useState, useCallback } from 'react';
import { DollarSign, FileText } from 'lucide-react';
import PaymentForm from './PaymentForm';
import Statements from './Statements';
import { getBalanceAndTransactions, getUserProfile } from '../api';

const UserHome = ({ token }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedTab, setSelectedTab] = useState('makePayment');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data including balance and account number
  const fetchUserBalanceAndTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const balanceResponse = await getBalanceAndTransactions(token);
      setBalance(balanceResponse.data.balance);
      setTransactions(balanceResponse.data.transactions);

      const profileResponse = await getUserProfile(token);
      setAccountNumber(profileResponse.data.accountNumber);
    } catch (error) {
      console.error('Failed to fetch balance and transactions:', error);
      setError('Could not load data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserBalanceAndTransactions();
  }, [fetchUserBalanceAndTransactions]);

  const tabs = [
    { id: 'makePayment', label: 'Make a Payment', icon: <DollarSign size={20} color="#FF8C00" /> },
    { id: 'statements', label: 'View Statements', icon: <FileText size={20} color="#FF8C00" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 flex flex-col items-center p-6">
      <div className="max-w-6xl w-full">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Welcome to Your Dashboard
            </h2>
          </div>

          {/* Balance and Account Display */}
          <div className="p-6 bg-gray-700 rounded-xl shadow-lg max-w-md mx-auto -mt-8 mb-6 text-center">
            <p className="text-gray-300 text-lg">Account Number</p>
            <p className="text-xl font-semibold text-orange-400 mb-4">{accountNumber}</p>
            <p className="text-gray-300 text-lg">Current Balance</p>
            <p className="text-3xl font-bold text-orange-500">R{balance.toFixed(2)}</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 justify-center p-4 bg-gray-900 border-b border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 transform ${
                  selectedTab === tab.id
                    ? 'bg-orange-500 text-white shadow-md scale-105'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-orange-400'
                }`}
                aria-label={tab.label}
              >
                {tab.icon}
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Section */}
          <div className="p-6">
            {loading ? (
              <p className="text-center text-gray-400">Loading data...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <div>
                {selectedTab === 'makePayment' && (
                  <PaymentForm
                    token={token}
                    onTransactionUpdate={fetchUserBalanceAndTransactions}
                    balance={balance}
                  />
                )}
                {selectedTab === 'statements' && (
                  <Statements transactions={transactions} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .fade-in {
          animation: fade-in 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UserHome;
