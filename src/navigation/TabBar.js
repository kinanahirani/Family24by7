import {StyleSheet, Text, View} from 'react-native';
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

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIconStyle: {
          width: '100%',
        },
        tabBarStyle: {
          height: 70,
        },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}>
      <Tab.Screen
        name="map"
        component={MapScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ marginBottom: 7, color: focused ? 'rgba(119,79,251,255)' : 'grey' }}>
              Map
            </Text>
          ),
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused ? (
                  <Entypo
                    name="home"
                    size={25}
                    color={'rgba(119,79,251,255)'}
                  />
                ) : (
                  <Entypo name="home" size={25} color={'grey'} />
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
          tabBarLabel: ({ focused }) => (
            <Text style={{ marginBottom: 7, color: focused ? 'rgba(119,79,251,255)' : 'grey' }}>
              Safety
            </Text>
          ),
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused ? (
                  <MaterialIcons
                    name="health-and-safety"
                    size={25}
                    color={'rgba(119,79,251,255)'}
                  />
                ) : (
                  <MaterialIcons
                    name="health-and-safety"
                    size={25}
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
          tabBarLabel: ({ focused }) => (
            <Text style={{ marginBottom: 7, color: focused ? 'rgba(119,79,251,255)' : 'grey' }}>
              Places
            </Text>
          ),
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused ? (
                  <FontAwesome6
                    name="location-dot"
                    size={25}
                    color={'rgba(119,79,251,255)'}
                  />
                ) : (
                  <FontAwesome6 name="location-dot" size={25} color={'grey'} />
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
          tabBarLabel: ({ focused }) => (
            <Text style={{ marginBottom: 7, color: focused ? 'rgba(119,79,251,255)' : 'grey' }}>
              Menu
            </Text>
          ),
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused ? (
                  <Feather
                    name="menu"
                    size={25}
                    color={'rgba(119,79,251,255)'}
                  />
                ) : (
                  <Feather name="menu" size={25} color={'grey'} />
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
