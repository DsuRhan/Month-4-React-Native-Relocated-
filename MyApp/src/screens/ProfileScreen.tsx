import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function ProfileScreen({ navigation }: any) {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    let parent = navigation;
    while (parent?.getParent) {
      const drawer = parent.getParent();
      if (!drawer) break;
      const active = drawer.getState?.().routes?.[drawer.getState().index];
      if (active?.params?.userID) {
        setUserId(active.params.userID);
        break;
      }
      parent = drawer;
    }
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Text>User ID: {userId || "tidak ditemukan"}</Text>
    </View>
  );
}
