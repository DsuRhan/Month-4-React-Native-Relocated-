import React, { useState } from "react";
import { View, Text, Switch, Button } from "react-native";
import {requestStoragePermissionAndSave} from "../utils/saveKTPBackup";

const SettingsScreen: React.FC = () => {
  const [saving, setSaving] = useState(false);

  const backupKTP = async () => {
    const ok = await requestStoragePermissionAndSave();
    if (ok) {
      console.log("KTP saved to public gallery");
    }
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Settings</Text>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
        <Text style={{ flex: 1 }}>Save data (demo)</Text>
        <Switch value={saving} onValueChange={setSaving} />
      </View>

      <View style={{ marginTop: 24 }}>
        <Button title="Backup KTP ke Galeri" onPress={backupKTP} />
      </View>
    </View>
  );
};

export default SettingsScreen;
