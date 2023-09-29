/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import BackgroundFetch from 'react-native-background-fetch';
// import Geolocation from 'react-native-geolocation-service';
// import firestore from '@react-native-firebase/firestore';

// const STAY_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

// let currentLocation = null;
// let stayStartTime = null;

// // Initialize BackgroundFetch and configure it
// BackgroundFetch.configure(
//   {
//     minimumFetchInterval: 1, // Interval in minutes (e.g., every 15 minutes)
//     stopOnTerminate: false, // Keep running in the background
//     startOnBoot: true, // Start automatically on boot
//   },
//   async taskId => {
//     try {
//       // Fetch location using Geolocation service
//       Geolocation.getCurrentPosition(
//         async position => {
//           const timestamp = new Date().toISOString();
//           const location = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };
//           console.log(location, '...location');

//           // Determine if the user has stayed at the same location
//           if (
//             currentLocation &&
//             calculateDistance(currentLocation, location) < STAY_THRESHOLD_MS
//           ) {
//             if (!stayStartTime) {
//               stayStartTime = new Date();
//             }

//             // User is still at the same location; update stay time
//             const stayDuration = new Date() - stayStartTime;

//             // Check if the user has stayed for at least the threshold time
//             if (stayDuration >= STAY_THRESHOLD_MS) {
//               // Store a location log in Firestore
//               const address = ''; // Implement geocoding to get the address
//               const description = ''; // Implement description logic

//               //   await addLocationLog(timestamp, location, address, description);

//               console.log('Location log added to Firestore.');
//             }
//           } else {
//             // User moved to a different location
//             currentLocation = location;
//             stayStartTime = null;
//           }
//         },
//         error => {
//           console.error('Error getting location:', error);
//           BackgroundFetch.finish(taskId);
//         },
//         {enableHighAccuracy: true, timeout: 15000, maximumAge: 30000},
//       );
//     } catch (error) {
//       console.error('Error in background task:', error);
//     }
//     //  finally {
//     //   BackgroundFetch.finish(taskId);
//     // }
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

// // Helper function to calculate distance between two coordinates
// function calculateDistance(coord1, coord2) {
//   // Implement distance calculation logic here
//   // You can use libraries like Haversine formula or other methods
//   return 0; // Return distance in meters
// }

// BackgroundFetch.start();

AppRegistry.registerComponent(appName, () => App);
