import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Cart from '../screens/Cart/MyCart';
import CheckoutNavigator from './CheckoutNavigator';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
        >
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Checkout"
                component={CheckoutNavigator}
                options={{
                    title: 'Checkout',
                    headerShown: false,
                    tabBarStyle: { display: "none" },
                }}
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}