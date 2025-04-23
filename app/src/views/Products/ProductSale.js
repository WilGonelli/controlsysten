import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { styles } from "./style";
import { commonStyles } from "../../components/style/commonStyle";
import { StdColor } from "../../components/style/StdStyle";

import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

import products from "../../mocks/productsMocked.json";

import StdBackground from "../../components/Background/StdBackground";

export default function ProductSale() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function setProductsOptions() {
      const data = [];
      products.map((product) => {
        const item = {
          label: `${product.name} ${product.type} ${product.size}`,
          value: `${product.id}`,
        };
        data.push(item);
      });
      setItems(data);
    }
    setProductsOptions();
  }, []);
  return (
    <StdBackground>
      <Text style={commonStyles.commomTextTitle}>Saida de produto</Text>
      <Text style={styles.productTitleSection}>Produto:</Text>
      <DropDownPicker
        dropDownContainerStyle={commonStyles.commonInputText}
        style={commonStyles.commonInputText}
        listItemLabelStyle={commonStyles.commonLabelSelectContainer}
        textStyle={commonStyles.commonLabelSelectContainer}
        placeholder="Selecione um item"
        open={open}
        value={type}
        items={items}
        setOpen={setOpen}
        setValue={setType}
        setItems={setItems}
      />
      <Text style={styles.productTitleSection}>Quantidade:</Text>

      <TextInput style={commonStyles.commonInputText} inputMode="numeric" />
      <TouchableOpacity
        style={[
          commonStyles.commonBtnLarge,
          { backgroundColor: StdColor.secundaryColor[40] },
        ]}
      >
        <Text
          style={[commonStyles.commonBtnText, { color: StdColor.black[80] }]}
        >
          Adicionar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          commonStyles.commonBtnLarge,
          { backgroundColor: StdColor.black[20] },
        ]}
        onPress={() => {
          navigation.replace("ProductsOverview");
        }}
      >
        <Text
          style={[commonStyles.commonBtnText, { color: StdColor.white[80] }]}
        >
          Cancelar
        </Text>
      </TouchableOpacity>
    </StdBackground>
  );
}
