import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import LocationInfo from "../components/LocationInfo";
import CurrentWeather from "../components/CurrentWeather";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import WeatherCard from "../components/WeatherCard";
import LocationService from "../services/LocationServices";
import WeatherService from "../services/WeatherService";

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        const locationData = await LocationService.getCurrentLocation();

        setCurrentLocation(locationData);

        const weather = await WeatherService.getCurrentWeather(
          null,
          locationData.latitude,
          locationData.longitude
        );
        setWeatherData(weather);

        setLoading(false);
      } catch (error) {
        setError("Error fetching location or weather");
        setLoading(false);
      }
    };

    fetchLocationAndWeather();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>My Location</Text>
        <LocationInfo locationData={currentLocation} />
        <CurrentWeather
          latitude={currentLocation.latitude}
          longitude={currentLocation.longitude}
        />
        <ScrollView>
          <HourlyForecast
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
          />
          <DailyForecast
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
          />
          <WeatherCard
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#36454F",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
});

export default HomeScreen;
