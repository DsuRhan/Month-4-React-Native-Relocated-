// src/navigation/ProtectedRoute.tsx

import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { getToken, validateTokenOrLogout } from "../storage/auth";
import { navigationRef } from "./RootNavigator";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const [allowed, setAllowed] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const stillValid = await validateTokenOrLogout();

      if (!token || !stillValid) {
        if (navigationRef.isReady()) {
          navigationRef.navigate("Gate"); // kembali ke login
        }
        setAllowed(false);
        return;
      }

      setAllowed(true);
    })();
  }, []);

  if (allowed === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return allowed ? <>{children}</> : null;
}
