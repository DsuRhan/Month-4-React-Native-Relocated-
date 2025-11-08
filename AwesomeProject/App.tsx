import React from "react";
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Pressable } from "react-native";
import "nativewind";

// ----- Type Definitions -----
type MainTabsParamList = {
  Catalog: undefined;
  Profile: undefined;
};

type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
};

type Onboarding1NavProp = NativeStackNavigationProp<RootStackParamList, "Onboarding1">;
type Onboarding2NavProp = NativeStackNavigationProp<RootStackParamList, "Onboarding2">;

// ----- Navigators -----
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabsParamList>();

// ----- Screens -----
const Onboarding1 = ({ navigation }: { navigation: Onboarding1NavProp }) => (
  <View className="flex-1 items-center justify-center bg-gray-100">
    <Text className="text-lg font-bold text-gray-800 mb-4">Welcome to MiniShop!</Text>
    <Pressable
      className="bg-blue-500 px-4 py-2 rounded-lg"
      onPress={() => navigation.navigate("Onboarding2")}
    >
      <Text className="text-white">Next</Text>
    </Pressable>
  </View>
);

const Onboarding2 = ({ navigation }: { navigation: Onboarding2NavProp }) => (
  <View className="flex-1 items-center justify-center bg-gray-100">
    <Text className="text-lg font-bold text-gray-800 mb-4">Find your favorite items easily.</Text>
    <Pressable
      className="bg-green-500 px-4 py-2 rounded-lg"
      onPress={() => navigation.replace("MainTabs", { screen: "Catalog" })}
    >
      <Text className="text-white">Get Started</Text>
    </Pressable>
  </View>
);

const ProductCatalog = () => (
  <View className="flex-1 items-center justify-center bg-white">
    <Text className="text-xl font-semibold text-gray-800">🛍️ Product Catalog</Text>
  </View>
);

const Profile = () => (
  <View className="flex-1 items-center justify-center bg-white">
    <Text className="text-xl font-semibold text-gray-800">👤 Profile</Text>
  </View>
);

const MainTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Catalog" component={ProductCatalog} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

// ----- App Entry -----
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
