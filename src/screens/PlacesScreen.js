import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopTabs from '../navigation/TopTabs';

const PlacesScreen = () => {
  return (
    <>
      <StatusBar
        backgroundColor={'white'}
        translucent
        barStyle="dark-content"
      />
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={{flex: 1}}>
        <TopTabs />
      </SafeAreaView>
    </>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({});
