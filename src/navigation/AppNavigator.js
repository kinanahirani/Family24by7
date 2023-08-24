import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import TabBar from './TabBar';
import LoginOptionScreen from '../screens/LoginOptionScreen';
import SignupWithEmail from '../screens/SignupWithEmail';
import LoginWithEmail from '../screens/LoginWithEmail';
import EnterUserDetails from '../screens/EnterUserDetails';
import CreateCircleScreen from '../screens/CreateCircleScreen';
import MapScreen from '../screens/MapScreen';
import DrawerNavigator from './DrawerNavigator';
import SendAlertScreen from '../screens/SendAlertScreen';
import WatchOverMeScreen from '../screens/WatchOverMeScreen';

const Stack = createNativeStackNavigator();

export default AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="loginoptions" component={LoginOptionScreen} />
      <Stack.Screen name="signupwithemail" component={SignupWithEmail} />
      <Stack.Screen name="loginwithemail" component={LoginWithEmail} />
      <Stack.Screen name="enteruserdetails" component={EnterUserDetails} />
      <Stack.Screen name="drawer" component={DrawerNavigator} />
      <Stack.Screen name="tabbar" component={TabBar} />
      <Stack.Screen name="createcircle" component={CreateCircleScreen} />
      <Stack.Screen name="map" component={MapScreen} />
      <Stack.Screen name="sendAlert" component={SendAlertScreen} />
      <Stack.Screen name="WatchOverMe" component={WatchOverMeScreen} />
    </Stack.Navigator>
  );
};
