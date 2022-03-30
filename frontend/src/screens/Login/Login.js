import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    Dimensions,
    StatusBar,

} from 'react-native';
import LottieView from 'lottie-react-native';
import TextButton from '../../component/TextButton';
import { SIZES } from '../../constants/index';

const SignInScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#BF6B7B' barStyle="light-content" />
            <View style={styles.header}>
                <LottieView
                    source={require('../../assets/images/splash.json')}
                    autoPlay
                    loop={true}
                    speed={0.5}
                />

            </View>
            <TextButton
                label="Sign Up"
                buttonContainerStyle={{
                    height: 55,
                    marginBottom: SIZES.padding,
                    borderRadius: SIZES.radius,
                    width: 200,
                    marginLeft: 100,
                    marginBottom: 100
                }}
                onPress={() => navigation.replace('MainTabScreen')}
            />

        </View>
    )
}

export default SignInScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BF6B7B'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,
        display: 'flex',
    },
    btn: {
        height: 50,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
