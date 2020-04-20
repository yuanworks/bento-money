import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function BentoInput({ ...props }) {

  return (
    <TextInput
      style={styles.default}
      {...props}
    />
  );
}

const styles = StyleSheet.create({

  default: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    fontSize: 16,
    marginVertical: 10,
  },

});
