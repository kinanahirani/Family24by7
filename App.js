import 'react-native-gesture-handler';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import store, {persistVal} from './src/redux/store';
import {
  backgroundMessage,
  createChannelfunc,
  onMsg,
  requestUserPermission,
} from './src/helpers/notificationHelpers';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from './src/helpers/sizeHelpers';
import MapScreen from './src/screens/MapScreen';
import SafetyScreen from './src/screens/SafetyScreen';
import PlacesScreen from './src/screens/PlacesScreen';
import MenuScreen from './src/screens/MenuScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginOptionScreen from './src/screens/LoginOptionScreen';
import SignupWithEmail from './src/screens/SignupWithEmail';
import LoginWithEmail from './src/screens/LoginWithEmail';
import EnterUserDetails from './src/screens/EnterUserDetails';
import CreateCircleScreen from './src/screens/CreateCircleScreen';
import SendAlertScreen from './src/screens/SendAlertScreen';
import ShareCircleCodeScreen from './src/screens/ShareCircleCodeScreen';
import ContactListScreen from './src/screens/ContactListScreen';
import AddNewPlaceScreen from './src/screens/AddNewPlaceScreen';
import WatchOverMeScreen from './src/screens/WatchOverMeScreen';
import CustomDrawerContent from './src/components/CustomDrawerContent';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const CustomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: verticalScale(65),
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
                fontSize: moderateScale(12),
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
                    size={moderateScale(20)}
                    color={'rgba(119,79,251,255)'}
                  />
                ) : (
                  <Entypo name="home" size={moderateScale(20)} color={'grey'} />
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
                fontSize: moderateScale(12),
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
                    size={moderateScale(20)}
                    color={'rgba(119,79,251,255)'}
                  />
                ) : (
                  <MaterialIcons
                    name="health-and-safety"
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
        name="places"
        component={PlacesScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                marginBottom: verticalScale(7),
                color: focused ? 'rgba(119,79,251,255)' : 'grey',
                fontSize: moderateScale(12),
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
                    size={moderateScale(18)}
                    color={'rgba(119,79,251,255)'}
                  />
                ) : (
                  <FontAwesome6
                    name="location-dot"
                    size={moderateScale(18)}
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
                fontSize: moderateScale(12),
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
                    size={moderateScale(18)}
                    color={'rgba(119,79,251,255)'}
                  />
                ) : (
                  <Feather
                    name="menu"
                    size={moderateScale(18)}
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

const CustomDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          width: '72%',
          elevation: 7,
          shadowColor: '#000',
        },
        overlayColor: 'rgba(0, 0, 0, 0.6);',
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={CustomTabNavigator} />
    </Drawer.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    createChannelfunc();
    backgroundMessage();
    requestUserPermission();
    onMsg();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistVal}>
          <PaperProvider>
            <StatusBar backgroundColor={'rgba(119,79,251,255)'} />
            {/* <AppNavigator /> */}
            <Stack.Navigator
              initialRouteName="splash"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="splash" component={SplashScreen} />
              <Stack.Screen name="loginoptions" component={LoginOptionScreen} />
              <Stack.Screen
                name="signupwithemail"
                component={SignupWithEmail}
              />
              <Stack.Screen name="Home" component={CustomDrawerNavigator} />
              <Stack.Screen name="loginwithemail" component={LoginWithEmail} />
              <Stack.Screen
                name="enteruserdetails"
                component={EnterUserDetails}
              />
              <Stack.Screen
                name="createcircle"
                component={CreateCircleScreen}
              />
              <Stack.Screen name="map" component={MapScreen} />
              <Stack.Screen name="sendAlert" component={SendAlertScreen} />
              <Stack.Screen name="WatchOverMe" component={WatchOverMeScreen} />

              <Stack.Screen
                name="ShareCircleCode"
                component={ShareCircleCodeScreen}
              />
              <Stack.Screen name="Contacts" component={ContactListScreen} />
              <Stack.Screen name="AddNewPlace" component={AddNewPlaceScreen} />
            </Stack.Navigator>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
