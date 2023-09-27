import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddPlaceScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [places, setPlaces] = useState([]);
  const circleData = useSelector(state => state.circle.data);

  useEffect(() => {
    const fetchData = async () => {
      console.log(circleData, '....circleData');
      // const circleCode = circleData.joinedCircles[0].circleCode;
      const circleCode = circleData.circleCode;
      const placesCollectionRef = firestore()
        .collection('places')
        .doc(circleCode)
        .collection('addedPlaces');

      try {
        const placesOfTheCircle = await placesCollectionRef.get();
        const placesData = placesOfTheCircle.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlaces(placesData);
        console.log('Places of the Circle:', placesData);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchData();
  }, [isFocused]);

  const updateFirestoreSwitchState = async (itemId, switchType, value) => {
    const placeRef = firestore()
      .collection('places')
      // .doc(circleData.joinedCircles[0].circleCode)
      .doc(circleData.circleCode)
      .collection('addedPlaces')
      .doc(itemId);

    try {
      await placeRef.update({
        [switchType]: value,
      });
      console.log(`Updated ${switchType} in Firestore for ${itemId}`);
    } catch (error) {
      console.error(`Error updating ${switchType} in Firestore:`, error);
    }
  };

  const handleSwitchToggle = (itemId, switchType) => {
    const updatedPlaces = places.map(place =>
      place.id === itemId
        ? {
            ...place,
            [switchType]: !place[switchType],
          }
        : place,
    );

    setPlaces(updatedPlaces);
    updateFirestoreSwitchState(
      itemId,
      switchType,
      !places.find(place => place.id === itemId)[switchType],
    );
  };

  const deletePlace = async itemId => {
    // Remove the place from the local state
    const updatedPlaces = places.filter(place => place.id !== itemId);
    setPlaces(updatedPlaces);

    // Delete the place from Firestore
    const placeRef = firestore()
      .collection('places')
      .doc(circleData.circleCode)
      .collection('addedPlaces')
      .doc(itemId);

    try {
      await placeRef.delete();
      console.log(`Deleted place with ID ${itemId} from Firestore`);
    } catch (error) {
      console.error(`Error deleting place from Firestore:`, error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'rgba(128,128,128,0.4)',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: verticalScale(10),
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: moderateScale(14),
                marginLeft: horizontalScale(10),
              }}>
              {item.name}
            </Text>
            <TouchableOpacity
              onPress={() => deletePlace(item.id)}
              activeOpacity={0.7}>
              <MaterialCommunityIcons
                name="delete-outline"
                color={'black'}
                size={moderateScale(22)}
                style={{marginRight: horizontalScale(7)}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: horizontalScale(45),
              marginTop: verticalScale(15),
            }}>
            <Text style={{color: 'black', fontSize: moderateScale(14)}}>
              Get Alerts
            </Text>
            <Switch
              trackColor={{false: '#767577', true: 'rgba(119,79,251,0.4)'}}
              thumbColor={item.getAlerts ? 'rgba(119,79,251,255)' : '#f4f3f4'}
              onValueChange={value => handleSwitchToggle(item.id, 'getAlerts')}
              value={item.getAlerts}
            />
          </View>
          <TouchableOpacity>
            <Feather
              name="chevron-right"
              size={moderateScale(18)}
              color={'black'}
              style={{
                alignSelf: 'flex-end',
                marginRight: horizontalScale(7),
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: horizontalScale(45),
              marginBottom: verticalScale(15),
            }}>
            <Text style={{color: 'black', fontSize: moderateScale(14)}}>
              Show on my map
            </Text>
            <Switch
              trackColor={{false: '#767577', true: 'rgba(119,79,251,0.4)'}}
              thumbColor={item.showOnMap ? 'rgba(119,79,251,255)' : '#f4f3f4'}
              onValueChange={value => handleSwitchToggle(item.id, 'showOnMap')}
              value={item.showOnMap}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'black',
            width: '100%',
            height: 'auto',
            padding: moderateScale(10),
          }}>
          <AntDesign
            name="exclamationcircleo"
            color={'white'}
            size={20}
            style={{alignSelf: 'flex-start'}}
          />
          <Text
            style={{
              color: 'white',
              fontSize: moderateScale(13),
              marginLeft: horizontalScale(15),
              width: '75%',
            }}>
            Get notified when someone leaves or enters places.
          </Text>
        </View>
        {places.length > 0 ? (
          <FlatList
            data={places}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                width: '90%',
                textAlign: 'center',
                fontSize: moderateScale(14),
              }}>
              Add places to get notified when circle members enter or leave the
              place (2 free places)
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddNewPlace')}
              activeOpacity={1}
              style={{
                backgroundColor: 'rgba(119,79,251,255)',
                marginTop: verticalScale(15),
                width: horizontalScale(90),
                height: verticalScale(60),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: moderateScale(10),
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: moderateScale(13),
                }}>
                Add place
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddNewPlace')}
        activeOpacity={1}
        style={{
          backgroundColor: 'rgba(119,79,251,255)',
          padding: moderateScale(8),
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: moderateScale(14),
            textAlign: 'center',
          }}>
          Add a place
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default AddPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

