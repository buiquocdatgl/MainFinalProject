import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Screens
import Checkout from "../screens/Cart/Checkout/Checkout";
import Delivery from "../screens/Cart/Checkout/DeliveryStatus";
import Success from "../screens/Cart/Checkout/Success";
import Confirm from "../screens/Cart/Checkout/Confirm"
import CheckInfo from "../screens/Cart/Checkout/CheckInfo";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Confirm"
        component={Confirm}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      {/* <Tab.Screen name="CheckInfo" component={CheckInfo} /> */}
      <Tab.Screen
        name="Delivery"
        component={Delivery}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Success"
        component={Success}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTabs />;
}
