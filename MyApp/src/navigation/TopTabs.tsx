// src/navigation/TopTabs.tsx
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopTabsParamList } from "../types/navigation";
import ProductTab from "../screens/ProductTabs";
import FavoriteTab from "../screens/FavoriteTab";

const Tab = createMaterialTopTabNavigator<TopTabsParamList>();

export default function TopTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Products" component={ProductTab} />
      <Tab.Screen name="Favorites" component={FavoriteTab} />
    </Tab.Navigator>
  );
}
