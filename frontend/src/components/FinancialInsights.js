import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const FinancialInsights = ({ transactions = [] }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (transactions.length === 0) {
      setChartData({
        labels: ['No data available'],
        datasets: [
          {
            label: 'No data',
            data: [1],
            backgroundColor: ['#333'], 
          },
        ],
      });
      return;
    }

    const moneyIn = transactions
      .filter((tx) => tx.transactionType === 'incoming')
      .reduce((sum, tx) => sum + tx.amount, 0);

    const moneyOut = transactions
      .filter((tx) => tx.transactionType === 'outgoing')
      .reduce((sum, tx) => sum + tx.amount, 0);

    setChartData({
      labels: ['Money In', 'Money Out'],
      datasets: [
        {
          label: 'In vs Out',
          data: [moneyIn, moneyOut],
          backgroundColor: ['#FFA500', '#1E90FF'], // Orange for "in", blue for "out"
        },
      ],
    });
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#FFA500', 
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: R${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-semibold text-center mb-6 text-orange-500">Financial Insights</h2>
      {transactions.length > 0 ? (
        <Pie data={chartData} options={options} />
      ) : (
        <p className="text-center text-gray-300">No transaction data available to display.</p>
      )}
    </div>
  );
};

export default FinancialInsights;
