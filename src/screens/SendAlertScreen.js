import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';

const SendAlertScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
          8
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
        onPress={() => navigation.goBack()}
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
