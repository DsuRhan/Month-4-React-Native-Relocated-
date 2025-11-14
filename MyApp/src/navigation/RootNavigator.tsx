import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList, MainTabsParamList } from "../modules/types";

import HomeScreen from "../screens/HomeScreen";
import CategoryTabs from "../screens/CategoryTabs";
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";

import ProductDetailScreen from "../screens/ProductDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CheckoutModal from "../screens/CheckoutModal";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabsParamList>();

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
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Product Detail" }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="CheckoutModal" component={CheckoutModal} options={{ title: "Checkout" }} />
      </Stack.Group>
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
