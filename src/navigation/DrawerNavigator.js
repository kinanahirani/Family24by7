import { View, Text } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';
import MapScreen from '../screens/MapScreen';
import CreateCircleScreen from '../screens/CreateCircleScreen';

const DrawerNav = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <DrawerNav.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          width: 240,
        },
        overlayColor: 'transparent',
      }}>
      <DrawerNav.Screen
        name="createcircle"
        component={CreateCircleScreen}
        options={{headerStyle:{}, }}
      />
    </DrawerNav.Navigator>
  )
}

export default DrawerNavigator