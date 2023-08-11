import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';

const CreateCircleScreen = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const codeInputRefs = useRef([]);
  const [createCircleModalVisible, setCreateCircleModalVisible] =
    useState(false);

  const handleCodeChange = (index, value) => {
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
            <Text style={{marginHorizontal: 7, fontSize: 20}}>OR</Text>
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
            <Text style={{color: 'white', fontWeight: 400}}>Create Circle</Text>
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
              <Text style={styles.modalText}>
                Name your Circle
              </Text>
              <TextInput
                  mode="flat"
                  label="Enter Family360 email"
                  style={[styles.textInput, {marginTop: moderateScale(20)}]}
                //   onBlur={onBlur}
                //   onChangeText={onChange}
                //   value={value}
                />
              <View style={{flexDirection: 'row',alignSelf:'flex-end'}}>
                <Pressable
                  style={[styles.button, styles.buttonOpen, {marginRight: 10}]}
                  //   onPress={handleLogout}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setCreateCircleModalVisible(false)}>
                  <Text style={styles.textStyle}>No</Text>
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
    fontSize: 24,
    borderWidth: 2,
    color: 'black',
  },
  createBtn: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(119,79,251,255)',
    height: 50,
    borderRadius: 30,
    marginBottom: moderateScale(20),
    elevation: 7,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 70,
  },
  buttonOpen: {
    backgroundColor: 'red',
  },
  buttonClose: {
    backgroundColor: 'gray',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  textInput:{
    width: '85%',
    backgroundColor: 'white',
    fontSize: 14,
  }
});
