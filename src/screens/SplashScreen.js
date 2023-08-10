import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  let navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('loginoptions');
    }, 3000);
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
    width: 130,
    height: 130,
  },
});
