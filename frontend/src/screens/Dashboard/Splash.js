import React, { useRef, useEffect } from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  return (
      <LottieView
        source={require('../../assets/images/load.json')}
        autoPlay
        loop={false}
        speed={0.5}
        resizeMode="cover"
        onAnimationFinish={() => {
          console.log('Animation Finished!')
          navigation.replace('Onboard');
        }}
      />
  );
};

export default SplashScreen;

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#BF6B7B',
  },
  logoText: {
    fontSize: 35,
    marginTop: 20,
    color: 'white',
    fontWeight: '700',
  },
  contentContainer: {
    top: '40%',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    flexDirection: 'row',
  },
});