import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  StarIcon, 
  MapPinIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { doctors, hospitals, specialties } from '../data/mockData';
import locationService from '../services/locationService';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  const specialty = queryParams.get('specialty') || '';
  const nearby = queryParams.get('nearby') === 'true';
  const type = queryParams.get('type') || 'doctor'; // doctor or hospital

  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filters, setFilters] = useState({
    rating: '',
    priceRange: '',
    availability: 'any',
    sortBy: 'relevance',
    specialty: ''
  });
  const [tempFilters, setTempFilters] = useState({
    rating: '',
    priceRange: '',
    availability: 'any',
    sortBy: 'relevance',
    specialty: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasUnappliedFilters, setHasUnappliedFilters] = useState(false);

  // Helper functions
  const isDefaultFilterState = (filterState) => {
    return Object.values(filterState).every(value => 
      value === '' || value === 'relevance' || value === 'any'
    );
  };

  const hasActiveFilters = () => {
    return !isDefaultFilterState(filters);
  };

  const isResetState = () => {
    return isDefaultFilterState(tempFilters) && hasActiveFilters();
  };

  const getFilterDisplayName = (filterType, value) => {
    switch (filterType) {
      case 'rating':
        return `${value}+ Stars`;
      case 'priceRange':
        if (value === '200') return '$200+';
        return `$${value.replace('-', ' - $')}`;
      case 'specialty':
        return value;
      case 'sortBy':
        return `Sort: ${value.charAt(0).toUpperCase() + value.slice(1)}`;
      case 'availability':
        return value === 'any' ? null : `Available: ${value}`;
      default:
        return value;
    }
  };

  const getActiveFilterChips = () => {
    const chips = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value !== 'relevance' && value !== 'any') {
        const displayName = getFilterDisplayName(key, value);
        if (displayName) {
          chips.push({ key, value, displayName });
        }
      }
    });
    return chips;
  };

  useEffect(() => {
    const searchResults = async () => {
      setLoading(true);
      
      let data = type === 'hospital' ? hospitals : doctors;
      let searchResults = [...data];

      // Apply search query filter
      if (searchQuery) {
        searchResults = searchResults.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.specialty && item.specialty.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.hospital && item.hospital.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.type && item.type.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      // Apply specialty filter from URL params
      if (specialty) {
        searchResults = searchResults.filter(item =>
          item.specialty && item.specialty.toLowerCase() === specialty.toLowerCase()
        );
      }

      // Apply nearby filter
      if (nearby) {
        try {
          await locationService.getCurrentPosition();
          searchResults = locationService.getNearbyProviders(searchResults, 15); // 15km radius
        } catch (error) {
          console.log('Location access denied');
        }
      }

      setResults(searchResults);
      setFilteredResults(searchResults);
      setLoading(false);
    };

    searchResults();
  }, [searchQuery, specialty, nearby, type]);

  useEffect(() => {
    // Apply filters and sorting
    let filtered = [...results];

    // Rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(item => item.rating >= minRating);
    }

    // Price range filter (for doctors)
    if (filters.priceRange && type === 'doctor') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(item => {
        const fee = item.consultationFee;
        return max ? fee >= min && fee <= max : fee >= min;
      });
    }

    // Specialty filter
    if (filters.specialty) {
      filtered = filtered.filter(item =>
        item.specialty && item.specialty.toLowerCase() === filters.specialty.toLowerCase()
      );
    }

    // Sort results
    if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'price' && type === 'doctor') {
      filtered.sort((a, b) => a.consultationFee - b.consultationFee);
    } else if (filters.sortBy === 'distance' && nearby) {
      // Already sorted by distance if nearby
    } else {
      // Default relevance sorting
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    setFilteredResults(filtered);
  }, [filters, results, type, nearby]);

  const handleTempFilterChange = (filterType, value) => {
    setTempFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    
    // Check if there are unapplied changes
    const updatedTempFilters = { ...tempFilters, [filterType]: value };
    const hasChanges = Object.keys(updatedTempFilters).some(
      key => updatedTempFilters[key] !== filters[key]
    );
    setHasUnappliedFilters(hasChanges);
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    setHasUnappliedFilters(false);
    // Trigger loading state to show filtering in progress
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => setLoading(false), 800);
  };

  const removeFilter = (filterType) => {
    const defaultValue = filterType === 'sortBy' ? 'relevance' : 
                        filterType === 'availability' ? 'any' : '';
    
    const updatedFilters = {
      ...filters,
      [filterType]: defaultValue
    };
    
    const updatedTempFilters = {
      ...tempFilters,
      [filterType]: defaultValue
    };
    
    setFilters(updatedFilters);
    setTempFilters(updatedTempFilters);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      rating: '',
      priceRange: '',
      availability: 'any',
      sortBy: 'relevance',
      specialty: ''
    };
    setTempFilters(resetFilters);
    
    // Check if current applied filters are different from reset state
    const hasActiveFilters = Object.keys(filters).some(
      key => filters[key] !== resetFilters[key]
    );
    
    // If there are active filters, enable the Apply button to apply the reset
    setHasUnappliedFilters(hasActiveFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {type === 'hospital' ? 'Hospitals' : 'Doctors'}
            {searchQuery && ` matching "${searchQuery}"`}
            {specialty && ` in ${specialty}`}
            {nearby && ' near you'}
          </h1>
          <p className="text-gray-600 mb-4">
            Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
          </p>
          
          {/* Active Filter Chips */}
          {getActiveFilterChips().length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-gray-600 mr-2">Active filters:</span>
              {getActiveFilterChips().map((chip) => (
                <div
                  key={`${chip.key}-${chip.value}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800 border border-primary-200"
                >
                  <span>{chip.displayName}</span>
                  <button
                    onClick={() => removeFilter(chip.key)}
                    className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-primary-200 transition-colors"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {getActiveFilterChips().length > 1 && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors border border-gray-300"
                >
                  Clear All
                  <XMarkIcon className="ml-1 h-3 w-3" />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                >
                  <FunnelIcon className="h-5 w-5" />
                </button>
              </div>

              <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={tempFilters.sortBy}
                    onChange={(e) => handleTempFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="rating">Rating</option>
                    {type === 'doctor' && <option value="price">Price</option>}
                    {nearby && <option value="distance">Distance</option>}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={tempFilters.rating}
                    onChange={(e) => handleTempFilterChange('rating', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>

                {/* Price Range (for doctors) */}
                {type === 'doctor' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consultation Fee
                    </label>
                    <select
                      value={tempFilters.priceRange}
                      onChange={(e) => handleTempFilterChange('priceRange', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Any Price</option>
                      <option value="0-100">$0 - $100</option>
                      <option value="100-150">$100 - $150</option>
                      <option value="150-200">$150 - $200</option>
                      <option value="200">$200+</option>
                    </select>
                  </div>
                )}

                {/* Specialty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <select
                    value={tempFilters.specialty}
                    onChange={(e) => handleTempFilterChange('specialty', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map(spec => (
                      <option key={spec.id} value={spec.name}>{spec.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Apply Filters Button */}
                <div className="pt-6 border-t border-gray-200 mt-6">
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={handleApplyFilters}
                      disabled={!hasUnappliedFilters}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                        hasUnappliedFilters
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
{isResetState() && hasUnappliedFilters ? 'Apply Reset' : 'Apply Filters'}
                      {hasUnappliedFilters && (
                        <span className="ml-2 w-2 h-2 bg-white rounded-full inline-block"></span>
                      )}
                    </button>
                    
                    <button
                      onClick={handleResetFilters}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Applying filters...</p>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters.
                </p>
                <Link
                  to="/search"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Start New Search
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((item) => (
                  <Link
                    key={item.id}
                    to={type === 'hospital' ? `/hospital/${item.id}` : `/doctor/${item.id}`}
                    className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full md:w-32 h-32 object-cover rounded-lg"
                      />
                      
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-primary-600 font-medium">
                              {item.specialty || item.type}
                            </p>
                            {item.hospital && (
                              <p className="text-gray-600 text-sm">{item.hospital}</p>
                            )}
                          </div>
                          
                          <div className="text-right mt-2 md:mt-0">
                            <div className="flex items-center justify-end space-x-1 mb-1">
                              <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="font-medium">{item.rating}</span>
                              <span className="text-gray-500 text-sm">({item.reviewCount})</span>
                            </div>
                            {item.consultationFee && (
                              <p className="text-lg font-semibold text-gray-900">
                                ${item.consultationFee}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <MapPinIcon className="h-4 w-4" />
                            <span>{item.address}</span>
                          </div>
                          {item.distance && (
                            <span className="text-primary-600 font-medium">
                              {locationService.formatDistance(item.distance)}
                            </span>
                          )}
                        </div>

                        {item.about && (
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {item.about}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.services && item.services.slice(0, 3).map((service, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                          {item.departments && item.departments.slice(0, 3).map((dept, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                            >
                              {dept}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
