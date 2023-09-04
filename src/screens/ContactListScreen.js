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
import Contact from 'react-native-contacts';
import {useIsFocused} from '@react-navigation/native';
import Communications from 'react-native-communications';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';

const ContactListScreen = ({navigation}) => {
  const [contactList, setContactList] = useState([]);
  const isFocused = useIsFocused();
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
        Contact.getAll()
          .then(con => {
            // work with contacts
            console.log(con);
            setContactList(con);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
              //   onPress={() => {
              //     navigation.navigate('ContactDetails', {
              //       data: item,
              //     });
              //   }}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../images/user.png')}
                  style={{width: horizontalScale(40), height: verticalScale(40), marginLeft: horizontalScale(15)}}
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
              <View style={{flexDirection: 'row', paddingRight: horizontalScale(15)}}>
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
      <TouchableOpacity
        style={{
          width: horizontalScale(50),
          height: verticalScale(50),
          borderRadius: moderateScale(25),
          backgroundColor: 'gray',
          position: 'absolute',
          right: horizontalScale(30),
          bottom: verticalScale(50),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        // onPress={() => {
        //   navigation.navigate('AddContact');
        // }}
      >
        <Image
          source={require('../images/plus.png')}
          style={{width: horizontalScale(24), height: verticalScale(24)}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ContactListScreen;
