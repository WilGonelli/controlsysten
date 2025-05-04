import { Modal, View, TextInput, StyleSheet, Text } from "react-native";
import CustomButton from "../../components/CustomButton";
import Colors from "../../theme/colors";
import { styles } from "./style";
import globalStyle from "../../theme/globalStyle";

export default function ModalNewClient({
  visible,
  onClose,
  onSave,
  inputValue,
  setInputValue,
  modalTitle,
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={[globalStyle.subTitle, { color: Colors.black }]}>
            {modalTitle} usuario:
          </Text>

          <TextInput
            placeholder="Digite o Nome"
            placeholderTextColor="#808080"
            value={inputValue}
            onChangeText={setInputValue}
            style={globalStyle.input}
          />
          <CustomButton
            text={"Salvar"}
            onPress={onSave}
            backgroundColor={Colors.primaryColor[60]}
          />
          <CustomButton
            text={"Cancelar"}
            onPress={onClose}
            backgroundColor={Colors.secundaryColor[20]}
          />
        </View>
      </View>
    </Modal>
  );
}
