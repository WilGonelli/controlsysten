import React, { useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import BackgroundDefault from "../../components/Background/BackgroundDefault";
import CustomButton from "../../components/CustomButton";
import ModalNewClient from "./ModalNewClient";

import { styles } from "./style";
import globalStyle from "../../theme/globalStyle";
import Colors from "../../theme/colors";

import { useClientViewModel } from "../../viewmodels/clientViewModel";

const ClientItem = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.clientItem}
    onPress={() => navigation.navigate("UpdateClient", { client: item })}
  >
    <Text style={globalStyle.textCustomButton}>{item.name}</Text>
    <View style={globalStyle.containerItens}>
      <Text style={globalStyle.textCustomButton}>R$ </Text>
      <Text
        style={[
          globalStyle.textCustomButton,
          { color: parseFloat(item.debt) >= 0 ? Colors.red : Colors.green },
        ]}
      >
        {parseFloat(item.debt).toFixed(2).replace(".", ",")}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function ClientsOverview() {
  const {
    clients,
    modalVisible,
    inputValueName,
    setInputValueName,
    openModal,
    closeModal,
    createClient,
    removeAllClients,
    fetchClients,
  } = useClientViewModel();

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchClients();
    }, [])
  );

  return (
    <BackgroundDefault>
      <Text style={globalStyle.title}>Clientes</Text>

      <TouchableOpacity style={globalStyle.icon} onPress={openModal}>
        <FontAwesome5
          name="user-plus"
          size={18}
          style={[globalStyle.icon, { fontSize: 32 }]}
        />
      </TouchableOpacity>

      {clients.length > 0 && (
        <View style={globalStyle.containerSubTitle}>
          <Text style={globalStyle.subTitle}>Nome:</Text>
          <Text style={globalStyle.subTitle}>Dívida:</Text>
        </View>
      )}

      <FlatList
        data={clients}
        renderItem={({ item }) => (
          <ClientItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity onPress={removeAllClients}>
        <Text style={{ color: "black" }}>Apagar</Text>
      </TouchableOpacity>

      <ModalNewClient
        visible={modalVisible}
        onClose={closeModal}
        onSave={createClient}
        inputValue={inputValueName}
        setInputValue={setInputValueName}
        modalTitle={"Criar"}
      />
    </BackgroundDefault>
  );
}
