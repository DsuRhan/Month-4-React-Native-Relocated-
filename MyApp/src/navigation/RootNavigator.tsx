// src/navigation/RootNavigator.tsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeTab from "../screens/HomeTabs";
import SettingsScreen from "../screens/SettingsScreen";

export type RootParamList = {
  Home: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<RootParamList>();

export default function RootNavigator({
  isDrawerSwipeEnabled,
  setDrawerSwipeEnabled,
}: {
  isDrawerSwipeEnabled: boolean;
  setDrawerSwipeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEnabled: isDrawerSwipeEnabled,
      }}
    >
      <Drawer.Screen name="Home" component={HomeTab} />
      <Drawer.Screen name="Settings">
        {(props) => (
          <SettingsScreen
            {...props}
            setDrawerSwipeEnabled={setDrawerSwipeEnabled}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
