import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import SplashScreen from '../screens/Dashboard/Splash';
import OnboardingScreen from '../screens/Dashboard/Onboarding';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
        >
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Onboard"
                component={OnboardingScreen}
                options={{
                    title: 'Onboard',
                    headerShown: false,
                    tabBarStyle: { display: "none" },
                }}
            />
        </Stack.Navigator>
    )
}

export default function OnboardNavigator() {
    return <MyStack />
}