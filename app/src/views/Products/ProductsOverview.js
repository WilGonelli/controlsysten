import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./style";
import StdBackground from "../../components/Background/StdBackground";
import { useNavigation } from "@react-navigation/native";
import products from "../../mocks/productsMocked.json";
import { commonStyles } from "../../components/style/commonStyle";

const ProductRender = ({ item }) => {
  return (
    <View style={commonStyles.commonContainerItens}>
      <Text style={styles.productItemLabel}>
        {item.name} {item.type} {item.size}
      </Text>
      <Text style={styles.productItemLabel}>{item.amount} Un.</Text>
    </View>
  );
};

export default function ProductsOverview() {
  const navigation = useNavigation();
  return (
    <StdBackground>
      <Text style={commonStyles.commomTextTitle}>Lista de produtos</Text>
      {products.length > 0 && (
        <View style={styles.productListOverView}>
          <View style={commonStyles.commonContainerLabel}>
            <Text style={commonStyles.commonDescriptionsText}>Produto</Text>
            <Text style={commonStyles.commonDescriptionsText}>Quantidade</Text>
          </View>
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductRender item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      <View style={styles.productBtnContainer}>
        <TouchableOpacity
          style={styles.productBtnBuy}
          onPress={(e) => {
            navigation.replace("ProductBuy");
          }}
        >
          <Text style={styles.productBtnLabel}>Compra</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.productBtnSale}
          onPress={(e) => {
            navigation.replace("ProductSale");
          }}
        >
          <Text style={styles.productBtnLabel}>Venda</Text>
        </TouchableOpacity>
      </View>
    </StdBackground>
  );
}
