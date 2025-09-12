import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { hospitals } from '../data/mockData';

const HospitalProfile = () => {
  const { id } = useParams();
  const hospital = hospitals.find(h => h.id === parseInt(id));

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hospital not found</h2>
          <Link to="/search" className="text-primary-600 hover:underline">Back to search</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{hospital.name}</h1>
          <p className="text-xl text-primary-600 mb-4">{hospital.type}</p>
          <p className="text-gray-600 mb-6">{hospital.about}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Departments</h3>
              <div className="space-y-2">
                {hospital.departments.map((dept, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                    <span>{dept}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Facilities</h3>
              <div className="space-y-2">
                {hospital.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/search"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Find Doctors in this Hospital
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;
