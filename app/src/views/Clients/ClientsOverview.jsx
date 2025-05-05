import React, { useCallback, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import BackgroundDefault from "../../components/Background/BackgroundDefault";
import CustomButton from "../../components/CustomButton";
import ModalNewClient from "./ModalNewClient";

import { styles } from "./style";
import globalStyle from "../../theme/globalStyle";
import Colors from "../../theme/colors";

import { useClientViewModel } from "../../viewmodels/clientViewModel";

const ClientItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.clientItem}
      onPress={() => navigation.navigate("UpdateClient", { client: item })}
    >
      <Text style={[globalStyle.textCustomButton, { maxWidth: "60%" }]}>
        {item.name}
      </Text>
      <View style={[globalStyle.containerItens, { borderBottomWidth: 0 }]}>
        <Text style={globalStyle.textCustomButton}>R$ </Text>
        <Text
          style={[
            globalStyle.textCustomButton,
            {
              color: parseFloat(item.debt) >= 0 ? Colors.red : Colors.green,
            },
          ]}
        >
          {parseFloat(item.debt).toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ClientsOverview({ route }) {
  const { clientsRender } = route.params;
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

  useEffect(() => {
    fetchClients(clientsRender);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchClients(clientsRender);
    }, [])
  );

  return (
    <BackgroundDefault>
      <TouchableOpacity
        style={[globalStyle.icon, { left: 8, zIndex: 12 }]}
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <AntDesign
          name="menuunfold"
          style={[globalStyle.icon, { left: 8, color: Colors.white }]}
        />
      </TouchableOpacity>
      <Text style={globalStyle.title}>Clientes</Text>
      <Text style={[globalStyle.title, { marginTop: -14 }]}>
        {clientsRender}
      </Text>

      <TouchableOpacity style={globalStyle.icon} onPress={openModal}>
        <FontAwesome5
          name="user-plus"
          size={18}
          style={[globalStyle.icon, { fontSize: 28 }]}
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

      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Text style={{ color: "black" }}>Apagar</Text>
      </TouchableOpacity>

      <ModalNewClient
        visible={modalVisible}
        onClose={closeModal}
        onSave={createClient}
        inputValue={inputValueName}
        setInputValue={setInputValueName}
        modalTitle={"Criar cliente"}
        archivedOn={false}
      />
    </BackgroundDefault>
  );
}
