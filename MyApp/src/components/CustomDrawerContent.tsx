import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/120",
  };

  const navigateAndClose = (routeName: string) => {
    navigation.navigate(routeName as never);
    navigation.closeDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      <ScrollView style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateAndClose("HomeTabs")}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateAndClose("Orders")}>
          <Text style={styles.menuText}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateAndClose("Settings")}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            // Simulasi logout: kembali ke HomeTabs dan tutup drawer
            navigation.navigate("HomeTabs" as never);
            navigation.closeDrawer();
            // Anda bisa tambahkan logic logout nyata di sini.
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 12 },
  userInfo: { flexDirection: "column" },
  name: { fontSize: 16, fontWeight: "700" },
  email: { fontSize: 13, color: "#666", marginTop: 4 },

  menu: { flex: 1, paddingVertical: 8 },
  menuItem: { paddingVertical: 14, paddingHorizontal: 16 },
  menuText: { fontSize: 16 },

  footer: { padding: 12, borderTopWidth: 1, borderTopColor: "#eee" },
  logoutBtn: { paddingVertical: 12, alignItems: "center", borderRadius: 8, backgroundColor: "#fff" },
  logoutText: { color: "#ff4d4f", fontWeight: "600" },
});
