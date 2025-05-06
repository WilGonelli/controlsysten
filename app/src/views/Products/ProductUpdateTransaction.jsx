import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
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
    openDropDownOperation,
    setOpenDropDownOperation,
    selectedOperation,
    setSelectedOperation,
    oprationsOption,
    setOperationsOption,

    openDropDownType,
    setOpenDropDownType,
    selectedType,
    setSelectedType,
    typesOption,
    setTypesOption,

    packQuantity,
    setPackQuantity,
    quantityPerPack,
    setQuantityPerPack,
    quantityUnits,
    setQuantityUnits,
    priceValue,
    setPriceValue,

    addTransactions,
  } = useProductViewModel();

  return (
    <BackgroundDefault>
      <Text style={globalStyle.title}>Movimentação:</Text>
      <Text style={globalStyle.title}>
        {item.name} {item.type} {item.size}
      </Text>
      <View
        style={[
          globalStyle.containerSubTitle,
          { borderBottomWidth: 0, zIndex: 1000, elevation: 10 },
        ]}
      >
        <Text style={styles.labelInputUpdateClient}>Operação:</Text>
        <DropDownPicker
          dropDownContainerStyle={styles.inputUpdateClient}
          style={styles.inputUpdateClient}
          textStyle={[globalStyle.textItens, { color: Colors.black }]}
          open={openDropDownOperation}
          value={selectedOperation}
          items={oprationsOption}
          setOpen={setOpenDropDownOperation}
          setValue={setSelectedOperation}
          setItems={setOperationsOption}
          placeholder="Selecione"
          zIndex={10}
        />
      </View>
      <View
        style={[
          globalStyle.containerSubTitle,
          { borderBottomWidth: 0, zIndex: 500, elevation: 10 },
        ]}
      >
        <Text style={styles.labelInputUpdateClient}>Tipo de unidade:</Text>
        <DropDownPicker
          dropDownContainerStyle={styles.inputUpdateClient}
          style={styles.inputUpdateClient}
          textStyle={[globalStyle.textItens, { color: Colors.black }]}
          open={openDropDownType}
          value={selectedType}
          items={typesOption}
          setOpen={setOpenDropDownType}
          setValue={setSelectedType}
          setItems={setTypesOption}
          placeholder="Selecione"
          zIndex={7}
        />
      </View>
      {selectedType === "pack" && (
        <>
          <View
            style={[globalStyle.containerSubTitle, { borderBottomWidth: 0 }]}
          >
            <Text style={styles.labelInputUpdateClient}>
              Quantidade de fardos:
            </Text>
            <TextInput
              value={packQuantity}
              onChangeText={setPackQuantity}
              style={styles.inputUpdateClient}
              inputMode="numeric"
              textAlign="center"
            />
          </View>
          <View
            style={[globalStyle.containerSubTitle, { borderBottomWidth: 0 }]}
          >
            <Text style={styles.labelInputUpdateClient}>
              Unidade por fardo:
            </Text>
            <TextInput
              value={quantityPerPack}
              onChangeText={setQuantityPerPack}
              style={styles.inputUpdateClient}
              inputMode="numeric"
              textAlign="center"
            />
          </View>
        </>
      )}
      {selectedType === "unit" && (
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
      )}
      {selectedType && (
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
      )}
      <CustomButton
        text={"Adicionar"}
        backgroundColor={Colors.primaryColor[60]}
        onPress={async () => {
          await addTransactions(item.id);
          navigation.goBack();
        }}
      />
      <CustomButton
        text={"Cancelar"}
        backgroundColor={Colors.secundaryColor[20]}
        onPress={() => navigation.goBack()}
      />

      {item.transactions.length > 0 && (
        <View style={styles.transitionsHistoryClient}>
          <ScrollView style={{ flex: 1 }}>
            <Text style={globalStyle.textCustomButton}>Tabela de analise</Text>
            <View style={globalStyle.containerItens}>
              <Text style={globalStyle.textItens}>Preço medio de compra:</Text>
              <Text style={globalStyle.textItens}>
                R${parseFloat(item.avgPrice).toFixed(2).replace(".", ",")}
              </Text>
            </View>
            <View style={globalStyle.containerItens}>
              <Text style={globalStyle.textItens}>Preço de venda:</Text>
              <Text style={globalStyle.textItens}>
                R${parseFloat(item.sellPrice).toFixed(2).replace(".", ",")}
              </Text>
            </View>
            <View style={globalStyle.containerItens}>
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
            <View style={globalStyle.containerItens}>
              <Text style={globalStyle.textItens}>Quantidade comprada:</Text>
              <Text style={globalStyle.textItens}>{item.quantityBuy} Un.</Text>
            </View>
            <View style={globalStyle.containerItens}>
              <Text style={globalStyle.textItens}>Quantidade vendida:</Text>
              <Text style={globalStyle.textItens}>{item.quantitySell} Un.</Text>
            </View>
            <View style={globalStyle.containerItens}>
              <Text style={globalStyle.textItens}>Quantidade em estoque:</Text>
              <Text style={globalStyle.textItens}>{item.amount} Un.</Text>
            </View>
            <View style={globalStyle.containerItens}>
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
