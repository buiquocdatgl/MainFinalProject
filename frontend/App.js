import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainTabScreen from './src/navigators/MainTabScreen';
import OnboardScreen from './src/navigators/OnboardNavigator';
import LoginScreen from './src/screens/Login/Login';
import {createStackNavigator} from '@react-navigation/stack';
import store from './src/Redux/store';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs(true);
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name="OnboardingScreen" component={OnboardScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
          <Stack.Screen name="MainTabScreen" component={MainTabScreen} />
        </Stack.Navigator>
        <Toast ref={ref => Toast.setRef(ref)} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
