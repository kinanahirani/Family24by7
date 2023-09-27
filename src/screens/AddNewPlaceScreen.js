import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
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
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

const customMapStyle = require('../../map/map.json');

const AddNewPlaceScreen = ({navigation}) => {
  const locationLatitude = useSelector(state => state.location.latitude);
  const locationLongitude = useSelector(state => state.location.longitude);
  const locationAddress = useSelector(state => state.location.address);
  const [radius, setRadius] = useState(328);
  const [placeName, setPlaceName] = useState('');
  const mapRef = useRef(null);
  const circle = useSelector(state => state.circle.data);
  const userData = useSelector(state => state.user.data);

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
  const [isMapMoving, setIsMapMoving] = useState(false);
  const [moving, setMoving] = useState(false);
  const [timeout, setTimeout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingPlaces, setExistingPlaces] = useState([]);

  useEffect(() => {
    console.log(locationLatitude, '...locationLatitude');
    console.log(locationLongitude, '...locationLongitude');
    console.log(locationAddress, '...locationAddress');
    console.log(circle, '..circle');
    console.log(userData, '..circle');
  }, []);

  useEffect(() => {
    const fetchExistingPlaces = async () => {
      try {
        const circleCode = circle.circleCode;
        const placesCollectionRef = firestore()
          .collection('places')
          .doc(circleCode)
          .collection('addedPlaces');

        const placesOfTheCircle = await placesCollectionRef.get();
        const placesData = placesOfTheCircle.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setExistingPlaces(placesData);
      } catch (error) {
        console.error('Error fetching existing places:', error);
      }
    };

    fetchExistingPlaces();
  }, [circle]);

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

  // const handleRegionChange = region => {
  //   setMarkerPosition({
  //     latitude: region.latitude,
  //     longitude: region.longitude,
  //   });
  //   console.log(markerPosition, '....markerPosition');
  // };

  const saveNewPlace = async () => {
    setLoading(true);
    if (placeName == '') {
      setLoading(false);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Enter proper name', ToastAndroid.SHORT);
      } else {
        Alert.alert('Enter proper name');
      }
    } else {
      const placesCollectionRef = firestore()
        .collection('places')
        .doc(circle.circleCode)
        .collection('addedPlaces');

      await placesCollectionRef.add({
        latitude: markerPosition.latitude,
        longitude: markerPosition.longitude,
        radius,
        name: placeName,
        icon: 'home',
        notify: isEnabled,
        addedBy: userData.name,
        getAlerts: true,
        showOnMap: true,
      });
      console.log('stored places data into firestore:');
      navigation.goBack();
      if (isEnabled) {
        sendNotifications();
      }
      setLoading(false);
    }
  };

  const calculateDistance = (point1, point2) => {
    // Calculate the distance between two points using the Haversine formula
    const radianFactor = Math.PI / 180;
    const lat1 = point1.latitude * radianFactor;
    const lon1 = point1.longitude * radianFactor;
    const lat2 = point2.latitude * radianFactor;
    const lon2 = point2.longitude * radianFactor;

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const earthRadius = 6371000; // Earth's radius in meters
    const distance = earthRadius * c;

    return distance;
  };

  const sendNotifications = async () => {
    try {
      const circleMembers = circle.usersOfCircles;
      const tokens = [];

      for (const userId of circleMembers) {
        if (userId !== userData.id) {
          const userDoc = await firestore()
            .collection('users')
            .doc(userId)
            .get();

          const user = userDoc.data();

          if (user && user.fcmToken) {
            tokens.push(user.fcmToken);
          }
        } else {
          console.log('Only one user in the circle.');
        }
      }
      const notificationMessage = `New Place "${placeName}" added by ${userData.name}`;

      const notificationPayload = {
        notification: {
          body: notificationMessage,
          title: 'New Place Added',
        },
        data: {
          type: 'new_place',
        },
        registration_ids: tokens,
      };

      const response = await axios.post(
        'https://fcm.googleapis.com/fcm/send',
        JSON.stringify(notificationPayload),
        {
          headers: {
            Authorization:
              'Bearer AAAAX5KIkkY:APA91bGW4bkrIYezDIG_OHij9MOhBXY0A2L1Y4Bcv-VL6xi725aWzsI9FXbbKq2fIBUMnRxcM3pJk3uiK5afbIHkWe2pjZ1eQTO9fqn4NNfkVR9MZ6Q11fOmfvdpWuXDXvJGhKqiiKVc',
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Notification Data:', response.data);
    } catch (error) {
      console.error('Error sending notifications:', error);
    }
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
          onRegionChange={() => {
            if (timeout) {
              clearTimeout(timeout);
            }
            setMoving(true);
          }}
          onRegionChangeComplete={region => {
            if (timeout) {
              clearTimeout(timeout);
            }
            const newTimeout = setTimeout(() => {
              setMarkerPosition({
                latitude: region.latitude,
                longitude: region.longitude,
              });
              console.log(markerPosition, '....markerPosition');
              setMoving(false);

              const newCircleCenter = {
                latitude: region.latitude,
                longitude: region.longitude,
              };
              const overlapExists = existingPlaces.some(existingPlace => {
                const existingCircleCenter = {
                  latitude: existingPlace.latitude,
                  longitude: existingPlace.longitude,
                };
                const distance = calculateDistance(
                  newCircleCenter,
                  existingCircleCenter,
                );
                const minDistance = radius + existingPlace.radius;

                return distance < minDistance;
              });

              if (overlapExists) {
                if (Platform.OS === 'android') {
                  ToastAndroid.show(
                    'Place overlaps with existing places. Please choose a different location.',
                    ToastAndroid.LONG,
                  );
                } else {
                  Alert.alert(
                    'Place Overlap',
                    'Place overlaps with existing places. Please choose a different location.',
                    [{text: 'OK'}],
                  );
                }
                // Optionally, reset the marker position to its previous state
                setMarkerPosition({
                  latitude: locationLatitude,
                  longitude: locationLongitude,
                });
              }
            }, 500);
            setTimeout(newTimeout);
          }}>
          {existingPlaces.map(place => (
            <Circle
              key={place.id}
              center={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              radius={place.radius}
              strokeWidth={1}
              strokeColor={'rgba(0, 255, 0, 0.2)'}
              fillColor={'rgba(0, 255, 0, 0.2)'}
            />
          ))}
          {isMapMoving ? null : (
            <Circle
              center={markerPosition}
              radius={radius}
              strokeWidth={1}
              strokeColor={'rgba(119,79,251,0.15)'}
              fillColor={'rgba(119,79,251,0.15)'}
            />
          )}
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
            value={placeName}
            onChangeText={text => setPlaceName(text)}
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
          activeOpacity={1}
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
          }}
          onPress={saveNewPlace}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: moderateScale(14),
              }}>
              SAVE
            </Text>
          )}
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
