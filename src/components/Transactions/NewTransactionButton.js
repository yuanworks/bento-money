import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';

export default function NewTransactionButton({ navigation }) {

  return (
    <TouchableHighlight style={styles.button} onPress={() => navigation.navigate('NewTransaction')}>
      <Text style={styles.plusIcon}>+</Text>
    </TouchableHighlight>
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
    height: 52,
    width: 52,
    borderRadius: '50%',
    backgroundColor: '#fbb700',
    borderColor: 'white',
    borderWidth: 1,

    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  plusIcon: {
    color: 'white',
    fontSize: 32,
    marginBottom: 4,
  },

});
