import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { appointments } from '../data/mockData';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your appointments and healthcare</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                <p className="text-gray-600">Total Appointments</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-warning-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(a => a.status === 'pending').length}
                </p>
                <p className="text-gray-600">Pending</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <UserIcon className="h-8 w-8 text-success-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(a => a.status === 'confirmed').length}
                </p>
                <p className="text-gray-600">Confirmed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">My Appointments</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      appointment.status === 'confirmed' ? 'bg-success-500' : 'bg-warning-500'
                    }`}></div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {appointment.doctorName}
                      </h3>
                      <p className="text-gray-600">{appointment.specialty}</p>
                      <p className="text-sm text-gray-500">{appointment.hospital}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-900">
                      {appointment.date} at {appointment.time}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      Status: {appointment.status}
                    </p>
                    <p className="text-sm text-gray-500">{appointment.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {appointments.length === 0 && (
            <div className="p-12 text-center">
              <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
              <p className="text-gray-600 mb-4">Book your first appointment with a healthcare provider.</p>
              <Link
                to="/search"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Find a Doctor
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
