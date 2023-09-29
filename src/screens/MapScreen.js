import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Circle, Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import SelectCircle from '../components/SelectCircle';
import UsersLocationTrack from '../components/UsersLocationTrack';
import UserNameHeader from '../components/UserNameHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Geocoder from 'react-native-geocoding';
import {useDispatch, useSelector} from 'react-redux';
import {setCircleData} from '../redux/slices/circleDataSlice';
import CMarker from '../components/CMarker';
import {setLocationData} from '../redux/slices/locationSlice';
const customMapStyle = require('../../map/map.json');

const MapScreen = () => {
  // const [circleData, setCircleData1] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const userData = useSelector(state => state.user.data);
  const refRBSheet = useRef();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [existingPlaces, setExistingPlaces] = useState([]);
  const dispatch = useDispatch();
  const circle = useSelector(state => state.circle.data);
  Geocoder.init('AIzaSyB09PIaNrUXMikGy415TQ3tCqYy8uXbpTs');

  useEffect(() => {
    fetchData();
  }, [userData]);

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
        console.log(placesData, '....placesData');
        setExistingPlaces(placesData);
      } catch (error) {
        console.error('Error(fetchExistingPlaces):', error);
      }
    };

    fetchExistingPlaces();
  }, [circle]);

  useEffect(() => {
    if (latitude && longitude) {
      Geocoder.from(latitude, longitude)
        .then(json => {
          const addressComponent = json.results[0].address_components;
          console.log('Address Data in use effect:', addressComponent);
          const addressString = addressComponent
            .map(component => component.long_name)
            .join(', ');

          dispatch(
            setLocationData({
              latitude,
              longitude,
              address: addressString,
            }),
          );
        })
        .catch(error => {
          console.warn('Geocoder Error:', error);
        });
    }
  }, [latitude, longitude, circle]);

  const fetchData = async () => {
    try {
      console.log('Fetching user circle data...');
      const circleData1 = await getUserCircle();
      const position = await getCurrentLocation();
      if (circleData1 && position) {
        await saveLocation();
      }
    } catch (error) {
      console.log('Error(fetchData): ', error);
    }
  };

  const getUserCircle = async () => {
    try {
      const activeCircle = await firestore()
        .collection('circles')
        .doc(userData.activeCircleCode)
        .get();

      const activeCircleData = activeCircle.data();
      console.log(activeCircleData, '...activeCircleData');

      if (activeCircleData) {
        dispatch(setCircleData(activeCircleData));
        getUsersOfCircles(activeCircleData);
      } else {
        console.log('Document does not exist');
      }
      return activeCircleData;
    } catch (err) {
      console.log('Error(getUserCircle): ', err);
    }
  };

  const getUsersOfCircles = async activeCircleData => {
    const userIds = activeCircleData.usersOfCircles;
    try {
      const fetchedUsersData = await Promise.all(
        userIds.map(async userId => {
          const userSnapshot = await firestore()
            .collection('users')
            .doc(userId)
            .get();
          const userData = userSnapshot.data();
          return userData;
        }),
      );
      console.log('Fetched Users Data:', fetchedUsersData);
      setUsersData(fetchedUsersData);
    } catch (err) {
      console.log('Error(getUsersOfCircles): ', err);
    }
  };

  // const getCurrentLocation = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Location Permission',
  //         message: 'App needs access to your location',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       return new Promise((resolve, reject) => {
  //         Geolocation.getCurrentPosition(
  //           async position => {
  //             // console.log(position, 'position');
  //             // setLatitude(position.coords.latitude);
  //             // setLongitude(position.coords.longitude);
  //             position => {
  //               console.log(position, 'position');
  //               setLatitude(position.coords.latitude);
  //               setLongitude(position.coords.longitude);
  //               resolve(position); // Resolve with the location data
  //             },
  //             error => {
  //               console.log(error.code, error.message);
  //               reject(error); // Reject with an error if there's an issue
  //             },
  //           },
  //           {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //         );
  //       });
  //     } else {
  //       console.log('Location permission denied');
  //       return null;
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //     return err;
  //   }
  // };

  const getCurrentLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            async position => {
              console.log(position, 'position');
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
              resolve(position);
            },
            error => {
              console.log(error.code, error.message);
              reject(error);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 30000},
          );
        });
      } else {
        console.log('Location permission denied');
        return null;
      }
    } catch (err) {
      console.log('Error(getCurrentLocation): ', err);
      return err;
    }
  };

  const saveLocation = async () => {
    if (!circle) {
      console.log('Circle is missing');
      return;
    }
    console.log('Circle: ', circle);

    // for (const joinedCircle of circle.joinedCircles) {
    //   const locationRef = firestore()
    //     .collection('locations')
    //     .doc(`${userData.id}-${joinedCircle.circleCode}`)
    //     .collection('location_logs');

    //   try {
    //     await locationRef.add({
    //       latitude,
    //       longitude,
    //       timestamp: firestore.FieldValue.serverTimestamp(),
    //     });
    //     console.log(
    //       `Location stored in Firestore for ${joinedCircle.circleName}.`,
    //     );
    //   } catch (error) {
    //     console.error(
    //       `Error storing location for ${joinedCircle.circleName}:`,
    //       error,
    //     );
    //   }
    // }
    const locationRef = firestore()
      .collection('locations')
      .doc(`${userData.id}-${circle.circleCode}`)
      .collection('location_logs');

    try {
      await locationRef.add({
        latitude,
        longitude,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      console.log(`Location stored in Firestore for ${circle.circleName}.`);
    } catch (error) {
      console.error(`Error storing location for ${circle.circleName}:`, error);
    }
    // Geocoder.from(latitude, longitude)
    //   .then(json => {
    //     let addressComponent = json.results[0].address_components;
    //     console.log(addressComponent, '..addressComponent');

    //     const addressString = addressComponent
    //       .map(component => component.long_name)
    //       .join(', ');
    //     console.log(addressString,"..addressString");
    //     dispatch(setLocationData(addressString))
    //   })
    //   .catch(error => console.warn(error));
  };

  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['4%', '25%', '43%'], []);
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      {bottomSheetVisible ? (
        <View
          style={{
            flexDirection: 'row',
            height: moderateScale(50),
            alignItems: 'center',
            paddingHorizontal: horizontalScale(16),
            padding: moderateScale(10),
            backgroundColor: 'white',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setBottomSheetVisible(false)}
              activeOpacity={0.7}>
              <Ionicons name="arrow-back" color="black" size={25} />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: horizontalScale(10),
                fontSize: moderateScale(15),
                fontWeight: '400',
                color: 'rgba(15, 24, 40, 1)',
              }}>
              Kinana Hirani
            </Text>
          </View>
          <Feather name="refresh-cw" size={moderateScale(22)} color={'black'} />
        </View>
      ) : (
        <View style={styles.header}>
          <View style={styles.headingSubView}>
            <TouchableOpacity
              style={{padding: moderateScale(5)}}
              onPress={openDrawer}>
              <Feather name="menu" size={moderateScale(22)} color={'black'} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              activeOpacity={1}
              onPress={() => refRBSheet.current.open()}>
              <Text style={styles.headerTxt}>
                {circle ? circle.circleName : 'No Circle'}
              </Text>
              <AntDesign
                name="caretdown"
                size={moderateScale(10)}
                color={'black'}
              />
            </TouchableOpacity>
            <SelectCircle ref={refRBSheet} />
          </View>

          <View style={styles.headingSubView}>
            <Ionicons
              name="chatbubble-outline"
              size={moderateScale(25)}
              color={'black'}
            />
            <Ionicons
              name="notifications-outline"
              size={moderateScale(25)}
              color={'black'}
              style={{marginLeft: horizontalScale(20)}}
            />
          </View>
        </View>
      )}

      <MapView
        customMapStyle={customMapStyle}
        // style={{width: '100%', height: '100%'}}
        style={{flex: 1}}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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
        <Marker draggable coordinate={{latitude, longitude}}>
          <CMarker img={userData.profilePicture} />
        </Marker>
      </MapView>

      {bottomSheetVisible ? (
        // <UsersLocationTrack
        //   bottomSheetRef={bottomSheetRef}
        //   snapPoints={snapPoints}
        //   handleSheetChanges={handleSheetChanges}
        //   navigation={navigation}
        //   bottomSheetVisible={bottomSheetVisible}
        // />
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={{
            flex: 1,
            backgroundColor: 'white',
            elevation: 20,
            borderTopRightRadius: moderateScale(20),
            borderTopLeftRadius: moderateScale(20),
          }}>
          <View style={styles.contentContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  width: '85%',
                  marginLeft: horizontalScale(10),
                  fontWeight: '400',
                  fontSize: moderateScale(13),
                  color: 'black',
                }}>
                Today at 7:48 pm ~ SHOP-07, ONE WORLD WEST, Ambli-Bopal road,
                near vakil bridge, Ambli, Ahmedabad, Gujarat 380058, India
                (Accurate up to 38 feet)
              </Text>
              <TouchableOpacity onPress={() => setBottomSheetVisible(false)}>
                <Entypo
                  name="circle-with-cross"
                  size={moderateScale(25)}
                  color={'rgba(119,79,251,255)'}
                  style={{marginRight: horizontalScale(10)}}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginVertical: verticalScale(20),
                justifyContent: 'space-evenly',
              }}>
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(128,128,128,0.5)',
                    borderRadius: moderateScale(15),
                    marginBottom: verticalScale(7),
                  }}>
                  <MaterialIcons
                    name="location-history"
                    size={moderateScale(15)}
                    color={'rgba(119,79,251,255)'}
                    style={{padding: moderateScale(3)}}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: moderateScale(11),
                  }}>
                  Location History
                </Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(128,128,128,0.5)',
                    borderRadius: moderateScale(15),
                    marginBottom: verticalScale(7),
                  }}>
                  <MaterialCommunityIcons
                    name="go-kart-track"
                    size={moderateScale(15)}
                    color={'rgba(119,79,251,255)'}
                    style={{
                      padding: moderateScale(3),
                    }}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: moderateScale(11),
                  }}>
                  Live Tracking
                </Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(128,128,128,0.5)',
                    borderRadius: moderateScale(15),
                    marginBottom: verticalScale(7),
                  }}>
                  <FontAwesome6
                    name="diamond-turn-right"
                    size={moderateScale(15)}
                    color={'rgba(119,79,251,255)'}
                    style={{
                      padding: moderateScale(3),
                    }}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: moderateScale(11),
                  }}>
                  Drive 0 feet
                </Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(128,128,128,0.5)',
                    borderRadius: moderateScale(15),
                    marginBottom: verticalScale(7),
                  }}>
                  <MaterialCommunityIcons
                    name="message-text"
                    size={moderateScale(15)}
                    color={'rgba(119,79,251,255)'}
                    style={{
                      padding: moderateScale(3),
                    }}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: moderateScale(11),
                  }}>
                  Message
                </Text>
              </View>
            </View>

            <View>
              <View
                style={{
                  backgroundColor: 'rgba(128,128,128,0.1)',
                  padding: moderateScale(5),
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: moderateScale(14),
                    marginLeft: horizontalScale(10),
                  }}>
                  Time
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: verticalScale(15),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignItems: 'center',
                    marginLeft: horizontalScale(10),
                  }}>
                  <Entypo
                    name="dot-single"
                    size={moderateScale(15)}
                    color={'rgba(119,79,251,255)'}
                    style={{
                      padding: moderateScale(3),
                    }}
                  />
                  <Text style={{color: 'black'}}>
                    SHOP-07, ONE WORLD WEST, Ambli-Bopal road, near vakil
                    bridge, Ambli, Ahmedabad, Gujarat 380058, India (Accurate up
                    to 38 feet)
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'rgba(128,128,128,0.8)',
                    fontSize: moderateScale(11),
                    marginLeft: horizontalScale(31),
                    marginTop: verticalScale(5),
                  }}>
                  Since yesterday at 10:47 am (last seen)
                </Text>
              </View>
            </View>
          </View>
        </BottomSheet>
      ) : (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={{
            flex: 1,
            backgroundColor: 'white',
            elevation: 50,
            borderTopRightRadius: moderateScale(20),
            borderTopLeftRadius: moderateScale(20),
          }}>
          <View style={styles.contentContainer}>
            <BottomSheetScrollView>
              {usersData.map((user, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginTop: verticalScale(10),
                  }}>
                  {user.profilePicture ? (
                    <Image
                      source={{uri: user.profilePicture}}
                      style={{
                        width: moderateScale(65),
                        height: moderateScale(65),
                        marginHorizontal: horizontalScale(20),
                        borderRadius: moderateScale(32),
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        backgroundColor: 'rgba(247, 247, 252, 1)',
                        width: moderateScale(65),
                        height: moderateScale(65),
                        borderRadius: moderateScale(32),
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: horizontalScale(20),
                      }}>
                      <AntDesign
                        name="user"
                        size={moderateScale(35)}
                        color={'black'}
                      />
                    </View>
                  )}

                  <TouchableOpacity
                    style={{flexDirection: 'column'}}
                    onPress={() => setBottomSheetVisible(true)}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        marginBottom: verticalScale(7),
                        fontSize: moderateScale(14),
                      }}>
                      {/* Kinana Hirani */}
                      {user.name}
                    </Text>
                    <Text
                      style={{
                        fontWeight: '400',
                        color: 'black',
                        width: '75%',
                        marginBottom: verticalScale(7),
                        fontSize: moderateScale(13),
                      }}>
                      Battery optimization is not disabled for Family360
                    </Text>
                    <Text style={{color: 'grey', fontSize: moderateScale(11)}}>
                      Since 11:43 am
                    </Text>
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(128,128,128,0.2)	',
                        height: verticalScale(1),
                        marginTop: verticalScale(20),
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </BottomSheetScrollView>
            <TouchableOpacity
              onPress={() => navigation.navigate('ShareCircleCode')}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: verticalScale(20),
              }}>
              <AntDesign
                name="adduser"
                size={moderateScale(18)}
                color={'rgba(119,79,251,255)'}
              />
              <Text
                style={{
                  color: 'rgba(119,79,251,255)',
                  fontSize: moderateScale(13),
                }}>
                Add a New Member
              </Text>
            </TouchableOpacity>

            <BottomSheetScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingHorizontal: horizontalScale(10),
              }}>
              <View
                style={{
                  width: horizontalScale(250),
                  height: verticalScale(55),
                  marginRight: horizontalScale(10),
                  elevation: 7,
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  borderTopRightRadius: moderateScale(8),
                  borderTopLeftRadius: moderateScale(8),
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    height: verticalScale(52),
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: moderateScale(7),
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: moderateScale(14),
                    }}>
                    Get notified when family leaves/enters school, office etc.
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('AddNewPlace')}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    padding: moderateScale(10),
                    borderBottomRightRadius: moderateScale(8),
                    borderBottomLeftRadius: moderateScale(8),
                    height: verticalScale(45),
                  }}>
                  <Text style={{color: 'white', fontSize: moderateScale(13)}}>
                    + Add Places
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: horizontalScale(250),
                  height: verticalScale(55),
                  marginRight: horizontalScale(10),
                  elevation: 7,
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  borderTopRightRadius: moderateScale(8),
                  borderTopLeftRadius: moderateScale(8),
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    height: verticalScale(50),
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: moderateScale(7),
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: moderateScale(14),
                    }}>
                    Get notified when family members cross speed limit
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    padding: moderateScale(10),
                    borderBottomRightRadius: moderateScale(8),
                    borderBottomLeftRadius: moderateScale(8),
                    height: verticalScale(45),
                  }}>
                  <Text style={{color: 'white', fontSize: moderateScale(13)}}>
                    Set speed alert
                  </Text>
                </TouchableOpacity>
              </View>
            </BottomSheetScrollView>
          </View>
        </BottomSheet>
      )}

      {/* {bottomSheetVisible && (
        <UsersLocationTrack
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
          handleSheetChanges={handleSheetChanges}
          navigation={navigation}
          bottomSheetVisible={bottomSheetVisible}
        />
      )} */}
      {/* {bottomSheetVisible && <UserNameHeader />} */}
    </GestureHandlerRootView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: verticalScale(60),
    padding: moderateScale(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  headingSubView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: {
    marginLeft: verticalScale(5),
    marginRight: verticalScale(7),
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: 'black',
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
  },
});
