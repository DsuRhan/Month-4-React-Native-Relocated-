import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { RootStackParamList, DrawerParamList, TopTabsParamList } from "../types/navigation";

import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CheckoutModal from "../screens/CheckoutModal";

import PopulerScreen from "../screens/TopTabs/PopularScreen";
import FavoritScreen from "../screens/TopTabs/FavoriteScreen";
import ExploreScreen from "../screens/TopTabs/ExploreScreen";
import DrawerButton from "../components/DrawerButton";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const InnerStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator<DrawerParamList>();
const TopTabs = createMaterialTopTabNavigator<TopTabsParamList>();

// Top Tabs
function TopTabsNavigator() {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen name="Populer" component={PopulerScreen} />
      <TopTabs.Screen name="Favorit" component={FavoritScreen} />
      <TopTabs.Screen name="Explore" component={ExploreScreen} />
    </TopTabs.Navigator>
  );
}

// Inner Stack (TopTabs + Product Detail)
function InnerStackWrapper() {
  return (
    <InnerStack.Navigator screenOptions={{ headerShown: false }}>
      <InnerStack.Screen name="TopTabsMain" component={TopTabsNavigator} />
      <InnerStack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </InnerStack.Navigator>
  );
}

// Drawer (Main navigation wrapper)
function DrawerWrapper() {
  const [isLocked] = useState(false);

  return (
    <Drawer.Navigator screenOptions={{ swipeEnabled: !isLocked }}>
      <Drawer.Screen
        name="TopTabs"
        component={InnerStackWrapper}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

// Root Stack (Login, Drawer, Checkout Modal)
export default function AppNavigator() {
  const headerTitle = "Jelajahi Produk";

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: true }}
      />

      <RootStack.Screen
        name="MainDrawer"
        component={DrawerWrapper}
        options={{
          headerShown: true,
          headerLeft: () => <DrawerButton />,
          headerTitle,
        }}
      />

      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen
          name="CheckoutModal"
          component={CheckoutModal}
          options={{ headerShown: false }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
