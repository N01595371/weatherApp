const API_KEY = "a99a93e7a170901cd37da89f1126eeef";

const WeatherService = {
  getCurrentWeather: async (query, latitude, longitude) => {
    try {
      let url;
      if (query) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`;
      } else if (latitude && longitude) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      } else {
        throw new Error(
          "Either city name or latitude and longitude must be provided."
        );
      }

      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw error;
    }
  },
  getHourlyForecast: async (query, latitude, longitude) => {
    try {
      let url;

      if (query) {
        url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${query}&appid=${API_KEY}&units=metric`;
      } else if (latitude && longitude) {
        url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      } else {
        throw new Error(
          "Either city name or latitude and longitude must be provided."
        );
      }
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching hourly forecast:", error);
      throw error;
    }
  },

  getDailyForecast: async (query, latitude, longitude, count) => {
    try {
      let url;
      if (query) {
        url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${query}&cnt=${count}&appid=${API_KEY}&units=metric`;
      } else if (latitude && longitude) {
        url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=${count}&appid=${API_KEY}&units=metric`;
      } else {
        throw new Error(
          "Either city name or latitude and longitude must be provided."
        );
      }

      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching daily forecast:", error);
      throw error;
    }
  },
};

export default WeatherService;
