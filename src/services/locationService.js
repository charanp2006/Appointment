// Location service for handling geolocation and nearby searches

class LocationService {
  constructor() {
    this.currentLocation = null;
    this.watchId = null;
  }

  // Get user's current position
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: Date.now()
          };
          resolve(this.currentLocation);
        },
        (error) => {
          let errorMessage;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
            default:
              errorMessage = 'An unknown error occurred';
              break;
          }
          reject(new Error(errorMessage));
        },
        options
      );
    });
  }

  // Watch position changes (for real-time updates)
  watchPosition(callback, errorCallback) {
    if (!navigator.geolocation) {
      errorCallback(new Error('Geolocation is not supported'));
      return null;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000 // 1 minute
    };

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now()
        };
        callback(this.currentLocation);
      },
      errorCallback,
      options
    );

    return this.watchId;
  }

  // Stop watching position
  stopWatching() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // Calculate distance between two points using Haversine formula
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
  }

  // Convert degrees to radians
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Get distance to a healthcare provider
  getDistanceToProvider(provider) {
    if (!this.currentLocation || !provider.latitude || !provider.longitude) {
      return null;
    }

    return this.calculateDistance(
      this.currentLocation.latitude,
      this.currentLocation.longitude,
      provider.latitude,
      provider.longitude
    );
  }

  // Sort providers by distance
  sortByDistance(providers) {
    if (!this.currentLocation) {
      return providers;
    }

    return [...providers]
      .map(provider => ({
        ...provider,
        distance: this.getDistanceToProvider(provider)
      }))
      .filter(provider => provider.distance !== null)
      .sort((a, b) => a.distance - b.distance);
  }

  // Get nearby providers within a radius (in km)
  getNearbyProviders(providers, radius = 10) {
    if (!this.currentLocation) {
      return [];
    }

    return providers
      .map(provider => ({
        ...provider,
        distance: this.getDistanceToProvider(provider)
      }))
      .filter(provider => provider.distance !== null && provider.distance <= radius)
      .sort((a, b) => a.distance - b.distance);
  }

  // Get formatted address from coordinates using reverse geocoding
  async getReverseGeocode(latitude, longitude) {
    try {
      // This would typically use a geocoding service like Google Maps API
      // For now, return a mock response
      return {
        address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        city: 'Current City',
        state: 'Current State',
        country: 'Current Country'
      };
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return null;
    }
  }

  // Check if location is fresh (less than 5 minutes old)
  isLocationFresh() {
    if (!this.currentLocation) return false;
    return (Date.now() - this.currentLocation.timestamp) < 300000; // 5 minutes
  }

  // Get or refresh current location
  async getLocation(forceRefresh = false) {
    if (!forceRefresh && this.isLocationFresh()) {
      return this.currentLocation;
    }
    return await this.getCurrentPosition();
  }

  // Format distance for display
  formatDistance(distance) {
    if (distance === null || distance === undefined) {
      return 'Distance unavailable';
    }
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m away`;
    }
    return `${distance}km away`;
  }

  // Request location permission
  async requestLocationPermission() {
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      return permission.state;
    } catch (error) {
      console.error('Permission query failed:', error);
      return 'prompt';
    }
  }
}

// Create and export a singleton instance
const locationService = new LocationService();
export default locationService;
