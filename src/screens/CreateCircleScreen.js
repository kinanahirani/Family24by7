import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import firestore from '@react-native-firebase/firestore';
import {Controller, useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {HelperText} from 'react-native-paper';
import {
  generateUniqueCircleCode,
  isCircleCodeUnique,
} from '../helpers/circleHelpers';

const CreateCircleScreen = ({navigation}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const codeInputRefs = useRef([]);
  const [codeChecked, setCodeChecked] = useState(false);
  const [createCircleModalVisible, setCreateCircleModalVisible] =
    useState(false);

  const userData = useSelector(state => state.user.data);

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      circleName: '',
    },
  });

  const checkCircleCodeExists = async circleCode => {
    try {
      const circlesRef = firestore().collection('circles');
      const userId = userData.id;
      const querySnapshot = await circlesRef
        .where('circleCode', '==', circleCode)
        .get();

      if (!querySnapshot.empty) {
        const circleDoc = querySnapshot.docs[0];
        console.log(circleDoc, '...circleDoc');
        const circleData = circleDoc.data();

        if (circleData.usersOfCircles.includes(userId)) {
          return {exists: true, userAlreadyInCircle: true};
        } else {
          return {exists: true, userAlreadyInCircle: false};
        }
      } else {
        return {exists: false, userAlreadyInCircle: false};
      }
    } catch (error) {
      console.error('Error checking circle code:', error);
      return {exists: false, userAlreadyInCircle: false};
    }
  };

  const handleCodeChange = async (index, value) => {
    if (value === '') {
      code[index] = '';
    } else {
      if (value.length > 1) {
        value = value.slice(0, 1);
      }
      if (value < 0 || value > 9) {
        return;
      }
      code[index] = value;
    }

    if (!value && index > 0) {
      codeInputRefs.current[index - 1].focus();
    } else if (index < codeInputRefs.current.length - 1 && value) {
      codeInputRefs.current[index + 1].focus();
    }
    setCode([...code]);

    if (value === '' || index === codeInputRefs.current.length - 1) {
      const enteredCode = code.join('');
      const userId = userData.id;
      const checkResult = await checkCircleCodeExists(enteredCode, userId);

      if (checkResult.exists) {
        if (checkResult.userAlreadyInCircle) {
          console.log('User is already in the circle:', enteredCode);
          Alert.alert('User is already in the circle.');
        } else {
          console.log(
            'Circle code matches and user is not in the circle:',
            enteredCode,
          );
          try {
            const circleRef = firestore()
              .collection('circles')
              .doc(enteredCode);

            await circleRef.update({
              usersOfCircles: firestore.FieldValue.arrayUnion(userId),
            });

            console.log('User added to the circle:', userId);
            Alert.alert('You have been added to the circle.');
            navigation.replace('tabbar');
          } catch (error) {
            console.error('Error adding user to circle:', error);
          }
        }
      } else {
        console.log('Circle code does not match:', enteredCode);
        Alert.alert('The circle code is wrong. Please enter proper code.');
      }

      setCodeChecked(true);
    } else {
      setCodeChecked(false);
    }
  };

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
      navigation.navigate('tabbar');
    } catch (error) {
      console.error('Error adding circle:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            height: 'auto',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginTop: verticalScale(50),
            }}>
            Do you want to join a Circle?
          </Text>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            Enter your invite code
          </Text>
          <View style={{marginTop: verticalScale(30)}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              Get the code from the person
            </Text>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              creating your family's Circle
            </Text>
          </View>

          {/* code for codeInput */}
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                maxLength={1}
                value={digit}
                onChangeText={value => handleCodeChange(index, value)}
                ref={ref => (codeInputRefs.current[index] = ref)}
                onSubmitEditing={() => {
                  if (index < codeInputRefs.current.length - 1) {
                    codeInputRefs.current[index + 1].focus();
                  }
                }}
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: verticalScale(50),
            }}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            <Text
              style={{
                marginHorizontal: horizontalScale(7),
                fontSize: moderateScale(20),
              }}>
              OR
            </Text>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>
        </View>
        <View
          style={{
            height: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              marginTop: verticalScale(100),
              fontSize: 20,
              textAlign: 'center',
            }}>
            Do not have any code?
          </Text>
          <TouchableOpacity
            style={[styles.createBtn, {marginTop: moderateScale(30)}]}
            activeOpacity={0.7}
            onPress={() => setCreateCircleModalVisible(true)}>
            <Text style={{color: 'white', fontWeight: '400'}}>
              Create Circle
            </Text>
          </TouchableOpacity>
          <Text>We will give you a code to share</Text>
        </View>

        {/* Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={createCircleModalVisible}
          onRequestClose={() => {
            setCreateCircleModalVisible(false);
          }}>
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
                      multiline
                      mode="flat"
                      // label="Conatct Number"
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
                          // backgroundColor:'yellow',
                          marginBottom: verticalScale(10),
                        }}>
                        {errors.circleName.message}
                      </HelperText>
                    )}
                  </>
                )}
                name="circleName"
              />
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
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
    </View>
  );
};

export default CreateCircleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  codeContainer: {
    marginTop: verticalScale(80),
    flexDirection: 'row',
    width: '85%',
  },
  codeInput: {
    flex: 1,
    marginLeft: horizontalScale(7),
    width: horizontalScale(48),
    height: verticalScale(48),
    textAlign: 'center',
    fontSize: moderateScale(24),
    borderWidth: 2,
    color: 'black',
  },
  createBtn: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(119,79,251,255)',
    height: verticalScale(50),
    borderRadius: moderateScale(30),
    marginBottom: moderateScale(20),
    elevation: 7,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    borderBottomColor: 'rgba(119,79,251,1)',
  },
});
