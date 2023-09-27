import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Linking,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import {useRoute} from '@react-navigation/native';
import Communications from 'react-native-communications';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import SendSMS from 'react-native-sms';

const SendAlertScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [timer, setTimer] = useState(10);
  const [isRunning, setIsRunning] = useState(true);
  const [contactsToSendMsgs, setContactsToSendMsgs] = useState([]);
  const userData = useSelector(state => state.user.data);
  const circle = useSelector(state => state.circle.data);
  const route = useRoute();
  const [loading, setLoading] = useState(false);

  const handleTimerTick = () => {
    if (timer === 0) {
      setIsRunning(false);
      console.log('Timer Finished');
      setLoading(true);
      sendMessages();
      navigation.goBack();
      setLoading(false);
    } else {
      setTimer(timer - 1);
    }
  };

  useEffect(() => {
    if (isRunning) {
      const timerId = setTimeout(() => {
        handleTimerTick();
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [timer, isRunning]);

  const cancelTimer = () => {
    setIsRunning(false);
    console.log('Timer Canceled');
    navigation.goBack();
  };

  const sendMessages = async () => {
    setIsRunning(false);
    const contacts = await firestore()
      .collection('contacts')
      .doc(userData.id)
      .get();

    const usersOfCircle = circle.usersOfCircles;
    const externalContacts = contacts.data();
    const contactData = externalContacts.contactList.map(
      contact => contact.number,
    );
    console.log(contactData, '...contactData');
    const usersQuerySnapshot = await firestore()
      .collection('users')
      .where('id', 'in', usersOfCircle)
      .get();

    const usersNumbers = usersQuerySnapshot.docs.map(
      doc => doc.data().mobileNumber,
    );

    console.log(contactData, usersNumbers, 'contactData, usersNumbers');

    let mergedContacts;
    if (contactData && contactData.length > 0) {
      mergedContacts = contactData.concat(usersNumbers);
      console.log(mergedContacts, '...mergedContactList1');
      setContactsToSendMsgs(mergedContacts);
    } else {
      mergedContacts = usersNumbers;
      console.log(mergedContacts, '...mergedContactList2');
      setContactsToSendMsgs(mergedContacts);
      console.log(contactsToSendMsgs, '..contactsToSendMsgs');
    }
    if (isEnabled) {
      SendSMS.send(
        {
          body: route.params.message,
          recipients: mergedContacts,
          successTypes: ['sent', 'queued'],
          allowAndroidSendWithoutReadPermission: true,
        },
        (completed, cancelled, error) => {
          if (completed) {
            console.log('SMS sent successfully');
          } else if (cancelled) {
            console.log('SMS cancelled');
          } else if (error) {
            console.error('Error sending SMS:', error);
          }
        },
      );
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* <View
            style={{
              alignItems: 'center',
              marginTop: verticalScale(40),
              // justifyContent: 'center'
            }}> */}
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: moderateScale(20),
            marginTop: verticalScale(60),
          }}>
          Sending Alert in
        </Text>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: moderateScale(40),
            marginTop: verticalScale(60),
          }}>
          {timer}
        </Text>
        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            fontSize: moderateScale(19),
            textAlign: 'center',
            marginTop: '20%',
            width: '90%',
          }}>
          An *SMS and a high priority notification will be sent to your Circle
          members & Emergency contacts.
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={sendMessages}
          style={{
            borderColor: 'white',
            borderWidth: 1,
            marginTop: '15%',
            borderRadius: moderateScale(12),
            padding: moderateScale(5),
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: moderateScale(19),
              textAlign: 'center',
            }}>
            Send Now
          </Text>
        </TouchableOpacity>

        <View style={{marginTop: 'auto', marginBottom: verticalScale(10)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: moderateScale(14),
                width: '85%',
              }}>
              * Send SMS to emergency contacts and current circle member's
              contacts (standard charges apply)
            </Text>
            <Switch
              trackColor={{
                false: 'rgba(0,0,0,0.4)',
                true: 'rgba(119,79,251,0.4)',
              }}
              thumbColor={isEnabled ? 'rgba(119,79,251,255)' : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </SafeAreaView>

      <TouchableOpacity
        activeOpacity={1}
        onPress={cancelTimer}
        style={{
          height: verticalScale(50),
          backgroundColor: 'rgba(119,79,251,255)',
          padding: moderateScale(8),
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: moderateScale(14),
            textAlign: 'center',
            fontWeight: '500',
          }}>
          CANCEL
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default SendAlertScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d40000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
