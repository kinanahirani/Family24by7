import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';

const SafetyScreen = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [messageTxt, setMessageTxt] = useState(
    '(Your Name) has sent an emergency alert, reach/contact as soon as you can, the last location we have is in the URL (location URL) at (time)',
  );

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

          <ScrollView horizontal contentContainerStyle={styles.contactView}>
            <TouchableOpacity activeOpacity={1} style={styles.addContact}>
              <AntDesign
                name="pluscircle"
                size={moderateScale(40)}
                color={'rgba(119,79,251,255)'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.addContact, {marginLeft: horizontalScale(15)}]}>
              <AntDesign
                name="pluscircle"
                size={moderateScale(40)}
                color={'rgba(119,79,251,255)'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.addContact, {marginLeft: horizontalScale(15)}]}>
              <AntDesign
                name="pluscircle"
                size={moderateScale(40)}
                color={'rgba(119,79,251,255)'}
              />
            </TouchableOpacity>
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
                  (Your Name) has sent an emergency alert, reach/contact as soon
                  as you can, the last location we have is in the URL (location
                  URL) at (time)
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
                  }}>{`${messageTxt.length}/200`}</Text>
              </View>
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <Pressable
                  style={[styles.button, {marginRight: horizontalScale(10)}]}
                  onPress={() => setEditModalVisible(false)}>
                  <Text style={styles.textStyle}>BACK</Text>
                </Pressable>
                <Pressable style={styles.button}>
                  <Text style={styles.textStyle}>CREATE</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.bottomView}>
        <View style={[styles.box, {backgroundColor: 'orange'}]}>
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
        </View>
        <View
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
        </View>
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
    flex: 1,
    // width: '100%',
    // height: '100%',
    // flexDirection: 'row',
    padding: moderateScale(10),
    paddingHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
  },
  addContact: {
    width: '27%',
    height: verticalScale(95),
    borderRadius: moderateScale(10),
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(128,128,128,1)',
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
    padding: moderateScale(25),
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
    width: horizontalScale(80),
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
