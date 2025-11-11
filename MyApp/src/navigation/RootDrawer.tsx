// src/navigation/RootDrawer.tsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../types/navigation";
import MainTabs from "./MainTabs";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function RootDrawer() {
  return (
    <Drawer.Navigator id="rootDrawer">
      <Drawer.Screen name="MainTabs" component={MainTabs} />
    </Drawer.Navigator>
  );
}
