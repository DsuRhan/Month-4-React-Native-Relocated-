// combined types for products and navigation
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
}

// Navigation param list for React Navigation
export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetail: { productId: number };
  Login: undefined;
  CheckoutModal: { productId?: number } | undefined;
  Settings: undefined;
};
export type MainTabsParamList = {
  Home: undefined;
  Categories: undefined;
  Search: undefined;
  Cart: undefined;
  Profile: undefined;
};
