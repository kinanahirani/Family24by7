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
// import BackgroundLocationService from './src/helpers/BackgroundLocationService';
import BackgroundService from 'react-native-background-actions';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
// const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

// BackgroundService.on('expiration', () => {
//   console.log('I am being closed :(');
// });

// const veryIntensiveTask = async taskDataArguments => {
//   // Example of an infinite loop task
//   const {delay} = taskDataArguments;
//   await new Promise(async resolve => {
//     for (let i = 0; BackgroundService.isRunning(); i++) {
//       console.log(i);
//       await sleep(delay);
//     }
//   });
// };

// const options = {
//   taskName: 'updating location',
//   taskTitle: 'updating location',
//   taskDesc: 'updating location description',
//   taskIcon: {
//     name: 'ic_launcher',
//     type: 'mipmap',
//   },
//   color: '#ff00ff',
//   linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
//   parameters: {
//     delay: 1000,
//   },
// };

// await BackgroundService.start(veryIntensiveTask, options);
// await BackgroundService.updateNotification({
//   taskDesc: 'New ExampleTask description',
// }); // Only Android, iOS will ignore this call
// // iOS will also run everything here in the background until .stop() is called
// await BackgroundService.stop();

const CustomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: verticalScale(80),
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
  // useEffect(() => {
  //   createChannelfunc();
  //   backgroundMessage();
  //   requestUserPermission();
  //   onMsg();
  // }, []);

  let playing = BackgroundService.isRunning();

  const toggleBackground = async () => {
    playing = !playing;
    if (playing) {
      try {
        console.log('trying');
        await BackgroundService.start(taskRandom, options);
        console.log('started');
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('stopping');
      BackgroundService.stop();
    }
  };

  useEffect(() => {
    console.log('in useEffect');
    // RNLocation.configure({
    //   distanceFilter: 500,
    //   desiredAccuracy: {
    //     ios: 'best',
    //     android: 'balancedPowerAccuracy',
    //   },
    //   androidProvider: 'auto',
    //   interval: 5000, // Milliseconds
    //   fastestInterval: 10000, // Milliseconds
    //   maxWaitTime: 5000, // Milliseconds
    // });

    // let locationSubscription = null;
    // let locationTimeout = null;
    // console.log('in useEffect2');

    // ReactNativeForegroundService.add_task(
    //   () => {
    //     console.log('in useEffect3');
    //     RNLocation.requestPermission({
    //       ios: 'whenInUse',
    //       android: {
    //         detail: 'fine',
    //       },
    //     }).then(granted => {
    //       console.log('Location Permissions1: ', granted);
    //       // if has permissions try to obtain location with RN location
    //       if (granted) {
    //         locationSubscription && locationSubscription();
    //         locationSubscription = RNLocation.subscribeToLocationUpdates(
    //           ([locations]) => {
    //             locationSubscription();
    //             locationTimeout && clearTimeout(locationTimeout);
    //             console.log(locations, 'locations in ');
    //           },
    //         );
    //       } else {
    //         locationSubscription && locationSubscription();
    //         locationTimeout && clearTimeout(locationTimeout);
    //         console.log('no permissions to obtain location');
    //       }
    //     });
    //   },
    //   {
    //     delay: 1000,
    //     onLoop: true,
    //     taskId: 'taskid',
    //     onError: e => console.log('Error logging:', e),
    //   },
    // );
    // Start the background location service when the component mounts
    // BackgroundLocationService.start();

    // // Clean up the service when the component unmounts (optional)
    // return () => {
    //   BackgroundLocationService.stop();
    // };
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
