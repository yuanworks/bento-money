import React from 'react';
import { View, Text, Button } from 'react-native';

export function EditTransactionScreen({ navigation }) {
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={'hodor'} title="+1" color="red" />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>hi</Text>
    </View>
  )
}
