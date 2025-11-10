import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";


export default function App() {
  // Global toggle untuk mengizinkan swipe membuka drawer
  const [isDrawerSwipeEnabled, setDrawerSwipeEnabled] = useState(false);

  return (
    <NavigationContainer>
      <RootNavigator
        isDrawerSwipeEnabled={isDrawerSwipeEnabled}
        setDrawerSwipeEnabled={setDrawerSwipeEnabled}
      />
    </NavigationContainer>
  );
}
