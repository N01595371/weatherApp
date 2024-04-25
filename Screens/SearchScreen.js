import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WeatherService from "../services/WeatherService";
import LocationService from "../services/LocationServices";
import LocationInfo from "../components/LocationInfo";
import CurrentWeather from "../components/CurrentWeather";
import SearchBar from "../components/SearchBar";

const SearchScreen = ({ route }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationData = await LocationService.getCurrentLocation();
        setLatitude(locationData.latitude);
        setLongitude(locationData.longitude);
      } catch (error) {
        console.error("Error fetching current location:", error);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (route.params && route.params.cityName && route.params.weatherData) {
      const { cityName, latitude, longitude, ...data } =
        route.params.weatherData;
      const cityId = cityName.toLowerCase().replace(/\s+/g, "_");

      setWeatherData((prevData) => {
        const existingCityIndex = prevData.findIndex(
          (item) => item.cityId === cityId
        );
        if (existingCityIndex === -1) {
          return [
            ...prevData,
            { cityId, cityName, latitude, longitude, ...data },
          ];
        } else {
          console.log("City data already exists");
          return prevData;
        }
      });
    }
  }, [route.params]);
  const handleSearch = useCallback(
    async (cityName) => {
      try {
        if (cityName.trim().length === 0) {
          throw new Error("City name is invalid. Please try again.");
        }

        const locationData = await LocationService.getCurrentLocation();

        const { latitude, longitude } = locationData;
        const data = await WeatherService.getCurrentWeather(cityName);

        const cityId = cityName.toLowerCase().replace(/\s+/g, "_");

        if (!weatherData.find((item) => item.cityId === cityId)) {
          navigation.navigate("CityWeatherScreen", {
            cityName,
            latitude,
            longitude,
            weatherData: { cityId, cityName, latitude, longitude, ...data },
          });
        } else {
          console.log("City data already exists");
        }
      } catch (error) {
        console.error("Error handling search:", error);
        setError(error.message);
      }
    },
    [navigation, weatherData]
  );

  const handleAdd = useCallback(
    async (cityName) => {
      try {
        if (cityName.trim().length > 0) {
          const locationData = await LocationService.getCurrentLocation();
          const { latitude, longitude } = locationData;
          const data = await WeatherService.getCurrentWeather(cityName);

          const cityId = cityName.toLowerCase().replace(/\s+/g, "_");

          if (!weatherData.find((item) => item.cityId === cityId)) {
            setWeatherData((prevData) => [
              ...prevData,
              { cityId, cityName, latitude, longitude, ...data },
            ]);
          } else {
            console.log("City data already exists");
          }
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(error.message);
      }
    },
    [weatherData]
  );

  const removeCity = (cityId) => {
    setWeatherData((prevData) =>
      prevData.filter((item) => item.cityId !== cityId)
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CityDetailScreen', {
          cityName: item.cityName,
          latitude: item.latitude,
          longitude: item.longitude,
          weatherData: item
        })}
        onLongPress={() =>
          navigation.navigate("CityDetailScreen", {
            cityName: item.cityName,
            latitude: item.latitude,
            longitude: item.longitude,
            weatherData: item,
          })
        }
      >
        <View style={styles.weatherContainer}>
          <LocationInfo style={styles.weatherlist} locationData={item} />
          <CurrentWeather
            style={styles.weatherlist}
            cityName={item.cityName}
            latitude={item.latitude}
            longitude={item.longitude}
          />
          <TouchableOpacity
            onPress={() => removeCity(item.cityId)}
            style={styles.deleteButton}
          >
            <MaterialCommunityIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={handleSearch} />

      <FlatList
        data={weatherData}
        renderItem={renderItem}
        keyExtractor={(item) => item.cityId}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  error: {
    marginTop: 20,
    color: "red",
  },
  weatherContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 35,
    marginBottom: 20,
    padding: 10,
    color: "white",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default SearchScreen;
