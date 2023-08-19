import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';

// import Geolocation from '@react-native-community/geolocation';
// import MapView from 'react-native-maps';

const MapScreen = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headingSubView}>
          <TouchableOpacity
            style={{padding: moderateScale(5)}}
            onPress={openDrawer}>
            <Feather name="menu" size={moderateScale(25)} color={'black'} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>test circle</Text>
          <AntDesign
            name="caretdown"
            size={moderateScale(10)}
            color={'black'}
          />
        </View>

        <View style={styles.headingSubView}>
          <Ionicons
            name="chatbubble-outline"
            size={moderateScale(25)}
            color={'black'}
          />
          <Ionicons
            name="notifications-outline"
            size={moderateScale(25)}
            color={'black'}
            style={{marginLeft: verticalScale(20)}}
          />
        </View>
      </View>
      {/* <View style={{backgroundColor: 'red'}}>
        <Text style={{color: 'black'}}>Tap any marker</Text>
      </View> */}
      {/* <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
      <TouchableOpacity onPress={() => refRBSheet.current.open()}>
        <Text>OPEN RB SHEET</Text>
      </TouchableOpacity>
      <RBSheet
        minClosingHeight={verticalScale(40)}
        animationType="none"
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopRightRadius: moderateScale(15),
            borderTopLeftRadius: moderateScale(15),
            bottom:'10%',
            position: 'absolute',
            height:verticalScale(200)
          },
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: 'grey',
            // width:'100%'
          },
        }}>
        <Text>Bottom sheet content</Text>
      </RBSheet>

    {/* <View style={styles.openedModal}>
        <View style={styles.draggableIcon} />
      <ScrollView >
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hello</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hkkk</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hrerere</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hewewewe</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hello</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
      </ScrollView>
      </View> */}
      {/* <TouchableOpacity activeOpacity={1} style={styles.hiddenModal}>
        <View style={styles.draggableIcon} />
      </TouchableOpacity> */}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: verticalScale(60),
    padding: moderateScale(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headingSubView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: {
    marginLeft: verticalScale(5),
    marginRight: verticalScale(7),
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: 'black',
  },
  hiddenModal: {
    borderTopRightRadius: moderateScale(15),
    borderTopLeftRadius: moderateScale(15),
    bottom: 0,
    position: 'absolute',
    height: verticalScale(40),
    width: '100%',
    backgroundColor: 'white',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openedModal: {
    borderTopRightRadius: moderateScale(15),
    borderTopLeftRadius: moderateScale(15),
    bottom: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    height: verticalScale(200),
    elevation: 5,
  },
  draggableIcon: {
    width: '10%',
    height: verticalScale(7),
    borderRadius: moderateScale(7),
    alignSelf: 'center',
    marginTop: verticalScale(10),
    backgroundColor: 'rgba(128,128,128, 0.4)',
  },
});
