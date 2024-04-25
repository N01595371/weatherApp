import React from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";

const LocationInfo = ({ locationData, loading }) => {
  const cityName = locationData
    ? locationData.name || locationData.city
    : "Fetching location...";
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text>Loading your location...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <Text style={styles.location}>{cityName}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  location: {
    fontSize: 30,
    marginBottom: 10,
    textTransform: "uppercase",
    color: "white",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default LocationInfo;
