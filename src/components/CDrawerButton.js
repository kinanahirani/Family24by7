import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {horizontalScale, moderateScale} from '../helpers/sizeHelpers';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CDrawerButton = ({
  text,
  onPress,
  iconName,
  extraStyles,
  extraTextStyles,
  icon,
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'AntDesign':
        return (
          <AntDesign
            name={iconName}
            size={moderateScale(22)}
            color={'rgba(15, 24, 40, 1)'}
          />
        );
      case 'Feather':
        return (
          <Feather
            name={iconName}
            size={moderateScale(22)}
            color={'rgba(15, 24, 40, 1)'}
          />
        );
      case 'Ionicons':
        return (
          <Ionicons
            name={iconName}
            size={moderateScale(22)}
            color={'rgba(15, 24, 40, 1)'}
          />
        );
      case 'MaterialIcons':
        return (
          <MaterialIcons
            name={iconName}
            size={moderateScale(22)}
            color={'rgba(15, 24, 40, 1)'}
          />
        );
      case 'MaterialCommunityIcons':
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={moderateScale(22)}
            color={'rgba(15, 24, 40, 1)'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
    activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: horizontalScale(15),
        padding: moderateScale(10),
        ...extraStyles,
      }}
      onPress={onPress}>
      {/* <MaterialCommunityIcons
        name={iconName}
        color={'black'}
        size={moderateScale(22)}
      /> */}
      {renderIcon()}
      <Text
        style={{
          marginLeft: horizontalScale(10),
          color: 'black',
          fontSize: moderateScale(12),
          ...extraTextStyles,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CDrawerButton;

const styles = StyleSheet.create({});
