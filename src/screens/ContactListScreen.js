import {
  View,
  Text,
  PermissionsAndroid,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Contacts from 'react-native-contacts';
import {useIsFocused} from '@react-navigation/native';
import Communications from 'react-native-communications';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import {useDispatch, useSelector} from 'react-redux';
import {setContactData} from '../redux/slices/contactSlice';
import firestore from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactListScreen = ({navigation}) => {
  const [contactList, setContactList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.data);

  useEffect(() => {
    getPermission();
  }, [isFocused]);

  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res == 'granted') {
        Contacts.getAll()
          .then(contact => {
            // work with contacts
            console.log(contact);
            setContactList(contact);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };

  const handlePress = async ({item}) => {
    console.log('item: ', JSON.stringify(item));
    dispatch(
      setContactData({
        number: item.phoneNumbers[0].number,
        name: item.displayName,
      }),
    );
    const contactDocRef = firestore().collection('contacts').doc(userData.id);
    const docSnapshot = await contactDocRef.get();
    if (docSnapshot.exists) {
      contactDocRef.update({
        contactList: firestore.FieldValue.arrayUnion({
          number: item.phoneNumbers[0].number,
          name: item.displayName,
        }),
      });
      navigation.goBack();
    } else {
      contactDocRef.set({
        contactList: [
          {
            number: item.phoneNumbers[0].number,
            name: item.displayName,
          },
        ],
      });
      navigation.goBack();
    }
  };

  // const handleSearch = query => {
  //   const filteredContactList = contactList.filter(
  //     contact =>
  //       contact.displayName.toLowerCase().includes(query.toLowerCase()) ||
  //       contact.phoneNumbers[0].number
  //         .toLowerCase()
  //         .includes(query.toLowerCase()),
  //   );

  //   setSearchQuery(query);

  //   setContactList(filteredContactList);
  // };

  const handleSearch = query => {
    const filteredContactList = contactList.filter(contact => {
      const displayName = contact.displayName
        ? contact.displayName.toLowerCase()
        : ''; // Set displayName to an empty string if it's null or undefined
  
      const phoneNumber =
        contact.phoneNumbers &&
        contact.phoneNumbers[0] &&
        contact.phoneNumbers[0].number
          ? contact.phoneNumbers[0].number.toLowerCase()
          : ''; // Set phoneNumber to an empty string if it's null or undefined
  
      return (
        displayName.includes(query.toLowerCase()) ||
        phoneNumber.includes(query.toLowerCase())
      );
    });
  
    setSearchQuery(query);
    setContactList(filteredContactList);
  };
  
  

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TextInput
        label="Search"
        value={searchQuery}
        // onChangeText={(text)=>setSearchQuery(text)}
        onChangeText={handleSearch}
        style={{
          marginVertical: 20,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: 'transparent',
        }}
        right={
          <TextInput.Icon name="search" onPress={handleSearch} color={'red'} />
        }
      />
      <FlatList
        data={contactList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                width: '90%',
                height: verticalScale(70),
                alignSelf: 'center',
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: moderateScale(10),
                marginTop: horizontalScale(10),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => handlePress({item})}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../images/user.png')}
                  style={{
                    width: horizontalScale(40),
                    height: verticalScale(40),
                    marginLeft: horizontalScale(15),
                  }}
                />
                <View style={{padding: moderateScale(10)}}>
                  <Text style={{color: 'black', fontSize: moderateScale(14)}}>
                    {item.displayName}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      marginTop: verticalScale(4),
                      fontSize: moderateScale(13),
                    }}>
                    {item.phoneNumbers[0].number}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingRight: horizontalScale(15),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    const url = Communications.text(
                      item.phoneNumbers[0].number,
                    );
                  }}>
                  <Image
                    source={require('../images/message.png')}
                    style={{
                      width: horizontalScale(24),
                      height: verticalScale(24),
                      tintColor: 'gray',
                      marginRight: horizontalScale(20),
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${item.phoneNumbers[0].number}`);
                  }}>
                  <Image
                    source={require('../images/call.png')}
                    style={{
                      width: horizontalScale(20),
                      height: verticalScale(20),
                      tintColor: 'gray',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ContactListScreen;
