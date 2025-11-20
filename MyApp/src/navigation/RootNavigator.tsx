// src/navigation/RootNavigator.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Linking } from "react-native";


import HomeScreen from "../screens/HomeScreen";
import CategoryTabs from "../screens/CategoryTabs";
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CheckoutModal from "../screens/CheckoutModal";
// RootNavigator.tsx
import ProtectedRoute from "./ProtectedRoute";


import { getToken, validateTokenOrLogout } from "../storage/auth";

// -------------------------------------
// TYPE DEFINITIONS
// -------------------------------------
export type RootStackParamList = {
  Gate: undefined;
  ProductDetail: { productId: string };
  Settings: undefined;
  CheckoutModal: { productId?: string };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

// navigation ref so we can navigate from listeners
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

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
      const stillValid = await validateTokenOrLogout();
      if (!stillValid) {
        setToken(null);
        setLoading(false);
        return;
      }

      const tk = await getToken();
      setToken(tk);
      setLoading(false);
    })();
  }, []);

  if (loading) return null;
  return token ? <MainTabs /> : <LoginScreen />;
};

// ---------------- LINKING CONFIG ---------------- //
// prefixes: custom scheme + https domain (universal/app links)
const linking = {
  prefixes: ["ecommerceapp://", "https://ecommerceapp.com"],
  config: {
    screens: {
      Gate: "home",
      ProductDetail: "produk/:productId", // maps produk/:productId -> ProductDetail screen
      Settings: "settings",
      CheckoutModal: "checkout",
      // MainTabs children mapping handled by react-navigation automatically if needed
      // Also map some tab routes:
      // Home: "home", Cart: "keranjang", Profile: "profil/:userId"
      // But since Gate renders tabs, react-navigation will try to resolve nested paths.
    },
  },
};

export default function RootNavigator() {
  // handle warm start (app in background) and raw URL parsing
  useEffect(() => {
    const handleUrl = async (event: { url: string }) => {
  try {
    const url = event.url;
    const parsed = url.replace(/.*?:\/\//g, "");
    const path = parsed.includes("/") 
      ? parsed.substring(parsed.indexOf("/") + 1)
      : parsed;

    const token = await getToken();   // CHECK AUTH

    // --- PRODUK (protected) ---
    if (path.startsWith("produk/")) {
      const productId = path.split("/")[1];
      if (!token) {
        // not logged in → redirect to login
        if (navigationRef.isReady()) {
          navigationRef.navigate("Gate");
        }
        return;
      }

      if (navigationRef.isReady()) {
        navigationRef.navigate("ProductDetail", { productId });
      }
      return;
    }

    // --- KERANJANG (protected) ---
    if (path.startsWith("keranjang")) {
      if (!token) {
        navigationRef.navigate("Gate");
        return;
      }

      if (navigationRef.isReady()) {
        navigationRef.navigate("Gate");
        setTimeout(() => navigationRef.navigate("Cart" as any), 300);
      }
      return;
    }

    // --- CHECKOUT (protected) ---
    if (path.startsWith("checkout")) {
      if (!token) {
        navigationRef.navigate("Gate");
        return;
      }

      if (navigationRef.isReady()) {
        navigationRef.navigate("CheckoutModal" as any);
      }
      return;
    }

    // fallback
    navigationRef.navigate("Gate");
  } catch (err) {
    console.log("link handler err:", err);
  }
};

    // subscribe
    const sub = Linking.addEventListener("url", handleUrl);

    // Also handle initial url for warm cases (if app resumed with url) - react-navigation linking already tries this,
    // but we keep a defensive initial check for non-react navigation scenarios
    (async () => {
      const initial = await Linking.getInitialURL();
      if (initial) {
        handleUrl({ url: initial });
      }
    })();

    return () => {
      sub.remove();
    };
  }, []);

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Gate" component={AuthGate} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Cart">
  {({}) => (
    <ProtectedRoute>
      <CartScreen />
    </ProtectedRoute>
  )}
</Stack.Screen>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
<Stack.Screen name="CheckoutModal">
  {({ navigation, route }: any) => (
    <ProtectedRoute>
      <CheckoutModal navigation={navigation} route={route} />
    </ProtectedRoute>
  )}
</Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
