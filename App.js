import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./Screens/HomeScreen";
import SearchScreen from "./Screens/SearchScreen";
import CityWeatherScreen from "./Screens/CityWeatherScreen";
import CityDetailScreen from "./Screens/CityDetailScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={HomeTabNavigator}
          options={{ headerShown: false, title: "Weather" }}
        />
        <Stack.Screen
          name="CityWeatherScreen"
          component={CityWeatherScreen}
          options={{ headerShown: false, title: "Weather" }}
        />
        <Stack.Screen
          name="CityDetailScreen"
          component={CityDetailScreen}
          options={{ headerShown: false, title: "Weather" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
