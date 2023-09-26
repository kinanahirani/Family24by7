import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CBottomSheetButton from './CBottomSheetButton';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const SelectCircle = forwardRef((props, ref) => {
  const rbSheetRef = useRef();
  const userData = useSelector(state => state.user.data);
  const [joinedCircleList, setJoinedCircleList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const circleList = async () => {
      try {
        const joinedCircles = await firestore()
          .collection('circles')
          .where('usersOfCircles', 'array-contains', userData.id)
          .get();

        const circleData = joinedCircles.docs.map(doc => doc.data());
        setJoinedCircleList(circleData);
        setLoading(false);
      } catch (err) {
        console.log('Error(circleList): ', err);
        setLoading(false);
      }
    };
    circleList();
  }, []);

  useImperativeHandle(ref, () => ({
    open: () => {
      rbSheetRef.current.open();
    },
    close: () => {
      rbSheetRef.current.close();
    },
  }));
  const [isChecked, setIsChecked] = useState(true);
  const navigation = useNavigation();

  const handlePress = () => {
    setIsChecked(prevChecked => !prevChecked);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}>
      <RBSheet
        ref={rbSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            display: 'none',
          },
          container: {
            backgroundColor: 'white',
            // height:'35%'
          },
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: moderateScale(14),
              marginVertical: verticalScale(15),
            }}>
            Select Circle
          </Text>
          {loading ? (
            <Text>Loading circles...</Text>
          ) : (
            <>
              {joinedCircleList && joinedCircleList.length > 0 ? (
                joinedCircleList.map((circle, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: horizontalScale(15),
                      borderBottomWidth: moderateScale(0.5),
                      borderBottomColor: 'rgba(128,128,128,0.3)',
                      paddingVertical: moderateScale(8),
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: moderateScale(14),
                      }}>
                      {circle.circleName}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={handlePress}>
                        {isChecked ? (
                          <MaterialCommunityIcons
                            name="checkbox-marked-circle-outline"
                            color={'rgba(119, 79, 251, 255)'}
                            size={moderateScale(22)}
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="checkbox-blank-circle-outline"
                            color={'rgba(119, 79, 251, 255)'}
                            size={moderateScale(22)}
                          />
                        )}
                      </TouchableOpacity>
                      <Ionicons
                        name="settings-sharp"
                        color={'gray'}
                        size={moderateScale(22)}
                        style={{marginLeft: horizontalScale(20)}}
                      />
                    </View>
                  </View>
                ))
              ) : (
                <View>
                  <Text>No circles found!</Text>
                </View>
              )}
            </>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: verticalScale(20),
            }}>
            <CBottomSheetButton text="Add circle" />
            <CBottomSheetButton
              text="Join Circle"
              onPress={() => navigation.navigate('createcircle')}
            />
          </View>
        </View>
      </RBSheet>
    </View>
  );
});

export default SelectCircle;
