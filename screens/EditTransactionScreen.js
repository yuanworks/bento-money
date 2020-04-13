import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from '../components/layout/Touchable';

export function EditTransactionScreen({ navigation }) {
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Touchable>
          <Text style={styles.addButton}>Add</Text>
        </Touchable>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>hi</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  addButton: {
    marginEnd: 10,
    textTransform: "uppercase",
  },
})