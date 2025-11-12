import React from "react";
import { Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../types/navigation";

const DrawerButton = () => {
  const navigation = useNavigation();
  const parentDrawer = navigation.getParent<DrawerNavigationProp<DrawerParamList>>();

  return (
    <Pressable
      onPress={() => parentDrawer?.toggleDrawer()}
      style={{ marginLeft: 12 }}
    >
      <Text>☰</Text>
    </Pressable>
  );
};

export default DrawerButton;
