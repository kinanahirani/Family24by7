import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import {TextInput, HelperText} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';
import {setUserData} from '../redux/slices/userSlice';
import {useDispatch} from 'react-redux';

const LoginWithEmail = ({navigation}) => {
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const togglePasswordVisibility = () => {
    setSecureTextEntry(prevSecureTextEntry => !prevSecureTextEntry);
  };

  const onSubmit = async data => {
    Keyboard.dismiss();
    const {email, password} = data;
    try {
      const {user} = await auth().signInWithEmailAndPassword(email, password);

      if (user) {
        console.log(user.uid);
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          dispatch(setUserData(userData));
          navigation.replace('enteruserdetails');
          // navigation.replace('createcircle');
        } else {
          Alert.alert('User not found!');
        }
      } else {
        Alert.alert('Wrong credentials!');
      }
    } catch (error) {
      Alert.alert('Login Error:', error.message);
    }
  };
  return (
    <View style={styles.container}>
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
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  mode="flat"
                  label="Enter Family360 email"
                  style={[styles.textInput, {marginTop: moderateScale(20)}]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
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
                }}>
                Email is required.
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
                  label="Enter Family360 password"
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
                    width: '85%',
                    // marginBottom: moderateScale(40),
                  }}
                />
              )}
              name="password"
            />
            {errors.password && (
              <HelperText
                type="error"
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: horizontalScale(30),
                }}>
                Password is required.
              </HelperText>
            )}
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={[styles.loginButtons, {marginTop: moderateScale(30)}]}
            activeOpacity={0.7}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.loginText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('signupwithemail')}
            style={[
              styles.loginButtons,
              {backgroundColor: 'rgba(174, 169, 172, 0.9)'},
            ]}
            activeOpacity={0.7}>
            <Text style={[styles.loginText, {color: 'black'}]}>
              NEW ACCOUNT?
              <Text style={{textDecorationLine: 'underline', color: 'black'}}>
                SIGN UP HERE!
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginWithEmail;

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
  textInput: {
    width: '85%',
    backgroundColor: 'white',
    fontSize: moderateScale(14),
  },
});
