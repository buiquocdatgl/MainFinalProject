import React from 'react';
import {
    View,
    Text,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextButton from '../component/TextButton';
import LineDivider from '../component/LineDiver';
import { COLORS, SIZES } from '../constants/index';

function FooterTotal({ subTotal, shippingFee, total, onPress }) {
    return (
        <View>
            {/* Shadow */}
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={[COLORS.transparent, COLORS.lightGray1]}
                style={{
                    position: 'absolute',
                    top: -15,
                    left: 0,
                    right: 0,
                    height: Platform.OS === 'ios' ? 200 : 50,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                }}
            />

            {/* Order Details */}
            <View
                style={{
                    padding: SIZES.padding,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: '#FFFFFF'
                }}
            >
                {/* Subtotal */}
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Text style={{ flex: 1 }}>Subtotal</Text>
                    <Text style={{fontWeight: 'bold'}}>$37.97</Text>
                </View>

                {/* Shipping Fee */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.base,
                        marginBottom: SIZES.padding,
                    }}
                >
                    <Text style={{ flex: 1 }}>Shipping Fee</Text>
                    <Text style={{fontWeight: 'bold'}}>$0.00</Text>
                </View>

                {/* Line */}
                <LineDivider />

                {/* Total */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.padding,
                    }}
                >
                    <Text style={{
                        flex: 1,
                        fontWeight: 'bold',
                        fontSize: 20
                    }}>
                        Total:
                    </Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 20
                        }}
                    >
                        $37.97
                    </Text>
                </View>

                {/* Order */}
                <TextButton 
                    buttonContainerStyle={{
                        height: 60,
                        marginTop: SIZES.radius,
                        borderRadius: SIZES.radius,
                    }}
                    label="Place your order"
                    onPress={onPress}
                />
            </View>
        </View>
    )
}

export default FooterTotal