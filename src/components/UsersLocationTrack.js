import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useMemo, useCallback, useState} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const UsersLocationTrack = ({bottomSheetVisible, navigation}) => {
  const [localVisible, setLocalVisible] = useState(bottomSheetVisible);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleCloseBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close(); 
      setLocalVisible(!bottomSheetVisible); 
    }
  };

  if (!localVisible) {
    return null;
  }
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
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
            Today at 7:48 pm ~ SHOP-07, ONE WORLD WEST, Ambli-Bopal road, near
            vakil bridge, Ambli, Ahmedabad, Gujarat 380058, India (Accurate up
            to 38 feet)
          </Text>
          <TouchableOpacity onPress={handleCloseBottomSheet}>
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
                SHOP-07, ONE WORLD WEST, Ambli-Bopal road, near vakil bridge,
                Ambli, Ahmedabad, Gujarat 380058, India (Accurate up to 38 feet)
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
  );
};

export default UsersLocationTrack;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
