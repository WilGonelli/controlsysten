import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { StdBackground } from "../../components/Background/StdBackground";
import { FontAwesome5 } from "@expo/vector-icons";
import { ClientService } from "../../services/ClientService";
import { useNavigation } from "@react-navigation/native";

const ClientItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.clientItem}
      onPress={() => navigation.replace("UpdateClient", { client: item })}
    >
      <Text style={styles.clientInfo}>{item.name}</Text>
      <View style={styles.clientContainerDebt}>
        <Text style={styles.clientInfo}>R$ </Text>
        {parseFloat(item.debt) < 0 ? (
          <Text style={styles.clientInfoNegative}>
            {parseFloat(item.debt).toFixed(2).replace(".", ",")}
          </Text>
        ) : (
          <Text style={styles.clientInfoPositive}>
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
      <View style={styles.containerClients}>
        <Text style={styles.titleScreen}>Clientes</Text>
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
      </View>
      {clients.length > 0 && (
        <View style={styles.containerDescriptions}>
          <Text style={styles.descriptionsText}>Nome:</Text>
          <Text style={styles.descriptionsText}>Divida:</Text>
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
