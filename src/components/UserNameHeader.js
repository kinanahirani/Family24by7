import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../helpers/sizeHelpers';

const UserNameHeader = () => {
  return (
    <View
      style={{
        height: verticalScale(50),
        padding: moderateScale(10),
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems:'center'
      }}>
      <Text>UserNameHeader</Text>
    </View>
  );
};

export default UserNameHeader;

const styles = StyleSheet.create({});
