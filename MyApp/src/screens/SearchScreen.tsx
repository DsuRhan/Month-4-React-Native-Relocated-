import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProductCard from "../components/ProductCard";

const SearchScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const doSearch = async () => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`);
      const d = await res.json();
      setResults(d.products ?? []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 12 , marginTop: 28}}>
      <TextInput placeholder="Search products..." placeholderTextColor="#C0C0C0"  value={q} onChangeText={setQ} onSubmitEditing={doSearch} style={styles.input} />
      {loading ? <Text style={{ textAlign: "center", marginTop: 12 }}>Searching...</Text> :
        <FlatList data={results} keyExtractor={(i) => i.id.toString()} renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation?.navigate("ProductDetail", { productId: item.id })}>
            <ProductCard product={item} />
          </TouchableOpacity>
        )} />}
    </View>
  );
};

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "#ddd", padding: 8, borderRadius: 6 , color: "#000",},
});
export default SearchScreen;
