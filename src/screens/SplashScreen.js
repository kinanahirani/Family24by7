import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {horizontalScale, verticalScale} from '../helpers/sizeHelpers';
import {useSelector} from 'react-redux';

const SplashScreen = () => {
  let navigation = useNavigation();
  const userData = useSelector(state => state.user.data);

  useEffect(()=>{
    setTimeout(() => {
    if (userData && userData.name) {
      navigation.replace('tabbar');
    } else {
      navigation.replace('loginoptions');
    }
  },1000)
  }, [userData, navigation]);

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
