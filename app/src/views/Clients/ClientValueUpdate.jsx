import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ClientService } from "../../services/ClientService";
import BackgroundDefault from "../../components/Background/BackgroundDefault";
import CustomButton from "./../../components/CustomButton/index";
import { FontAwesome5 } from "@expo/vector-icons";
import ModalNewClient from "./ModalNewClient";

import { styles } from "./style";
import globalStyle from "./../../theme/globalStyle";
import Colors from "./../../theme/colors";
import { useClientViewModel } from "../../viewmodels/clientViewModel";

const TransitionsItens = ({ item }) => {
  if (item.id === 0) {
    return <></>;
  }
  return (
    <View keyExtractor={item.id}>
      <View style={[globalStyle.containerItens, { height: 40 }]}>
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
  const {
    inputValuePrice,
    setInputValuePrice,
    selectedItem,
    setSelectedItem,
    openDropDownPicker,
    setOpenDropDownPicker,
    optionsItems,
    setOptionsItems,
    inputValueName,
    setInputValueName,
    modalVisible,
    updateClient,
    updateClientName,
    openModal,
    closeModal,
    archivedClient,
  } = useClientViewModel();

  const navigation = useNavigation();

  useEffect(() => {
    setInputValueName(client.name);
  }, []);

  return (
    <BackgroundDefault>
      <Text style={globalStyle.title}>Cliente:</Text>
      <TouchableOpacity style={globalStyle.icon} onPress={openModal}>
        <FontAwesome5 name="user-edit" style={globalStyle.icon} />
      </TouchableOpacity>
      <Text style={globalStyle.title}>{client.name}</Text>
      <View style={[globalStyle.containerSubTitle, { borderBottomWidth: 0 }]}>
        <Text style={styles.labelInputUpdateClient}>valor:</Text>
        <Text style={styles.cifraoInput}>R$</Text>
        <TextInput
          style={styles.inputUpdateClient}
          value={inputValuePrice}
          onChangeText={setInputValuePrice}
          inputMode="numeric"
          textAlign="center"
        />
      </View>
      <View
        style={[
          globalStyle.containerSubTitle,
          { borderBottomWidth: 0, zIndex: 1000, elevation: 10 },
        ]}
      >
        <Text style={styles.labelInputUpdateClient}>operação:</Text>
        <DropDownPicker
          dropDownContainerStyle={styles.inputUpdateClient}
          style={styles.inputUpdateClient}
          textStyle={[globalStyle.textItens, { color: Colors.black }]}
          open={openDropDownPicker}
          value={selectedItem}
          items={optionsItems}
          setOpen={setOpenDropDownPicker}
          setValue={setSelectedItem}
          setItems={setOptionsItems}
        />
      </View>
      <CustomButton
        text={"Adicionar"}
        backgroundColor={Colors.primaryColor[60]}
        onPress={async () => {
          await updateClient(client.id);
          navigation.goBack();
        }}
      />
      <CustomButton
        text={"Cancelar"}
        backgroundColor={Colors.secundaryColor[20]}
        onPress={() => navigation.goBack()}
      />
      {client.transactions.length > 1 && (
        <View style={styles.transitionsHistoryClient}>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                globalStyle.textCustomButton,
                {
                  width: "100%",
                  textAlign: "center",
                },
              ]}
            >
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
        </View>
      )}
      <ModalNewClient
        visible={modalVisible}
        onClose={closeModal}
        onSave={async () => {
          await updateClientName(client.id);
          navigation.goBack();
        }}
        onArchived={async () => {
          await archivedClient(client.id);
          navigation.goBack();
        }}
        inputValue={inputValueName}
        setInputValue={setInputValueName}
        modalTitle={"Atualizar usuário"}
        archivedOn={client.isArchived ? "Desarquivar" : "Arquivar"}
      />
    </BackgroundDefault>
  );
}
