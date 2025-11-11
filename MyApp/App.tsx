// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootDrawer from "./src/navigation/RootDrawer";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootDrawer />
      </NavigationContainer>
    </AuthProvider>
  );
}
