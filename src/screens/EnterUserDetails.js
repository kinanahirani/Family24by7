import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput, HelperText} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import {useForm, Controller} from 'react-hook-form';
import {setUserData} from '../redux/slices/userSlice';

const EnterUserDetails = ({navigation}) => {
  const userData = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      contact: userData.mobileNumber || '',
    },
  });

  const fetchProfilePic = async () => {
    try {
      const userId = userData.id;
      const userRef = firestore().collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const user = userDoc.data();
        const fetchedProfilePic = user.profilePicture || null;

        if (fetchedProfilePic) {
          setProfilePicture({path: fetchedProfilePic});
        }
      } else {
        console.log('User document does not exist');
      }
    } catch (error) {
      console.log('Error fetching user details from Firestore:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfilePic();
    });

    return unsubscribe;
  }, [navigation]);

  const uploadProfilePicture = async (userId, profilePicture) => {
    const {path} = profilePicture;
    console.log('Image path:', path);
    const email = userData.email;
    const imageRef = storage().ref(`Profile Pictures/${email}.jpg`);

    try {
      const fileExists = await imageRef.getDownloadURL().then(
        () => true,
        () => false,
      );

      if (!fileExists) {
        await imageRef.putFile(path);
        console.log('Image uploaded successfully');
      }

      const downloadUrl = await imageRef.getDownloadURL();
      console.log('Profile picture uploaded:', downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.log('Error uploading profile picture:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const userId = userData.id;
      if (profilePicture) {
        const downloadUrl = await uploadProfilePicture(userId, profilePicture);
        await firestore().collection('users').doc(userId).update({
          profilePicture: downloadUrl,
        });
        dispatch(
          setUserData({
            ...userData,
            imageURL: profilePicture,
          }),
        );
      }

      const contactValue = getValues('contact');

      if (contactValue) {
        await firestore().collection('users').doc(userId).update({
          mobileNumber: contactValue,
        });

        dispatch(setUserData({...userData, mobileNumber: contactValue}));
      }
      setLoading(false);
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error(handleSave):', error);
      setLoading(false);
    }
  };

  const handleMainPhotoUpload = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 500,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        // setProfilePicture(image.path);
        setProfilePicture({path: image.path});
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          height: moderateScale(50),
          alignItems: 'center',
          position: 'relative',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={{
            zIndex: 1,
            paddingHorizontal: horizontalScale(16),
          }}>
          <Ionicons name="arrow-back" color="black" size={25} />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            height: moderateScale(50),
          }}>
          <Text
            style={{
              fontSize: moderateScale(18),
              fontWeight: '600',
              color: 'rgba(15, 24, 40, 1)',
              textAlign: 'center',
            }}>
            Profile
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: moderateScale(60),
        }}>
        <TouchableOpacity onPress={handleMainPhotoUpload}>
          {profilePicture && profilePicture.path ? (
            <Image
              source={{uri: profilePicture.path}}
              style={styles.profileImage}
            />
          ) : (
            <View>
              <View
                style={{
                  backgroundColor: 'rgba(247, 247, 252, 1)',
                  borderRadius: moderateScale(50),
                  width: moderateScale(100),
                  height: moderateScale(100),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign name="user" size={50} color={'black'} />
              </View>
            </View>
          )}
          <View style={styles.addIconContainer}>
            <AntDesign name="pluscircle" size={24} color={'black'} />
          </View>
        </TouchableOpacity>
        <View style={{marginTop: verticalScale(33), width: '80%'}}>
          <TextInput
            mode="flat"
            label="Name"
            value={userData.name}
            onChangeText={text => setFirstName(text)}
            style={styles.input}
          />
          <TextInput
            mode="flat"
            label="Email"
            value={userData.email}
            onChangeText={text => setLastName(text)}
            style={styles.input}
          />
          <Controller
            control={control}
            rules={{
              required: 'Contact number is required.',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInput
                  mode="flat"
                  label="Conatct Number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                  error={errors.contact}
                />
                {errors.contact && (
                  <HelperText
                    type="error"
                    style={{
                      alignSelf: 'flex-start',
                    }}>
                    {errors.contact.message}
                  </HelperText>
                )}
              </>
            )}
            name="contact"
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.saveButton}
          disabled={loading}
          onPress={handleSubmit(handleSave)}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EnterUserDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  profileImage: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(120),
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: moderateScale(30),
    padding: moderateScale(6),
  },
  addIcon: {
    width: horizontalScale(24),
    height: verticalScale(24),
    color: 'black',
  },
  input: {
    backgroundColor: 'transparent',
    height: moderateScale(50),
    borderRadius: moderateScale(4),
    marginBottom: verticalScale(12),
  },
  saveButton: {
    width: '85%',
    height: verticalScale(52),
    backgroundColor: 'rgba(119,79,251,255)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(81),
    marginHorizontal: horizontalScale(24),
  },
  saveButtonText: {
    color: '#F7F7FC',
    fontSize: moderateScale(16),
  },
});
