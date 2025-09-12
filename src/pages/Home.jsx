import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  PhoneIcon,
  UserGroupIcon,
  HeartIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { doctors, specialties, hospitals } from '../data/mockData';
import locationService from '../services/locationService';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyDoctors, setNearbyDoctors] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Try to get user location for nearby suggestions
    const getUserLocation = async () => {
      try {
        const location = await locationService.getCurrentPosition();
        setUserLocation(location);
        
        // Get nearby doctors (within 10km)
        const nearby = locationService.getNearbyProviders(doctors, 10);
        setNearbyDoctors(nearby.slice(0, 4)); // Show top 4
      } catch (error) {
        console.log('Location access denied or failed:', error.message);
        // Show random featured doctors if location is not available
        setNearbyDoctors(doctors.slice(0, 4));
      }
    };

    getUserLocation();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSpecialtyClick = (specialty) => {
    navigate(`/search?specialty=${encodeURIComponent(specialty.name)}`);
  };

  const handleNearbySearch = async () => {
    try {
      await locationService.getCurrentPosition();
      navigate('/search?nearby=true');
    } catch (error) {
      alert('Please allow location access to find nearby healthcare providers.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Find & Book
                <span className="block text-primary-200">Healthcare Easily</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Connect with trusted doctors and hospitals near you. Book appointments instantly 
                and manage your healthcare journey with confidence.
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search doctors, hospitals, or specialties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-lg border-2 border-transparent focus:border-primary-300 focus:ring-2 focus:ring-primary-200 outline-none text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleNearbySearch}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-400 rounded-lg transition-colors"
                >
                  <MapPinIcon className="h-5 w-5" />
                  <span>Find Nearby</span>
                </button>
                <Link
                  to="/search?type=hospital"
                  className="flex items-center space-x-2 px-6 py-3 bg-transparent border border-white hover:bg-white hover:text-primary-600 rounded-lg transition-colors"
                >
                  <span>View Hospitals</span>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Healthcare professionals"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Specialty
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the right healthcare professional for your needs
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {specialties.slice(0, 12).map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => handleSpecialtyClick(specialty)}
                className="group p-6 bg-gray-50 hover:bg-primary-50 rounded-xl text-center transition-all hover:shadow-md hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">{specialty.icon}</div>
                <h3 className="font-medium text-gray-900 group-hover:text-primary-600 text-sm">
                  {specialty.name}
                </h3>
              </button>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/search"
              className="inline-flex items-center px-6 py-3 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              View All Specialties
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {userLocation ? 'Doctors Near You' : 'Featured Doctors'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {userLocation ? 
                'Top-rated healthcare professionals in your area' :
                'Highly recommended healthcare professionals'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyDoctors.map((doctor) => (
              <Link
                key={doctor.id}
                to={`/doctor/${doctor.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 group"
              >
                <div className="text-center">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
                  <p className="text-xs text-gray-500 mb-3">{doctor.hospital}</p>
                  
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-xs text-gray-500">({doctor.reviewCount})</span>
                  </div>
                  
                  {doctor.distance && (
                    <p className="text-xs text-primary-600 font-medium">
                      {locationService.formatDistance(doctor.distance)}
                    </p>
                  )}
                  
                  <div className="text-sm text-gray-700 font-medium mt-2">
                    ${doctor.consultationFee}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/search"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              View All Doctors
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose MediBook?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your health is our priority. We make healthcare accessible and convenient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Find Nearby</h3>
              <p className="text-gray-600">
                Locate healthcare providers near you with precise location-based search and real-time availability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Booking</h3>
              <p className="text-gray-600">
                Book appointments instantly with real-time availability. No more waiting on hold or playing phone tag.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Providers</h3>
              <p className="text-gray-600">
                All healthcare providers are verified and rated by real patients to ensure quality care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary-700 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-200">Verified Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-200">Partner Hospitals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-gray-200">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-gray-200">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <HeartIcon className="h-12 w-12 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of patients who trust MediBook for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Find a Doctor
            </Link>
            <Link
              to="/search?type=hospital"
              className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Find Hospitals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
