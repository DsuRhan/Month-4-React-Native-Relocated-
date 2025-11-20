// src/navigation/RootNavigator.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alert, Linking } from "react-native";

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

// -------------------------------------
// TYPE DEFINITIONS
// -------------------------------------
export type RootStackParamList = {
  Gate: undefined;
  ProductDetail: { productId: string };
  Settings: undefined;
  CheckoutModal: { productId?: string };
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
    const handleUrl = (event: { url: string }) => {
      try {
        const url = event.url;
        // Normalize: remove scheme if present
        // Examples:
        // ecommerceapp://produk/123
        // https://ecommerceapp.com/produk/123
        const parsed = url.replace(/.*?:\/\//g, ""); // e.g. "produk/123" or "ecommerceapp.com/produk/123"
        // handle possible host in https
        const path = parsed.includes("/")
          ? parsed.substring(parsed.indexOf("/") + 1) // skip host when present
          : parsed;

        // path may be like "produk/123" or "profil/user123" or "keranjang"
        if (path.startsWith("produk/")) {
          const productId = path.split("/")[1];
          if (productId && navigationRef.isReady()) {
            navigationRef.navigate("ProductDetail", { productId });
          }
          return;
        }

        if (path.startsWith("profil/")) {
          const userId = path.split("/")[1];
          if (userId && navigationRef.isReady()) {
            // navigate to Profile tab — ProfileScreen will validate userId
            navigationRef.navigate("Gate");
            // small delay to ensure Gate mounted — but if navigationRef ready, main tabs should exist
            setTimeout(() => {
              // try navigating into Profile tab by name (tabs are inside Gate's component)
              // We can't directly target nested navigator without nested action; using top-level 'Gate' fallback
              // Better UX: ProfileScreen reads initial params from Linking if provided
            }, 300);
          }
          return;
        }

        if (path.startsWith("keranjang") || path === "keranjang") {
          if (navigationRef.isReady()) {
            navigationRef.navigate("Gate"); // open gate (tabs) first
            setTimeout(() => {
              // try to navigate to Cart tab (if nested navigation action available)
              // We'll attempt to navigate again to Cart (if MainTabs mounted, this will work)
              try {
                navigationRef.navigate("Cart" as any);
              } catch (e) {
                // fallback handled by Gate/MainTabs initial route
                console.log("Navigasi ke Cart gagal:", e);
              }
            }, 300);
          }
          return;
        }

        // fallback: open home
        if (navigationRef.isReady()) {
          navigationRef.navigate("Gate");
        }
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
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="CheckoutModal" component={CheckoutModal} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
