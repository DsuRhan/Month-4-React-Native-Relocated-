// HomeTab.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect} from '@react-navigation/native';
import {  DrawerNavigationProp } from '@react-navigation/drawer';
import type { RootParamList } from '../navigation/RootNavigator'; // pastikan path sesuai

const Tab = createMaterialTopTabNavigator();

type HomeTabNavProp = DrawerNavigationProp<RootParamList, 'Home'>;

const PopulerScreen = () => (
  <View style={styles.tabContent}><Text>Produk Populer</Text></View>
);

const TerbaruScreen = () => (
  <View style={styles.tabContent}><Text>Produk Terbaru</Text></View>
);

const DiskonScreen = () => {
  useFocusEffect(
    React.useCallback(() => {
      console.log('Diskon tab aktif');
      return () => console.log('Diskon tab ditinggalkan');
    }, [])
  );
  return <View style={styles.tabContent}><Text>Produk Diskon</Text></View>;
};

const HomeTab = ({ navigation }: { navigation: HomeTabNavProp }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.toggleDrawer()} style={styles.hamburger}>
        <Text style={styles.hamburgerText}>☰</Text>
      </Pressable>

      <Tab.Navigator
        screenOptions={{
          lazy: true,
          lazyPreloadDistance: 1,
          swipeEnabled: true,
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: { backgroundColor: 'blue' },
          tabBarLabelStyle: { textTransform: 'none' },
        }}
      >
        <Tab.Screen name="Populer" component={PopulerScreen} />
        <Tab.Screen name="Terbaru" component={TerbaruScreen} />
        <Tab.Screen name="Diskon" component={DiskonScreen} />
        <Tab.Screen name="Elektronik" component={PopulerScreen} />
        <Tab.Screen name="Pakaian" component={TerbaruScreen} />
        <Tab.Screen name="Makanan" component={DiskonScreen} />
        <Tab.Screen name="Otomotif" component={PopulerScreen} />
        <Tab.Screen name="Hiburan" component={TerbaruScreen} />
        <Tab.Screen name="Perlengkapan Bayi" component={DiskonScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  hamburger: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 4,
  },
  hamburgerText: { fontSize: 18 },
});

export default HomeTab;
