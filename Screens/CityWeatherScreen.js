

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import LocationInfo from '../components/LocationInfo';
import CurrentWeather from '../components/CurrentWeather'; 
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import WeatherCard from '../components/WeatherCard';
import { useNavigation } from '@react-navigation/native';

const CityWeatherScreen = ({ route }) => {
  const { cityName, latitude, longitude, weatherData } = route.params;
  const navigation = useNavigation();

 
  const handleAdd = () => {
    navigation.navigate('Main', { screen: 'Search', params: { cityName, weatherData } });
  };
  
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    
      <LocationInfo locationData={weatherData} />
      <CurrentWeather cityName={cityName} latitude={latitude} longitude={longitude} />
      <ScrollView>
      <HourlyForecast cityName={cityName} latitude={latitude} longitude={longitude} />
      <DailyForecast cityName={cityName} latitude={latitude} longitude={longitude} />
      <WeatherCard cityName={cityName} latitude={latitude} longitude={longitude} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#36454F',
    color: 'white'

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 30,
   
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  weatherInfo: {
    flex: 1,
  },
});

export default CityWeatherScreen;
