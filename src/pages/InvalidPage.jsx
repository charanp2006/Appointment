import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const InvalidPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="mx-auto w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-6xl font-bold text-primary-600">404</span>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <MagnifyingGlassIcon className="h-16 w-16 text-gray-300" />
            </div>
            <div className="relative bg-white rounded-lg shadow-sm p-8 border-2 border-dashed border-gray-200">
              <div className="text-gray-400 text-sm">Page not found</div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-gray-500">
            Don't worry, let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Go to Homepage</span>
          </Link>

          <Link
            to="/search"
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span>Search Doctors</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link 
              to="/search?specialty=Cardiology" 
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              Find Cardiologists
            </Link>
            <Link 
              to="/search?specialty=Dermatology" 
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              Find Dermatologists
            </Link>
            <Link 
              to="/search?type=hospital" 
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              Find Hospitals
            </Link>
            <Link 
              to="/dashboard" 
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              My Dashboard
            </Link>
          </div>
        </div>

        {/* Contact Help */}
        <div className="mt-6 p-4 bg-accent-50 rounded-lg">
          <p className="text-sm text-accent-800">
            Still having trouble? 
            <a 
              href="mailto:support@medibook.com" 
              className="font-medium text-accent-600 hover:text-accent-700 ml-1"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvalidPage;
