import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';

const AddPlaceScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'black',
            width: '100%',
            height: 'auto',
            padding: moderateScale(10),
          }}>
          <AntDesign
            name="exclamationcircleo"
            color={'white'}
            size={20}
            style={{alignSelf: 'flex-start'}}
          />
          <Text
            style={{
              color: 'white',
              fontSize: moderateScale(13),
              marginLeft: horizontalScale(15),
              width: '75%',
            }}>
            Get notified when someone leaves or enters places.
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              width: '90%',
              textAlign: 'center',
              fontSize: moderateScale(14),
            }}>
            Add places to get notified when circle members enter or leave the
            place (2 free places)
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(119,79,251,255)',
              marginTop: verticalScale(15),
              width: horizontalScale(90),
              height: verticalScale(60),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: moderateScale(10),
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: moderateScale(13),
              }}>
              Add place
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(119,79,251,255)',
          padding: moderateScale(8),
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: moderateScale(14),
            textAlign: 'center',
          }}>
          Add a place
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default AddPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
