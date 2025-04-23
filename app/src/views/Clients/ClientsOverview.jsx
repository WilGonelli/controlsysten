import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import StdBackground from "../../components/Background/StdBackground";
import CustomButton from "../../components/CustomButton";
import ModalNewClient from "./ModalNewClient";

import { styles } from "./style";
import globalStyle from "../../theme/globalStyle";
import Colors from "../../theme/colors";

import { useClientViewModel } from "../../viewmodels/clientViewModel";

const ClientItem = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.clientItem}
    onPress={() => navigation.replace("UpdateClient", { client: item })}
  >
    <Text style={globalStyle.textCustomButton}>{item.name}</Text>
    <View style={globalStyle.containerItens}>
      <Text style={globalStyle.textCustomButton}>R$ </Text>
      <Text
        style={[
          globalStyle.textCustomButton,
          { color: parseFloat(item.debt) > 0 ? Colors.red : Colors.green },
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
    inputValue,
    setInputValue,
    openModal,
    closeModal,
    createClient,
    removeAllClients,
  } = useClientViewModel();

  const navigation = useNavigation();

  return (
    <StdBackground>
      <Text style={globalStyle.title}>Clientes</Text>

      <TouchableOpacity style={styles.iconPlusClient} onPress={openModal}>
        <FontAwesome5
          name="user-plus"
          size={24}
          style={styles.iconPlusClient}
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
        <Text>Apagar Todos</Text>
      </TouchableOpacity>

      <ModalNewClient
        visible={modalVisible}
        onClose={closeModal}
        onSave={createClient}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </StdBackground>
  );
}
