import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopTabs from '../navigation/TopTabs';

const PlacesScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopTabs />
    </SafeAreaView>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({});
