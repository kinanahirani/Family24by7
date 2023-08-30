import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';

const CBottomSheetButton = ({text, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(10),
        width: horizontalScale(90),
        height: verticalScale(45),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(119,79,251,255)',
        shadowColor: '#000',
        backgroundColor: 'white',
        elevation: 5,
      }}>
      <Text style={{color: 'rgba(119,79,251,255)'}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CBottomSheetButton;

const styles = StyleSheet.create({});
