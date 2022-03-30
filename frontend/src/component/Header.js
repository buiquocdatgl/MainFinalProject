import React from 'react';
import {
    View,
    Text,
} from 'react-native';

function Header({ containerStyle, title, leftComponent, rightComponent }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                ...containerStyle
            }}
        >
            {/* Left */}
            {leftComponent}
            
            {/* Title */}
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={{ fontSize: 20, lineHeight: 22, fontWeight: 'bold' }}>
                    {title}
                </Text>
            </View>

            {/* Right */}
            {rightComponent}
        </View>
    )
}

export default Header