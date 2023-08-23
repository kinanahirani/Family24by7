import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AddPlaceScreen from '../screens/AddPlaceScreen';
import SpeedLimitScreen from '../screens/SpeedLimitScreen';
import {moderateScale} from '../helpers/sizeHelpers';

const TopTab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {textTransform: 'none', fontSize: moderateScale(13)},
        tabBarIndicatorStyle: {backgroundColor: 'rgba(119,79,251,255)'},
        tabBarActiveTintColor: 'rgba(119,79,251,255)',
        tabBarInactiveTintColor: 'black',
      }}>
      <TopTab.Screen name="Places" component={AddPlaceScreen} />
      <TopTab.Screen name="Speed limit" component={SpeedLimitScreen} />
    </TopTab.Navigator>
  );
};

export default TopTabs;
