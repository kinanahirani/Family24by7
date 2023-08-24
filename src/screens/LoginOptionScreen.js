import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, verticalScale} from '../helpers/sizeHelpers';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const LoginOptionScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '410480316998-prmr4pjok0r0csvuvk5tee8p2rps52h5.apps.googleusercontent.com',
    });
  }, []);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const usrInfo = await GoogleSignin.signIn();
      console.log(usrInfo, 'usrinfo');

      const userDocRef = firestore().collection('users').doc(usrInfo.user.id);
      console.log(userDocRef, 'userDocRef');
      await userDocRef.set({
        email: usrInfo.user.email,
        id: usrInfo.user.id,
        name: usrInfo.user.name,
        photo: usrInfo.user.photo,
      });
      navigation.replace('tabbar');
      
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }

    // try {
    //     await GoogleSignin.signOut();
    //     setUserInfo({ user: null }); // Remember to remove the user from your app's state as well
    //   } catch (error) {
    //     console.error(error);
    //   }
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', flex: 1}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: moderateScale(20),
            marginTop: moderateScale(30),
            color: 'black',
          }}>
          Family360
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: moderateScale(13),
            marginTop: moderateScale(12),
            color: 'black',
          }}>
          Specially carved for your social needs!
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={styles.loginButtons}
          onPress={googleSignIn}
          activeOpacity={0.7}>
          <Text style={styles.loginText}>Login With Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtons} activeOpacity={0.7}>
          <Text style={styles.loginText}>Login With Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButtons}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('signupwithemail')}>
          <Text style={styles.loginText}>Email Login or Child Account</Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: verticalScale(5),
            fontSize: moderateScale(13),
          }}>
          By proceeding further, you agree to our privacy policy and provide
          your consent.
        </Text>
      </View>
    </View>
  );
};

export default LoginOptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loginButtons: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(119,79,251,255)',
    height: verticalScale(50),
    marginBottom: moderateScale(28),
    elevation: 7,
  },
  loginText: {
    color: 'white',
    fontWeight: '500',
  },
});
