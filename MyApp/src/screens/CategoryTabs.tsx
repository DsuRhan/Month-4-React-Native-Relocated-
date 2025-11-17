import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from "react-native";
import { Product } from "../modules/types";
import ProductCard from "../components/ProductCard";

const categoriesDefault = ["smartphones", "laptops", "fragrances", "skincare", "groceries"];

const CategoryTabs: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const [active, setActive] = useState(categoriesDefault[0]);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetch(`https://dummyjson.com/products/category/${active}`)
      .then((r) => r.json())
      .then((d) => { if (mounted) setItems(d.products ?? []); })
      .catch((e) => console.log(e))
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, [active]);

  return (
    <View style={{ flex: 1 }}>
      {/* --- Scrollable Tabs --- */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        {categoriesDefault.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.tab, active === c && styles.activeTab]}
            onPress={() => setActive(c)}
          >
            <Text style={active === c ? styles.activeText : styles.tabText}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* --- Content --- */}
      {loading ? (
        <Text style={{ textAlign: "center", marginTop: 12 }}>Loading...</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate("ProductDetail", { productId: item.id })
              }
            >
              <ProductCard product={item} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabScroll: {
    marginTop: 30,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  activeTab: {
    backgroundColor: "#ccc",
  },
  tabText: {
    color: "#333",
    fontSize: 14,
    textTransform: "capitalize",
  },
  activeText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 14,
  },
});

export default CategoryTabs;
