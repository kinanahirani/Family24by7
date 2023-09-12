import {StyleSheet, Text, TouchableOpacity, View, Switch} from 'react-native';
import React, {useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';
import Slider from 'react-native-slider';
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Geocoder from 'react-native-geocoding';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const customMapStyle = require('../../map/map.json');

const AddNewPlaceScreen = ({navigation}) => {
  const [radius, setRadius] = useState(328);
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 37.2,
    longitude: 50.1,
  });
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.2,
    longitude: 50.1,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [address, setAddress] = useState('');
  Geocoder.init('AIzaSyB09PIaNrUXMikGy415TQ3tCqYy8uXbpTs');
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleSliderChange = value => {
    if (value < 328) {
      setRadius(328);
    } else {
      setRadius(value);
    }
  };

  const customTextInputTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgba(119,79,251,1)', // Change the focused color here
    },
  };

  const handleRegionChange = newRegion => {
    // Update marker position based on the new region
    setMarkerPosition({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });

    // Update the map region state
    setMapRegion(newRegion);
  };

  return (
    <PaperProvider theme={customTextInputTheme}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            height: moderateScale(50),
            alignItems: 'center',
            paddingHorizontal: horizontalScale(16),
            borderBottomWidth: 0.2,
            borderBottomColor: 'rgba(128,128,128,0.5)',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Ionicons name="arrow-back" color="black" size={25} />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              fontSize: moderateScale(18),
              fontWeight: '400',
              color: 'rgba(15, 24, 40, 1)',
            }}>
            Add a place
          </Text>
        </View>
        <MapView
          customMapStyle={customMapStyle}
          //   style={{width: '100%', height: '50%'}}
          style={{flex: 1}}
          region={mapRegion}
          onRegionChange={handleRegionChange}>
          {/* <Marker draggable coordinate={{latitude, longitude}}>
          <CMarker img={userData.profilePicture} />
        </Marker> */}

          <Marker
            draggable
            coordinate={markerPosition}
            onDragEnd={async e => {
              try {
                const newMarkerPosition = e.nativeEvent.coordinate;
                console.log('New Marker Position:', newMarkerPosition);

                const location = await Geocoder.from(newMarkerPosition);
                const address = location.results[0].formatted_address;

                setMarkerPosition(newMarkerPosition);
                console.log(newMarkerPosition, '..newMarkerPosition');
                setAddress(address);
                console.log(address, '...address');
              } catch (error) {
                console.error('Error fetching location:', error);
              }
            }}></Marker>
        </MapView>
        <View style={{backgroundColor: 'white', padding: moderateScale(15)}}>
          <Text
            style={{color: 'rgba(128,128,128,1)', fontSize: moderateScale(14)}}>
            Swipe to change radius
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Slider
              value={radius}
              minimumTrackTintColor="rgba(119,79,251,255)"
              onValueChange={handleSliderChange}
              minimumValue={328}
              maximumValue={1000}
              step={1}
              thumbTintColor="rgba(119,79,251,255)"
              thumbStyle={{
                width: horizontalScale(15),
                height: verticalScale(15),
                borderRadius: moderateScale(7.5),
              }}
              trackStyle={{
                height: verticalScale(3),
                backgroundColor: 'rgba(128,128,128,0.5)',
              }}
              style={{width: '80%'}}
            />
            <Text
              style={{
                marginLeft: horizontalScale(10),
                color: 'black',
                fontWeight: '600',
              }}>{`${radius} feet`}</Text>
          </View>
          <TextInput
            mode="flat"
            label="Name the place"
            style={{backgroundColor: 'transparent'}}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: verticalScale(15),
              paddingLeft: horizontalScale(20),
              paddingRight: horizontalScale(15),
            }}>
            <Text style={{color: 'black'}}>Icon for place</Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: 'rgba(128,128,128,0.5)',
                borderRadius: moderateScale(15),
              }}>
              <SimpleLineIcons
                name="home"
                size={moderateScale(15)}
                color={'rgba(119,79,251,255)'}
                style={{padding: moderateScale(3)}}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: verticalScale(15),
              paddingLeft: horizontalScale(20),
              paddingRight: horizontalScale(10),
            }}>
            <Text style={{color: 'black'}}>
              Notify all about this new place
            </Text>
            <Switch
              trackColor={{false: '#767577', true: 'rgba(119,79,251,0.4)'}}
              thumbColor={isEnabled ? 'rgba(119,79,251,255)' : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(119,79,251,255)',
            alignItems: 'center',
            justifyContent: 'center',
            padding: moderateScale(15),
            width: '90%',
            alignSelf: 'center',
            borderRadius: moderateScale(10),
            elevation: moderateScale(5),
            marginTop: verticalScale(10),
            marginBottom: verticalScale(25),
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: moderateScale(14),
            }}>
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
};

export default AddNewPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
