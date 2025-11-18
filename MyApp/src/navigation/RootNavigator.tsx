//src/navigation/RootNavigator.tsx

import React, { useEffect, useState } from "react";                     // ★ Modified
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList, MainTabsParamList } from "../modules/types";
import { Alert } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import CategoryTabs from "../screens/CategoryTabs";
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CheckoutModal from "../screens/CheckoutModal";

import { getToken } from "../storage/auth";     // ★ Added

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabsParamList>();


// --- Auth Gate ---
const AuthGate = () => {
  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);
  

  useEffect(() => {
    (async () => {
      try {
        const tk = await getToken();
        setHasToken(!!tk);
      } catch (e: any) {
        // Jika terjadi masalah akses (access denied), getToken sudah menanganinya
        // namun berjaga-jaga tampilkan alert
        const errStr = String(e).toLowerCase();
        if (errStr.includes("access denied") || errStr.includes("user not authenticated")) {
          Alert.alert("Keamanan perangkat berubah", "Mohon login ulang.");
          setHasToken(false);
        } else {
          console.log("AuthGate load error:", e);
          setHasToken(false);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null;

  return hasToken ? <MainTabs /> : <LoginScreen />;
};

const MainTabs = () => (
  <Tabs.Navigator screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="Home" component={HomeScreen} />
    <Tabs.Screen name="Categories" component={CategoryTabs} />
    <Tabs.Screen name="Search" component={SearchScreen} />
    <Tabs.Screen name="Cart" component={CartScreen} />
    <Tabs.Screen name="Profile" component={ProfileScreen} />
  </Tabs.Navigator>
);

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={AuthGate}                 // ★ Modified
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="CheckoutModal" component={CheckoutModal} />
      </Stack.Group>
    </Stack.Navigator>
  </NavigationContainer>
);


export default RootNavigator;
