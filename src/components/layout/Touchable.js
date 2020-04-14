import React from 'react';
import { Platform } from "react-native";
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export default function Touchable({ children, rippleColor = 'lightgray' }) {
  
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(rippleColor, true)}>
        { children }        
      </TouchableNativeFeedback>
    );
  }

  else {
    return children;
  }

}
