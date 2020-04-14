import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function NewTransactionButton() {

  return (
    <View style={styles.button}>
      <Text style={styles.plusIcon}>+</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  button: {
    position: 'absolute',
    bottom: '2%',
    right: '4%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
    borderRadius: '50%',
    backgroundColor: '#fbb700',

    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  plusIcon: {
    color: 'white',
    fontSize: 26,
    lineHeight: 26,
  },

  

});
