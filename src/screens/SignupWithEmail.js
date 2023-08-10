import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from '../helpers/sizeHelpers';
import {HelperText, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupWithEmail = () => {
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
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const togglePasswordVisibility = () => {
    setSecureTextEntry(prevSecureTextEntry => !prevSecureTextEntry);
  };

  const onSubmit = async data => {
    const {email, password} = data;
    try {
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
            //   token: token,
          });
          console.log('user created');
          navigation.navigate('loginwithemail')
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
                fontSize: 20,
                marginTop: moderateScale(40),
                color: 'black',
              }}>
              Family360
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 13,
                marginTop: moderateScale(12),
                color: 'black',
              }}>
              Specially carved for your social needs!
            </Text>
            <Text
              style={{
                marginTop: moderateScale(20),
                width: '85%',
                fontSize: 14,
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
                      marginTop: 20,
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
                  marginLeft: moderateScale(30),
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
                />
              )}
              name="email"
            />
            {errors.email && (
              <HelperText
                type="error"
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: moderateScale(30),
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
            <Text>Use this format:</Text>
            <Text>childname+parentname@lastname+family360.com,</Text>
            <Text>example KinanaMohammed@Hiranifamily360</Text>
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
                    marginTop: 20,
                    backgroundColor: 'white',
                    fontSize: 14,
                  }}
                />
              )}
              name="password"
            />
            {errors.password && (
              <HelperText type="error" style={{alignSelf: 'flex-start'}}>
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
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.loginText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('loginwithemail')}
            style={[
              styles.loginButtons,
              {backgroundColor: 'rgba(174, 169, 172, 0.9)'},
            ]}
            activeOpacity={0.7}>
            <Text style={[styles.loginText, {color: 'black'}]}>
              ALREADY HAVE AN ACCOUNT? LOGIN HERE!
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 5,
              fontSize: 13,
              width: '85%',
            }}>
            By proceeding further, you agree to our privacy policy and provide
            your consent.
          </Text>
        </View>
      </ScrollView>
    </View>
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
    height: 50,
    marginBottom: moderateScale(28),
    elevation: 7,
  },
  loginText: {
    color: 'white',
    fontWeight: '500',
  },
  textInput: {
    width: '85%',
    backgroundColor: 'white',
    fontSize: 14,
  },
});
