import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
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
      <View style={styles.tabRow}>
        {categoriesDefault.map((c) => (
          <TouchableOpacity key={c} style={[styles.tab, active === c && styles.activeTab]} onPress={() => setActive(c)}>
            <Text style={active === c ? styles.activeText : styles.tabText}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? <Text style={{ textAlign: "center", marginTop: 12 }}>Loading...</Text> :
        <FlatList data={items} keyExtractor={(i) => i.id.toString()} renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation?.navigate("ProductDetail", { productId: item.id })}>
            <ProductCard product={item} />
          </TouchableOpacity>
        )} />}
    </View>
  );
};

const styles = StyleSheet.create({
  tabRow: { flexDirection: "row", padding: 8, justifyContent: "space-around" },
  tab: { padding: 8, borderRadius: 6 },
  activeTab: { backgroundColor: "#ddd" },
  tabText: { color: "#333" },
  activeText: { color: "#000", fontWeight: "700" },
});
export default CategoryTabs;
