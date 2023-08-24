import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import SafetyScreen from '../screens/SafetyScreen';
import PlacesScreen from '../screens/PlacesScreen';
import MenuScreen from '../screens/MenuScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale, verticalScale} from '../helpers/sizeHelpers';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: '10%',
          width: '100%',
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarLabelPosition: 'below-icon',
      }}>
      <Tab.Screen
        name="map"
        component={MapScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                marginBottom: verticalScale(7),
                color: focused ? 'rgba(119,79,251,255)' : 'grey',
                fontSize:moderateScale(14)
              }}>
              Map
            </Text>
          ),
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused ? (
                  <Entypo
                    name="home"
                    size={moderateScale(22)}
                    color={'rgba(119,79,251,255)'}
                  />
                ) : (
                  <Entypo name="home" size={moderateScale(22)} color={'grey'} />
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="safety"
        component={SafetyScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                marginBottom: verticalScale(7),
                color: focused ? 'rgba(119,79,251,255)' : 'grey',
                fontSize:moderateScale(14)
              }}>
              Safety
            </Text>
          ),
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused ? (
                  <MaterialIcons
                    name="health-and-safety"
                    size={moderateScale(22)}
                    color={'rgba(119,79,251,255)'}
                  />
                ) : (
                  <MaterialIcons
                    name="health-and-safety"
                    size={moderateScale(22)}
                    color={'grey'}
                  />
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="places"
        component={PlacesScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                marginBottom: verticalScale(7),
                color: focused ? 'rgba(119,79,251,255)' : 'grey',
                fontSize:moderateScale(14)
              }}>
              Places
            </Text>
          ),
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused ? (
                  <FontAwesome6
                    name="location-dot"
                    size={moderateScale(20)}
                    color={'rgba(119,79,251,255)'}
                  />
                ) : (
                  <FontAwesome6
                    name="location-dot"
                    size={moderateScale(20)}
                    color={'grey'}
                  />
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="menu"
        component={MenuScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                marginBottom: verticalScale(7),
                color: focused ? 'rgba(119,79,251,255)' : 'grey',
                fontSize:moderateScale(14)
              }}>
              Menu
            </Text>
          ),
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused ? (
                  <Feather
                    name="menu"
                    size={moderateScale(20)}
                    color={'rgba(119,79,251,255)'}
                  />
                ) : (
                  <Feather
                    name="menu"
                    size={moderateScale(20)}
                    color={'grey'}
                  />
                )}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
