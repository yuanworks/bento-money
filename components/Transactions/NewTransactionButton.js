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
    top: '2%',
    right: '5%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: '50%',
    backgroundColor: 'blue',

    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  plusIcon: {
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
  },

  

});
