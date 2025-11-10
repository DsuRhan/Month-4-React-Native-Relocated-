import React from "react";
import { View, Text, StyleSheet, Switch, Pressable } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";

type Props = {
  setDrawerSwipeEnabled: (v: boolean) => void;
};

export default function SettingsScreen({ setDrawerSwipeEnabled }: Props) {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = (value?: boolean) => {
    const newVal = value ?? !isEnabled;
    setIsEnabled(newVal);
    setDrawerSwipeEnabled(newVal); // update root toggle via prop
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Enable Drawer Swipe</Text>
        <Switch value={isEnabled} onValueChange={toggleSwitch} />
      </View>

      <Pressable
        style={styles.btn}
        onPress={() => {
          // Navigate to Home and close drawer if open
          navigation.navigate("HomeTabs" as never);
          navigation.dispatch(DrawerActions.closeDrawer());
        }}
      >
        <Text style={styles.btnText}>Go to Home & Close Drawer</Text>
      </Pressable>

      <Text style={styles.note}>
        Default drawer swipe locked. Gunakan toggle di atas untuk membuka kunci.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  label: { fontSize: 16 },
  btn: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" },
  note: { marginTop: 20, color: "#666" },
});
