import React from 'react';
import { View, StyleSheet } from 'react-native';
import Touchable from './Touchable';

export default function HeaderAction({ children }) {
  return (
    <Touchable>
      <View style={styles.action}>
        { children }
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  action: {
    marginEnd: 10,
  }
});
