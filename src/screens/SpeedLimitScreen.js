import {
  FlatList,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SpeedLimitScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ScrollView contentContainerStyle={styles.container} vertical>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(119,79,251,255)',
          height: 'auto',
          width: '90%',
          alignSelf: 'center',
          marginVertical: verticalScale(10),
          borderRadius: moderateScale(3),
        }}>
        <View
          style={{
            marginLeft: horizontalScale(8),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* Profile icon */}
          <View>
            <View
              style={{
                backgroundColor: 'rgba(247, 247, 252, 1)',
                borderRadius: moderateScale(40),
                width: moderateScale(40),
                height: moderateScale(40),
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: verticalScale(8),
              }}>
              <AntDesign name="user" size={moderateScale(20)} color={'black'} />
            </View>
            <Text
              style={{
                marginTop: verticalScale(15),
                color: 'black',
                fontSize: moderateScale(14),
                fontWeight: '400',
              }}>
              Kinana Hirani
            </Text>
          </View>
            <Switch
              trackColor={{false: '#767577', true: 'rgba(119,79,251,0.4)'}}
              thumbColor={isEnabled ? 'rgba(119,79,251,255)' : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
        </View>
      </View>
    </ScrollView>
  );
};

export default SpeedLimitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
