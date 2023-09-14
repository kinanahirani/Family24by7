// import {StyleSheet, Text, TouchableOpacity, View, Switch} from 'react-native';
// import React, {useRef, useState} from 'react';
// import {
//   horizontalScale,
//   moderateScale,
//   verticalScale,
// } from '../helpers/sizeHelpers';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MapView, {Marker} from 'react-native-maps';
// import Slider from 'react-native-slider';
// import {
//   TextInput,
//   DefaultTheme,
//   Provider as PaperProvider,
// } from 'react-native-paper';
// import Geocoder from 'react-native-geocoding';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// const customMapStyle = require('../../map/map.json');

// const AddNewPlaceScreen = ({navigation}) => {
//   const [radius, setRadius] = useState(328);
//   const [markerPosition, setMarkerPosition] = useState({
//     latitude: 37.2,
//     longitude: 50.1,
//   });
//   const [mapRegion, setMapRegion] = useState({
//     latitude: 37.2,
//     longitude: 50.1,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });
//   const mapRef = useRef(null);
//   const [address, setAddress] = useState('');
//   Geocoder.init('AIzaSyB09PIaNrUXMikGy415TQ3tCqYy8uXbpTs');
//   const [isEnabled, setIsEnabled] = useState(true);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//   const handleSliderChange = value => {
//     if (value < 328) {
//       setRadius(328);
//     } else {
//       setRadius(value);
//     }
//   };
//   const initialRegion = {
//     latitude: 37.2,
//     longitude: 50.1,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   };

//   const customTextInputTheme = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       primary: 'rgba(119,79,251,1)', // Change the focused color here
//     },
//   };

//   // const handleRegionChange = newRegion => {
//   //   // Update marker position based on the new region
//   //   setMarkerPosition({
//   //     latitude: newRegion.latitude,
//   //     longitude: newRegion.longitude,
//   //   });

//   //   // Update the map region state
//   //   setMapRegion(newRegion);
//   // };
//   const handleRegionChange = newRegion => {
//     // Calculate the new marker position based on the map's center
//     const newMarkerPosition = {
//       latitude: newRegion.latitude + newRegion.latitudeDelta / 2,
//       longitude: newRegion.longitude + newRegion.longitudeDelta / 2,
//     };

//     setMarkerPosition(newMarkerPosition);
//   };

//   return (
//     <PaperProvider theme={customTextInputTheme}>
//       <View style={styles.container}>
//         <View
//           style={{
//             flexDirection: 'row',
//             height: moderateScale(50),
//             alignItems: 'center',
//             paddingHorizontal: horizontalScale(16),
//             borderBottomWidth: 0.2,
//             borderBottomColor: 'rgba(128,128,128,0.5)',
//           }}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             activeOpacity={0.7}>
//             <Ionicons name="arrow-back" color="black" size={25} />
//           </TouchableOpacity>
//           <Text
//             style={{
//               marginLeft: 'auto',
//               marginRight: 'auto',
//               fontSize: moderateScale(18),
//               fontWeight: '400',
//               color: 'rgba(15, 24, 40, 1)',
//             }}>
//             Add a place
//           </Text>
//         </View>
//         <MapView
//           ref={mapRef}
//           customMapStyle={customMapStyle}
//           style={{width:'100%', height:'50%'}}
//           // style={{flex: 1}}
//           // region={mapRegion}
//           // region={{
//           //   ...markerPosition,
//           //   latitudeDelta: 0.0922,
//           //   longitudeDelta: 0.0421,
//           // }}
//           region={initialRegion}
//           onRegionChange={handleRegionChange}>
//           <Marker
//             draggable
//             coordinate={markerPosition}
//             // onDragEnd={async e => {
//             //   const newMarkerPosition = e.nativeEvent.coordinate;
//             //   setMarkerPosition(newMarkerPosition);

//               // try {
//               //   const newMarkerPosition = e.nativeEvent.coordinate;
//               //   console.log('New Marker Position:', newMarkerPosition);

//               //   const location = await Geocoder.from(newMarkerPosition);
//               //   const address = location.results[0].formatted_address;

//               //   setMarkerPosition(newMarkerPosition);
//               //   console.log(newMarkerPosition, '..newMarkerPosition');
//               //   setAddress(address);
//               //   console.log(address, '...address');
//               // } catch (error) {
//               //   console.error('Error fetching location:', error);
//               // }
//             // }}
//             ></Marker>
//         </MapView>
//         <View style={{backgroundColor: 'white', padding: moderateScale(15)}}>
//           <Text
//             style={{color: 'rgba(128,128,128,1)', fontSize: moderateScale(14)}}>
//             Swipe to change radius
//           </Text>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//             }}>
//             <Slider
//               value={radius}
//               minimumTrackTintColor="rgba(119,79,251,255)"
//               onValueChange={handleSliderChange}
//               minimumValue={328}
//               maximumValue={1000}
//               step={1}
//               thumbTintColor="rgba(119,79,251,255)"
//               thumbStyle={{
//                 width: horizontalScale(15),
//                 height: verticalScale(15),
//                 borderRadius: moderateScale(7.5),
//               }}
//               trackStyle={{
//                 height: verticalScale(3),
//                 backgroundColor: 'rgba(128,128,128,0.5)',
//               }}
//               style={{width: '80%'}}
//             />
//             <Text
//               style={{
//                 marginLeft: horizontalScale(10),
//                 color: 'black',
//                 fontWeight: '600',
//               }}>{`${radius} feet`}</Text>
//           </View>
//           <TextInput
//             mode="flat"
//             label="Name the place"
//             style={{backgroundColor: 'transparent'}}
//           />

