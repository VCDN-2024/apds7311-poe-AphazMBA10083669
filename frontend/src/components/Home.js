import React, { useState } from 'react';
import { ArrowRight, Globe, Shield, ChartBar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-orange-500" />, // Updated color to orange
      title: "Global Reach",
      description: "Connect and transact with businesses worldwide through our secure platform.",
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />, // Updated color to orange
      title: "Secure Platform",
      description: "Enterprise-grade security protecting your financial transactions.",
    },
    {
      icon: <ChartBar className="w-8 h-8 text-orange-500" />, // Updated color to orange
      title: "Real-time Analytics",
      description: "Comprehensive insights into your international transactions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-blue-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
              Welcome to <span className="text-orange-500">Netbankers</span>
              <span className="block text-blue-200">Your Financial Gateway</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-200 mb-10">
              Experience secure and seamless international payments with real-time insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <button className="inline-flex items-center px-8 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors duration-200">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-8 py-3 border-2 border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-100/10 transition-colors duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Netbankers?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of secure and efficient business payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">About Netbankers</h2>
            <p className="text-gray-600 mb-6">
              Netbankers is a platform designed to facilitate secure and efficient financial transactions across the globe.
              With our cutting-edge analytics and enterprise-grade security, we empower businesses to scale their international presence.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-orange-500">© Netbankers 2024. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
