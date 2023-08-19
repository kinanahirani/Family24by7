// import 'react-native-gesture-handler';
// import {StatusBar, StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import AppNavigator from './src/navigation/AppNavigator';
// import {NavigationContainer} from '@react-navigation/native';
// import {PaperProvider} from 'react-native-paper';
// import {PersistGate} from 'redux-persist/integration/react';
// import {Provider} from 'react-redux';
// import store, {persistVal} from './src/redux/store';

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistVal}>
//           <PaperProvider>
//             <StatusBar backgroundColor={'rgba(119,79,251,255)'} />
//             <AppNavigator />
//           </PaperProvider>
//         </PersistGate>
//       </Provider>
//     </NavigationContainer>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});



import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import { verticalScale } from './src/helpers/sizeHelpers';

const App = () => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        containerStyle={{bottom:0}}
        // containerHeight={50}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
