import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CBottomSheetButton from './CBottomSheetButton';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {setCircleData} from '../redux/slices/circleDataSlice';
import {setUserData, updateActiveCircleCode} from '../redux/slices/userSlice';
import {Controller, useForm} from 'react-hook-form';
import {HelperText, TextInput} from 'react-native-paper';

const SelectCircle = forwardRef((props, ref) => {
  const rbSheetRef = useRef();
  const userData = useSelector(state => state.user.data);
  const [joinedCircleList, setJoinedCircleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateCircleModalVisible, setCreateCircleModalVisible] =
    useState(false);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const circleList = async () => {
      try {
        const joinedCircles = await firestore()
          .collection('circles')
          .where('usersOfCircles', 'array-contains', userData.id)
          .get();

        const circleData = joinedCircles.docs.map(doc => doc.data());
        setJoinedCircleList(circleData);

        const activeCircleRef = await firestore()
          .collection('circles')
          .doc(userData.activeCircleCode)
          .get();

        const activeCircleData = activeCircleRef.data();
        setSelectedCircle(activeCircleData);
        setLoading(false);
      } catch (err) {
        console.log('Error(circleList): ', err);
        setLoading(false);
      }
    };
    circleList();
  }, []);

  useImperativeHandle(ref, () => ({
    open: () => {
      rbSheetRef.current.open();
    },
    close: () => {
      rbSheetRef.current.close();
    },
  }));

  const toggleCreateCircleModal = () => {
    setCreateCircleModalVisible(!isCreateCircleModalVisible);
    rbSheetRef.current.close();
  };

  const handleCircleSelect = async circle => {
    await firestore()
      .collection('users')
      .doc(userData.id)
      .update({activeCircleCode: circle.circleCode});
    setSelectedCircle(circle);
    dispatch(updateActiveCircleCode({activeCircleCode: circle.circleCode}));
    dispatch(setCircleData(circle));
    rbSheetRef.current.close();
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}>
      <RBSheet
        ref={rbSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            display: 'none',
          },
          container: {
            backgroundColor: 'white',
            // height:'35%'
          },
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: moderateScale(14),
              marginVertical: verticalScale(15),
            }}>
            Select Circle
          </Text>
          {loading ? (
            <Text>Loading circles...</Text>
          ) : (
            <>
              {joinedCircleList && joinedCircleList.length > 0 ? (
                joinedCircleList.map((circle, index) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: horizontalScale(15),
                      borderBottomWidth: moderateScale(0.5),
                      borderBottomColor: 'rgba(128,128,128,0.3)',
                      paddingVertical: moderateScale(8),
                    }}
                    onPress={() => handleCircleSelect(circle)}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: moderateScale(14),
                      }}>
                      {circle.circleName}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <MaterialCommunityIcons
                          name={
                            selectedCircle &&
                            selectedCircle.circleCode === circle.circleCode
                              ? 'checkbox-marked-circle-outline'
                              : 'checkbox-blank-circle-outline'
                          }
                          color={'rgba(119, 79, 251, 255)'}
                          size={moderateScale(22)}
                        />
                      </View>
                      <Ionicons
                        name="settings-sharp"
                        color={'gray'}
                        size={moderateScale(22)}
                        style={{marginLeft: horizontalScale(20)}}
                      />
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text>No circles found!</Text>
                </View>
              )}
            </>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: verticalScale(20),
            }}>
            <CBottomSheetButton
              text="Add circle"
              onPress={toggleCreateCircleModal}
            />
            <CBottomSheetButton
              text="Join Circle"
              onPress={() =>
                navigation.navigate('createcircle', {screenName: 'drawer'})
              }
            />
          </View>
        </View>
      </RBSheet>

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
    </View>
  );
});

export default SelectCircle;

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
