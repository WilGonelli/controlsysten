import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { StdColor } from "../../components/style/StdStyle";

import { StdBackground } from "../../components/Background/StdBackground";
import { FontAwesome5 } from "@expo/vector-icons";
import { ClientService } from "../../services/ClientService";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../../components/style/commonStyle";

const ClientItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.clientItem}
      onPress={() => navigation.replace("UpdateClient", { client: item })}
    >
      <Text style={[commonStyles.commonBtnText, { color: StdColor.black[80] }]}>
        {item.name}
      </Text>
      <View style={styles.clientContainerDebt}>
        <Text
          style={[commonStyles.commonBtnText, { color: StdColor.black[80] }]}
        >
          R${" "}
        </Text>
        {parseFloat(item.debt) < 0 ? (
          <Text style={[commonStyles.commonBtnText, { color: "#8B0000" }]}>
            {parseFloat(item.debt).toFixed(2).replace(".", ",")}
          </Text>
        ) : (
          <Text style={[commonStyles.commonBtnText, { color: "#006400" }]}>
            {parseFloat(item.debt).toFixed(2).replace(".", ",")}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function ClientsOverview() {
  const [clients, setClients] = React.useState([]);

  const navigation = useNavigation();

  React.useEffect(() => {
    async function fetchData() {
      const data = await ClientService.getAllClients();
      setClients(data);
    }
    fetchData();
  }, []);

  return (
    <StdBackground>
      <Text style={commonStyles.commomTextTitle}>Clientes</Text>
      <TouchableOpacity
        style={styles.iconPlusClient}
        onPress={() => navigation.replace("AddClient")}
      >
        <FontAwesome5
          name="user-plus"
          size={24}
          style={styles.iconPlusClient}
        />
      </TouchableOpacity>
      {clients.length > 0 && (
        <View style={commonStyles.commonContainerLabel}>
          <Text style={commonStyles.commonDescriptionsText}>Nome:</Text>
          <Text style={commonStyles.commonDescriptionsText}>Divida:</Text>
        </View>
      )}
      <FlatList
        data={clients}
        renderItem={({ item }) => (
          <ClientItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity onPress={() => ClientService.removedb()}>
        <Text>apagar</Text>
      </TouchableOpacity>
    </StdBackground>
  );
}
