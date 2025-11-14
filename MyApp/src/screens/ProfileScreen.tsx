import React from "react";
import { View, Text, Button } from "react-native";

const ProfileScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Profile (Demo)</Text>
      <Text style={{ marginTop: 8 }}>Nama: Master</Text>
      <Text>Email: master@example.com</Text>
      <Button title="Settings" onPress={() => navigation?.navigate("Settings")} />
    </View>
  );
};

export default ProfileScreen;
