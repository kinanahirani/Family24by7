import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {horizontalScale, moderateScale} from '../helpers/sizeHelpers';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CMarker = ({img}) => {
  return (
    <View style={styles.container}>
      {img ? (
        <View style={styles.circle}>
          <Image source={{uri: img}} style={styles.image} />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: 'rgba(119, 79, 251, 255)',
            width: moderateScale(40),
            height: moderateScale(40),
            borderRadius: moderateScale(20),
            alignItems:'center',
            justifyContent:'center'
          }}>
          <View
            style={{
              backgroundColor: 'rgba(247, 247, 252, 1)',
              width: moderateScale(36),
              height: moderateScale(36),
              borderRadius: moderateScale(18),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name="user" size={moderateScale(22)} color={'black'} />
          </View>
        </View>
      )}
       <View style={styles.pointer}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  circle: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
    backgroundColor: 'rgba(119, 79, 251, 255)',
    overflow: 'hidden',
  },
  image: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
  },
  pointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: moderateScale(6),
    borderRightWidth: moderateScale(8),
    borderBottomWidth: 0,
    borderLeftWidth: moderateScale(8),
    borderTopColor: 'rgba(119, 79, 251, 255)',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});

export default CMarker;