// import {
//   FlatList,
//   StyleSheet,
//   Switch,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {
//   horizontalScale,
//   moderateScale,
//   verticalScale,
// } from '../helpers/sizeHelpers';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
// import firestore from '@react-native-firebase/firestore';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const AddPlaceScreen = () => {
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();
//   const [places, setPlaces] = useState([]);
//   const [alertEnabled, setAlertEnabled] = useState({});
//   const [showOnMapEnabled, setShowOnMapEnabled] = useState({});
//   const circleData = useSelector(state => state.circle.data);

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log(circleData, '....circleData');
//       const circleCode = circleData.joinedCircles[0].circleCode;
//       const placesCollectionRef = firestore()
//         .collection('places')
//         .doc(circleCode)
//         .collection('addedPlaces');

//       try {
//         const placesOfTheCircle = await placesCollectionRef.get();
//         const placesData = placesOfTheCircle.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setPlaces(placesData);
//         console.log('Places of the Circle:', placesData);

//         // Initialize switch state for each item
//         const initialAlertEnabled = {};
//         const initialShowOnMapEnabled = {};
//         placesData.forEach(place => {
//           initialAlertEnabled[place.id] = place.alertEnabled;
//           initialShowOnMapEnabled[place.id] = place.showOnMapEnabled;
//         });
//         setAlertEnabled(initialAlertEnabled);
//         setShowOnMapEnabled(initialShowOnMapEnabled);
//       } catch (error) {
//         console.error('Error fetching places:', error);
//       }
//     };

//     fetchData();
//   }, [isFocused]);

//   const toggleAlertSwitch = itemId => {
//     // Create a copy of the alert switch state
//     const updatedAlertEnabled = {
//       ...alertEnabled,
//       [itemId]: !alertEnabled[itemId],
//     };

//     // Update the state with the new alert switch state
//     setAlertEnabled(updatedAlertEnabled);

//     // Perform actions based on alert switch state
//     if (updatedAlertEnabled[itemId]) {
//       // Perform action when "Get Alerts" switch is turned on
//       console.log('Alerts enabled for place with ID:', itemId);
//       // Add your logic here
//     } else {
//       // Perform action when "Get Alerts" switch is turned off
//       console.log('Alerts disabled for place with ID:', itemId);
//       // Add your logic here
//     }
//   };

//   const toggleMapSwitch = itemId => {
//     // Create a copy of the map switch state
//     const updatedShowOnMapEnabled = {
//       ...showOnMapEnabled,
//       [itemId]: !showOnMapEnabled[itemId],
//     };

//     // Update the state with the new map switch state
//     setShowOnMapEnabled(updatedShowOnMapEnabled);

//     // Perform actions based on map switch state
//     if (updatedShowOnMapEnabled[itemId]) {
//       // Perform action when "Show on my map" switch is turned on
//       console.log('Show on map enabled for place with ID:', itemId);
//       // Add your logic here
//     } else {
//       // Perform action when "Show on my map" switch is turned off
//       console.log('Show on map disabled for place with ID:', itemId);
//       // Add your logic here
//     }
//   };

