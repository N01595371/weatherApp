import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import WeatherService from "../services/WeatherService";

const HourlyForecast = ({ cityName, latitude, longitude }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHourlyData = async () => {
      try {
        let data;
        if (cityName) {
          data = await WeatherService.getHourlyForecast(cityName, null, null);
        } else if (latitude && longitude) {
          data = await WeatherService.getHourlyForecast(
            null,
            latitude,
            longitude
          );
        }

        if (data && data.list) {
          setHourlyData(data.list);
        } else {
          console.error("Error fetching hourly forecast: Invalid response");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hourly forecast data:", error);
        setLoading(false);
      }
    };

    fetchHourlyData();
  }, [cityName, latitude, longitude]);

  useEffect(() => {}, [hourlyData]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    return `${hours}${ampm}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        {hourlyData.map((item, index) => (
          <View style={styles.hourlyItem} key={index}>
            <Text>{index === 0 ? "Now" : formatTime(item.dt)}</Text>
            <Image
              source={{
                uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
              }}
              style={styles.icon}
            />
            <Text>{`${item.main.temp}°`}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "white",
    margin: 10,
    padding: 20,
    borderRadius: 40,
  },
  scrollView: {
    flexDirection: "row",
    alignItems: "center",
  },
  hourlyItem: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default HourlyForecast;
