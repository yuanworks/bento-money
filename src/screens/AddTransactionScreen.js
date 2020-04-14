import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from '../components/layout/Touchable';
import HeaderAction from '../components/layout/HeaderAction';

export function AddTransactionScreen({ navigation }) {
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderAction>
          <Text>ADD</Text>
        </HeaderAction>
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

});
