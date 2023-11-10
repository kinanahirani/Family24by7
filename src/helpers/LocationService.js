import firestore from '@react-native-firebase/firestore';

export const addLocationLog = async (timestamp, location, address, description) => {
  try {
    await firestore()
      .collection('locations')
      .add({
        timestamp,
        location,
        address,
        description,
      });

    console.log('Location log added to Firestore.');
  } catch (error) {
    console.error('Error adding location log:', error);
  }
};
