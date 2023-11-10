// import BackgroundFetch from 'react-native-background-fetch';
// import Geolocation from 'react-native-geolocation-service';
// import {addLocationLog} from './LocationService';
// import firestore from '@react-native-firebase/firestore';
// import RNLocation from 'react-native-location';

// // Initialize BackgroundFetch and configure it
// let locationSubscription = null;
// let locationTimeout = null;
// BackgroundFetch.configure(
//   {
//     minimumFetchInterval: 1, // Interval in minutes (e.g., every 15 minutes)
//     stopOnTerminate: false, // Keep running in the background
//     startOnBoot: true, // Start automatically on boot
//   },
//   async taskId => {
//     try {
//       RNLocation.requestPermission({
//         ios: 'whenInUse',
//         android: {
//           detail: 'fine',
//         },
//       }).then(granted => {
//         console.log('Location Permissions: ', granted);
//         // if has permissions try to obtain location with RN location
//         if (granted) {
//           locationSubscription && locationSubscription();
//           locationSubscription = RNLocation.subscribeToLocationUpdates(
//             ([locations]) => {
//               locationSubscription();
//               locationTimeout && clearTimeout(locationTimeout);
//               console.log(locations);
//             },
//           );
//         } else {
//           locationSubscription && locationSubscription();
//           locationTimeout && clearTimeout(locationTimeout);
//           console.log('no permissions to obtain location');
//         }
//       });
//       // Geolocation.getCurrentPosition(
//       //   async position => {
//       //     const timestamp = new Date().toISOString();
//       //     const location = {
//       //       latitude: position.coords.latitude,
//       //       longitude: position.coords.longitude,
//       //     };

// const currentTime = new Date();
// const formattedTime = currentTime.toLocaleTimeString();

// // Combine location and time in the log statement
// console.log(`${formattedTime}: Location -`, location);
//       //     console.log(location, '....location');

//       //     const address = ''; // Implement geocoding to get the address
//       //     const description = ''; // Implement description logic

//       //     // Store location log in Firestore (assuming you have Firestore set up)
//       //     await firestore().collection('locations').add({
//       //       timestamp,
//       //       location,
//       //       address,
//       //       description,
//       //     });

//       //     console.log('Location log added to Firestore.');
//       //   },
//       //   error => {
//       //     const currentTime = new Date();
//       //     const formattedTime = currentTime.toLocaleTimeString();
//       //     console.error('Error getting location:', formattedTime, error);
//       //   },
//       //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 30000},
//       // );
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

// export default BackgroundFetch;

import BackgroundFetch from 'react-native-background-fetch';
import firestore from '@react-native-firebase/firestore';
import RNLocation from 'react-native-location';

// Initialize BackgroundFetch and configure it
let locationSubscription = null;
let locationTimeout = null;
BackgroundFetch.configure(
  {
    minimumFetchInterval: 1, // Interval in minutes (e.g., every 15 minutes)
    stopOnTerminate: false, // Keep running in the background
    startOnBoot: true, // Start automatically on boot
  },
  async taskId => {
    try {
      RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'fine',
        },
      }).then(granted => {
        console.log('Location Permissions: ', granted);
        // if has permissions try to obtain location with RN location
        if (granted) {
          locationSubscription && locationSubscription();
          locationSubscription = RNLocation.subscribeToLocationUpdates(
            ([locations]) => {
              locationSubscription();
              locationTimeout && clearTimeout(locationTimeout);
              const currentTime = new Date();
              const formattedTime = currentTime.toLocaleTimeString();

              // Combine location and time in the log statement
              console.log(`${formattedTime}: Location -`, locations);
            },
          );
        } else {
          locationSubscription && locationSubscription();
          locationTimeout && clearTimeout(locationTimeout);
          console.log('no permissions to obtain location');
        }
      });
      // Geolocation.getCurrentPosition(
      //   async position => {
      //     const timestamp = new Date().toISOString();
      //     const location = {
      //       latitude: position.coords.latitude,
      //       longitude: position.coords.longitude,
      //     };

      //     const currentTime = new Date();
      //     const formattedTime = currentTime.toLocaleTimeString();

      //     // Combine location and time in the log statement
      //     console.log(`${formattedTime}: Location -`, location);
      //     console.log(location, '....location');

      //     const address = ''; // Implement geocoding to get the address
      //     const description = ''; // Implement description logic

      //     // Store location log in Firestore (assuming you have Firestore set up)
      //     await firestore().collection('locations').add({
      //       timestamp,
      //       location,
      //       address,
      //       description,
      //     });

      //     console.log('Location log added to Firestore.');
      //   },
      //   error => {
      //     const currentTime = new Date();
      //     const formattedTime = currentTime.toLocaleTimeString();
      //     console.error('Error getting location:', formattedTime, error);
      //   },
      //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 30000},
      // );
    } catch (error) {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString();
      console.error('Error getting location:', formattedTime, error);
    } finally {
      BackgroundFetch.finish(taskId);
    }
  },
  async taskId => {
    // onTimeout callback
    // Called when the OS is about to terminate the task
    // Finish any pending tasks and signal completion
    BackgroundFetch.finish(taskId);
  },
);

// Start the background task
BackgroundFetch.start();

export default BackgroundFetch;
