import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Scan from '../screens/Admin/Scan';
import Order from '../screens/Admin/Order';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Order" component={Order} />
    </Stack.Navigator>
  );
}
export default function AdminNavigator() {
  return <MyStack />;
}
