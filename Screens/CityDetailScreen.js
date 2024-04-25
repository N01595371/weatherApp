

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LocationInfo from '../components/LocationInfo';
import CurrentWeather from '../components/CurrentWeather'; 
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import WeatherCard from '../components/WeatherCard';
import { useNavigation } from '@react-navigation/native';

const CityDetailScreen = ({ route }) => {
  const { cityName, latitude, longitude, weatherData } = route.params;
  const navigation = useNavigation();

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text>
            <Ionicons name="close" size={24} color="white" /> 
          </Text>
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
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});

export default CityDetailScreen;
