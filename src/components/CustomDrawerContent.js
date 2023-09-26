import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../helpers/sizeHelpers';
import CDrawerButton from './CDrawerButton';
import SelectCircle from './SelectCircle';
import {Controller, useForm} from 'react-hook-form';
import {HelperText, TextInput} from 'react-native-paper';
import {generateUniqueCircleCode} from '../helpers/circleHelpers';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const CustomDrawerContent = props => {
  const userData = useSelector(state => state.user.data);
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const [isCreateCircleModalVisible, setCreateCircleModalVisible] =
    useState(false);

  const handleSwitchCircles = () => {
    refRBSheet.current.open();
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const toggleCreateCircleModal = () => {
    setCreateCircleModalVisible(!isCreateCircleModalVisible);
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      circleName: '',
    },
  });

  const handleCreateCircle = async data => {
    const circleName = data.circleName;
    try {
      const circlesRef = firestore().collection('circles');
      const circleCode = await generateUniqueCircleCode(circlesRef);
      const circleRef = circlesRef.doc(circleCode);
      await circleRef.set({
        circleName,
        createdBy: userData.name,
        createdUserId: userData.id,
        usersOfCircles: [userData.id],
        circleCode: circleCode,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('Circle added with code:', circleCode);
      const userDocRef = firestore().collection('users').doc(userData.id);
      await userDocRef.update({
        activeCircleCode: circleCode,
      });
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding circle:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            backgroundColor: 'rgba(119,79,251,255)',
            padding: moderateScale(15),
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: moderateScale(14),
              marginTop: verticalScale(10),
            }}>
            Family 360
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: moderateScale(14),
              marginTop: verticalScale(10),
              marginBottom: verticalScale(20),
              width: '80%',
            }}>
            The locator that cares for your{' '}
            <Text style={{textDecorationLine: 'underline'}}>privacy</Text>!
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(128,128,128,0.3)',
          }}>
          <Text
            style={{
              padding: moderateScale(10),
              marginTop: verticalScale(7),
              fontSize: moderateScale(14),
              color: 'gray',
              marginLeft: horizontalScale(5),
            }}>
            My Circles
          </Text>
          <CDrawerButton
            text={'Switch Circles'}
            iconName={'refresh'}
            icon={'MaterialCommunityIcons'}
            onPress={handleSwitchCircles}
          />
          <SelectCircle ref={refRBSheet} />
          <CDrawerButton
            text={'Add circle'}
            iconName={'plus'}
            extraStyles={{marginVertical: verticalScale(7)}}
            icon={'MaterialCommunityIcons'}
            onPress={toggleCreateCircleModal}
          />
          <CDrawerButton
            text={'Join circle?'}
            iconName={'plus'}
            extraStyles={{marginBottom: verticalScale(10)}}
            icon={'MaterialCommunityIcons'}
            onPress={() =>
              navigation.navigate('createcircle', {screenName: 'drawer'})
            }
          />
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(128,128,128,0.3)',
          }}>
          <Text
            style={{
              padding: moderateScale(10),
              marginTop: verticalScale(7),
              fontSize: moderateScale(14),
              color: 'gray',
              marginLeft: horizontalScale(5),
            }}>
            Subscription
          </Text>
          <CDrawerButton
            text={'17 days left'}
            iconName={'workspace-premium'}
            extraStyles={{marginBottom: verticalScale(7)}}
            extraTextStyles={{fontWeight: '600'}}
            icon={'MaterialIcons'}
          />
        </View>
        <CDrawerButton
          text={'Check update'}
          iconName={'system-update-alt'}
          extraStyles={{marginTop: verticalScale(7)}}
          icon={'MaterialIcons'}
        />
        <CDrawerButton text={'iOS App'} iconName={'golf'} icon={'Ionicons'} />
        <CDrawerButton
          text={'Share App'}
          iconName={'sharealt'}
          icon={'AntDesign'}
        />
        <CDrawerButton
          text={'Facebook Page'}
          iconName={'facebook-square'}
          icon={'AntDesign'}
        />
        <CDrawerButton
          text={'Privacy Policy'}
          iconName={'lock'}
          icon={'AntDesign'}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={isCreateCircleModalVisible}
          onRequestClose={() => setCreateCircleModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Name your Circle</Text>
              <Controller
                control={control}
                rules={{
                  required: 'Please enter circle name.',
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    <TextInput
                      mode="flat"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      style={styles.textInput}
                      error={errors.circleName}
                    />
                    {errors.circleName && (
                      <HelperText
                        type="error"
                        style={{
                          alignSelf: 'flex-start',
                          marginBottom: verticalScale(10),
                        }}>
                        {errors.circleName.message}
                      </HelperText>
                    )}
                  </>
                )}
                name="circleName"
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginTop: verticalScale(20),
                }}>
                <Pressable
                  style={[styles.button, {marginRight: horizontalScale(10)}]}
                  onPress={() => setCreateCircleModalVisible(false)}>
                  <Text style={styles.textStyle}>BACK</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, {marginLeft: horizontalScale(10)}]}
                  onPress={handleSubmit(handleCreateCircle)}>
                  <Text style={styles.textStyle}>CREATE</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: moderateScale(7),
    padding: moderateScale(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  button: {
    // padding: moderateScale(10),
    // width: horizontalScale(50),
    // backgroundColor:'green'
  },
  textStyle: {
    color: 'rgba(119,79,251,255)',
    textAlign: 'center',
  },
  modalText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: 'black',
  },
  textInput: {
    width: '100%',
    color: 'black',
    marginBottom: verticalScale(10),
    fontSize: moderateScale(14),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(119,79,251,0.1)',
    backgroundColor: 'transparent',
  },
});

export default CustomDrawerContent;
