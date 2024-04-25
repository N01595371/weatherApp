// services/LocationService.js

const API_KEY = "d5465772d11d4bd28c7c13a68d7b94e2";

const LocationService = {
  getCurrentLocation: async () => {
    try {
      const response = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }
      const data = await response.json();
      if (!data.latitude || !data.longitude) {
        throw new Error("Latitude or longitude not available");
      }
      return {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        city: data.city,
        country: data.country_name,
      };
    } catch (error) {
      console.error("Error fetching current location:", error);
      throw error;
    }
  },
};

export default LocationService;
