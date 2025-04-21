import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { StdBackground } from "../../components/Background/StdBackground";
import { styles } from "./style";
import { StdColor } from "../../components/style/StdStyle";

import { useNavigation } from "@react-navigation/native";
import { ClientService } from "../../services/ClientService";
import { commonStyles } from "../../components/style/commonStyle";

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
      <Text style={commonStyles.commomTextTitle}>adicionar Cliente</Text>
      <Text style={commonStyles.commonDescriptionsText}>Nome:</Text>
      <TextInput
        autoFocus={true}
        placeholder="Nome do cliente"
        placeholderTextColor="#fff"
        style={commonStyles.commonInputText}
        onChangeText={onChangeName}
        value={name}
      />
      <TouchableOpacity
        style={[
          commonStyles.commonBtnLarge,
          { backgroundColor: StdColor.secndaryColor[40] },
        ]}
        onPress={addClient}
      >
        <Text
          style={[commonStyles.commonBtnText, { color: StdColor.black[80] }]}
        >
          Adicionar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          commonStyles.commonBtnLarge,
          { backgroundColor: StdColor.black[20] },
        ]}
        onPress={() => {
          navigation.replace("Overview");
        }}
      >
        <Text
          style={[commonStyles.commonBtnText, { color: StdColor.white[80] }]}
        >
          Cancelar
        </Text>
      </TouchableOpacity>
    </StdBackground>
  );
}
