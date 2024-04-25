
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import WeatherService from "../services/WeatherService";

const WeatherCard = ({ cityName, latitude, longitude }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let data;
        if (cityName) {
          data = await WeatherService.getCurrentWeather(cityName, null, null);
        } else if (latitude && longitude) {
          data = await WeatherService.getCurrentWeather(null, latitude, longitude);
        }
        setWeatherInfo(data);
      } catch (error) {
        console.error("Error fetching weather information:", error);
      }
    };

    fetchWeather();
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const isDay = (currentTime, sunriseTime, sunsetTime) => {
    const currentHour = new Date(currentTime).getHours();
    const sunriseHour = new Date(sunriseTime).getHours();
    const sunsetHour = new Date(sunsetTime).getHours();

    if (currentHour >= sunriseHour && currentHour < sunsetHour) {
      
      return true;
    } else if (currentHour >= sunsetHour || currentHour < sunriseHour) {
     
      return false;
    }

    
    return true;
  };

  return (
    <View style={styles.container}>
      {weatherInfo && (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Feels Like: {`${weatherInfo.main.feels_like}°C`}
            </Text>
            {isDay(
              currentTime,
              weatherInfo.sys.sunrise * 1000,
              weatherInfo.sys.sunset * 1000
            ) ? (
              <Text style={styles.infoText}>
                Sunset:{" "}
                {new Date(weatherInfo.sys.sunset * 1000).toLocaleTimeString()}
              </Text>
            ) : (
              <Text style={styles.infoText}>
                Sunrise{" "}
                {new Date(weatherInfo.sys.sunrise * 1000).toLocaleTimeString()}
              </Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Visibility: {weatherInfo.visibility}
            </Text>
            <Text style={styles.infoText}>
              Humidity: {weatherInfo.main.humidity}%
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 35,
    height: 150,
    width: 150,
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default WeatherCard;
