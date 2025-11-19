// RootNavigator.tsx

import React, { useEffect, useState } from "react";                     
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

import { getToken } from "../storage/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Gate: undefined;
  ProductDetail: { productId: string };
  Settings: undefined;
  CheckoutModal: undefined;
};

export type ProductDetailScreenProps = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

// ---------------- MAIN TABS ---------------- //
const MainTabs = () => (
  <Tabs.Navigator screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="Home" component={HomeScreen} />
    <Tabs.Screen name="Categories" component={CategoryTabs} />
    <Tabs.Screen name="Search" component={SearchScreen} />
    <Tabs.Screen name="Cart" component={CartScreen} />
    <Tabs.Screen name="Profile" component={ProfileScreen} />
  </Tabs.Navigator>
);

// ---------------- AUTH GATE ---------------- //
const AuthGate = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const tk = await getToken();
        setToken(tk);
      } catch (e) {
        Alert.alert("Auth Error", "Gagal memuat token.", e as any);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null;

  return token ? <MainTabs /> : <LoginScreen />;
};

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* GATE BUKAN SCREEN TERPISAH */}
        <Stack.Screen name="Gate" component={AuthGate} />

        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />{/*Type 'FC<Props>' is not assignable to type 'ScreenComponentType<RootStackParamList, "ProductDetail"> | undefined'.
  Type 'FunctionComponent<Props>' is not assignable to type 'FunctionComponent<{}>'.
    Type '{}' is missing the following properties from type 'Props': navigation, route*/}
        <Stack.Screen name="Settings" component={SettingsScreen} />

        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="CheckoutModal" component={CheckoutModal} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
