import React, { useState } from "react";
import { View, Text, Switch } from "react-native";

const SettingsScreen: React.FC = () => {
  const [saving, setSaving] = useState(false);
  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Settings</Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
        <Text style={{ flex: 1 }}>Save data (demo)</Text>
        <Switch value={saving} onValueChange={setSaving} />
      </View>
    </View>
  );
};
export default SettingsScreen;
