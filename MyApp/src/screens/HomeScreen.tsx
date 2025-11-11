// src/navigation/HomeTabs.tsx
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProductScreen from "../screens/ProductTabs";
import CartScreen from "./CartScreen";/*Cannot find module '../screens/CartScreen' or its corresponding type declarations.ts(2307)
*/
import ProfileScreen from "./ProfileScreen";

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen name="Product" component={ProductScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
