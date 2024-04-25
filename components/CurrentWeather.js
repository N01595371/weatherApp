import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import WeatherService from "../services/WeatherService";

const CurrentWeather = ({ cityName, latitude, longitude }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let data;
        if (cityName) {
          data = await WeatherService.getCurrentWeather(cityName);
        } else if (latitude && longitude) {
          data = await WeatherService.getCurrentWeather(
            null,
            latitude,
            longitude
          );
        }
        setWeatherInfo(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching current weather data:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [cityName, latitude, longitude]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {weatherInfo && (
        <View style={styles.HWList}>
          <Text style={styles.temperature}>{`${weatherInfo.main.temp}°`}</Text>
          <Text
            style={styles.weather}
          >{` ${weatherInfo.weather[0].main} `}</Text>
          <Text
            style={styles.highLowTemp}
          >{`H: ${weatherInfo.main.temp_max}°, L: ${weatherInfo.main.temp_min}°`}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  weather: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
  },
  highLowTemp: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
  },
  temperature: {
    fontSize: 50,
    color: "white",
    textAlign: "center",
  },
});
export default CurrentWeather;
