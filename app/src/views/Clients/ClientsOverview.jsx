import React, { useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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
    removeClients,
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
    <BackgroundDefault
      headerProps={{
        title: "Clientes",
        complement: clientsRender,
        leftComponent: (
          <TouchableOpacity
            style={[globalStyle.icon, { left: 8, zIndex: 12 }]}
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <AntDesign
              name="menuunfold"
              style={[globalStyle.icon, { color: Colors.white }]}
            />
          </TouchableOpacity>
        ),
        rightComponent: (
          <TouchableOpacity
            style={[globalStyle.icon, { zIndex: 10 }]}
            onPress={openModal}
          >
            <FontAwesome5
              name="user-plus"
              size={18}
              style={[globalStyle.icon, { fontSize: 28, zIndex: 1 }]}
            />
          </TouchableOpacity>
        ),
      }}
    >
      {clients.length > 0 && (
        <>
          <View style={globalStyle.containerSubTitle}>
            <Text style={globalStyle.subTitle}>Nome:</Text>
            <Text style={globalStyle.subTitle}>Dívida:</Text>
          </View>
          <ScrollView style={styles.containerScroll}>
            {clients.map((c) => (
              <ClientItem key={c.id} item={c} navigation={navigation} />
            ))}
          </ScrollView>
        </>
      )}
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
