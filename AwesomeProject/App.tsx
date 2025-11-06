// App.tsx
import React from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  Platform, 
  Dimensions, 
  ScrollView 
} from "react-native";

const { width } = Dimensions.get("window");

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>🎨 Styling Playground</Text>

        {/* 1. Inline Style */}
        <View style={{ backgroundColor: "#ffe4e1", padding: 12, borderRadius: 8 }}>
          <Text style={{ fontSize: 16, color: "#333" }}>Ini contoh inline style</Text>
        </View>

        {/* 2. Menggunakan StyleSheet */}
        <View style={styles.boxSheet}>
          <Text style={styles.textLight}>StyleSheet.create()</Text>
        </View>

        {/* 3. Flexbox Example */}
        <View style={styles.flexContainer}>
          <View style={[styles.flexItem, { backgroundColor: "#ff6b6b" }]} />
          <View style={[styles.flexItem, { backgroundColor: "#4ecdc4" }]} />
          <View style={[styles.flexItem, { backgroundColor: "#ffe66d" }]} />
        </View>

        {/* 4. Platform Specific Style */}
        <View style={styles.platformBox}>
          <Text style={styles.platformText}>
            {Platform.OS === "ios" ? "iOS Style" : "Android Style"}
          </Text>
        </View>

        {/* 5. Dynamic Dimension */}
        <View style={[styles.dynamicBox, { width: width * 0.8 }]}>
          <Text style={styles.textLight}>Dynamic width: {Math.round(width * 0.8)}px</Text>
        </View>

        {/* 6. Shadow / Elevation */}
        <View style={styles.shadowBox}>
          <Text style={styles.textDark}>Shadow & Elevation Example</Text>
        </View>

        {/* 7. Combined Styles */}
        <View style={[styles.boxSheet, styles.combinedBox]}>
          <Text style={styles.textLight}>Combined Styles</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  scroll: {
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  boxSheet: {
    backgroundColor: "#6a5acd",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  textLight: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  textDark: {
    color: "#333",
    fontSize: 14,
    textAlign: "center",
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 12,
  },
  flexItem: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  platformBox: {
    ...Platform.select({
      ios: {
        backgroundColor: "#87cefa",
        padding: 12,
        borderRadius: 8,
      },
      android: {
        backgroundColor: "#98fb98",
        padding: 12,
        borderRadius: 8,
      },
    }),
    marginVertical: 10,
  },
  platformText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#333",
  },
  dynamicBox: {
    backgroundColor: "#ffa07a",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  shadowBox: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  combinedBox: {
    borderWidth: 2,
    borderColor: "#483d8b",
  },
});

export default App;
