import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import {HelperText, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserData} from '../redux/slices/userSlice';
import {useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

const SignupWithEmail = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setSecureTextEntry(prevSecureTextEntry => !prevSecureTextEntry);
  };

  useEffect(() => {
    getToken();
  }, []);

  async function getToken() {
    let token = await messaging().getToken();
    setToken(token);
  }

  const onSubmit = async data => {
    const {email, password} = data;
    try {
      setLoading(true);
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (user) {
        const id = user.uid;
        const name = data.name;
        if (email && id && password) {
          await firestore().collection('users').doc(id).set({
            name,
            email,
            id,
            password,
            fcmToken: token,
          });
          const userData = {
            email,
            id,
            name,
            password,
          };

          dispatch(setUserData(userData));
          console.log('user created');
          navigation.navigate('createcircle');
        }
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: moderateScale(20),
                marginTop: moderateScale(40),
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
            <Text
              style={{
                marginTop: moderateScale(20),
                width: '85%',
                fontSize: moderateScale(14),
              }}>
              Since a lot of cildren do not have email to signup, we use
              family360 emails to setup chaildren accounts, please note
              thatpasswords can not be recovered so remember them carefully. If
              you do have an email you can signup with that!
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  mode="flat"
                  label="Your Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={[
                    styles.textInput,
                    {
                      marginTop: verticalScale(20),
                    },
                  ]}
                />
              )}
              name="name"
            />
            {errors.name && (
              <HelperText
                type="error"
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: horizontalScale(30),
                  fontSize: moderateScale(12),
                }}>
                Name is required.
              </HelperText>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  mode="flat"
                  label="Create Family360 email"
                  style={styles.textInput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
            {errors.email && (
              <HelperText
                type="error"
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: horizontalScale(30),
                  fontSize: moderateScale(12),
                }}>
                Email is required.
              </HelperText>
            )}
          </View>
          <View
            style={{
              width: '85%',
              alignSelf: 'center',
              marginTop: moderateScale(20),
            }}>
            <Text style={{fontSize: moderateScale(13)}}>Use this format:</Text>
            <Text style={{fontSize: moderateScale(13)}}>
              childname+parentname@lastname+family360.com,
            </Text>
            <Text style={{fontSize: moderateScale(13)}}>
              example KinanaMohammed@Hiranifamily360
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  mode="flat"
                  label="Create Family360 password"
                  secureTextEntry={secureTextEntry}
                  right={
                    <TextInput.Icon
                      icon={secureTextEntry ? 'eye' : 'eye-off'}
                      onPress={togglePasswordVisibility}
                    />
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    marginTop: verticalScale(20),
                    backgroundColor: 'white',
                    fontSize: moderateScale(14),
                  }}
                />
              )}
              name="password"
            />
            {errors.password && (
              <HelperText
                type="error"
                style={{alignSelf: 'flex-start', fontSize: moderateScale(12)}}>
                Password is required.
              </HelperText>
            )}
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: moderateScale(40),
          }}>
          <TouchableOpacity
            style={styles.loginButtons}
            activeOpacity={0.7}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.loginText}>Continue</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('loginwithemail')}
            style={[
              styles.loginButtons,
              {backgroundColor: 'rgba(174, 169, 172, 0.9)'},
            ]}
            activeOpacity={0.7}>
            <Text style={[styles.loginText, {color: 'black'}]}>
              ALREADY HAVE AN ACCOUNT?
              <Text style={{textDecorationLine: 'underline', color: 'black'}}>
                LOGIN HERE!
              </Text>
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: verticalScale(5),
              fontSize: moderateScale(13),
              width: '85%',
            }}>
            By proceeding further, you agree to our privacy policy and provide
            your consent.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupWithEmail;

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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  loginText: {
    color: 'white',
    fontWeight: '500',
    fontSize: moderateScale(14),
  },
  textInput: {
    width: '85%',
    backgroundColor: 'white',
    fontSize: moderateScale(14),
  },
});
