// App.tsx
import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import RootNavigator from "./src/navigation/RootNavigator";
import { useNetInfoStatus } from "./src/hooks/useNetInfoStatus";

// ---- Error Boundary ----
class AppErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    console.log("Global error caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorWrap}>
          <Text style={styles.errorTitle}>Terjadi Error</Text>
          <Text style={styles.errorMsg}>Aplikasi tetap aman, Master.</Text>
          <Text style={{ marginTop: 8 }} onPress={() => this.setState({ hasError: false })}>
            Tap untuk Reload
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const OfflineBanner = () => {
  const { isInternetReachable } = useNetInfoStatus();
  if (isInternetReachable === false)
    return (
      <View style={styles.offlineBanner}>
        <Text style={{ color: "white" }}>Anda sedang Offline</Text>
      </View>
    );
  return null;
};

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppErrorBoundary>
        <OfflineBanner />
        <RootNavigator />
      </AppErrorBoundary>
    </SafeAreaView>
  );
}

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
