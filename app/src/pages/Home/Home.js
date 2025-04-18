import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "./style";
import { StdBackground } from "../../components/Background/StdBackground";
import { FontAwesome5 } from "@expo/vector-icons";
import { ClientService } from "../../services/ClientService";

const ClientItem = ({ item }) => {
  return (
    <View style={styles.clientItem}>
      <Text style={styles.clientInfo}>{item.name}</Text>
      <View style={styles.clientContainerDebt}>
        <Text style={styles.clientInfo}>R$ </Text>
        <Text style={styles.clientInfo}>
          {parseFloat(item.divida).toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  );
};

export default function Home() {
  const [clients, setClients] = React.useState([]);

  React.useEffect(() => {
    const clients = ClientService.getAllClients();
    setClients(clients);
  }, []);

  return (
    <StdBackground>
      <View style={styles.containerClients}>
        <Text style={styles.titleScreen}>Clientes</Text>
        <FontAwesome5
          name="user-plus"
          size={24}
          style={styles.iconPlusClient}
        />
      </View>
      {clients.length > 0 && (
        <View style={styles.containerDescriptions}>
          <Text style={styles.descriptionsText}>Nome:</Text>
          <Text style={styles.descriptionsText}>Divida:</Text>
        </View>
      )}
      <FlatList
        data={clients}
        renderItem={({ item }) => <ClientItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </StdBackground>
  );
}
