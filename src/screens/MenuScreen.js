import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../redux/slices/userSlice';
import {useNavigation} from '@react-navigation/native';
import store from '../redux/store';
import {persistStore} from 'redux-persist';
import auth from '@react-native-firebase/auth';

const MenuScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [createCircleModalVisible, setCreateCircleModalVisible] = useState(false);

  const handleLogout = async () => {
    dispatch(setUserData(''));
    await persistStore(store).purge();
    await auth().signOut()
    setCreateCircleModalVisible(false);
    navigation.replace('loginoptions');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Menu</Text>
      </View>
      <TouchableOpacity onPress={() => setCreateCircleModalVisible(true)}>
        <Text>Logout</Text>
      </TouchableOpacity>
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
              Are you sure you want to logout?
            </Text>
            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
              <Pressable
                style={[styles.button, {marginRight: horizontalScale(10)}]}
                onPress={() => setCreateCircleModalVisible(false)}>
                <Text style={styles.textStyle}>NO</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => handleLogout()}>
                <Text style={styles.textStyle}>YES</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(15),
    borderBottomWidth: 0.3,
  },
  headerTxt: {
    fontSize: moderateScale(15),
    color: 'black',
    fontWeight: '500',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 25,
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
    padding: 10,
    width: horizontalScale(80),
  },
  textStyle: {
    color: 'rgba(119,79,251,255)',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});
