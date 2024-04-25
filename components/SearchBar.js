import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const SearchBar = ({ onSearch }) => {
  const [cityName, setCityName] = useState('');

  const handleSearch = () => {
    if (cityName.trim() !== '') {
      onSearch(cityName.trim());
      setCityName('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={cityName}
        onChangeText={setCityName}
        placeholder="Enter city name"
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity onPress={handleSearch}>
        <MaterialIcons name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:20,
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
    color: 'white',
  },
});

export default SearchBar;
