import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {horizontalScale, verticalScale} from '../helpers/sizeHelpers';
import {useSelector} from 'react-redux';

const SplashScreen = () => {
  let navigation = useNavigation();
  const userData = useSelector(state => state.user.data);

  // const checkIsFirst = async () => {
  //   setTimeout(async () => {
  //     if (userData) {
  //       navigation.replace('tabbar');
  //     } else {
  //       navigation.replace('loginwithemail');
  //     }
  //   }, 3000);
  // };

  const checkIsFirst = async () => {
    setTimeout(async () => {
      try {
        const userPersistedData = await AsyncStorage.getItem('persist:user');
        if (userPersistedData) {
          const parsedUserPersistedData = JSON.parse(userPersistedData);
          if (parsedUserPersistedData.data !== '') {
            console.log(
              parsedUserPersistedData.data,
              'User data found in AsyncStorage',
            );
            navigation.replace('tabbar');
          } else {
            console.log('User data empty in AsyncStorage');
            navigation.replace('loginoptions');
          }
        } else {
          console.log('No user data found in AsyncStorage');
          navigation.replace('loginoptions');
        }
      } catch (error) {
        console.error('Error checking user data in AsyncStorage:', error);
        // Handle error, show a message to the user, etc.
      }
    });
  };

  useEffect(() => {
    checkIsFirst();
    return checkIsFirst;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'rgba(119,79,251,255)'} />
      <Image style={styles.img} source={require('../assets/images/logo.png')} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(119,79,251,255)',
  },
  img: {
    width: horizontalScale(130),
    height: verticalScale(130),
  },
});
