// src/navigation/types.ts
import { NavigatorScreenParams } from "@react-navigation/native";

export type TopTabsParamList = {
  Products: undefined;
  Favorites: undefined;
};

export type StackParamList = {
  TopTabs: NavigatorScreenParams<TopTabsParamList>;
  DetailProduct: { id: string };
};

export type MainTabsParamList = {
  Home: undefined;
  Categories: undefined;
  Profile: undefined;
};

export type RootDrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
};
