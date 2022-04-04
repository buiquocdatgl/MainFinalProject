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
      <Tab.Screen name="Checkout" component={Checkout} />
      <Tab.Screen name="Confirm" component={Confirm} />
      {/* <Tab.Screen name="CheckInfo" component={CheckInfo} /> */}
      <Tab.Screen name="Delivery" component={Delivery} />
      {/* <Tab.Screen name="Success" component={Success} /> */}
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTabs />;
}
