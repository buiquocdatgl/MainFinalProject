import React from 'react';
import {
    Text,
    TouchableOpacity
  } from 'react-native';

function TextButton({buttonContainerStyle, label, labelStyle, onPress}) {
  return (
    <TouchableOpacity
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FF6C44',
            ...buttonContainerStyle
        }}
        onPress={onPress}
    >
        <Text
            style={{
                color: '#fff',
                fontSize: 17,
                fontWeight: 'bold',
                ...labelStyle
            }}
        >
            {label}
        </Text>
    </TouchableOpacity>
  )
}

export default TextButton