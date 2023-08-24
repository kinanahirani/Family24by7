import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import {TextInput} from 'react-native-paper';

const WatchOverMeScreen = ({navigation}) => {
  const [destination, setDestination] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}} behavior="height">
        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              height: moderateScale(50),
              alignItems: 'center',
              paddingHorizontal: horizontalScale(16),
              borderBottomWidth: 0.2,
              borderBottomColor: 'rgba(128,128,128,0.5)',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}>
              <Ionicons name="arrow-back" color="black" size={25} />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: moderateScale(18),
                fontWeight: '400',
                color: 'rgba(15, 24, 40, 1)',
              }}>
              Watch Over Me
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              multiline
              mode="outlined"
              label="Destination"
              style={[styles.textInput, {marginTop: verticalScale(20)}]}
              onChangeText={text => setDestination(text)}
              value={destination}
              error={destination.length > 200}
            />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  width: '75%',
                  color: 'grey',
                  fontSize: moderateScale(12),
                }}>
                The destination address you are heading towards
              </Text>
              <Text>{`${destination.length}/200`}</Text>
            </View>

            <TextInput
              multiline
              mode="outlined"
              label="Start Location"
              style={[styles.textInput, {marginTop: verticalScale(20)}]}
              onChangeText={text => setLocation(text)}
              value={location}
              error={location.length > 200}
            />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  width: '75%',
                  color: 'grey',
                  fontSize: moderateScale(12),
                }}>
                The address you are moving from (if any)
              </Text>
              <Text>{`${location.length}/200`}</Text>
            </View>

            <TextInput
              multiline
              mode="outlined"
              label="Message"
              style={[styles.textInput, {marginTop: verticalScale(20)}]}
              onChangeText={text => setMessage(text)}
              value={message}
              error={message.length > 200}
            />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  width: '75%',
                  color: 'grey',
                  fontSize: moderateScale(12),
                }}>
                (Optional) if you have any message or note to send your family
                and emergency contacts
              </Text>
              <Text>{`${message.length}/200`}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View>
        <View
          style={{
            // flex:1,
            // justifyContent:'flex-end',
            // marginTop: 'auto',
            // marginBottom: verticalScale(30),
            // position: 'absolute',
            // bottom: verticalScale(70),
            // left: 0,
            // right: 0,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: '400',
                fontSize: moderateScale(14),
                width: '80%',
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
              style={{marginLeft: horizontalScale(10)}}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(119,79,251,255)',
            padding: moderateScale(15),
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: moderateScale(14),
              textAlign: 'center',
            }}>
            Send Alert
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default WatchOverMeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  textInput: {
    width: '90%',
    color: 'black',
    marginBottom: verticalScale(5),
    fontSize: moderateScale(14),
    backgroundColor: 'white',
  },
});
