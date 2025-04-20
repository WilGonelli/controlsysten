import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { StdBackground } from "../../components/Background/StdBackground";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { ClientService } from "../../services/ClientService";

export default function AddClient() {
  const [name, onChangeName] = React.useState("");

  const navigation = useNavigation();

  const addClient = async () => {
    if (name.length > 0) {
      await ClientService.createClient(name);
      navigation.replace("Overview");
    } else {
      alert("Preencha o nome do cliente!");
    }
  };

  return (
    <StdBackground>
      <Text style={styles.titleScreen}>adicionar Cliente</Text>
      <Text style={styles.descriptionsText}>Nome:</Text>
      <TextInput
        autoFocus={true}
        placeholder="Nome do cliente"
        placeholderTextColor="#fff"
        style={styles.inputName}
        onChangeText={onChangeName}
        value={name}
      />
      <TouchableOpacity style={styles.buttonAddClient} onPress={addClient}>
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
    </StdBackground>
  );
}
