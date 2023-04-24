import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export const Loading = () => {
  return (
    <View style={styles.activyContainer}>
      <ActivityIndicator size={50} color="grey" />
    </View>
  );
};

const styles = StyleSheet.create({
  activyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
