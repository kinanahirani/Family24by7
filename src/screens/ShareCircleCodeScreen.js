import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const ShareCircleCodeScreen = ({navigation}) => {
  const circle = useSelector(state => state.circle.data);
  return (
    <>
      <StatusBar
        backgroundColor={'rgba(119,79,251,255)'}
        translucent
        barStyle="dark-content"
      />
      <SafeAreaView
        style={{flex: 0, backgroundColor: 'rgba(119,79,251,255)'}}
      />
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            height: moderateScale(50),
            alignItems: 'center',
            paddingHorizontal: horizontalScale(16),
            borderBottomWidth: 0.2,
            borderBottomColor: 'rgba(128,128,128,0.5)',
            backgroundColor: 'rgba(119,79,251,255)',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Ionicons
              name="arrow-back"
              color="white"
              size={moderateScale(22)}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: horizontalScale(20),
              fontSize: moderateScale(18),
              fontWeight: '400',
              color: 'white',
            }}>
            {circle.circleName}
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <View
            style={{
              marginTop: verticalScale(35),
              width: '85%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: moderateScale(13),
              }}>
              Family360 is better with friends and family, invite them to your
              circle.
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: moderateScale(13),
              }}>
              Just send them this code written below, and ask them to enter it
              when they install the app and choose to join a Circle
            </Text>
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: moderateScale(17),
              color: 'black',
              marginTop: verticalScale(70),
            }}>
            Share this code to invite people in your circle
          </Text>
          <Text
            style={{
              fontWeight: '500',
              fontSize: moderateScale(30),
              color: 'rgba(119,79,251,255)',
              marginTop: verticalScale(50),
            }}>
            {circle.circleCode}
          </Text>
          <TouchableOpacity style={{marginTop: verticalScale(15)}}>
            <Text
              style={{
                color: 'rgba(119,79,251,255)',
                fontSize: moderateScale(13),
              }}>
              Show QR Code
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.shareButtons, {marginTop: moderateScale(30)}]}
            activeOpacity={0.7}>
            <Text style={styles.shareText}>Share invite link</Text>
          </TouchableOpacity>

          <Image
            source={require('../assets/images/whatsapp_icon.png')}
            style={{width: horizontalScale(38), height: horizontalScale(38)}}
          />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{marginTop: verticalScale(20)}}>
            <Text
              style={{
                color: 'rgba(119,79,251,255)',
                fontSize: moderateScale(13),
              }}>
              DONE? (Tap to go back)
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ShareCircleCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  shareButtons: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(119,79,251,255)',
    height: verticalScale(50),
    marginBottom: verticalScale(25),
    elevation: 7,
    borderRadius: moderateScale(10),
  },
  shareText: {
    color: 'white',
    fontWeight: '500',
    fontSize: moderateScale(15),
  },
});
