import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Linking,
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

const SendAlertScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [timer, setTimer] = useState(10);
  const [isRunning, setIsRunning] = useState(true);
  const [contactData, setContactData] = useState([]);
  const userData = useSelector(state => state.user.data);
  // const circleData=useSelector(state=>state.circle.data)
  const route = useRoute();

  const handleTimerTick = () => {
    if (timer === 0) {
      setIsRunning(false);
      console.log('Timer Finished');
      // Perform actions when the timer finishes
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
      const contactData = contacts.data();
    setContactData(contactData);
    let phoneNumbers;

    if (contactData && contactData.contactList) {
      phoneNumbers = contactData.contactList.map(contact => contact.number);
    } else {
      console.error('Contact data not found or contactList is empty');
    }
    const to = phoneNumbers.join(',');
    const url = `sms:${to}?body=${encodeURIComponent(route.params.message)}`;
    Linking.openURL(url)
      .then(() => {
        console.log('SMS app opened successfully');
      })
      .catch(err => {
        console.error('Error(sendMessages): ', err);
      });
    alert('Messages Sent');
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
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
      </View>

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
