// App.tsx

import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import RootNavigator from "./src/navigation/RootNavigator";
import { useNetInfoStatus } from "./src/hooks/useNetInfoStatus";
import { loadAppInitialData } from "./src/storage/auth";

// ------------------------------------------------------
// GLOBAL ERROR BOUNDARY
// ------------------------------------------------------
class AppErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err: any, info: any) {
    console.log("GLOBAL ERROR:", err, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorWrap}>
          <Text style={styles.errorTitle}>Terjadi Error</Text>
          <Text style={styles.errorMsg}>Aplikasi tetap aman, Master.</Text>

          <Text
            style={{ marginTop: 8 }}
            onPress={() => this.setState({ hasError: false })}
          >
            Tap untuk Reload
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

// ------------------------------------------------------
// OFFLINE BANNER
// ------------------------------------------------------
const OfflineBanner = () => {
  const { isInternetReachable } = useNetInfoStatus();

  if (isInternetReachable === false) {
    return (
      <View style={styles.offlineBanner}>
        <Text style={{ color: "white" }}>Anda sedang Offline</Text>
      </View>
    );
  }

  return null;
};

// ------------------------------------------------------
// APP ROOT
// ------------------------------------------------------
export default function App() {
  React.useEffect(() => {
    loadAppInitialData()
      .then((d) => console.log("Initial storage:", d))
      .catch((e) => console.log("Initial load error:", e));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppErrorBoundary>
        <OfflineBanner />
        <RootNavigator />
      </AppErrorBoundary>
    </SafeAreaView>
  );
}

// ------------------------------------------------------
const styles = StyleSheet.create({
  offlineBanner: {
    backgroundColor: "crimson",
    paddingVertical: 6,
    alignItems: "center",
  },
  errorWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorTitle: { fontSize: 22, fontWeight: "700" },
  errorMsg: { marginTop: 6, color: "gray" },
});
