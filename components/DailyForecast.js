
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import WeatherService from '../services/WeatherService';

const DailyForecast = ({ cityName, latitude, longitude }) => {
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        let data;
        if (cityName) {
          data = await WeatherService.getDailyForecast(cityName, null, null, 10);
        } else if (latitude && longitude) {
          data = await WeatherService.getDailyForecast(null, latitude, longitude, 10);
        }
    
        if (data && data.list) {
          setDailyData(data.list);
        } else {
          throw new Error('No daily forecast data available');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching daily forecast data:', error); 
        setLoading(false);
      }
    };
  
    fetchDailyData();
  }, [cityName, latitude, longitude]);
  

  useEffect(() => {
    
  }, [dailyData]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text>Loading Daily data....</Text>
      </View>
    );
  }

  const getDayName = (timestamp) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(timestamp * 1000);
    return days[date.getDay()];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>10-Day Forecast</Text>
      {dailyData.map((item, index) => (
        <View key={index} style={styles.forecastItem}>
          <Text style={index === 0 ? styles.today : styles.day}>{index === 0 ? 'Today' : getDayName(item.dt)}</Text>
          <Image source={{ uri: `https://openweathermap.org/img/w/${item.weather[0].icon}.png` }} style={styles.icon} />
          <Text style={styles.temperature}>{`L: ${item.temp.min}° `}</Text>
          <Text style={styles.temperature}>{`H: ${item.temp.max}° `}</Text>
          <Text style={styles.humidity}>{`Humidity: ${item.humidity}%`}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    borderRadius: 35,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  forecastItem: {
    flexDirection: "row",
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 35,
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    textAlign: "center",
    alignItems: "center"
  },
  today: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 16,
    marginBottom: 5,
  },
  humidity: {
    fontSize: 16,
    marginBottom: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
});

export default DailyForecast;

