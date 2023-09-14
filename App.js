import 'react-native-gesture-handler';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import store, {persistVal} from './src/redux/store';
import {
  backgroundMessage,
  createChannelfunc,
  onMsg,
  requestUserPermission,
} from './src/helpers/notificationHelpers';

const App = () => {
  useEffect(() => {
    createChannelfunc();
    backgroundMessage();
    requestUserPermission();
    onMsg();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistVal}>
          <PaperProvider>
            <StatusBar backgroundColor={'rgba(119,79,251,255)'} />
            <AppNavigator />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
