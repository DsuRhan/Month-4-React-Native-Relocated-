import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useNetInfoStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isInternetReachable, setIsInternetReachable] = useState<boolean | null>(null);
  const [connectionType, setConnectionType] = useState<string>("unknown");

  useEffect(() => {
    const sub = NetInfo.addEventListener((state) => {
      setIsOnline(!!state.isConnected);
      setIsInternetReachable(state.isInternetReachable ?? null);
      setConnectionType(state.type || "unknown");
    });

    // initial
    NetInfo.fetch().then((s) => {
      setIsOnline(!!s.isConnected);
      setIsInternetReachable(s.isInternetReachable ?? null);
      setConnectionType(s.type || "unknown");
    });

    return () => sub();
  }, []);

  return { isOnline, isInternetReachable, connectionType };
};
