import React from "react";
import { View, Text, Button } from "react-native";

export default function LoginScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Simulasi</Text>
      <Button title="Masuk sebagai U123" onPress={() => navigation.navigate("MainDrawer", { userID: "U123" })} />
    </View>
  );
}