//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               marginTop: verticalScale(15),
//               paddingLeft: horizontalScale(20),
//               paddingRight: horizontalScale(15),
//             }}>
//             <Text style={{color: 'black'}}>Icon for place</Text>
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderWidth: 1,
//                 borderColor: 'rgba(128,128,128,0.5)',
//                 borderRadius: moderateScale(15),
//               }}>
//               <SimpleLineIcons
//                 name="home"
//                 size={moderateScale(15)}
//                 color={'rgba(119,79,251,255)'}
//                 style={{padding: moderateScale(3)}}
//               />
//             </View>
//           </View>

//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               marginTop: verticalScale(15),
//               paddingLeft: horizontalScale(20),
//               paddingRight: horizontalScale(10),
//             }}>
//             <Text style={{color: 'black'}}>
//               Notify all about this new place
//             </Text>
//             <Switch
//               trackColor={{false: '#767577', true: 'rgba(119,79,251,0.4)'}}
//               thumbColor={isEnabled ? 'rgba(119,79,251,255)' : '#f4f3f4'}
//               onValueChange={toggleSwitch}
//               value={isEnabled}
//             />
//           </View>
//         </View>
//         <TouchableOpacity
//           style={{
//             backgroundColor: 'rgba(119,79,251,255)',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: moderateScale(15),
//             width: '90%',
//             alignSelf: 'center',
//             borderRadius: moderateScale(10),
//             elevation: moderateScale(5),
//             marginTop: verticalScale(10),
//             marginBottom: verticalScale(25),
//           }}>
//           <Text
//             style={{
//               color: 'white',
//               fontWeight: '500',
//               fontSize: moderateScale(14),
//             }}>
//             SAVE
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </PaperProvider>
//   );
// };

// export default AddNewPlaceScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
// });

//marker
{
  /* <Marker
            coordinate={markerPosition}
            draggable
            onDragEnd={e => {
              const newMarkerPosition = e.nativeEvent.coordinate;
              setMarkerPosition(newMarkerPosition);
              mapRef.current.animateToRegion({
                ...newMarkerPosition,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: moderateScale(25),
                height: moderateScale(25),
                borderRadius: moderateScale(12.5),
              }}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons
                  name="location-sharp"
                  color={'rgba(119,79,251,0.8)'}
                  size={moderateScale(20)}
                />
              </View>
            </View>
          </Marker> */
}
// 2nd

import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Switch} from 'react-native';
import MapView, {Circle, Marker, Overlay} from 'react-native-maps';
import Slider from 'react-native-slider';
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import {useSelector} from 'react-redux';

const customMapStyle = require('../../map/map.json');

const AddNewPlaceScreen = ({navigation}) => {
  const locationLatitude = useSelector(state => state.location.latitude);
  const locationLongitude = useSelector(state => state.location.longitude);
  const locationAddress = useSelector(state => state.location.address);
  const [radius, setRadius] = useState(328);
  const mapRef = useRef(null);
  const markerRef = useRef(markerPosition);
  const [mapRegion, setMapRegion] = useState({
    latitude: locationLatitude,
    longitude: locationLongitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerPosition, setMarkerPosition] = useState({
    latitude: locationLatitude,
    longitude: locationLongitude,
  });
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    console.log(locationLatitude, '...locationLatitude');
    console.log(locationLongitude, '...locationLongitude');
    console.log(locationAddress, '...locationAddress');
  }, []);

  const handleSliderChange = value => {
    if (value < 328) {
      setRadius(328);
    } else {
      setRadius(value);
    }
    console.log(radius);
  };

  const customTextInputTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgba(119,79,251,1)',
    },
  };

  const handleRegionChange = region => {
    setMarkerPosition({
      latitude: region.latitude,
      longitude: region.longitude,
    });
    console.log(markerPosition, '....markerPosition');
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
              fontSize: moderateScale(16),
              fontWeight: '400',
              color: 'rgba(15, 24, 40, 1)',
            }}>
            Add a place
          </Text>
        </View>

        <MapView
          ref={mapRef}
          customMapStyle={customMapStyle}
          style={{flex: 1}}
          // style={{width: '100%', height: '50%'}}
          region={mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={handleRegionChange}>
          <Circle
            center={markerPosition}
            radius={radius}
            strokeWidth={1}
            strokeColor={'rgba(119,79,251,0.15)'}
            fillColor={'#rgba(119,79,251,0.15)'}
          />
        </MapView>
        <View style={styles.overlay}>
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons
              name="location-sharp"
              color={'rgba(119,79,251,0.8)'}
              size={moderateScale(16)}
            />
          </View>
        </View>
        <View style={{backgroundColor: 'white', padding: moderateScale(15)}}>
          <Text
            style={{
              color: 'rgba(128,128,128,1)',
              fontSize: moderateScale(14),
            }}>
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
                height: horizontalScale(15),
                borderRadius: horizontalScale(7.5),
              }}
              trackStyle={{
                height: horizontalScale(3),
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
              marginTop: moderateScale(15),
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
                borderRadius: horizontalScale(15),
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
              marginTop: moderateScale(15),
              paddingLeft: horizontalScale(20),
              paddingRight: horizontalScale(10),
            }}>
            <Text style={{color: 'black'}}>
              Notify all about this new place
            </Text>
            <Switch
              trackColor={{false: '#767577', true: 'rgba(119,79,251,0.4)'}}
              thumbColor={isEnabled ? 'rgba(119,79,251,255)' : '#f4f3f4'}
              onValueChange={value => setIsEnabled(value)}
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
            borderRadius: horizontalScale(10),
            elevation: moderateScale(5),
            marginTop: moderateScale(10),
            marginBottom: moderateScale(25),
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  overlay: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: moderateScale(25),
    height: moderateScale(25),
    borderRadius: moderateScale(12.5),
  },
});

export default AddNewPlaceScreen;
