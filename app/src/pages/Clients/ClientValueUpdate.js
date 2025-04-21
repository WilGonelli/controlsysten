import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { StdBackground } from "../../components/Background/StdBackground";
import { useNavigation } from "@react-navigation/native";
import { ClientService } from "../../services/ClientService";
import { styles } from "./style";
import { commonStyles } from "../../components/style/commonStyle";
import { StdColor } from "../../components/style/StdStyle";

const TransitionsItens = ({ item }) => {
  if (item.id === 0) {
    return <></>;
  }
  return (
    <View keyExtractor={item.id}>
      {item.type === "spent" ? (
        <View style={commonStyles.commonContainerItens}>
          <Text
            style={[
              commonStyles.commonFontSizeLabel,
              {
                color: "#8B0000",
              },
            ]}
          >
            Gasto
          </Text>
          <Text
            style={[
              commonStyles.commonFontSizeLabel,
              {
                color: "#8B0000",
              },
            ]}
          >
            R$-{parseFloat(item.value).toFixed(2).replace(".", ",")}
          </Text>
        </View>
      ) : (
        <View style={commonStyles.commonContainerItens}>
          <Text
            style={[
              commonStyles.commonFontSizeLabel,
              {
                color: "#006400",
              },
            ]}
          >
            Pago
          </Text>
          <Text
            style={[
              commonStyles.commonFontSizeLabel,
              {
                color: "#006400",
              },
            ]}
          >
            R${parseFloat(item.value).toFixed(2).replace(".", ",")}
          </Text>
        </View>
      )}
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

  return (
    <StdBackground>
      <Text style={commonStyles.commomTextTitle}>Cliente: {client.name}</Text>
      <View style={styles.containerInputUpdateClient}>
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
      <View style={styles.containerInputUpdateClient}>
        <Text style={styles.labelInputUpdateClient}>operação:</Text>
        <DropDownPicker
          dropDownContainerStyle={styles.inputUpdateClient}
          style={styles.inputUpdateClient}
          textStyle={commonStyles.commonLabelSelectContainer}
          open={open}
          value={type}
          items={items}
          setOpen={setOpen}
          setValue={setType}
          setItems={setItems}
        />
      </View>
      <TouchableOpacity
        style={[
          commonStyles.commonBtnLarge,
          { backgroundColor: StdColor.secndaryColor[40] },
        ]}
        onPress={updateClient}
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
          navigation.replace("Overview");
        }}
      >
        <Text
          style={[commonStyles.commonBtnText, { color: StdColor.white[80] }]}
        >
          Cancelar
        </Text>
      </TouchableOpacity>
      <View style={styles.transitionsHistoryClient}>
        {client.transactions.length > 1 && (
          <>
            <View style={{ flex: 1 }}>
              <Text style={styles.labelHistoryTransitions}>
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
              {client.debt < 0 ? (
                <Text style={{ fontSize: 24, color: "#8B0000" }}>
                  {parseFloat(client.debt).toFixed(2).replace(".", ",")}
                </Text>
              ) : (
                <Text style={{ fontSize: 24, color: "#006400" }}>
                  {parseFloat(client.debt).toFixed(2).replace(".", ",")}
                </Text>
              )}
            </View>
          </>
        )}
      </View>
    </StdBackground>
  );
}
