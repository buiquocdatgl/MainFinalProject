import React from 'react';
import {
    View,
    Text,
    Image,
    BackHandler
} from 'react-native';
import TextButton from '../../../component/TextButton';
import { images, COLORS, SIZES, FONTS } from '../../../constants/index';

function Success({ navigation }) {

    React.useEffect(()=> {
        const backHandler = BackHandler.addEventListener
        ('hardwareBackPress', () => { return true })

        return () => backHandler.remove();
    })
  return (
    <View
        style={{
            flex: 1,
            paddingHorizontal: SIZES.padding,
            backgroundColor: '#fff'
        }}
    >
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Image 
                source={images.congratulation}
                // resizeMethod="contain"
                style={{
                    width: 250,
                    height: 250
                }}
            />

            <Text
                style={{
                    marginTop: SIZES.padding,
                    fontSize: 35,
                    fontWeight: 'bold'
                }}
            >
                Congratulations!
            </Text>

            <Text
                style={{
                    marginTop: SIZES.base,
                    color: '#666'
                }}
            >
                Pick up materials successfully!
            </Text>
        </View>

        <TextButton
            label="Done"
            buttonContainerStyle={{
                height: 55,
                marginBottom: SIZES.padding,
                borderRadius: SIZES.radius,
            }}
            onPress={() => navigation.navigate("Delivery")}
        />
    </View>
  )
}

export default Success