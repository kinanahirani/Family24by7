import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, verticalScale} from '../helpers/sizeHelpers';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {setUserData} from '../redux/slices/userSlice';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

const LoginOptionScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState('');

  async function getToken() {
    let token = await messaging().getToken();
    setToken(token);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '410480316998-prmr4pjok0r0csvuvk5tee8p2rps52h5.apps.googleusercontent.com',
    });
    getToken();
  }, []);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const usrInfo = await GoogleSignin.signIn();

      if (usrInfo) {
        const userDocRef = firestore().collection('users').doc(usrInfo.user.id);
        const userDocSnapshot = await userDocRef.get();
        let userData;

        if (userDocSnapshot.exists) {
          userData = userDocSnapshot.data();
          await firestore()
            .collection('users')
            .doc(userData.id)
            .update({fcmToken: token});

          const userCirclesRef = firestore()
            .collection('circles')
            .doc(userData.activeCircleCode);
          // .where('usersOfCircles', 'array-contains', userData.id);

          const querySnapshot = await userCirclesRef.get();

          const googleCredential = auth.GoogleAuthProvider.credential(
            usrInfo.idToken,
          );

          if (!querySnapshot.empty) {
            dispatch(setUserData(userData));
            navigation.replace('Home');
          } else {
            dispatch(setUserData(userData));
            navigation.replace('createcircle');
          }

          console.log('Successfully signed in:', userData);
          return auth().signInWithCredential(googleCredential);
        } else {
          userData = {
            email: usrInfo.user.email,
            id: usrInfo.user.id,
            name: usrInfo.user.name,
            profilePicture: usrInfo.user.photo,
            fcmToken: token,
          };
          await userDocRef.set(userData);
          dispatch(setUserData(userData));
          const googleCredential = auth.GoogleAuthProvider.credential(
            usrInfo.idToken,
          );
          navigation.replace('createcircle');
          console.log('Successfully signed up:', userData);
          return auth().signInWithCredential(googleCredential);
        }
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Error(googleSignIn): ', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Error(googleSignIn): ', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Error(googleSignIn): ', error);
        // play services not available or outdated
      } else {
        console.log('Error(googleSignIn): ', error);
        // some other error happened
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
    fontSize: moderateScale(14),
  },
});
