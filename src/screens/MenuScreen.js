import {Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useState } from 'react';
import {moderateScale, verticalScale} from '../helpers/sizeHelpers';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MenuScreen = () => {
  const [createCircleModalVisible, setCreateCircleModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Menu</Text>
      </View>
      <TouchableOpacity>Logout</TouchableOpacity>
      <Modal
          animationType="fade"
          transparent={true}
          visible={createCircleModalVisible}
          onRequestClose={() => {
            setCreateCircleModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Name your Circle</Text>
              {/* <TextInput
                mode="flat"
                label="Enter Family360 email"
                style={[styles.textInput, {marginTop: moderateScale(20)}]}
                onChangeText={text => setCreateCircleCode(text)}
                value={createCircleCode}
              /> */}
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <Pressable
                  style={[styles.button, {marginRight: horizontalScale(10)}]}
                  onPress={() => setCreateCircleModalVisible(false)}>
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
  );
};

export default MenuScreen;

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
  },
  headerTxt: {
    fontSize: moderateScale(15),
    color: 'black',
    fontWeight: '500',
  },
});
