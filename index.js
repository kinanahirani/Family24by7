/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import BackgroundFetch from 'react-native-background-fetch';
// import Geolocation from 'react-native-geolocation-service';
// // import {addLocationLog} from './LocationService'; // Import your location logging function

// import firestore from '@react-native-firebase/firestore';

// // Initialize BackgroundFetch and configure it
// BackgroundFetch.configure(
//   {
//     minimumFetchInterval: 1, // Interval in minutes (e.g., every 15 minutes)
//     stopOnTerminate: false, // Keep running in the background
//     startOnBoot: true, // Start automatically on boot
//   },
//   async taskId => {
    // console.log('Background task started'); 
//     try {
//       // Fetch location using Geolocation service
//       Geolocation.getCurrentPosition(
//         async position => {
//           const timestamp = new Date().toISOString();
//           const location = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };
//           console.log(location, '....location');
//           const address = ''; // Implement geocoding to get the address
//           const description = ''; // Implement description logic

//           // Store location log in Firestore (assuming you have Firestore set up)
//           await firestore().collection('locations').add({
//             timestamp,
//             location,
//             address,
//             description,
//           });

//           console.log('Location log added to Firestore.');
//         },
//         error => {
//           console.error('Error getting location:', error);
//         },
//         {enableHighAccuracy: true, timeout: 15000, maximumAge: 30000},
//       );
//     } catch (error) {
//       console.error('Error in background task:', error);
//     } finally {
//       BackgroundFetch.finish(taskId);
//     }
//   },
//   async taskId => {
//     // onTimeout callback
//     // Called when the OS is about to terminate the task
//     // Finish any pending tasks and signal completion
//     BackgroundFetch.finish(taskId);
//   },
// );

// // Start the background task
// BackgroundFetch.start();

AppRegistry.registerComponent(appName, () => App);
