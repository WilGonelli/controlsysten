import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { ClientService } from "../../services/ClientService";
import StdBackground from "../../components/Background/StdBackground";
import CustomButton from "./../../components/CustomButton/index";

import { styles } from "./style";
import globalStyle from "./../../theme/globalStyle";
import Colors from "./../../theme/colors";

const TransitionsItens = ({ item }) => {
  if (item.id === 0) {
    return <></>;
  }
  return (
    <View keyExtractor={item.id}>
      <View style={globalStyle.containerItens}>
        <Text
          style={[
            globalStyle.textItens,
            item.type === "spent"
              ? { color: Colors.green }
              : { color: Colors.red },
          ]}
        >
          {item.type === "spent" ? "Gasto" : "Pago"}
        </Text>
        <Text
          style={[
            globalStyle.textItens,
            item.type === "spent"
              ? { color: Colors.green }
              : { color: Colors.red },
          ]}
        >
          R${parseFloat(item.value).toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  );
};

export default function ClientValueUpdate({ route }) {
  const { client } = route.params;
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("spent");
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([
    { label: "Gasto", value: "spent" },
    { label: "Pago", value: "paid" },
  ]);

  const navigation = useNavigation();

  const updateClient = async () => {
    if (value > 0) {
      await ClientService.updateClient(client.id, value, type);
      navigation.replace("Overview");
    } else {
      alert("adicione um valor valido");
    }
  };

  const backSreem = () => {
    navigation.replace("Overview");
  };

  return (
    <StdBackground>
      <Text style={globalStyle.title}>Cliente: {client.name}</Text>
      <View style={[globalStyle.containerSubTitle, { borderBottomWidth: 0 }]}>
        <Text style={styles.labelInputUpdateClient}>valor:</Text>
        <Text style={styles.cifraoInput}>R$</Text>
        <TextInput
          style={styles.inputUpdateClient}
          value={value}
          onChangeText={setValue}
          inputMode="numeric"
          textAlign="center"
        />
      </View>
      <View style={[globalStyle.containerSubTitle, { borderBottomWidth: 0 }]}>
        <Text style={styles.labelInputUpdateClient}>operação:</Text>
        <DropDownPicker
          dropDownContainerStyle={styles.inputUpdateClient}
          style={styles.inputUpdateClient}
          textStyle={[globalStyle.textItens, { color: Colors.black }]}
          open={open}
          value={type}
          items={items}
          setOpen={setOpen}
          setValue={setType}
          setItems={setItems}
        />
      </View>
      <CustomButton
        text={"Adicionar"}
        backgroundColor={Colors.primaryColor[60]}
        onPress={updateClient}
      />
      <CustomButton
        text={"Cancelar"}
        backgroundColor={Colors.secundaryColor[20]}
        onPress={backSreem}
      />
      <View style={styles.transitionsHistoryClient}>
        {client.transactions.length > 1 && (
          <>
            <View style={{ flex: 1 }}>
              <Text style={globalStyle.textCustomButton}>
                Lista de movimentações
              </Text>
              <FlatList
                data={client.transactions}
                renderItem={({ item }) => <TransitionsItens item={item} />}
                keyExtractor={(item) => item.id}
              />
            </View>
            <View style={styles.TotalTransitions}>
              <Text style={{ fontSize: 24 }}>Saldo: R$ </Text>
              <Text
                style={[
                  globalStyle.textItens,
                  client.debt < 0
                    ? { color: Colors.green }
                    : { color: Colors.red },
                ]}
              >
                {parseFloat(client.debt).toFixed(2).replace(".", ",")}
              </Text>
            </View>
          </>
        )}
      </View>
    </StdBackground>
  );
}
