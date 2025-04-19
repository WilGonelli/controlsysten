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

const TransitionsItens = ({ item }) => {
  if (item.id === 0) {
    return <></>;
  }
  return (
    <View keyExtractor={item.id}>
      {item.type === "spent" ? (
        <View style={styles.containerHistoryItem}>
          <Text style={styles.containerHistoryItemLabelSpent}>Gasto</Text>
          <Text style={styles.containerHistoryItemLabelSpent}>
            R$-{parseFloat(item.value).toFixed(2).replace(".", ",")}
          </Text>
        </View>
      ) : (
        <View style={styles.containerHistoryItem}>
          <Text style={styles.containerHistoryItemLabelSaid}>Pago</Text>
          <Text style={styles.containerHistoryItemLabelSaid}>
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
      <Text style={styles.titleScreen}>Cliente: {client.name}</Text>
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
          listItemLabelStyle={styles.labelSelectContainer}
          open={open}
          value={type}
          items={items}
          setOpen={setOpen}
          setValue={setType}
          setItems={setItems}
        />
      </View>
      <TouchableOpacity style={styles.buttonAddClient} onPress={updateClient}>
        <Text style={styles.buttonAddText}>Adicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={() => {
          navigation.replace("Overview");
        }}
      >
        <Text style={styles.buttonCancelText}>Cancelar</Text>
      </TouchableOpacity>
      <View style={styles.transitionsHistoryClient}>
        {client.transactions.length > 1 && (
          <View style={styles.containerFlatListClients}>
            <Text style={styles.labelHistoryTransitions}>
              Lista de movimentações
            </Text>
            <FlatList
              data={client.transactions}
              renderItem={({ item }) => <TransitionsItens item={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
    </StdBackground>
  );
}
