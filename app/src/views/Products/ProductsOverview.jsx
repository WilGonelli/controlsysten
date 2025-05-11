import React, { useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import BackgroundDefault from "../../components/Background/BackgroundDefault";
import ModalNewProduct from "./ModalNewProduct";

import globalStyle from "./../../theme/globalStyle";
import Colors from "./../../theme/colors";
import { styles } from "./style";

import { useProductViewModel } from "./../../viewmodels/productViewModel";

const ProductRender = ({ item, navigation }) => {
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
        {item.name} {item.productPack}
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
          {parseInt(item.quantityBuy) - parseInt(item.quantitySell)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ProductsOverview({ route }) {
  const { productsRender } = route.params;
  const {
    products,
    modalVisible,
    inputNameProduct,
    packSize,
    sellValue,
    openDropDownProductType,
    setOpenDropDownProductType,
    selectedProductType,
    setSelectedProductType,
    typesProductsOptions,
    setTypesProductsOptions,
    openDropDownProductPack,
    setOpenDropDownProductPack,
    selectedProductPack,
    setSelectedProductPack,
    packsProductsOptions,
    setPacksProductsOptions,
    setInputNameProduct,
    setPackSize,
    setSellValue,
    openModal,
    closeModal,
    createProduct,
    fetchProducts,
    removeProducts,
  } = useProductViewModel();

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchProducts(productsRender);
    }, [modalVisible])
  );
  return (
    <BackgroundDefault>
      <TouchableOpacity
        style={[globalStyle.icon, { left: 8, zIndex: 12 }]}
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <AntDesign
          name="menuunfold"
          style={[globalStyle.icon, { left: 8, color: Colors.white }]}
        />
      </TouchableOpacity>
      <Text style={globalStyle.title}>Lista de </Text>
      <Text style={[globalStyle.title, { marginTop: -12 }]}>
        {productsRender}
      </Text>
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
        renderItem={({ item }) => (
          <ProductRender item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity onPress={removeProducts}>
        <Text>apagar</Text>
      </TouchableOpacity>

      <ModalNewProduct
        visible={modalVisible}
        onClose={closeModal}
        onSave={createProduct}
        inputNameProduct={inputNameProduct}
        setInputNameProduct={setInputNameProduct}
        packSize={packSize}
        setPackSize={setPackSize}
        sellValue={sellValue}
        setSellValue={setSellValue}
        openDropDownProductType={openDropDownProductType}
        setOpenDropDownProductType={setOpenDropDownProductType}
        selectedProductType={selectedProductType}
        setSelectedProductType={setSelectedProductType}
        typesProductsOptions={typesProductsOptions}
        setTypesProductsOptions={setTypesProductsOptions}
        openDropDownProductPack={openDropDownProductPack}
        setOpenDropDownProductPack={setOpenDropDownProductPack}
        selectedProductPack={selectedProductPack}
        setSelectedProductPack={setSelectedProductPack}
        packsProductsOptions={packsProductsOptions}
        setPacksProductsOptions={setPacksProductsOptions}
      />
    </BackgroundDefault>
  );
}
