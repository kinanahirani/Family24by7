import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const GoogleLocationSearch = () => {
  return (
    <View style={{flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder="Search for a location"
        query={{
          key: 'AIzaSyB09PIaNrUXMikGy415TQ3tCqYy8uXbpTs',
          language: 'en',
        }}
        onPress={(data, details = null) => {
          // Handle the selected location
          console.log(data);
          console.log(details);
          setDestination(data.description); // Update the destination state with the selected location
        }}
        styles={{
          container: {
            display: isSearching ? 'flex' : 'none', // Show/hide the component based on isSearching state
          },
          textInput: {
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          // ...other styles
        }}
      />
    </View>
  );
};

export default GoogleLocationSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
});

            {/* <View style={{width:'100%', alignItems:'center'}}>
              <GooglePlacesAutocomplete
                placeholder="Search for a location"
                query={{
                  key: 'AIzaSyB09PIaNrUXMikGy415TQ3tCqYy8uXbpTs',
                  language: 'en',
                }}
                onPress={(data, details = null) => {
                  console.log(data);
                  console.log(details);
                  setDestination(data.description); // Update the destination state with the selected location
                }}
                styles={{
                  container: {
                    display: isSearching ? 'flex' : 'none', // Show/hide the component based on isSearching state
                  },
                  textInput: {
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                  },
                  // ...other styles
                }}
                isSearching={isSearching}
              />
              <TextInput
                multiline
                mode="outlined"
                label="Destination"
                style={[styles.textInput, {marginTop: verticalScale(20)}]}
                onFocus={() => setIsSearching(true)} // Set isSearching to true when TextInput is focused
                onBlur={() => setIsSearching(false)} // Set isSearching to false when TextInput loses focus
                error={destination.length > 200}
              />
            </View> */}