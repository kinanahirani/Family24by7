import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import store, {persistVal} from './src/redux/store';

const App = () => {
  return (
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistVal}>
            <PaperProvider> 
              <AppNavigator />
            </PaperProvider>
          </PersistGate>
        </Provider>
      </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
