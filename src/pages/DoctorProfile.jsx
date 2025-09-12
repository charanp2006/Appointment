import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { doctors } from '../data/mockData';

const DoctorProfile = () => {
  const { id } = useParams();
  const doctor = doctors.find(d => d.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor not found</h2>
          <Link to="/search" className="text-primary-600 hover:underline">
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-48 h-48 rounded-lg object-cover mx-auto md:mx-0"
            />
            
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
              <p className="text-xl text-primary-600 mb-2">{doctor.specialty}</p>
              <p className="text-gray-600 mb-4">{doctor.qualification}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-gray-500">({doctor.reviewCount} reviews)</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">{doctor.experience} years experience</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <MapPinIcon className="h-5 w-5" />
                <span>{doctor.hospital}</span>
              </div>

              <div className="text-2xl font-bold text-gray-900">
                ${doctor.consultationFee}
                <span className="text-base font-normal text-gray-600 ml-2">consultation fee</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-gray-600 mb-6">{doctor.about}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Services</h3>
              <div className="space-y-2">
                {doctor.services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Appointment</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-4">Available time slots for the next few days:</p>
                
                {doctor.availability.map((day, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">{day.date}</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {day.slots.map((slot, slotIndex) => (
                        <button
                          key={slotIndex}
                          className="px-3 py-2 text-sm border border-primary-200 text-primary-600 rounded hover:bg-primary-50 transition-colors"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <Link
                  to={`/book/doctor/${doctor.id}`}
                  className="w-full mt-4 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors text-center block font-medium"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
