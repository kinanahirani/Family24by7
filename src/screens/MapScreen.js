import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
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
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import SelectCircle from '../components/SelectCircle';
const customMapStyle = require('../../map/map.json');

const MapScreen = () => {
  const [circleData, setCircleData] = useState({});
  const userData = useSelector(state => state.user.data);
  const refRBSheet = useRef();

  const getUserCircle = async () => {
    try {
      const createdCircles = await firestore()
        .collection('circles')
        .where('createdUserId', '==', userData.id)
        .get();

      const joinedCircles = await firestore()
        .collection('circles')
        .where('usersOfCircles', 'array-contains', userData.id)
        .get();

      const circleData = {
        createdCircles: createdCircles.docs.map(doc => doc.data()),
        joinedCircles: joinedCircles.docs.map(doc => doc.data()),
      };
      setCircleData(circleData);
      console.log('Circle Data:', circleData);
    } catch (err) {
      console.log('Error(getUserCircle): ', err);
    }
  };
  useEffect(() => {
    getCurrentLocation();
    getUserCircle();
  }, []);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

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
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
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
      <View style={styles.header}>
        <View style={styles.headingSubView}>
          <TouchableOpacity
            style={{padding: moderateScale(5)}}
            onPress={openDrawer}>
            <Feather name="menu" size={moderateScale(25)} color={'black'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            activeOpacity={1}
            onPress={() => refRBSheet.current.open()}>
            <Text style={styles.headerTxt}>
              {/* {circleData?.createdCircles[0]?.circleName ||
                circleData?.joinedCircles[0]?.circleName} */}
              {circleData.createdCircles && circleData.createdCircles.length > 0
                ? circleData.createdCircles[0].circleName
                : circleData.joinedCircles &&
                  circleData.joinedCircles.length > 0
                ? circleData.joinedCircles[0].circleName
                : 'No Circle'}
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

      <MapView
        customMapStyle={customMapStyle}
        style={{width: '100%', height: '100%'}}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={{latitude, longitude}} />
      </MapView>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(247, 247, 252, 1)',
                borderRadius: moderateScale(70),
                width: moderateScale(70),
                height: moderateScale(70),
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: horizontalScale(20),
              }}>
              <AntDesign name="user" size={moderateScale(35)} color={'black'} />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  marginBottom: verticalScale(7),
                  fontSize: moderateScale(13),
                }}>
                Kinana Hirani
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
            </View>
          </View>
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
                height: '45%',
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
                height: '45%',
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