//   const renderItem = ({item}) => {
//     return (
//       <View style={{flex: 1}}>
//         <View
//           style={{
//             borderBottomWidth: 1,
//             borderColor: 'rgba(128,128,128,0.4)',
//           }}>
// <View
//   style={{
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: verticalScale(10),
//   }}>
//             <Text
//               style={{
//                 fontWeight: 'bold',
//                 color: 'black',
//                 fontSize: moderateScale(14),
//                 marginLeft: horizontalScale(10),
//               }}>
//               {item.name}
//             </Text>
// <TouchableOpacity>
//   <MaterialCommunityIcons
//     name="delete-outline"
//     color={'black'}
//     size={moderateScale(22)}
//     style={{marginRight: horizontalScale(7)}}
//   />
// </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               paddingHorizontal: horizontalScale(45),
//               marginTop: verticalScale(15),
//             }}>
//             <Text style={{color: 'black', fontSize: moderateScale(14)}}>
//               Get Alerts
//             </Text>
//             <Switch
//               trackColor={{false: '#767577', true: 'rgba(119,79,251,0.4)'}}
//               thumbColor={
//                 alertEnabled[item.id] ? 'rgba(119,79,251,255)' : '#f4f3f4'
//               }
//               onValueChange={() => toggleAlertSwitch(item.id)}
//               value={alertEnabled[item.id]}
//             />
//           </View>
//           <TouchableOpacity>
//             <Feather
//               name="chevron-right"
//               size={moderateScale(18)}
//               color={'black'}
//               style={{
//                 alignSelf: 'flex-end',
//                 marginRight: horizontalScale(7),
//               }}
//             />
//           </TouchableOpacity>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               paddingHorizontal: horizontalScale(45),
//               marginBottom: verticalScale(15),
//             }}>
//             <Text style={{color: 'black', fontSize: moderateScale(14)}}>
//               Show on my map
//             </Text>
//             <Switch
//               trackColor={{false: '#767577', true: 'rgba(119,79,251,0.4)'}}
//               thumbColor={
//                 showOnMapEnabled[item.id] ? 'rgba(119,79,251,255)' : '#f4f3f4'
//               }
//               onValueChange={() => toggleMapSwitch(item.id)}
//               value={showOnMapEnabled[item.id]}
//             />
//           </View>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <View
//           style={{
//             flexDirection: 'row',
//             backgroundColor: 'black',
//             width: '100%',
//             height: 'auto',
//             padding: moderateScale(10),
//           }}>
//           <AntDesign
//             name="exclamationcircleo"
//             color={'white'}
//             size={20}
//             style={{alignSelf: 'flex-start'}}
//           />
//           <Text
//             style={{
//               color: 'white',
//               fontSize: moderateScale(13),
//               marginLeft: horizontalScale(15),
//               width: '75%',
//             }}>
//             Get notified when someone leaves or enters places.
//           </Text>
//         </View>
//         {places.length > 0 ? (
//           <FlatList
//             data={places}
//             renderItem={renderItem}
//             keyExtractor={item => item.id.toString()}
//           />
//         ) : (
//           <View
//             style={{
//               alignItems: 'center',
//               justifyContent: 'center',
//               flex: 1,
//             }}>
//             <Text
//               style={{
//                 width: '90%',
//                 textAlign: 'center',
//                 fontSize: moderateScale(14),
//               }}>
//               Add places to get notified when circle members enter or leave the
//               place (2 free places)
//             </Text>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('AddNewPlace')}
//               activeOpacity={1}
//               style={{
//                 backgroundColor: 'rgba(119,79,251,255)',
//                 marginTop: verticalScale(15),
//                 width: horizontalScale(90),
//                 height: verticalScale(60),
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderRadius: moderateScale(10),
//               }}>
//               <Text
//                 style={{
//                   color: 'white',
//                   fontSize: moderateScale(13),
//                 }}>
//                 Add place
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//       <TouchableOpacity
//         onPress={() => navigation.navigate('AddNewPlace')}
//         activeOpacity={1}
//         style={{
//           backgroundColor: 'rgba(119,79,251,255)',
//           padding: moderateScale(8),
//         }}>
//         <Text
//           style={{
//             color: 'white',
//             fontSize: moderateScale(14),
//             textAlign: 'center',
//           }}>
//           Add a place
//         </Text>
//       </TouchableOpacity>
//     </>
//   );
// };

// export default AddPlaceScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
// });
