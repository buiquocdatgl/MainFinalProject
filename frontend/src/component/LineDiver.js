import React from 'react';
import {
    View,
} from 'react-native';

function LineDiver({lineStyle}) {
  return (
    <View
        style={{
            height: 2,
            width: '100%',
            backgroundColor: '#DDDDDD',
            ...lineStyle
        }}
    >

    </View>
  )
}

export default LineDiver