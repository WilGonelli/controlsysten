import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackgroundDefault from "../../components/Background/BackgroundDefault";
import CustomButton from "./../../components/CustomButton/index";

import { styles } from "./style";
import globalStyle from "./../../theme/globalStyle";
import Colors from "./../../theme/colors";
import { useProductViewModel } from "../../viewmodels/productViewModel";

export default function ProductUpdateTransaction({ route }) {
  const navigation = useNavigation();
  const item = route.params;
  const {
    quantityUnits,
    setQuantityUnits,
    priceValue,
    setPriceValue,
    addTransactions,
  } = useProductViewModel();

  return (
    <BackgroundDefault
      headerProps={{
        title: "Compra",
        complement: `${item.name} ${item.productPack}`,
      }}
    >
      <View style={[globalStyle.containerSubTitle, { borderBottomWidth: 0 }]}>
        <Text style={styles.labelInputUpdateClient}>
          Quantidade de unidades:
        </Text>
        <TextInput
          value={quantityUnits}
          onChangeText={setQuantityUnits}
          style={styles.inputUpdateClient}
          keyboardType="decimal-pad"
          textAlign="center"
        />
      </View>
      <View style={[globalStyle.containerSubTitle, { borderBottomWidth: 0 }]}>
        <Text style={styles.labelInputUpdateClient}>Valor:</Text>
        <TextInput
          style={styles.inputUpdateClient}
          keyboardType="decimal-pad"
          textAlign="center"
          value={priceValue}
          onChangeText={(text) => {
            const format = text.replace(".", ",");
            setPriceValue(format);
          }}
        />
      </View>

      <CustomButton
        text={"Adicionar"}
        backgroundColor={Colors.primaryColor[60]}
        onPress={async () => {
          await addTransactions(item.id, "buy");
          navigation.goBack();
        }}
      />
      <CustomButton
        text={"Cancelar"}
        backgroundColor={Colors.secundaryColor[20]}
        onPress={() => navigation.goBack()}
      />

      {item.transactions.length > 1 && (
        <View style={styles.transitionsHistoryClient}>
          <ScrollView style={{ flex: 1 }}>
            <Text
              style={[globalStyle.textCustomButton, { textAlign: "center" }]}
            >
              Tabela de analise
            </Text>
            <View
              style={[globalStyle.containerItens, { height: "max-content" }]}
            >
              <Text style={globalStyle.textItens}>Preço medio de compra:</Text>
              <Text style={globalStyle.textItens}>
                R${parseFloat(item.avgPrice).toFixed(2).replace(".", ",")}
              </Text>
            </View>
            <View
              style={[globalStyle.containerItens, { height: "max-content" }]}
            >
              <Text style={globalStyle.textItens}>Preço de venda:</Text>
              <Text style={globalStyle.textItens}>
                R${parseFloat(item.sellPrice).toFixed(2).replace(".", ",")}
              </Text>
            </View>
            <View
              style={[globalStyle.containerItens, { height: "max-content" }]}
            >
              <Text style={globalStyle.textItens}>
                Lucro medio por unidade:
              </Text>
              <Text style={globalStyle.textItens}>
                R$
                {parseFloat(item.sellPrice - item.avgPrice)
                  .toFixed(2)
                  .replace(".", ",")}
              </Text>
            </View>
            <View
              style={[globalStyle.containerItens, { height: "max-content" }]}
            >
              <Text style={globalStyle.textItens}>Quantidade comprada:</Text>
              <Text style={globalStyle.textItens}>{item.quantityBuy} Un.</Text>
            </View>
            <View
              style={[globalStyle.containerItens, { height: "max-content" }]}
            >
              <Text style={globalStyle.textItens}>Quantidade vendida:</Text>
              <Text style={globalStyle.textItens}>{item.quantitySell} Un.</Text>
            </View>
            <View
              style={[globalStyle.containerItens, { height: "max-content" }]}
            >
              <Text style={globalStyle.textItens}>Quantidade em estoque:</Text>
              <Text style={globalStyle.textItens}>
                {item.quantityBuy - item.quantitySell} Un.
              </Text>
            </View>
            <View
              style={[globalStyle.containerItens, { height: "max-content" }]}
            >
              <Text style={globalStyle.textItens}>
                Lucro medio total atual:
              </Text>
              <Text style={globalStyle.textItens}>
                R$
                {parseFloat(
                  (item.sellPrice - item.avgPrice) * item.quantitySell
                )
                  .toFixed(2)
                  .replace(".", ",")}
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
    </BackgroundDefault>
  );
}
