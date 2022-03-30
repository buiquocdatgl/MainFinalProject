import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import IconButton from '../component/IconButton';
import { COLORS, SIZES, FONTS, icons } from '../constants/index';

function StepperInput({ containerStyle, value = 1, onAdd, onMinus }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 60,
                width: 130,
                backgroundColor: '#DDDDDD',
                borderRadius: 10,
                ...containerStyle
            }}
        >
            <IconButton
                containerStyle={{
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                icon={icons.plus}
                iconStyle={{
                    height: 25,
                    width: 25,
                    tintColor: value > 1 ? "#FF6C44" : COLORS.gray
                }}
                onPress={onMinus}
            />
             
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text>
                    {value}
                </Text>
            </View>

            <IconButton
                containerStyle={{
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                icon={icons.plus}
                iconStyle={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.primary
                }}
                onPress={onAdd}
            />
        </View>
    )
}

export default StepperInput