import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, CreditCard, AlertCircle } from 'lucide-react';
import api from '../api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    idNumber: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'idNumber' && !/^\d{0,13}$/.test(value)) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.name.length > 0 && formData.surname.length > 0;
      case 2:
        return formData.idNumber.length === 13;
      case 3:
        return formData.email.includes('@') && formData.password.length >= 8;
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      if (validateStep(currentStep)) {
        setCurrentStep((prev) => prev + 1);
      }
      return;
    }

    setError('');
    setMessage('');
    setLoading(true);

    if (!Object.values(formData).every((val) => val)) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      await api.post('/api/auth/register', formData);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      setError(error.response?.data.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-orange-500 mb-1">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 focus:ring-2 focus:ring-orange-500"
                  placeholder="John"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-orange-500 mb-1">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 focus:ring-2 focus:ring-orange-500"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-orange-500 mb-1">ID Number</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your 13-digit ID number"
                  maxLength="13"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-orange-500 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 focus:ring-2 focus:ring-orange-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-orange-500 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 focus:ring-2 focus:ring-orange-500"
                  placeholder="Choose a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center text-red-500">
            <p>Invalid step. Please refresh the page or start over.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-orange-500">Create Account</h2>
            <p className="text-gray-400 mt-2">Step {currentStep} of 3</p>
          </div>

          {error && (
            <div className="mb-6 text-red-500 bg-red-800 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5 inline-block mr-2" />
              {error}
            </div>
          )}

          {message && (
            <div className="mb-6 text-green-400 bg-green-800 p-3 rounded-lg">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep()}

            <div className="flex gap-3 mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="flex-1 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-800"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading || !validateStep(currentStep)}
                className={`flex-1 py-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Please wait...' : currentStep === 3 ? 'Create Account' : 'Next'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="text-orange-500 hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
