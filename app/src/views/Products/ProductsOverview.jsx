import React, { useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import BackgroundDefault from "../../components/Background/BackgroundDefault";
import ModalNewProduct from "./ModalNewProduct";

import globalStyle from "./../../theme/globalStyle";
import Colors from "./../../theme/colors";
import { styles } from "./style";

import { useProductViewModel } from "./../../viewmodels/productViewModel";

const ProductRender = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.clientItem}
      onPress={() => {
        navigation.navigate("ProductsUpdate", item);
      }}
    >
      <Text
        style={[
          globalStyle.textCustomButton,
          { maxWidth: "80%", textAlign: "start" },
        ]}
      >
        {item.name} {item.type} {item.size}
      </Text>
      <View
        style={[
          globalStyle.containerItens,
          { borderBottomWidth: 0, marginTop: 0 },
        ]}
      >
        <Text
          style={[
            globalStyle.textCustomButton,
            {
              fontSize: 28,
            },
            parseInt(item.amount) < 10
              ? { color: Colors.green }
              : { color: Colors.red },
          ]}
        >
          {parseInt(item.amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ProductsOverview() {
  const {
    products,
    modalVisible,
    inputValue1,
    inputValue2,
    inputValue3,
    inputValue4,
    setInputValue1,
    setInputValue2,
    setInputValue3,
    setInputValue4,
    openModal,
    closeModal,
    createProduct,
    fetchProducts,
    removeProducts,
  } = useProductViewModel();

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );
  return (
    <BackgroundDefault>
      <Text style={globalStyle.title}>Lista de produtos</Text>
      <TouchableOpacity style={globalStyle.icon} onPress={openModal}>
        <MaterialCommunityIcons
          name="store-plus"
          style={[globalStyle.icon, { right: 6, top: 12 }]}
        />
      </TouchableOpacity>
      {products.length > 0 && (
        <View style={globalStyle.containerSubTitle}>
          <Text style={globalStyle.subTitle}>Produto:</Text>
          <Text style={globalStyle.subTitle}>Estoque:</Text>
        </View>
      )}
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductRender item={item} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity onPress={removeProducts}>
        <Text style={{ color: "black" }}>apagar</Text>
      </TouchableOpacity>

      <ModalNewProduct
        visible={modalVisible}
        onClose={closeModal}
        onSave={createProduct}
        inputValue1={inputValue1}
        inputValue2={inputValue2}
        inputValue3={inputValue3}
        inputValue4={inputValue4}
        setInputValue1={setInputValue1}
        setInputValue2={setInputValue2}
        setInputValue3={setInputValue3}
        setInputValue4={setInputValue4}
      />
    </BackgroundDefault>
  );
}
