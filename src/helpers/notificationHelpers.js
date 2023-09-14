import {Platform, PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export const requestUserPermission = async () => {
  Platform.OS === 'android' &&
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
};

// Register the device for remote messages
const registerForRemoteMessages = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    console.log('Device registered for remote messages');
  } catch (error) {
    console.log('Error registering for remote messages:', error);
  }
};

const getFcmToken = async () => {
  try {
    await registerForRemoteMessages();
    const token = await messaging().getToken();
    console.log('FCM token:', token);
  } catch (error) {
    console.log(error, 'IN ERR');
  }
};

export const backgroundMessage = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    PushNotification.localNotification({
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
      channelId: '1',
    });
  });
};

export const createChannelfunc = () => {
  PushNotification.createChannel(
    {
      channelId: '1',
      channelName: 'Text',
      channelDescription: 'Description',
      importance: 4,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );
};

export const onMsg = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
    PushNotification.localNotification({
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
      channelId: '1',
    });
  });
};