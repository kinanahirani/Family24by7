import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
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
import AntDesign from 'react-native-vector-icons/AntDesign';

const MenuScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [createCircleModalVisible, setCreateCircleModalVisible] =
    useState(false);

  const handleLogout = async () => {
    dispatch(setUserData(''));
    await persistStore(store).purge();
    await auth().signOut();
    setCreateCircleModalVisible(false);
    navigation.replace('loginoptions');
  };

  const data = [
    {
      text: '+ Add a New Member',
      onPress: () => {
        alert('Add a new member');
      },
    },
    {
      text: 'My Current Circle',
      onPress: () => {
        alert('My current circle');
      },
    },
    {
      text: 'My Profile',
      onPress: () => {
        alert('My profile');
      },
    },
    {
      text: 'My Circles',
      onPress: () => {
        alert('My circles');
      },
    },
    {
      text: 'Manage Premium',
      onPress: () => {
        alert('Manage premium');
      },
    },
    {
      text: 'General Settings',
      onPress: () => {
        alert('General settings');
      },
    },
    {
      text: 'Help & Support',
      onPress: () => {
        alert('Help & support');
      },
    },
    {
      text: 'Delete all data',
      onPress: () => {
        alert('Delete all data');
      },
    },
    {
      text: 'Logout',
      onPress: () => {
        setCreateCircleModalVisible(true);
      },
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={item.onPress}>
        <View
          style={{
            flexDirection: 'row',
            padding: moderateScale(15),
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 0.3,
            borderColor: 'rgba(128,128,128,0.4)',
          }}>
          <Text
            style={{
              color: item.text === '+ Add a New Member' ? 'rgba(119, 79, 251, 255)' : 'black',
              fontSize: moderateScale(14),
              fontWeight: 'bold',
            }}>
            {item.text}
          </Text>
          <AntDesign
            name="right"
            color={'black'}
            size={20}
            style={{alignSelf: 'flex-start'}}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Menu</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        onPress={({item}) => item.onPress()}
      />

      {/* Logout Modal */}
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
    borderColor: 'rgba(128,128,128,0.4)',
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

{
  /* <TouchableOpacity activeOpacity={1}>
        <View
          style={{
            flexDirection: 'row',
            padding: moderateScale(15),
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 0.3,
            borderColor: 'rgba(128,128,128,0.4)',
          }}>
          <Text
            style={{
              color: 'rgba(119,79,251,255)',
              fontSize: moderateScale(14),
              fontWeight: 'bold',
            }}>
            + Add a New Member
          </Text>
          <AntDesign
            name="right"
            color={'black'}
            size={20}
            style={{alignSelf: 'flex-start'}}
          />
        </View>
      </TouchableOpacity> */
}
