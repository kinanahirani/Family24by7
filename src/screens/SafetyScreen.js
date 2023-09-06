import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Zocial from 'react-native-vector-icons/Zocial';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import Communications from 'react-native-communications';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const SafetyScreen = () => {
  const defaultMessage =
    '(Your Name) has sent an emergency alert, reach/contact as soon as you can, the last location we have is in the URL (location URL) at (time)';
  const navigation = useNavigation();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [messageTxt, setMessageTxt] = useState(defaultMessage);
  const userData = useSelector(state => state.user.data);
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contacts = await firestore()
          .collection('contacts')
          .doc(userData.id)
          .get();
        console.log(contacts.data(), '...contacts');
        setContactData(contacts.data());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  // const contactData=useSelector(state=>state.contact.data)

  // const openDefaultContactPicker = () => {

  //   Contacts.getAll((err, contacts) => {
  //     if (err) {
  //       console.log("Err:",err);
  //     } else {
  //       console.log('Contacts:', contacts);
  //       Communications.phonebookPicker({
  //         contacts,
  //         callback: contact => {
  //           // Handle the selected contact data here
  //           console.log('Selected Contact:',contact);
  //           // You can use the selected contact data as needed.
  //         },
  //       });
  //     }
  //   });
  // };

  const openDefaultContactPicker = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ]);

      if (
        granted['android.permission.READ_CONTACTS'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        Contacts.getAll()
          .then(contacts => {
            console.log(JSON.stringify(contacts), '....contacts');

            // Communications.phonebookPicker({
            //   contacts,
            //   callback: contact => {
            //     console.log('Selected Contact:', contact);
            //   },
            // });
          })
          .catch(e => {
            console.log(e);
          });
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const deleteContact = index => {
    const updatedContactList = [...contactData.contactList];
    updatedContactList.splice(index, 1);

    firestore()
      .collection('contacts')
      .doc(userData.id)
      .update({
        contactList: updatedContactList,
      })
      .then(() => {
        setContactData({...contactData, contactList: updatedContactList});
      })
      .catch(error => {
        console.error('Error deleting contact:', error);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Safety</Text>
        </View>
        <View>
          <Text
            style={{
              marginVertical: verticalScale(15),
              marginLeft: horizontalScale(20),
              fontSize: moderateScale(13),
              fontWeight: 'bold',
              color: 'black',
            }}>
            Emergency Contacts:
          </Text>

          <ScrollView
            horizontal
            contentContainerStyle={styles.contactView}
            // style={{width:'100%'}}
          >
            {/* <View style={styles.contactContainer}> */}
            {contactData?.contactList &&
              contactData?.contactList?.map((contact, index) => (
                <View
                  key={index}
                  style={{
                    width: 'auto',
                    height: verticalScale(95),
                    borderRadius: moderateScale(10),
                    borderWidth: 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: 'rgba(128,128,128,1)',
                    marginRight:
                      index < contactData.contactList.length - 1
                        ? horizontalScale(15)
                        : 0,
                    padding: moderateScale(10),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                    }}>
                    <FontAwesome6
                      name="user-large"
                      size={moderateScale(20)}
                      color={'rgba(119,79,251,255)'}
                      style={{marginRight: horizontalScale(10)}}
                    />
                    <Text>{contact.name}</Text>
                    <TouchableOpacity onPress={() => deleteContact(index)}>
                      <Feather
                        name="trash"
                        size={moderateScale(20)}
                        color={'black'}
                        style={{marginLeft: horizontalScale(20)}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      marginTop: verticalScale(10),
                    }}>
                    <Zocial
                      name="call"
                      size={moderateScale(22)}
                      color={'rgba(119,79,251,255)'}
                      style={{marginRight: horizontalScale(7)}}
                    />
                    <Text>{contact.number}</Text>
                  </View>
                </View>
              ))}
            {Array.from({
              length: Math.max(
                3 -
                  (contactData?.contactList
                    ? contactData?.contactList?.length
                    : 0),
                0,
              ),
            }).map((_, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={styles.addContact}
                onPress={() => navigation.navigate('Contacts')}>
                <AntDesign
                  name="pluscircle"
                  size={moderateScale(40)}
                  color={'rgba(119,79,251,255)'}
                />
              </TouchableOpacity>
            ))}
            {/* </View> */}
          </ScrollView>

          <View style={{padding: moderateScale(10)}}>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: 'rgba(128,128,128,1)',
                borderRadius: moderateScale(10),
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  margin: moderateScale(10),
                  fontSize: moderateScale(13),
                }}>
                Help Message :
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    marginLeft: horizontalScale(15),
                    fontSize: moderateScale(13),
                    marginBottom: verticalScale(15),
                    width: '80%',
                  }}>
                  {messageTxt}
                </Text>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: horizontalScale(15),
                  }}
                  onPress={() => setEditModalVisible(true)}>
                  <Text
                    style={{
                      color: 'rgba(119,79,251,255)',
                      fontWeight: 'bold',
                      fontSize: moderateScale(15),
                    }}>
                    EDIT
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => {
            setEditModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                multiline
                // numberOfLines={4}
                mode="outlined"
                label="Emergency Message"
                style={[styles.textInput, {marginTop: moderateScale(10)}]}
                onChangeText={text => setMessageTxt(text)}
                value={messageTxt}
                error={messageTxt.length > 200}
              />
              <View style={{flexDirection: 'row', width: '100%'}}>
                <Text style={{width: '70%', fontSize: moderateScale(11)}}>
                  This message will be sent when you tap on send emergency alert
                  option, your location will be added to the last of your
                  message.
                </Text>
                <Text
                  style={{
                    marginLeft: horizontalScale(30),
                    color: messageTxt.length > 200 ? 'maroon' : 'black',
                    height: 'auto',
                    fontSize: moderateScale(13),
                  }}>{`${messageTxt.length}/200`}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: verticalScale(30),
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Pressable
                    style={[styles.button, {marginRight: horizontalScale(10)}]}
                    onPress={() => setMessageTxt(defaultMessage)}>
                    <Text style={styles.textStyle}>DEFAULT</Text>
                  </Pressable>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[styles.button]}
                    onPress={() => setEditModalVisible(false)}>
                    <Text style={styles.textStyle}>DISMISS</Text>
                  </Pressable>
                  <Pressable style={styles.button}>
                    <Text style={styles.textStyle}>SAVE</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={[styles.box, {backgroundColor: 'orange'}]}
          activeOpacity={1}
          onPress={() => navigation.navigate('WatchOverMe')}>
          <FontAwesome5
            name="walking"
            size={moderateScale(80)}
            color={'#f5f5dc'}
          />
          <Text
            style={{
              color: 'white',
              fontSize: moderateScale(17),
              fontWeight: '500',
              marginTop: verticalScale(15),
            }}>
            Watch Over Me
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('sendAlert',{message: messageTxt})}
          style={[
            styles.box,
            {backgroundColor: 'rgb(204,0,0)', marginLeft: horizontalScale(10)},
          ]}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={moderateScale(60)}
            color={'#f5f5dc'}
            style={{marginBottom: verticalScale(10)}}
          />
          <Text style={styles.boxTxt}>Send</Text>
          <Text style={styles.boxTxt}>Emergency</Text>
          <Text style={styles.boxTxt}>Alert</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SafetyScreen;

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
  contactView: {
    // flex:1,
    // flexDirection:'row',
    minWidth: '125%',
    padding: moderateScale(10),
    // paddingHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
    alignItems: 'center',
  },
  addContact: {
    width: '27%',
    height: verticalScale(95),
    borderRadius: moderateScale(10),
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(128,128,128,1)',
    marginLeft: horizontalScale(10),
  },
  contactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
    width: '100%',
    justifyContent: 'space-between',
  },
  bottomView: {
    backgroundColor: 'white',
    height: '30%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: {
    width: '45%',
    height: '90%',
    borderRadius: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxTxt: {
    color: 'white',
    fontSize: moderateScale(17),
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
    borderRadius: moderateScale(7),
    paddingHorizontal: horizontalScale(15),
    paddingTop: verticalScale(10),
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
    padding: moderateScale(10),
    // width: horizontalScale(80),
  },
  textStyle: {
    color: 'rgba(119,79,251,255)',
    textAlign: 'center',
  },
  textInput: {
    width: '100%',
    color: 'black',
    marginBottom: verticalScale(5),
    fontSize: moderateScale(14),
    backgroundColor: 'white',
  },
});
