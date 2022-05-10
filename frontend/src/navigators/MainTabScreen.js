/* eslint-disable prettier/prettier */
import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/Home/HomeScreen';
import CartNavigator from './CartNavigator';
import ScanScreen from '../screens/Admin/Scan';
import OnboardingScreen from './OnboardNavigator';
import AdminNavigator from './AdminNavigator';
import scan from '../assets/images/scan.png';
import CartIcon from '../Shared/CartIcon';
import CheckInfo from '../screens/Cart/Checkout/CheckInfo';
import Success from '../screens/Cart/Checkout/Success';
import Profile from '../screens/Profile/Profile';
import { connect } from "react-redux";

const Tab = createBottomTabNavigator();

const MainTabScreen = ({navigation, userProfile}) => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // tabBarLabel: 'Home',
          // tabBarColor: '#BF6B7B',
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                position: 'absolute',
                top: 8,
              }}>
              <Icon name="home" color={focused ? 'red' : 'gray'} size={26} />
            </View>
          ),
          headerShown: false,
        }}
      />

      {userProfile?.role === 'STUDENT' && (
      <Tab.Screen
        name="CartRoot"
        component={CartNavigator}
        options={{
          // tabBarLabel: 'Cart',
          // tabBarColor: '#F2A2B1',
          tabBarIcon: ({color, focused}) => (
            <View>
              <Icon
                name="shopping-cart"
                color={focused ? 'red' : 'gray'}
                size={26}
              />
              <CartIcon />
            </View>
          ),
          headerShown: false,
        }}
      />)}

      {userProfile?.role === 'SECURITY' && (
      <Tab.Screen
        name={'Scan'}
        component={AdminNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
              <View
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: '#FF6C44',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: 10,
                }}>
                <Image
                  source={scan}
                  style={{
                    width: 22,
                    height: 22,
                    tintColor: 'white',
                  }}></Image>
              </View>
            </TouchableOpacity>
          ),
          headerShown: false,
          tabBarStyle: {display: 'none'},
        }}>
        </Tab.Screen>)}

      {userProfile?.role === 'STUDENT' && (
      <Tab.Screen
        name="CheckInfo"
        component={CheckInfo}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                position: 'absolute',
                top: 8,
              }}>
              <Icon name="cog" color={focused ? 'red' : 'gray'} size={26} />
            </View>
          ),
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />)}

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                position: 'absolute',
                top: 8,
              }}>
              <Icon name="user" color={focused ? 'red' : 'gray'} size={26} />
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  const { userProfile } = state;
  return {
    userProfile: userProfile,
  };
};

export default connect(mapStateToProps)(MainTabScreen);

